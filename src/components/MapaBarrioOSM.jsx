/**
 * MapaBarrioOSM.jsx — Mapa SVG desde OpenStreetMap (Overpass API)
 * Dos queries en paralelo: calles (bbox) + polígono del barrio (relation recursiva)
 */

import { useState, useEffect, useMemo } from 'react'

// ── Nombre OSM por barrio ID ────────────────────────────────────────────────
const OSM_NOMBRE = {
  'la-boca':          'La Boca',
  'barracas':         'Barracas',
  'parque-patricios': 'Parque Patricios',
  'nueva-pompeya':    'Nueva Pompeya',
}

// ── Overpass endpoints (fallback) ───────────────────────────────────────────
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
]

async function runQuery(queryStr) {
  const body = `data=${encodeURIComponent(queryStr)}`
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: AbortSignal.timeout(30_000),
      })
      if (!res.ok) continue
      return await res.json()
    } catch { /* try next */ }
  }
  throw new Error('No se pudo conectar con OpenStreetMap.')
}

// Query 1: calles y espacios verdes dentro del bounding box
function qCalles({ south, west, north, east }) {
  const box = `${south},${west},${north},${east}`
  return `[out:json][timeout:25];(` +
    `way["highway"~"^(trunk|primary|secondary|tertiary|residential|unclassified|living_street)$"](${box});` +
    `way["leisure"~"^(park|garden|recreation_ground)$"](${box});` +
    `way["landuse"~"^(grass|recreation_ground)$"](${box});` +
    `);out geom;`
}

// Query 2: polígono del barrio (relation + recursión para obtener geometry de ways)
function qBoundary({ south, west, north, east }, osmNombre) {
  const box = `${south},${west},${north},${east}`
  // "._;>;" recursión: baja de relation → ways → nodes; "out geom;" pone geometry inline en ways
  return `[out:json][timeout:15];relation["name"="${osmNombre}"]["boundary"="administrative"](${box});._;>;out geom;`
}

// ── Ensambla el polígono del barrio desde los way-elements recursados ────────
function buildBoundaryPath(data, project) {
  if (!data?.elements?.length) return null

  // 1. Encontrar la relation y sus outer-way refs
  const rel = data.elements.find(e => e.type === 'relation')
  if (!rel?.members) return null

  const outerRefs = new Set(
    rel.members
      .filter(m => m.type === 'way' && m.role !== 'inner')
      .map(m => m.ref)
  )

  // 2. Encontrar esos ways en los elementos planos (vienen CON geometry via ">")
  const outerWays = data.elements
    .filter(e => e.type === 'way' && outerRefs.has(e.id) && e.geometry?.length)
    .map(e => ({ id: e.id, pts: e.geometry.map(g => project(g.lat, g.lon)) }))

  if (!outerWays.length) return null

  // 3. Encadenar segmentos por proximidad de extremos
  const chain = [outerWays[0].pts]
  const rest   = outerWays.slice(1)

  while (rest.length > 0) {
    const tail = chain[chain.length - 1].at(-1)
    let matched = false

    for (let i = 0; i < rest.length; i++) {
      const pts = rest[i].pts
      const dH = Math.hypot(tail.x - pts[0].x,    tail.y - pts[0].y)
      const dT = Math.hypot(tail.x - pts.at(-1).x, tail.y - pts.at(-1).y)

      if (dH < 4) { chain.push(pts); rest.splice(i, 1); matched = true; break }
      if (dT < 4) { chain.push([...pts].reverse()); rest.splice(i, 1); matched = true; break }
    }
    if (!matched) { for (const w of rest) chain.push(w.pts); break }
  }

  const pts = chain.flat()
  if (pts.length < 3) return null

  return pts.map((p, i) =>
    `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`
  ).join(' ') + ' Z'
}

// ── Estilos visuales ─────────────────────────────────────────────────────────
const HW_STYLES = {
  trunk:         { stroke: '#B71C1C', width: 4.5, label: true,  z: 7 },
  primary:       { stroke: '#C2185B', width: 3.5, label: true,  z: 6 },
  secondary:     { stroke: '#c87090', width: 2.5, label: true,  z: 5 },
  tertiary:      { stroke: '#d898b8', width: 1.5, label: false, z: 4 },
  residential:   { stroke: '#e0a0c0', width: 1.2, label: false, z: 3 },
  unclassified:  { stroke: '#e0a0c0', width: 1.0, label: false, z: 3 },
  living_street: { stroke: '#e8b8d0', width: 0.8, label: false, z: 2 },
}
const HW_ORDER = ['living_street','unclassified','residential','tertiary','secondary','primary','trunk']

// ── Proyección lineal ─────────────────────────────────────────────────────────
const SVG_W = 500, SVG_H = 400

function makeProject({ south, west, north, east }) {
  return (lat, lng) => ({
    x: ((lng - west)  / (east  - west))  * SVG_W,
    y: ((north - lat) / (north - south)) * SVG_H,
  })
}

function toPath(pts) {
  return pts?.length
    ? pts.map((p, i) => `${i===0?'M':'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
    : ''
}
function midPt(pts) { return pts[Math.floor(pts.length / 2)] ?? pts[0] }
function labelAngle(pts) {
  if (pts.length < 2) return 0
  const i = Math.floor(pts.length / 2)
  const a = pts[Math.max(0, i-1)], b = pts[Math.min(pts.length-1, i+1)]
  let a2 = Math.atan2(b.y-a.y, b.x-a.x) * (180/Math.PI)
  if (a2 > 90) a2 -= 180; if (a2 < -90) a2 += 180
  return a2
}

// ── Componente ───────────────────────────────────────────────────────────────
export default function MapaBarrioOSM({
  plazas = [], barrio = '', barrioId = '',
  boundingBox, colorPrimario = '#C2185B', onSelectPlaza,
}) {
  const [osm, setOsm]           = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const project    = useMemo(() => makeProject(boundingBox), [boundingBox])
  const osmNombre  = OSM_NOMBRE[barrioId] ?? barrio
  const clipId     = `clip-${barrioId}`
  const maskId     = `mask-${barrioId}`

  useEffect(() => {
    let cancelled = false
    setLoading(true); setError(null)

    // ── Dos queries en paralelo ───────────────────────────────────────────
    Promise.allSettled([
      runQuery(qCalles(boundingBox)),
      runQuery(qBoundary(boundingBox, osmNombre)),
    ]).then(([callesRes, boundaryRes]) => {
      if (cancelled) return

      // Procesar calles
      const streets = [], greens = []
      if (callesRes.status === 'fulfilled') {
        for (const el of (callesRes.value.elements ?? [])) {
          if (el.type !== 'way' || !el.geometry?.length) continue
          const pts = el.geometry.map(g => project(g.lat, g.lon))
          if (el.tags?.highway) {
            const style = HW_STYLES[el.tags.highway]
            if (style) streets.push({ id: el.id, pts, tags: el.tags, style })
          } else {
            greens.push({ id: el.id, pts, tags: el.tags })
          }
        }
        streets.sort((a, b) => (a.style.z ?? 0) - (b.style.z ?? 0))
      }

      // Procesar boundary
      const boundaryPath = boundaryRes.status === 'fulfilled'
        ? buildBoundaryPath(boundaryRes.value, project)
        : null

      setOsm({ streets, greens, boundaryPath })
      setLoading(false)

      // Si calles fallaron, mostrar error suave
      if (callesRes.status !== 'fulfilled') {
        setError('No se pudieron cargar las calles. Intentá de nuevo.')
      }
    })

    return () => { cancelled = true }
  }, [boundingBox, osmNombre, project])

  const projPlazas = useMemo(
    () => plazas.map(p => ({ ...p, pos: project(p.lat, p.lng) })),
    [plazas, project]
  )

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-2xl mx-auto"
      role="img" aria-label={`Mapa de ${barrio} — OpenStreetMap`}>

      {/* ── Fondo exterior (zona fuera del barrio) ── */}
      <rect width={SVG_W} height={SVG_H} fill="#ecdce6" rx="4" />

      {/* ── Loading ── */}
      {loading && (
        <>
          <rect width={SVG_W} height={SVG_H} fill="#fdf0f5" rx="4" />
          <text x={SVG_W/2} y={SVG_H/2-10} textAnchor="middle"
            fill="#d88aaa" fontSize="13" fontFamily="'Lora',Georgia,serif">
            Cargando {barrio}…
          </text>
          <text x={SVG_W/2} y={SVG_H/2+10} textAnchor="middle"
            fill="#e2829a" fontSize="9" fontFamily="'Lora',Georgia,serif">
            Conectando con OpenStreetMap
          </text>
        </>
      )}

      {/* ── Contenido del mapa ── */}
      {!loading && osm && (
        <>
          <defs>
            {osm.boundaryPath && (
              <>
                <clipPath id={clipId}>
                  <path d={osm.boundaryPath} />
                </clipPath>
                <mask id={maskId}>
                  <rect width={SVG_W} height={SVG_H} fill="white" />
                  <path d={osm.boundaryPath} fill="black" />
                </mask>
              </>
            )}
          </defs>

          {/* Fondo interior del barrio */}
          {osm.boundaryPath
            ? <path d={osm.boundaryPath} fill="#fdf0f5" />
            : <rect width={SVG_W} height={SVG_H} fill="#fdf0f5" rx="4" />
          }

          {/* Calles + plazas recortadas al polígono del barrio */}
          <g clipPath={osm.boundaryPath ? `url(#${clipId})` : undefined}>
            {/* Espacios verdes */}
            {osm.greens.map(g => (
              <path key={g.id} d={toPath(g.pts)+' Z'}
                fill="#c8e6c9" fillOpacity="0.55"
                stroke="#a5d6a7" strokeWidth="0.5" />
            ))}

            {/* Calles por z-order (finas debajo, avenidas encima) */}
            {HW_ORDER.map(hw =>
              osm.streets.filter(s => s.tags.highway === hw).map(s => {
                const { stroke, width, label } = s.style
                const mid = midPt(s.pts)
                const ang = labelAngle(s.pts)
                return (
                  <g key={s.id}>
                    <path d={toPath(s.pts)} fill="none"
                      stroke={stroke} strokeWidth={width}
                      strokeLinecap="round" strokeLinejoin="round" />
                    {label && s.tags?.name && mid && (
                      <text x={mid.x.toFixed(1)} y={mid.y.toFixed(1)}
                        fontSize="6" fill={stroke} textAnchor="middle"
                        fontFamily="'Lora',Georgia,serif"
                        transform={`rotate(${ang.toFixed(1)},${mid.x.toFixed(1)},${mid.y.toFixed(1)})`}
                        paintOrder="stroke" stroke="white" strokeWidth="2.5"
                        strokeLinejoin="round"
                        className="select-none pointer-events-none">
                        {s.tags.name}
                      </text>
                    )}
                  </g>
                )
              })
            )}

            {/* Marcadores de plazas */}
            {projPlazas.map(p => (
              <g key={p.id} onClick={() => onSelectPlaza?.(p)}
                role="button"
                aria-label={`${p.nombre}${p.visitada?' — visitada':' — por visitar'}`}
                className="plaza-marker">
                <circle cx={p.pos.x} cy={p.pos.y} r="22" fill="transparent" />
                <circle cx={p.pos.x} cy={p.pos.y} r="14"
                  fill={p.visitada ? '#22c55e' : '#9ca3af'} opacity="0.18" />
                <circle cx={p.pos.x} cy={p.pos.y} r="9"
                  fill={p.visitada ? '#22c55e' : '#9ca3af'}
                  stroke="white" strokeWidth="2" />
                {p.visitada && (
                  <text x={p.pos.x+9} y={p.pos.y-7} fontSize="9" textAnchor="middle"
                    className="select-none pointer-events-none">▶</text>
                )}
                <text x={p.pos.x} y={p.pos.y+23} fontSize="7.5" fontWeight="600"
                  fill="white" stroke="white" strokeWidth="3" strokeLinejoin="round"
                  textAnchor="middle" paintOrder="stroke"
                  fontFamily="'Lora',Georgia,serif"
                  className="select-none pointer-events-none">
                  {p.nombre}
                </text>
                <text x={p.pos.x} y={p.pos.y+23} fontSize="7.5" fontWeight="600"
                  fill="#1c1917" textAnchor="middle"
                  fontFamily="'Lora',Georgia,serif"
                  className="select-none pointer-events-none">
                  {p.nombre}
                </text>
              </g>
            ))}
          </g>

          {/* Sombra exterior del barrio */}
          {osm.boundaryPath && (
            <rect width={SVG_W} height={SVG_H}
              fill="rgba(130,80,100,0.15)"
              mask={`url(#${maskId})`} />
          )}

          {/* Borde del polígono del barrio */}
          {osm.boundaryPath && (
            <path d={osm.boundaryPath} fill="none"
              stroke={colorPrimario} strokeWidth="2.5"
              strokeLinejoin="round" opacity="0.85" />
          )}
        </>
      )}

      {/* ── Error suave (solo cuando calles fallan) ── */}
      {!loading && error && !osm?.streets?.length && (
        <text x={SVG_W/2} y={SVG_H-20} textAnchor="middle"
          fill="#ef5350" fontSize="9" fontFamily="'Lora',Georgia,serif">
          {error}
        </text>
      )}

      {/* Borde del SVG */}
      <rect x="2" y="2" width={SVG_W-4} height={SVG_H-4}
        fill="none" stroke="#C4B49A" strokeWidth="1" rx="4" />
    </svg>
  )
}

/**
 * MapaBarrioOSM.jsx
 * Mapa SVG estilizado desde OpenStreetMap (Overpass API).
 * Incluye recorte exacto al polígono del barrio (relation administrativa OSM).
 */

import { useState, useEffect, useMemo } from 'react'

// ── Nombre OSM de cada barrio ───────────────────────────────────────────────
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

function buildQuery({ south, west, north, east }, osmNombre) {
  const box = `${south},${west},${north},${east}`
  return `[out:json][timeout:30];(` +
    // Polígono del barrio (relation administrativa)
    `relation["name"="${osmNombre}"]["boundary"="administrative"](${box});` +
    // Calles
    `way["highway"~"^(trunk|primary|secondary|tertiary|residential|unclassified|living_street)$"](${box});` +
    // Espacios verdes
    `way["leisure"~"^(park|garden|recreation_ground)$"](${box});` +
    `way["landuse"~"^(grass|recreation_ground)$"](${box});` +
    `);out geom;`
}

async function fetchOverpass(bbox, osmNombre) {
  const query = buildQuery(bbox, osmNombre)
  const body = `data=${encodeURIComponent(query)}`
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) continue
      return await res.json()
    } catch { /* next endpoint */ }
  }
  throw new Error('No se pudo conectar con OpenStreetMap.')
}

// ── Proyección lineal ───────────────────────────────────────────────────────
const SVG_W = 500
const SVG_H = 400

function makeProject({ south, west, north, east }) {
  return (lat, lng) => ({
    x: ((lng - west)  / (east  - west))  * SVG_W,
    y: ((north - lat) / (north - south)) * SVG_H,
  })
}

// ── Estilos por tipo de calle ───────────────────────────────────────────────
const HW_STYLES = {
  trunk:         { stroke: '#C2185B', width: 4,   label: true,  z: 7 },
  primary:       { stroke: '#C2185B', width: 3.5, label: true,  z: 6 },
  secondary:     { stroke: '#d88aaa', width: 2.5, label: true,  z: 5 },
  tertiary:      { stroke: '#e8a8c0', width: 1.5, label: false, z: 4 },
  residential:   { stroke: '#f0c8d8', width: 1,   label: false, z: 3 },
  unclassified:  { stroke: '#f0c8d8', width: 1,   label: false, z: 3 },
  living_street: { stroke: '#f4d4e4', width: 0.8, label: false, z: 2 },
}
const HW_ORDER = ['living_street','unclassified','residential','tertiary','secondary','primary','trunk']

// ── Ensambla el polígono del barrio desde los members de la relation ─────────
function assembleBoundary(relation, project) {
  if (!relation?.members) return null

  // Tomar solo los ways "outer" que tienen geometría inline
  const outerWays = relation.members
    .filter(m => m.type === 'way' && m.role !== 'inner' && m.geometry?.length)
    .map(m => ({ id: m.ref, pts: m.geometry.map(g => project(g.lat, g.lon)) }))

  if (!outerWays.length) return null

  // Encadenar los segmentos por proximidad de extremos
  const chain = [outerWays[0].pts]
  const remaining = outerWays.slice(1)

  while (remaining.length > 0) {
    const last = chain[chain.length - 1]
    const tail = last[last.length - 1]
    let matched = false

    for (let i = 0; i < remaining.length; i++) {
      const way = remaining[i]
      const head = way.pts[0]
      const end  = way.pts[way.pts.length - 1]
      const dHead = Math.hypot(tail.x - head.x, tail.y - head.y)
      const dEnd  = Math.hypot(tail.x - end.x,  tail.y - end.y)

      if (dHead < 3) {
        chain.push(way.pts)
        remaining.splice(i, 1)
        matched = true; break
      } else if (dEnd < 3) {
        chain.push([...way.pts].reverse())
        remaining.splice(i, 1)
        matched = true; break
      }
    }

    if (!matched) {
      // Agregar el resto sin cadena (polígonos compuestos)
      for (const w of remaining) chain.push(w.pts)
      break
    }
  }

  const pts = chain.flat()
  if (pts.length < 3) return null

  return pts.map((p, i) =>
    `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`
  ).join(' ') + ' Z'
}

// ── Helpers SVG ─────────────────────────────────────────────────────────────
function toPath(pts) {
  if (!pts?.length) return ''
  return pts.map((p, i) => `${i===0?'M':'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}
function midPt(pts) { return pts[Math.floor(pts.length / 2)] ?? pts[0] }
function labelAngle(pts) {
  if (pts.length < 2) return 0
  const i = Math.floor(pts.length / 2)
  const a = pts[Math.max(0, i-1)], b = pts[Math.min(pts.length-1, i+1)]
  let ang = Math.atan2(b.y-a.y, b.x-a.x) * (180/Math.PI)
  if (ang > 90)  ang -= 180
  if (ang < -90) ang += 180
  return ang
}

// ── Componente ───────────────────────────────────────────────────────────────
export default function MapaBarrioOSM({
  plazas = [],
  barrio = '',   // nombre del barrio (también se usa como key de OSM_NOMBRE)
  barrioId = '',
  boundingBox,
  colorPrimario = '#C2185B',
  onSelectPlaza,
}) {
  const [osm, setOsm]         = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const project = useMemo(() => makeProject(boundingBox), [boundingBox])

  const osmNombre = OSM_NOMBRE[barrioId] ?? barrio

  useEffect(() => {
    let cancelled = false
    setLoading(true); setError(null)

    fetchOverpass(boundingBox, osmNombre)
      .then(data => {
        if (cancelled) return

        let boundaryPath = null
        const streets = [], greens = []

        for (const el of (data.elements ?? [])) {
          if (el.type === 'relation') {
            // Intentar ensamblar el polígono del barrio
            boundaryPath = assembleBoundary(el, project)
          } else if (el.type === 'way' && el.geometry?.length) {
            const pts = el.geometry.map(g => project(g.lat, g.lon))
            if (el.tags?.highway) {
              const style = HW_STYLES[el.tags.highway]
              if (style) streets.push({ id: el.id, pts, tags: el.tags, style })
            } else {
              greens.push({ id: el.id, pts, tags: el.tags })
            }
          }
        }

        streets.sort((a, b) => (a.style.z ?? 0) - (b.style.z ?? 0))
        setOsm({ boundaryPath, streets, greens })
        setLoading(false)
      })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false) } })

    return () => { cancelled = true }
  }, [boundingBox, osmNombre, project])

  const projPlazas = useMemo(
    () => plazas.map(p => ({ ...p, pos: project(p.lat, p.lng) })),
    [plazas, project]
  )

  const clipId   = `clip-${osmNombre.replace(/\s/g, '-')}`
  const maskId   = `mask-${osmNombre.replace(/\s/g, '-')}`

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label={`Mapa de ${barrio} — OpenStreetMap`}
    >
      {/* ── Fondo base ── */}
      <rect width={SVG_W} height={SVG_H} fill="#f5e8ee" rx="4" />

      {/* ── Loading ── */}
      {loading && (
        <>
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

      {/* ── Error ── */}
      {!loading && error && (
        <text x={SVG_W/2} y={SVG_H/2} textAnchor="middle"
          fill="#ef5350" fontSize="10" fontFamily="'Lora',Georgia,serif">
          {error}
        </text>
      )}

      {/* ── Mapa ── */}
      {!loading && !error && osm && (
        <>
          <defs>
            {/* ClipPath: recorta calles al polígono del barrio */}
            {osm.boundaryPath && (
              <clipPath id={clipId}>
                <path d={osm.boundaryPath} />
              </clipPath>
            )}

            {/* Mask para oscurecer el exterior */}
            {osm.boundaryPath && (
              <mask id={maskId}>
                <rect width={SVG_W} height={SVG_H} fill="white" />
                <path d={osm.boundaryPath} fill="black" />
              </mask>
            )}
          </defs>

          {/* Fondo interior del barrio (más claro) */}
          {osm.boundaryPath && (
            <path d={osm.boundaryPath} fill="#fdf0f5" />
          )}

          {/* Contenido recortado al polígono */}
          <g clipPath={osm.boundaryPath ? `url(#${clipId})` : undefined}>
            {/* Espacios verdes */}
            {osm.greens.map(g => (
              <path key={g.id} d={toPath(g.pts)+' Z'}
                fill="#c8e6c9" fillOpacity="0.55" stroke="#a5d6a7" strokeWidth="0.5" />
            ))}

            {/* Calles por z-order */}
            {HW_ORDER.map(hw =>
              osm.streets
                .filter(s => s.tags.highway === hw)
                .map(s => {
                  const { stroke, width, label } = s.style
                  const mid = midPt(s.pts)
                  const ang = labelAngle(s.pts)
                  return (
                    <g key={s.id}>
                      <path d={toPath(s.pts)} fill="none"
                        stroke={stroke} strokeWidth={width}
                        strokeLinecap="round" strokeLinejoin="round" />
                      {label && s.tags?.name && mid && (
                        <text
                          x={mid.x.toFixed(1)} y={mid.y.toFixed(1)}
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

            {/* Plazas */}
            {projPlazas.map(p => (
              <g key={p.id}
                onClick={() => onSelectPlaza?.(p)}
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

          {/* Sombra exterior (área fuera del barrio) */}
          {osm.boundaryPath && (
            <rect width={SVG_W} height={SVG_H}
              fill="rgba(150,100,120,0.12)"
              mask={`url(#${maskId})`} />
          )}

          {/* Borde del barrio */}
          {osm.boundaryPath && (
            <path d={osm.boundaryPath}
              fill="none"
              stroke={colorPrimario}
              strokeWidth="2"
              strokeLinejoin="round"
              opacity="0.8" />
          )}
        </>
      )}

      {/* ── Borde SVG ── */}
      <rect x="2" y="2" width={SVG_W-4} height={SVG_H-4}
        fill="none" stroke="#C4B49A" strokeWidth="1" rx="4" />
    </svg>
  )
}

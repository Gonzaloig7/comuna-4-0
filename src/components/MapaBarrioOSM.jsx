/**
 * MapaBarrioOSM.jsx
 * Mapa SVG estilizado generado desde datos reales de OpenStreetMap (Overpass API).
 * Sin librerías de mapas — SVG nativo + fetch.
 *
 * Props:
 *   plazas      — [{ id, nombre, lat, lng, visitada, descripcion, videos }]
 *   barrio      — string  (nombre del barrio para labels)
 *   boundingBox — { south, west, north, east }
 *   colorPrimario — hex color del barrio (default #C2185B)
 *   onSelectPlaza — callback(plaza) al hacer click
 */

import { useState, useEffect, useCallback, useMemo } from 'react'

// ── Overpass API (2 endpoints como fallback) ────────────────────────────────
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
]

function buildQuery({ south, west, north, east }) {
  const box = `${south},${west},${north},${east}`
  return `[out:json][timeout:30];(way["highway"~"^(trunk|primary|secondary|tertiary|residential|unclassified|living_street)$"](${box});way["leisure"~"^(park|garden|recreation_ground)$"](${box});way["landuse"~"^(grass|recreation_ground)$"](${box}););out geom;`
}

async function fetchOverpass(bbox) {
  const query = buildQuery(bbox)
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
    } catch {
      // try next endpoint
    }
  }
  throw new Error('No se pudo conectar con OpenStreetMap. Intentá de nuevo.')
}

// ── Estilos visuales por tipo de calle ─────────────────────────────────────
const HW_STYLES = {
  trunk:         { stroke: '#C2185B', width: 4.5, label: true,  z: 7 },
  primary:       { stroke: '#C2185B', width: 3.5, label: true,  z: 6 },
  secondary:     { stroke: '#d88aaa', width: 2.5, label: true,  z: 5 },
  tertiary:      { stroke: '#e8a8c0', width: 1.5, label: false, z: 4 },
  residential:   { stroke: '#f0c8d8', width: 1.0, label: false, z: 3 },
  unclassified:  { stroke: '#f0c8d8', width: 1.0, label: false, z: 3 },
  living_street: { stroke: '#f4d4e4', width: 0.8, label: false, z: 2 },
}

const HW_ORDER = [
  'living_street', 'unclassified', 'residential',
  'tertiary', 'secondary', 'primary', 'trunk',
]

// ── Proyección lineal lat/lng → SVG ────────────────────────────────────────
const SVG_W = 500
const SVG_H = 400

function makeProject({ south, west, north, east }) {
  return (lat, lng) => ({
    x: ((lng - west)  / (east  - west))  * SVG_W,
    y: ((north - lat) / (north - south)) * SVG_H,
  })
}

// Convierte array de puntos SVG a un atributo "d" de <path>
function toPath(pts) {
  if (!pts?.length) return ''
  return pts.map((p, i) =>
    `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`
  ).join(' ')
}

// Punto medio de un polyline (para labels)
function midPt(pts) {
  return pts[Math.floor(pts.length / 2)] ?? pts[0]
}

// Ángulo de rotación de texto siguiendo la dirección de la calle
function labelAngle(pts) {
  if (pts.length < 2) return 0
  const i = Math.floor(pts.length / 2)
  const a = pts[Math.max(0, i - 1)]
  const b = pts[Math.min(pts.length - 1, i + 1)]
  let ang = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI)
  // Mantener texto legible (no dado vuelta)
  if (ang > 90)  ang -= 180
  if (ang < -90) ang += 180
  return ang
}

// ── Componente principal ────────────────────────────────────────────────────
export default function MapaBarrioOSM({
  plazas = [],
  barrio = '',
  boundingBox,
  colorPrimario = '#C2185B',
  onSelectPlaza,
}) {
  const [osm, setOsm]       = useState(null)   // { streets, greens }
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Proyector estable (solo recalcula si cambia el bounding box)
  const project = useMemo(() => makeProject(boundingBox), [boundingBox])

  // Fetch al montar / cuando cambia el bounding box
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchOverpass(boundingBox)
      .then(data => {
        if (cancelled) return
        const streets = []
        const greens  = []

        for (const el of (data.elements ?? [])) {
          if (!el.geometry?.length) continue
          const pts = el.geometry.map(g => project(g.lat, g.lon))
          if (el.tags?.highway) {
            const style = HW_STYLES[el.tags.highway]
            if (style) streets.push({ id: el.id, pts, tags: el.tags, style })
          } else {
            greens.push({ id: el.id, pts, tags: el.tags })
          }
        }

        // Ordenar calles por z-index (las más finas primero, las avenidas encima)
        streets.sort((a, b) => (a.style.z ?? 0) - (b.style.z ?? 0))

        setOsm({ streets, greens })
        setLoading(false)
      })
      .catch(err => {
        if (!cancelled) { setError(err.message); setLoading(false) }
      })

    return () => { cancelled = true }
  }, [boundingBox, project])

  // Proyectar coordenadas de las plazas
  const projPlazas = useMemo(
    () => plazas.map(p => ({ ...p, pos: project(p.lat, p.lng) })),
    [plazas, project]
  )

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label={`Mapa de ${barrio} con calles reales de OpenStreetMap`}
    >
      {/* ── Fondo ── */}
      <rect width={SVG_W} height={SVG_H} fill="#fdf0f5" rx="4" />

      {/* ── Loading ── */}
      {loading && (
        <>
          <text x={SVG_W / 2} y={SVG_H / 2 - 10}
            textAnchor="middle" fill="#d88aaa" fontSize="13"
            fontFamily="'Lora',Georgia,serif">
            Cargando calles de {barrio}…
          </text>
          <text x={SVG_W / 2} y={SVG_H / 2 + 10}
            textAnchor="middle" fill="#e2829a" fontSize="9"
            fontFamily="'Lora',Georgia,serif">
            Conectando con OpenStreetMap
          </text>
        </>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <text x={SVG_W / 2} y={SVG_H / 2}
          textAnchor="middle" fill="#ef5350" fontSize="10"
          fontFamily="'Lora',Georgia,serif">
          {error}
        </text>
      )}

      {/* ── Mapa real ── */}
      {!loading && !error && osm && (
        <>
          {/* Espacios verdes */}
          {osm.greens.map(g => (
            <path key={g.id}
              d={toPath(g.pts) + ' Z'}
              fill="#c8e6c9" fillOpacity="0.5"
              stroke="#a5d6a7" strokeWidth="0.5" />
          ))}

          {/* Calles (ordenadas por z-index: finas debajo, avenidas encima) */}
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
                        className="select-none pointer-events-none"
                      >
                        {s.tags.name}
                      </text>
                    )}
                  </g>
                )
              })
          )}

          {/* Marcadores de plazas */}
          {projPlazas.map(p => (
            <g
              key={p.id}
              onClick={() => onSelectPlaza?.(p)}
              role="button"
              aria-label={`${p.nombre}${p.visitada ? ' — visitada' : ' — por visitar'}`}
              className="plaza-marker"
            >
              {/* Área táctil ampliada */}
              <circle cx={p.pos.x} cy={p.pos.y} r="22" fill="transparent" />
              {/* Halo */}
              <circle cx={p.pos.x} cy={p.pos.y} r="14"
                fill={p.visitada ? '#22c55e' : '#9ca3af'} opacity="0.18" />
              {/* Círculo principal */}
              <circle cx={p.pos.x} cy={p.pos.y} r="9"
                fill={p.visitada ? '#22c55e' : '#9ca3af'}
                stroke="white" strokeWidth="2" />
              {/* Ícono de video si fue visitada */}
              {p.visitada && (
                <text x={p.pos.x + 9} y={p.pos.y - 7}
                  fontSize="9" textAnchor="middle"
                  className="select-none pointer-events-none">▶</text>
              )}
              {/* Label con contorno blanco */}
              <text x={p.pos.x} y={p.pos.y + 23} fontSize="7.5" fontWeight="600"
                fill="white" stroke="white" strokeWidth="3" strokeLinejoin="round"
                textAnchor="middle" paintOrder="stroke"
                fontFamily="'Lora',Georgia,serif"
                className="select-none pointer-events-none">
                {p.nombre}
              </text>
              <text x={p.pos.x} y={p.pos.y + 23} fontSize="7.5" fontWeight="600"
                fill="#1c1917" textAnchor="middle"
                fontFamily="'Lora',Georgia,serif"
                className="select-none pointer-events-none">
                {p.nombre}
              </text>
            </g>
          ))}
        </>
      )}

      {/* ── Borde del mapa ── */}
      <rect x="2" y="2" width={SVG_W - 4} height={SVG_H - 4}
        fill="none" stroke="#C4B49A" strokeWidth="1" rx="4" />
    </svg>
  )
}

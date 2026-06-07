/**
 * MapaBarrioOSM.jsx
 * Mapa SVG desde datos pre-descargados de OpenStreetMap (sin fetch en runtime).
 * Calles, espacios verdes y polígonos de barrio cargados desde JSON locales.
 *
 * Props:
 *   plazas       — [{ id, nombre, lat, lng, visitada, descripcion }]
 *   barrio        — string (nombre para labels)
 *   barrioId      — string (key de los JSON de datos)
 *   boundingBox   — { south, west, north, east }
 *   colorPrimario — hex del barrio
 *   onSelectPlaza — callback(plaza)
 */

import { useMemo } from 'react'
import CALLES   from '../data/barrios-calles.json'
import POLIGONOS from '../data/barrios-poligonos.json'

// ── Proyección lineal ───────────────────────────────────────────────────────
const SVG_W = 500
const SVG_H = 400

function makeProject({ south, west, north, east }) {
  return (lat, lng) => ({
    x: ((lng - west)  / (east  - west))  * SVG_W,
    y: ((north - lat) / (north - south)) * SVG_H,
  })
}

// Polígono [lat,lng][] → path SVG
function buildPolyPath(polygon, project) {
  if (!polygon?.length) return null
  return polygon.map(([lat, lng], i) => {
    const { x, y } = project(lat, lng)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ') + ' Z'
}

// Polyline de puntos SVG → atributo "d"
function toPath(pts) {
  return pts.map((p, i) => `${i===0?'M':'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

function midPt(pts) { return pts[Math.floor(pts.length / 2)] ?? pts[0] }

function labelAngle(pts) {
  if (pts.length < 2) return 0
  const i = Math.floor(pts.length / 2)
  const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]
  let ang = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI)
  if (ang > 90) ang -= 180; if (ang < -90) ang += 180
  return ang
}

// ── Estilos visuales ─────────────────────────────────────────────────────────
const HW_STYLES = {
  trunk:         { stroke: '#B71C1C', width: 4,   label: true,  z: 8 },
  primary:       { stroke: '#C2185B', width: 3.5, label: true,  z: 7 },
  secondary:     { stroke: '#d88aaa', width: 2.5, label: true,  z: 6 },
  tertiary:      { stroke: '#e8a8c0', width: 1.5, label: false, z: 5 },
  residential:   { stroke: '#f0c8d8', width: 1.0, label: false, z: 4 },
  unclassified:  { stroke: '#f0c8d8', width: 1.0, label: false, z: 4 },
  living_street: { stroke: '#f4d4e4', width: 0.8, label: false, z: 3 },
  green:         { stroke: '#a5d6a7', width: 0,   label: false, z: 1, fill: '#c8e6c9' },
}

const HW_ORDER = ['living_street','unclassified','residential','tertiary','secondary','primary','trunk']

// ── Componente ───────────────────────────────────────────────────────────────
export default function MapaBarrioOSM({
  plazas = [],
  barrio = '',
  barrioId = '',
  boundingBox,
  colorPrimario = '#C2185B',
  onSelectPlaza,
}) {
  const project = useMemo(() => makeProject(boundingBox), [boundingBox])

  // Proyectar calles desde datos locales
  const { streets, greens } = useMemo(() => {
    const rawWays = CALLES[barrioId] ?? []
    const streets = [], greens = []

    for (const way of rawWays) {
      const pts = way.pts.map(([lat, lng]) => project(lat, lng))
      if (way.hw === 'green') {
        greens.push({ pts, name: way.name })
      } else {
        const style = HW_STYLES[way.hw]
        if (style) streets.push({ pts, hw: way.hw, name: way.name, style })
      }
    }

    streets.sort((a, b) => (a.style.z ?? 0) - (b.style.z ?? 0))
    return { streets, greens }
  }, [barrioId, project])

  // Polígono del barrio desde datos locales
  const boundaryPath = useMemo(
    () => buildPolyPath(POLIGONOS[barrioId], project),
    [barrioId, project]
  )

  // Proyectar plazas
  const projPlazas = useMemo(
    () => plazas.map(p => ({ ...p, pos: project(p.lat, p.lng) })),
    [plazas, project]
  )

  const clipId = `clip-${barrioId}`
  const maskId = `mask-${barrioId}`

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label={`Mapa de ${barrio} — OpenStreetMap`}
    >
      <defs>
        {boundaryPath && (
          <>
            <clipPath id={clipId}>
              <path d={boundaryPath} />
            </clipPath>
            <mask id={maskId}>
              <rect width={SVG_W} height={SVG_H} fill="white" />
              <path d={boundaryPath} fill="black" />
            </mask>
          </>
        )}
      </defs>

      {/* Fondo exterior */}
      <rect width={SVG_W} height={SVG_H} fill="#e8d8e0" rx="4" />

      {/* Fondo interior del barrio */}
      {boundaryPath
        ? <path d={boundaryPath} fill="#fdf0f5" />
        : <rect width={SVG_W} height={SVG_H} fill="#fdf0f5" rx="4" />
      }

      {/* Contenido recortado al barrio */}
      <g clipPath={boundaryPath ? `url(#${clipId})` : undefined}>

        {/* Espacios verdes */}
        {greens.map((g, i) => (
          <path key={i} d={toPath(g.pts) + ' Z'}
            fill="#c8e6c9" fillOpacity="0.55"
            stroke="#a5d6a7" strokeWidth="0.5" />
        ))}

        {/* Calles por z-order */}
        {HW_ORDER.map(hw =>
          streets.filter(s => s.hw === hw).map((s, i) => {
            const { stroke, width, label } = s.style
            const mid = midPt(s.pts)
            const ang = labelAngle(s.pts)
            return (
              <g key={`${hw}-${i}`}>
                <path d={toPath(s.pts)} fill="none"
                  stroke={stroke} strokeWidth={width}
                  strokeLinecap="round" strokeLinejoin="round" />
                {label && s.name && mid && (
                  <text
                    x={mid.x.toFixed(1)} y={mid.y.toFixed(1)}
                    fontSize="6" fill={stroke} textAnchor="middle"
                    fontFamily="'Lora',Georgia,serif"
                    transform={`rotate(${ang.toFixed(1)},${mid.x.toFixed(1)},${mid.y.toFixed(1)})`}
                    paintOrder="stroke" stroke="white" strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="select-none pointer-events-none">
                    {s.name}
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
            aria-label={`${p.nombre}${p.visitada ? ' — visitada' : ' — por visitar'}`}
            className="plaza-marker">
            <circle cx={p.pos.x} cy={p.pos.y} r="22" fill="transparent" />
            <circle cx={p.pos.x} cy={p.pos.y} r="14"
              fill={p.visitada ? '#22c55e' : '#9ca3af'} opacity="0.18" />
            <circle cx={p.pos.x} cy={p.pos.y} r="9"
              fill={p.visitada ? '#22c55e' : '#9ca3af'}
              stroke="white" strokeWidth="2" />
            {p.visitada && (
              <text x={p.pos.x + 9} y={p.pos.y - 7} fontSize="9" textAnchor="middle"
                className="select-none pointer-events-none">▶</text>
            )}
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
      </g>

      {/* Sombra exterior */}
      {boundaryPath && (
        <rect width={SVG_W} height={SVG_H}
          fill="rgba(120,60,90,0.12)"
          mask={`url(#${maskId})`} />
      )}

      {/* Borde del barrio */}
      {boundaryPath && (
        <path d={boundaryPath} fill="none"
          stroke={colorPrimario} strokeWidth="2"
          strokeLinejoin="round" opacity="0.8" />
      )}

      {/* Borde SVG */}
      <rect x="2" y="2" width={SVG_W - 4} height={SVG_H - 4}
        fill="none" stroke="#C4B49A" strokeWidth="1" rx="4" />
    </svg>
  )
}

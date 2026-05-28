import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../data/comuna4.json'

// Polígonos con bordes compartidos exactos. Riachuelo sigue el borde sur/este.
const BARRIOS_MAPA = [
  {
    id: 'parque-patricios',
    points: '50,35 470,35 470,195 50,195',
    labelX: 260,
    labelY: 110,
  },
  {
    id: 'la-boca',
    // Borde NE (Río de la Plata) + curva SE (Riachuelo) + borde NO compartido con Barracas
    points: '320,195 470,195 480,265 476,315 470,355 455,382 438,400 415,412 390,420 365,418 358,415 290,325',
    labelX: 400,
    labelY: 310,
  },
  {
    id: 'barracas',
    points: '140,195 320,195 290,325 358,415 320,420 285,422 255,422 242,420 195,418 140,408',
    labelX: 245,
    labelY: 308,
  },
  {
    id: 'nueva-pompeya',
    points: '50,195 140,195 140,408 115,418 75,422 50,422',
    labelX: 95,
    labelY: 308,
  },
]

export default function MapaComuna() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  const barrioMap = Object.fromEntries(data.barrios.map((b) => [b.id, b]))

  return (
    <svg
      viewBox="0 0 520 440"
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label="Mapa interactivo de la Comuna 4 — hacé click en un barrio para explorarlo"
    >
      <defs>
        {/* Borde "dibujado a mano" */}
        <filter id="hand-drawn" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Ligero desplazamiento para el agua */}
        <filter id="water-wobble" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* ── Río de la Plata / Riachuelo ────────────────────── */}
      {/* El path traza exactamente el borde exterior de los polígonos de barrio */}
      <path
        d="M 0,422 L 50,422 L 75,422 L 115,418 L 140,408
           L 195,418 L 242,420 L 255,422 L 285,422 L 320,420
           L 358,415 L 365,418 L 390,420 L 415,412 L 438,400
           L 455,382 L 470,355 L 476,315 L 480,265 L 470,195
           L 520,195 L 520,440 L 0,440 Z"
        fill="#89C9DD"
        opacity="0.60"
        filter="url(#water-wobble)"
      />
      <text x="240" y="433" fontSize="8" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora', Georgia, serif" fontStyle="italic">Riachuelo</text>
      <text x="502" y="240" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90, 502, 240)"
        fontFamily="'Lora', Georgia, serif" fontStyle="italic">Río de la Plata</text>

      {/* ── Barrios ──────────────────────────────────────── */}
      {BARRIOS_MAPA.map(({ id, points, labelX, labelY }) => {
        const barrio = barrioMap[id]
        const isHovered = hovered === id
        const visitadas = barrio.plazas.filter((p) => p.visitada).length

        return (
          <g
            key={id}
            className="barrio-region"
            onClick={() => navigate(`/barrio/${id}`)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            role="button"
            aria-label={`Explorar ${barrio.nombre}`}
          >
            <polygon
              points={points}
              fill={barrio.colorPrimario}
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
              opacity={isHovered ? 0.92 : 0.72}
              filter="url(#hand-drawn)"
            />
            <polygon
              points={points}
              fill="none"
              stroke={barrio.colorSecundario}
              strokeWidth={isHovered ? '2' : '0'}
              strokeLinejoin="round"
              opacity="0.8"
              filter="url(#hand-drawn)"
            />

            {/* Nombre — contorno negro + texto blanco */}
            <text x={labelX} y={labelY - 5} textAnchor="middle"
              fill="black" stroke="black" strokeWidth="4" fontSize={isHovered ? '15' : '13'}
              strokeLinejoin="round" className="select-none pointer-events-none"
              fontFamily="'Bebas Neue', Impact, sans-serif" letterSpacing="0.06em">
              {barrio.nombre.toUpperCase()}
            </text>
            <text x={labelX} y={labelY - 5} textAnchor="middle"
              fill="white" fontSize={isHovered ? '15' : '13'}
              className="select-none pointer-events-none"
              fontFamily="'Bebas Neue', Impact, sans-serif" letterSpacing="0.06em">
              {barrio.nombre.toUpperCase()}
            </text>

            {/* Conteo de plazas */}
            <text x={labelX} y={labelY + 11} textAnchor="middle"
              fill="black" stroke="black" strokeWidth="3" fontSize="8.5"
              strokeLinejoin="round" className="select-none pointer-events-none"
              fontFamily="'Lora', Georgia, serif">
              {visitadas}/{barrio.plazas.length} plazas
            </text>
            <text x={labelX} y={labelY + 11} textAnchor="middle"
              fill="white" fontSize="8.5" opacity="0.9"
              className="select-none pointer-events-none"
              fontFamily="'Lora', Georgia, serif">
              {visitadas}/{barrio.plazas.length} plazas
            </text>
          </g>
        )
      })}

      {/* ── Compás Norte ─────────────────────────────────── */}
      <g transform="translate(462, 52)">
        <circle cx="0" cy="0" r="13" fill="white" opacity="0.50" />
        <circle cx="0" cy="0" r="13" fill="none" stroke="#C4B49A" strokeWidth="0.8" />
        {/* Flecha Norte */}
        <polygon points="0,-11 -4,-3 0,-6 4,-3" fill="#6b5040" />
        {/* Flecha Sur */}
        <polygon points="0,11 -4,3 0,6 4,3" fill="#C4B49A" />
        <line x1="0" y1="-11" x2="0" y2="11" stroke="#C4B49A" strokeWidth="0.5" />
        <line x1="-11" y1="0" x2="11" y2="0" stroke="#C4B49A" strokeWidth="0.5" />
        <text x="0" y="-15" textAnchor="middle" fontSize="7.5" fill="#6b5040"
          fontFamily="'Bebas Neue', Impact, sans-serif">N</text>
      </g>

      {/* ── Marco decorativo ─────────────────────────────── */}
      <rect x="3" y="3" width="514" height="434" fill="none"
        stroke="#C4B49A" strokeWidth="1" rx="4" />
    </svg>
  )
}

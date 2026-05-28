import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../data/comuna4.json'

// TODO: reemplazar con SVG definitivo del diseñador
// Coordenadas en el sistema viewBox "0 0 520 440"
// Los polígonos encajan entre sí — los bordes compartidos usan los mismos puntos.
const BARRIOS_MAPA = [
  {
    id: 'parque-patricios',
    // Franja norte, de lado a lado
    points: '50,35 470,35 470,195 50,195',
    labelX: 260,
    labelY: 108,
  },
  {
    id: 'la-boca',
    // Esquina sureste, forma triangular (bordea el Riachuelo)
    points: '320,195 470,195 476,395 358,415 290,325',
    labelX: 393,
    labelY: 308,
  },
  {
    id: 'barracas',
    // Centro-sur, entre La Boca y Nueva Pompeya
    points: '140,195 320,195 290,325 358,415 242,420 140,408',
    labelX: 248,
    labelY: 318,
  },
  {
    id: 'nueva-pompeya',
    // Esquina suroeste
    points: '50,195 140,195 140,408 50,420',
    labelX: 95,
    labelY: 310,
  },
]

export default function MapaComuna() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  const barrioMap = Object.fromEntries(data.barrios.map((b) => [b.id, b]))

  return (
    // TODO: reemplazar con SVG definitivo del diseñador
    <svg
      viewBox="0 0 520 440"
      className="w-full max-w-xl mx-auto drop-shadow-sm"
      role="img"
      aria-label="Mapa interactivo de la Comuna 4 — hacé click en un barrio para explorarlo"
    >
      {/* ── Agua / Riachuelo ──────────────────────────────── */}
      <path
        d="M 0,408 Q 80,395 200,415 Q 330,432 476,405 L 520,410 L 520,440 L 0,440 Z"
        fill="#89C9DD"
        opacity="0.65"
      />
      <text
        x="400"
        y="433"
        fontSize="8"
        fill="#4A90A4"
        textAnchor="middle"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Riachuelo
      </text>

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
            {/* Polígono principal */}
            <polygon
              points={points}
              fill={barrio.colorPrimario}
              stroke="white"
              strokeWidth="2.5"
              strokeLinejoin="round"
              opacity={isHovered ? 0.93 : 0.76}
            />
            {/* Borde de acento (color secundario) al hacer hover */}
            <polygon
              points={points}
              fill="none"
              stroke={barrio.colorSecundario}
              strokeWidth={isHovered ? '2.5' : '0'}
              strokeLinejoin="round"
              opacity="0.7"
            />

            {/* Nombre del barrio — contorno para legibilidad */}
            <text
              x={labelX}
              y={labelY - 6}
              textAnchor="middle"
              fill="black"
              stroke="black"
              strokeWidth="4"
              fontSize={isHovered ? '14' : '12'}
              fontWeight="700"
              strokeLinejoin="round"
              className="select-none pointer-events-none"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {barrio.nombre}
            </text>
            <text
              x={labelX}
              y={labelY - 6}
              textAnchor="middle"
              fill="white"
              fontSize={isHovered ? '14' : '12'}
              fontWeight="700"
              className="select-none pointer-events-none"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {barrio.nombre}
            </text>

            {/* Conteo de plazas */}
            <text
              x={labelX}
              y={labelY + 10}
              textAnchor="middle"
              fill="white"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="2"
              fontSize="9"
              opacity="0.9"
              strokeLinejoin="round"
              className="select-none pointer-events-none"
            >
              {visitadas}/{barrio.plazas.length} plazas
            </text>
            <text
              x={labelX}
              y={labelY + 10}
              textAnchor="middle"
              fill="white"
              fontSize="9"
              opacity="0.9"
              className="select-none pointer-events-none"
            >
              {visitadas}/{barrio.plazas.length} plazas
            </text>
          </g>
        )
      })}

      {/* ── Marco decorativo ─────────────────────────────── */}
      <rect
        x="2"
        y="2"
        width="516"
        height="436"
        fill="none"
        stroke="#D6C9B4"
        strokeWidth="1"
        rx="6"
      />
    </svg>
  )
}

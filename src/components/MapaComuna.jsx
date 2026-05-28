import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../data/comuna4.json'

const BARRIOS_MAPA = [
  {
    id: 'parque-patricios',
    points: '50,35 470,35 470,195 50,195',
    labelX: 260,
    labelY: 108,
  },
  {
    id: 'la-boca',
    points: '320,195 470,195 476,395 358,415 290,325',
    labelX: 393,
    labelY: 308,
  },
  {
    id: 'barracas',
    points: '140,195 320,195 290,325 358,415 242,420 140,408',
    labelX: 248,
    labelY: 318,
  },
  {
    id: 'nueva-pompeya',
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
    <svg
      viewBox="0 0 520 440"
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label="Mapa interactivo de la Comuna 4 — hacé click en un barrio para explorarlo"
    >
      <defs>
        {/* Filtro de borde "dibujado a mano" */}
        <filter id="hand-drawn" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.022"
            numOctaves="3"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Textura de papel para relleno de polígonos */}
        <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ── Agua / Riachuelo ──────────────────────────────── */}
      <path
        d="M 0,408 Q 80,395 200,415 Q 330,432 476,405 L 520,410 L 520,440 L 0,440 Z"
        fill="#89C9DD"
        opacity="0.55"
        filter="url(#hand-drawn)"
      />
      <text
        x="400"
        y="434"
        fontSize="8"
        fill="#4A90A4"
        textAnchor="middle"
        fontFamily="'Lora', Georgia, serif"
        fontStyle="italic"
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
            {/* Polígono con borde dibujado a mano */}
            <polygon
              points={points}
              fill={barrio.colorPrimario}
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
              opacity={isHovered ? 0.92 : 0.72}
              filter="url(#hand-drawn)"
            />
            {/* Acento de color secundario al hacer hover */}
            <polygon
              points={points}
              fill="none"
              stroke={barrio.colorSecundario}
              strokeWidth={isHovered ? '2' : '0'}
              strokeLinejoin="round"
              opacity="0.8"
              filter="url(#hand-drawn)"
            />

            {/* Nombre en Bebas Neue — contorno negro + texto blanco */}
            <text
              x={labelX}
              y={labelY - 5}
              textAnchor="middle"
              fill="black"
              stroke="black"
              strokeWidth="4"
              fontSize={isHovered ? '15' : '13'}
              strokeLinejoin="round"
              className="select-none pointer-events-none"
              fontFamily="'Bebas Neue', Impact, sans-serif"
              letterSpacing="0.06em"
            >
              {barrio.nombre.toUpperCase()}
            </text>
            <text
              x={labelX}
              y={labelY - 5}
              textAnchor="middle"
              fill="white"
              fontSize={isHovered ? '15' : '13'}
              className="select-none pointer-events-none"
              fontFamily="'Bebas Neue', Impact, sans-serif"
              letterSpacing="0.06em"
            >
              {barrio.nombre.toUpperCase()}
            </text>

            {/* Conteo de plazas */}
            <text
              x={labelX}
              y={labelY + 11}
              textAnchor="middle"
              fill="black"
              stroke="black"
              strokeWidth="3"
              fontSize="8.5"
              strokeLinejoin="round"
              className="select-none pointer-events-none"
              fontFamily="'Lora', Georgia, serif"
            >
              {visitadas}/{barrio.plazas.length} plazas
            </text>
            <text
              x={labelX}
              y={labelY + 11}
              textAnchor="middle"
              fill="white"
              fontSize="8.5"
              opacity="0.9"
              className="select-none pointer-events-none"
              fontFamily="'Lora', Georgia, serif"
            >
              {visitadas}/{barrio.plazas.length} plazas
            </text>
          </g>
        )
      })}

      {/* ── Marco decorativo ─────────────────────────────── */}
      <rect
        x="3"
        y="3"
        width="514"
        height="434"
        fill="none"
        stroke="#C4B49A"
        strokeWidth="1"
        rx="4"
      />
    </svg>
  )
}

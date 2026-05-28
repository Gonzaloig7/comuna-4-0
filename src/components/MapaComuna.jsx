import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../data/comuna4.json'

// Polígonos a escala basados en la geografía real de la Comuna 4.
// Layout (norte arriba):
//   Parque Patricios → noroeste   (limita con San Cristóbal al norte, Barracas al este, NP al sur)
//   Nueva Pompeya   → suroeste   (debajo de PP, limita con Barracas al este, Riachuelo al sur)
//   Barracas        → centro     (el más grande, abarca todo el largo N-S)
//   La Boca         → noreste/este (barrio costero, Río de la Plata al este, Riachuelo al sur)
// Límite PP/NP – Barracas: línea vertical en x=192 (Av. Zavaleta → Amancio Alcorta)
// Límite Barracas – La Boca: diagonal (Av. Suárez/Olavarría/Almirante Brown)
const BARRIOS_MAPA = [
  {
    id: 'parque-patricios',
    // Rectángulo NO: x 28-192, y 28-240
    points: '28,28 192,28 192,240 28,240',
    labelX: 110,
    labelY: 134,
  },
  {
    id: 'nueva-pompeya',
    // SO, debajo de PP: x 28-192, y 240-412 + curva Riachuelo
    points: '28,240 192,240 192,412 166,419 126,421 80,421 28,419',
    labelX: 100,
    labelY: 340,
  },
  {
    id: 'barracas',
    // Centro (mayor barrio): x 192-385, y 28-412 + curva Riachuelo
    points: '192,28 385,28 390,170 384,308 372,380 344,406 310,416 280,420 250,420 220,418 200,414 192,412 192,28',
    labelX: 285,
    labelY: 215,
  },
  {
    id: 'la-boca',
    // Este costero: x 385-506, y 28-421 + costa Río de la Plata + Riachuelo
    points: '385,28 506,28 510,148 508,285 502,358 490,388 464,410 437,419 409,421 382,419 360,413 344,406 372,380 384,308 390,170 385,28',
    labelX: 440,
    labelY: 228,
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
      {/* Path traza exactamente el borde exterior de los 4 polígonos de barrio */}
      <path
        d="M 0,419
           L 28,419 L 80,421 L 126,421 L 166,419 L 192,412
           L 200,414 L 220,418 L 250,420 L 280,420 L 310,416 L 344,406
           L 360,413 L 382,419 L 409,421 L 437,419 L 464,410 L 490,388
           L 502,358 L 508,285 L 510,148 L 506,28
           L 520,28 L 520,440 L 0,440 Z"
        fill="#89C9DD"
        opacity="0.60"
        filter="url(#water-wobble)"
      />
      <text x="245" y="434" fontSize="8" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora', Georgia, serif" fontStyle="italic">Riachuelo</text>
      <text x="515" y="230" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90, 515, 230)"
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
      <g transform="translate(476, 52)">
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

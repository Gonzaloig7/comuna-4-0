import { useState } from 'react'
import PlazaModal from './PlazaModal.jsx'
import data from '../data/comuna4.json'

// Colores de estado de plaza
const COLOR_VISITADA = '#22c55e'
const COLOR_NO_VISITADA = '#9ca3af'

// ── Fondos SVG por barrio ────────────────────────────────
// TODO: reemplazar cada función con el SVG definitivo del diseñador.
// Todas usan viewBox "0 0 500 400".
// Para reemplazar: borrá el contenido de la función y pegá el SVG del diseñador
// dentro del <g> correspondiente. Las marcas de plazas se superponen automáticamente.

function LaBocaBackground() {
  return (
    <g>
      {/* Fondo */}
      <rect width="500" height="400" fill="#eef4ff" rx="4" />

      {/* Riachuelo / agua (sureste) */}
      <path
        d="M 370,295 Q 440,335 488,375 L 500,400 L 410,400 Q 390,380 360,340 Z"
        fill="#89C9DD"
        opacity="0.65"
      />
      <text x="448" y="390" fontSize="7" fill="#4A90A4" textAnchor="middle">
        Riachuelo
      </text>

      {/* Av. Paseo Colón — eje N-S, oeste */}
      <line x1="88" y1="18" x2="88" y2="375" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="88" y="11" fontSize="7.5" fill="#1C5BA8" textAnchor="middle">
        Av. Paseo Colón
      </text>

      {/* Av. Almirante Brown — diagonal NW→SE */}
      <line x1="88" y1="75" x2="390" y2="358" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text
        x="230"
        y="195"
        fontSize="7.5"
        fill="#1C5BA8"
        textAnchor="middle"
        transform="rotate(43, 230, 195)"
      >
        Av. Almirante Brown
      </text>

      {/* Av. Pedro de Mendoza — ribera sur */}
      <line x1="88" y1="358" x2="470" y2="372" stroke="#1C5BA8" strokeWidth="3" strokeLinecap="round" />
      <text x="280" y="351" fontSize="7.5" fill="#1C5BA8" textAnchor="middle">
        Av. Pedro de Mendoza
      </text>

      {/* Calles secundarias */}
      <line x1="88" y1="180" x2="310" y2="198" stroke="#b0c4de" strokeWidth="1.2" />
      <line x1="88" y1="270" x2="385" y2="295" stroke="#b0c4de" strokeWidth="1.2" />
      <line x1="195" y1="75" x2="195" y2="360" stroke="#b0c4de" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="305" y1="75" x2="305" y2="300" stroke="#b0c4de" strokeWidth="1" strokeDasharray="4,3" />
    </g>
  )
}

function BarracasBackground() {
  return (
    <g>
      {/* Fondo */}
      <rect width="500" height="400" fill="#fff0f7" rx="4" />

      {/* Av. Montes de Oca — N-S central */}
      <line x1="218" y1="18" x2="218" y2="388" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="218" y="11" fontSize="7.5" fill="#C2185B" textAnchor="middle">
        Av. Montes de Oca
      </text>

      {/* Av. Caseros — E-O norte */}
      <line x1="22" y1="128" x2="478" y2="128" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="380" y="120" fontSize="7.5" fill="#C2185B" textAnchor="middle">
        Av. Caseros
      </text>

      {/* Av. Regimiento de Patricios — N-S este */}
      <line x1="348" y1="18" x2="348" y2="388" stroke="#C2185B" strokeWidth="3" strokeLinecap="round" />
      <text x="348" y="11" fontSize="7.5" fill="#C2185B" textAnchor="middle">
        Av. Reg. de Patricios
      </text>

      {/* Av. Martín García — diagonal SO */}
      <line x1="22" y1="252" x2="218" y2="385" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
      <text
        x="92"
        y="345"
        fontSize="7.5"
        fill="#C2185B"
        textAnchor="middle"
        transform="rotate(32, 92, 345)"
      >
        Av. Martín García
      </text>

      {/* Calles secundarias */}
      <line x1="22" y1="230" x2="478" y2="230" stroke="#f48fb1" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="22" y1="315" x2="478" y2="315" stroke="#f48fb1" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="128" y1="18" x2="128" y2="388" stroke="#f48fb1" strokeWidth="1" strokeDasharray="4,3" />
    </g>
  )
}

function ParquePatriciosBackground() {
  return (
    <g>
      {/* Fondo */}
      <rect width="500" height="400" fill="#fff5f5" rx="4" />

      {/* Av. Caseros — E-O norte */}
      <line x1="22" y1="105" x2="478" y2="105" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="97" fontSize="7.5" fill="#B71C1C" textAnchor="middle">
        Av. Caseros
      </text>

      {/* Av. Chiclana — E-O centro */}
      <line x1="22" y1="228" x2="478" y2="228" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="220" fontSize="7.5" fill="#B71C1C" textAnchor="middle">
        Av. Chiclana
      </text>

      {/* Av. Centenera — N-S oeste */}
      <line x1="192" y1="18" x2="192" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="192" y="11" fontSize="7.5" fill="#B71C1C" textAnchor="middle">
        Av. Centenera
      </text>

      {/* Av. Colonia — N-S este */}
      <line x1="342" y1="18" x2="342" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="342" y="11" fontSize="7.5" fill="#B71C1C" textAnchor="middle">
        Av. Colonia
      </text>

      {/* Calles secundarias */}
      <line x1="22" y1="168" x2="478" y2="168" stroke="#ef9a9a" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="22" y1="310" x2="478" y2="310" stroke="#ef9a9a" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="98" y1="18" x2="98" y2="388" stroke="#ef9a9a" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="432" y1="18" x2="432" y2="388" stroke="#ef9a9a" strokeWidth="1" strokeDasharray="4,3" />
    </g>
  )
}

function NuevaPompeyaBackground() {
  return (
    <g>
      {/* Fondo */}
      <rect width="500" height="400" fill="#f5f5f5" rx="4" />

      {/* Riachuelo (sur) */}
      <path
        d="M 0,368 Q 120,382 280,375 Q 400,370 500,378 L 500,400 L 0,400 Z"
        fill="#89C9DD"
        opacity="0.6"
      />
      <text x="250" y="395" fontSize="7" fill="#4A90A4" textAnchor="middle">
        Riachuelo
      </text>

      {/* Av. Sáenz — E-O norte */}
      <line x1="22" y1="135" x2="478" y2="135" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="102" y="127" fontSize="7.5" fill="#424242" textAnchor="middle">
        Av. Sáenz
      </text>

      {/* Av. Cruz — E-O centro */}
      <line x1="22" y1="268" x2="478" y2="268" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="102" y="260" fontSize="7.5" fill="#424242" textAnchor="middle">
        Av. Cruz
      </text>

      {/* Av. Centenera — N-S oeste */}
      <line x1="188" y1="18" x2="188" y2="368" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <text x="188" y="11" fontSize="7.5" fill="#424242" textAnchor="middle">
        Av. Centenera
      </text>

      {/* Av. Osvaldo Cruz — N-S este */}
      <line x1="322" y1="18" x2="322" y2="368" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <text x="322" y="11" fontSize="7.5" fill="#424242" textAnchor="middle">
        Av. Osvaldo Cruz
      </text>

      {/* Calles secundarias */}
      <line x1="22" y1="200" x2="478" y2="200" stroke="#9e9e9e" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="102" y1="18" x2="102" y2="368" stroke="#9e9e9e" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="432" y1="18" x2="432" y2="368" stroke="#9e9e9e" strokeWidth="1" strokeDasharray="4,3" />
    </g>
  )
}

// Mapa de barrioId → componente de fondo
// Para agregar un barrio nuevo: añadí su función de fondo aquí y en el JSON.
const BACKGROUNDS = {
  'la-boca': LaBocaBackground,
  barracas: BarracasBackground,
  'parque-patricios': ParquePatriciosBackground,
  'nueva-pompeya': NuevaPompeyaBackground,
}

// Componente de marca de plaza (círculo + etiqueta)
function PlazaMarker({ plaza, onClick }) {
  return (
    <g
      className="plaza-marker"
      onClick={() => onClick(plaza)}
      role="button"
      aria-label={`${plaza.nombre}${plaza.visitada ? ' — visitada' : ' — por visitar'}`}
    >
      {/* Área táctil ampliada (44px de diámetro mínimo para mobile) */}
      <circle cx={plaza.svgX} cy={plaza.svgY} r="22" fill="transparent" />

      {/* Halo */}
      <circle
        cx={plaza.svgX}
        cy={plaza.svgY}
        r="14"
        fill={plaza.visitada ? COLOR_VISITADA : COLOR_NO_VISITADA}
        opacity="0.2"
      />

      {/* Círculo principal */}
      <circle
        cx={plaza.svgX}
        cy={plaza.svgY}
        r="9"
        fill={plaza.visitada ? COLOR_VISITADA : COLOR_NO_VISITADA}
        stroke="white"
        strokeWidth="2"
      />

      {/* Etiqueta — contorno para legibilidad sobre cualquier fondo */}
      <text
        x={plaza.svgX}
        y={plaza.svgY + 23}
        fontSize="7.5"
        fontWeight="600"
        fill="black"
        stroke="white"
        strokeWidth="3"
        strokeLinejoin="round"
        textAnchor="middle"
        paintOrder="stroke"
        className="select-none pointer-events-none"
      >
        {plaza.nombre}
      </text>
      <text
        x={plaza.svgX}
        y={plaza.svgY + 23}
        fontSize="7.5"
        fontWeight="600"
        fill="#1c1917"
        textAnchor="middle"
        className="select-none pointer-events-none"
      >
        {plaza.nombre}
      </text>

      {/* Indicador de visitada */}
      {plaza.visitada && (
        <text
          x={plaza.svgX + 8}
          y={plaza.svgY - 6}
          fontSize="8"
          textAnchor="middle"
          className="select-none pointer-events-none"
        >
          🎥
        </text>
      )}
    </g>
  )
}

// ── Componente principal ─────────────────────────────────
// Recibe el objeto barrio del JSON. Las plazas se renderizan
// dinámicamente — para agregar una plaza, solo editá el JSON.
export default function MapaBarrio({ barrio }) {
  const [plazaSeleccionada, setPlazaSeleccionada] = useState(null)
  const Background = BACKGROUNDS[barrio.id]

  return (
    <>
      {/* TODO: reemplazar con SVG definitivo del diseñador */}
      <svg
        viewBox="0 0 500 400"
        className="w-full max-w-2xl mx-auto drop-shadow-sm"
        role="img"
        aria-label={`Mapa de ${barrio.nombre} — tocá una plaza para ver información`}
      >
        {/* Capa 1: fondo (calles y avenidas) */}
        {Background && <Background />}

        {/* Capa 2: plazas (se genera dinámicamente desde el JSON) */}
        {barrio.plazas.map((plaza) => (
          <PlazaMarker
            key={plaza.id}
            plaza={plaza}
            onClick={setPlazaSeleccionada}
          />
        ))}

        {/* Marco decorativo */}
        <rect
          x="2"
          y="2"
          width="496"
          height="396"
          fill="none"
          stroke="#D6C9B4"
          strokeWidth="1"
          rx="4"
        />
      </svg>

      {/* Modal — se abre al tocar una plaza */}
      {plazaSeleccionada && (
        <PlazaModal
          plaza={plazaSeleccionada}
          formularioUrl={data.config.formularioReclamosUrl}
          onClose={() => setPlazaSeleccionada(null)}
        />
      )}
    </>
  )
}

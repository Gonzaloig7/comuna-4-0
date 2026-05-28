import { useState } from 'react'
import PlazaModal from './PlazaModal.jsx'
import data from '../data/comuna4.json'

const COLOR_VISITADA = '#22c55e'
const COLOR_NO_VISITADA = '#9ca3af'
const PAPEL = '#f5ede0'
const AGUA = '#89C9DD'

// ── La Boca ──────────────────────────────────────────────
// La Boca tiene una grilla rotada ~43° (alineada con el Almirante Brown).
// Las calles transversales son perpendiculares a Brown.
function LaBocaBackground() {
  return (
    <g>
      <rect width="500" height="400" fill="#eff4f9" rx="4" />

      {/* Riachuelo y curva SE */}
      <path
        d="M 372,348 Q 420,330 468,290 L 500,270 L 500,400 L 0,400 L 0,395 Z"
        fill={AGUA} opacity="0.55"
      />
      <text x="450" y="393" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* Puerto Madero / Río de la Plata (NE) */}
      <path d="M 470,15 L 500,15 L 500,270 L 468,290 L 470,220 L 472,150 L 470,15 Z"
        fill={AGUA} opacity="0.40" />
      <text x="487" y="155" fontSize="6.5" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90,487,155)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Puerto Madero</text>

      {/* ── Calles transversales (perpendiculares a Brown, ángulo ~-47°) ── */}
      {/* Dr. del Valle Iberlucea */}
      <line x1="295" y1="18" x2="88" y2="228" stroke="#b8cfe8" strokeWidth="1.3" />
      <text x="198" y="116" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-47,198,116)" fontFamily="'Lora',Georgia,serif">Dr. del Valle Iberlucea</text>

      {/* Brandsen */}
      <line x1="356" y1="55" x2="88" y2="340" stroke="#b8cfe8" strokeWidth="1.3" />
      <text x="230" y="196" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-47,230,196)" fontFamily="'Lora',Georgia,serif">Brandsen</text>

      {/* Suárez */}
      <line x1="415" y1="112" x2="148" y2="396" stroke="#b8cfe8" strokeWidth="1.3" />
      <text x="296" y="268" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-47,296,268)" fontFamily="'Lora',Georgia,serif">Suárez</text>

      {/* Olavarría (secundaria, punteada) */}
      <line x1="460" y1="162" x2="204" y2="397" stroke="#b8cfe8" strokeWidth="1"
        strokeDasharray="3,2" />

      {/* ── Avenidas principales ── */}
      {/* Av. Paseo Colón */}
      <line x1="88" y1="15" x2="88" y2="372" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="88" y="9" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Paseo Colón</text>

      {/* Av. Almirante Brown */}
      <line x1="88" y1="75" x2="390" y2="355" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="224" y="196" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        transform="rotate(43,224,196)" fontFamily="'Lora',Georgia,serif">Av. Almirante Brown</text>

      {/* Av. Pedro de Mendoza */}
      <line x1="88" y1="354" x2="468" y2="368" stroke="#1C5BA8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="278" y="346" fontSize="6.5" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Pedro de Mendoza</text>

      {/* ── Landmark: La Bombonera ── */}
      <rect x="182" y="167" width="24" height="18" fill="#1C5BA8" opacity="0.20" rx="2" />
      <text x="194" y="193" fontSize="5.5" fill="#1C5BA8" opacity="0.65" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">La Bombonera</text>
    </g>
  )
}

// ── Barracas ─────────────────────────────────────────────
function BarracasBackground() {
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f5" rx="4" />

      {/* Riachuelo (sur) */}
      <path d="M 0,372 Q 90,362 180,368 Q 270,374 360,370 Q 420,366 500,372 L 500,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="250" y="394" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Calles secundarias ── */}
      <line x1="22" y1="168" x2="478" y2="168" stroke="#f4c4d5" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="22" y1="230" x2="478" y2="230" stroke="#f4c4d5" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="22" y1="310" x2="478" y2="310" stroke="#f4c4d5" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="128" y1="18" x2="128" y2="370" stroke="#f4c4d5" strokeWidth="1" strokeDasharray="4,3" />

      {/* ── Avenidas secundarias ── */}
      {/* Av. Vélez Sársfield */}
      <line x1="438" y1="18" x2="438" y2="370" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="438" y="11" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Vélez Sársfield</text>

      {/* Av. Gral. Tomás de Iriarte */}
      <line x1="22" y1="348" x2="478" y2="348" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="355" y="340" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Gral. T. de Iriarte</text>

      {/* ── Avenidas principales ── */}
      {/* Av. Montes de Oca */}
      <line x1="218" y1="18" x2="218" y2="370" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="218" y="11" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Montes de Oca</text>

      {/* Av. Caseros */}
      <line x1="22" y1="128" x2="478" y2="128" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="380" y="120" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      {/* Av. Regimiento de Patricios */}
      <line x1="348" y1="18" x2="348" y2="370" stroke="#C2185B" strokeWidth="3" strokeLinecap="round" />
      <text x="348" y="11" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Reg. de Patricios</text>

      {/* Av. Martín García (diagonal SO) */}
      <line x1="22" y1="252" x2="218" y2="385" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
      <text x="96" y="344" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        transform="rotate(32,96,344)" fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
    </g>
  )
}

// ── Parque Patricios ─────────────────────────────────────
function ParquePatriciosBackground() {
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f0" rx="4" />

      {/* ── Calles secundarias ── */}
      <line x1="22" y1="165" x2="478" y2="165" stroke="#f5a8a8" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="22" y1="285" x2="478" y2="285" stroke="#f5a8a8" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="98" y1="18" x2="98" y2="388" stroke="#f5a8a8" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="268" y1="18" x2="268" y2="388" stroke="#f5a8a8" strokeWidth="1" strokeDasharray="4,3" />

      {/* ── Área verde: Parque de los Patricios ── */}
      <rect x="180" y="108" width="150" height="72" fill="#86efac" opacity="0.40" rx="4" />
      <text x="255" y="150" fontSize="7" fill="#15803d" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Parque de los Patricios</text>

      {/* ── Avenidas secundarias ── */}
      {/* Av. Amancio Alcorta */}
      <line x1="432" y1="18" x2="432" y2="388" stroke="#e57373" strokeWidth="2" strokeLinecap="round" />
      <text x="432" y="11" fontSize="6.5" fill="#B71C1C" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>

      {/* ── Avenidas principales ── */}
      {/* Av. Caseros */}
      <line x1="22" y1="105" x2="478" y2="105" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="97" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      {/* Av. Chiclana */}
      <line x1="22" y1="228" x2="478" y2="228" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="220" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Chiclana</text>

      {/* Av. Sáenz */}
      <line x1="22" y1="345" x2="478" y2="345" stroke="#B71C1C" strokeWidth="2.5" strokeLinecap="round" />
      <text x="118" y="337" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>

      {/* Av. Centenera */}
      <line x1="192" y1="18" x2="192" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="192" y="11" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Centenera</text>

      {/* Av. Colonia */}
      <line x1="342" y1="18" x2="342" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="342" y="11" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Colonia</text>

      {/* ── Landmark: Estadio de Huracán ── */}
      <ellipse cx="352" cy="342" rx="22" ry="17" fill="#B71C1C" opacity="0.18" />
      <text x="352" y="368" fontSize="5.5" fill="#B71C1C" opacity="0.70" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Est. Huracán</text>
    </g>
  )
}

// ── Nueva Pompeya ────────────────────────────────────────
function NuevaPompeyaBackground() {
  return (
    <g>
      <rect width="500" height="400" fill="#f5f3f0" rx="4" />

      {/* Riachuelo (sur) */}
      <path d="M 0,365 Q 120,355 260,360 Q 380,364 500,358 L 500,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="250" y="390" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Calles secundarias ── */}
      <line x1="22" y1="200" x2="478" y2="200" stroke="#bdbdbd" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="22" y1="332" x2="478" y2="332" stroke="#bdbdbd" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="102" y1="18" x2="102" y2="362" stroke="#bdbdbd" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="432" y1="18" x2="432" y2="362" stroke="#bdbdbd" strokeWidth="1" strokeDasharray="4,3" />

      {/* ── Avenidas secundarias ── */}
      {/* Av. Perito Moreno */}
      <line x1="22" y1="195" x2="478" y2="195" stroke="#757575" strokeWidth="2" strokeLinecap="round" />
      <text x="108" y="187" fontSize="6.5" fill="#424242" opacity="0.70" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Perito Moreno</text>

      {/* ── Avenidas principales ── */}
      {/* Av. Sáenz */}
      <line x1="22" y1="135" x2="478" y2="135" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="102" y="127" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>

      {/* Av. Cruz */}
      <line x1="22" y1="268" x2="478" y2="268" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="102" y="260" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Cruz</text>

      {/* Av. Centenera */}
      <line x1="188" y1="18" x2="188" y2="362" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <text x="188" y="11" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Centenera</text>

      {/* Av. Osvaldo Cruz */}
      <line x1="322" y1="18" x2="322" y2="362" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <text x="322" y="11" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Osvaldo Cruz</text>
    </g>
  )
}

const BACKGROUNDS = {
  'la-boca': LaBocaBackground,
  barracas: BarracasBackground,
  'parque-patricios': ParquePatriciosBackground,
  'nueva-pompeya': NuevaPompeyaBackground,
}

function PlazaMarker({ plaza, onClick }) {
  return (
    <g
      className="plaza-marker"
      onClick={() => onClick(plaza)}
      role="button"
      aria-label={`${plaza.nombre}${plaza.visitada ? ' — visitada' : ' — por visitar'}`}
    >
      {/* Área táctil ampliada */}
      <circle cx={plaza.svgX} cy={plaza.svgY} r="22" fill="transparent" />

      {/* Halo */}
      <circle cx={plaza.svgX} cy={plaza.svgY} r="14"
        fill={plaza.visitada ? COLOR_VISITADA : COLOR_NO_VISITADA} opacity="0.18" />

      {/* Círculo principal */}
      <circle cx={plaza.svgX} cy={plaza.svgY} r="9"
        fill={plaza.visitada ? COLOR_VISITADA : COLOR_NO_VISITADA}
        stroke="white" strokeWidth="2" />

      {/* Etiqueta con contorno blanco para legibilidad */}
      <text x={plaza.svgX} y={plaza.svgY + 23} fontSize="7.5" fontWeight="600"
        fill="white" stroke="white" strokeWidth="3" strokeLinejoin="round"
        textAnchor="middle" paintOrder="stroke"
        className="select-none pointer-events-none"
        fontFamily="'Lora',Georgia,serif">
        {plaza.nombre}
      </text>
      <text x={plaza.svgX} y={plaza.svgY + 23} fontSize="7.5" fontWeight="600"
        fill="#1c1917" textAnchor="middle"
        className="select-none pointer-events-none"
        fontFamily="'Lora',Georgia,serif">
        {plaza.nombre}
      </text>

      {/* Ícono de video si fue visitada */}
      {plaza.visitada && (
        <text x={plaza.svgX + 9} y={plaza.svgY - 7} fontSize="9" textAnchor="middle"
          className="select-none pointer-events-none">
          ▶
        </text>
      )}
    </g>
  )
}

export default function MapaBarrio({ barrio }) {
  const [plazaSeleccionada, setPlazaSeleccionada] = useState(null)
  const Background = BACKGROUNDS[barrio.id]

  return (
    <>
      <svg
        viewBox="0 0 500 400"
        className="w-full max-w-2xl mx-auto"
        role="img"
        aria-label={`Mapa de ${barrio.nombre} — tocá una plaza para ver información`}
      >
        <Background />

        {barrio.plazas.map((plaza) => (
          <PlazaMarker key={plaza.id} plaza={plaza} onClick={setPlazaSeleccionada} />
        ))}

        <rect x="2" y="2" width="496" height="396" fill="none"
          stroke="#C4B49A" strokeWidth="1" rx="4" />
      </svg>

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

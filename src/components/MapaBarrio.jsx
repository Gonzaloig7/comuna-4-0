// onSelectPlaza: función que recibe una plaza y abre el modal (gestionado en Barrio.jsx)

const COLOR_VISITADA = '#22c55e'
const COLOR_NO_VISITADA = '#9ca3af'
const PAPEL = '#f5ede0'
const AGUA = '#89C9DD'

// ── La Boca ──────────────────────────────────────────────
// La Boca tiene una grilla rotada ~43° (alineada con el Almirante Brown).
// Las calles transversales son perpendiculares a Brown (ángulo -47°).
// Las calles paralelas a Brown forman el otro eje del damero rotado.
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

      {/* ── Bounds: latN=-34.618 latS=-34.657 lonW=-58.374 lonE=-58.333 ──
           Av.Paseo Colón x=68 | Av.Brown (180,55)→(63,312) NE→SW | Av.Pedro Mendoza y=322
           Brown dir(-117,255) normalized(-0.416,0.909) | perp(0.909,0.416) */}

      {/* ── Grilla rotada: paralelas a Brown ── */}
      {/* dir Brown: (-0.416,0.909)  perp: (0.909,0.416) */}
      {[40, 80, 120].map((d) => (
        <line key={`par${d}`}
          x1={180 + 0.909 * d} y1={55 + 0.416 * d}
          x2={63  + 0.909 * d} y2={312 + 0.416 * d}
          stroke="#d4e4f4" strokeWidth="0.7" strokeDasharray="2,2" />
      ))}
      {[-40, -80].map((d) => (
        <line key={`parN${d}`}
          x1={180 + 0.909 * d} y1={55 + 0.416 * d}
          x2={63  + 0.909 * d} y2={312 + 0.416 * d}
          stroke="#d4e4f4" strokeWidth="0.7" strokeDasharray="2,2" />
      ))}

      {/* ── Grilla rotada: perpendiculares a Brown ── */}
      {[0.22, 0.44, 0.66, 0.84].map((t) => {
        const px = 180 + t * (63 - 180)
        const py = 55  + t * (312 - 55)
        return (
          <line key={`perp${t}`}
            x1={px + 0.909 * 140} y1={py + 0.416 * 140}
            x2={px - 0.909 * 140} y2={py - 0.416 * 140}
            stroke="#d4e4f4" strokeWidth="0.7" strokeDasharray="2,2" />
        )
      })}

      {/* ── Calles con nombre (perpendiculares a Brown) ── */}
      {/* Brandsen ≈ t=0.30 */}
      <line x1={Math.round(180+0.3*(63-180)+0.909*150)} y1={Math.round(55+0.3*257+0.416*150)}
            x2={Math.round(180+0.3*(63-180)-0.909*150)} y2={Math.round(55+0.3*257-0.416*150)}
            stroke="#b8cfe8" strokeWidth="1.4" />
      <text x="216" y="138" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-25,216,138)" fontFamily="'Lora',Georgia,serif">Brandsen</text>

      {/* Suárez ≈ t=0.56 */}
      <line x1={Math.round(180+0.56*(63-180)+0.909*130)} y1={Math.round(55+0.56*257+0.416*130)}
            x2={Math.round(180+0.56*(63-180)-0.909*130)} y2={Math.round(55+0.56*257-0.416*130)}
            stroke="#b8cfe8" strokeWidth="1.4" />
      <text x="196" y="218" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-25,196,218)" fontFamily="'Lora',Georgia,serif">Suárez</text>

      {/* ── Av. Paseo Colón (oeste, lon≈-58.370 → x=68) ── */}
      <line x1="68" y1="18" x2="68" y2="322" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="68" y="11" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Paseo Colón</text>

      {/* ── Av. Almirante Brown: (180,55) → (63,312) CORRECTO: NE → SO ── */}
      <line x1="180" y1="55" x2="63" y2="312" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="124" y="186" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        transform="rotate(-66,124,186)" fontFamily="'Lora',Georgia,serif">Av. Almirante Brown</text>

      {/* ── Av. Pedro de Mendoza (sur, lat≈-34.650 → y=322) ── */}
      <line x1="18" y1="322" x2="482" y2="322" stroke="#1C5BA8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="280" y="314" fontSize="6.5" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Pedro de Mendoza</text>

      {/* ── Landmark: La Bombonera (lat≈-34.635 lon≈-58.364 → x≈131 y≈179) ── */}
      <rect x="119" y="168" width="24" height="18" fill="#1C5BA8" opacity="0.18" rx="2" />
      <text x="131" y="196" fontSize="5.5" fill="#1C5BA8" opacity="0.65" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">La Bombonera</text>

      {/* ── Label Caminito (lat≈-34.638 lon≈-58.361 → x≈160 y≈200, diagonal Brown) ── */}
      <text x="158" y="210" fontSize="6" fill="#1C5BA8" opacity="0.65" textAnchor="middle"
        transform="rotate(-66,158,210)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Caminito</text>
    </g>
  )
}

// ── Barracas ─────────────────────────────────────────────
function BarracasBackground() {
  // Grilla de manzanas: líneas cada ~27 unidades entre avenidas principales
  // Bounds: latN=-34.616 latS=-34.668 lonW=-58.412 lonE=-58.346
  // Av.MontesDeOca x=296 | Av.RegPatricios x=386 | Av.VelezSarsfield x=447
  // Av.Caseros y=68       | Av.Iriarte y=281
  const hGrid = [97, 127, 157, 187, 217, 247]
  const vGrid = [80, 140, 200, 256, 326, 356, 416]

  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f5" rx="4" />

      {/* Riachuelo (sur) — lat≈-34.665 → y≈366 */}
      <path d="M 0,366 Q 90,356 200,362 Q 310,368 400,364 Q 450,361 500,366 L 500,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="250" y="392" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`bh${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#f0d4df" strokeWidth="0.6" />)}
      {vGrid.map(x => <line key={`bv${x}`} x1={x} y1="18" x2={x} y2="366"
        stroke="#f0d4df" strokeWidth="0.6" />)}

      {/* ── Avenidas secundarias ── */}
      <line x1="447" y1="18" x2="447" y2="366" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="447" y="11" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Vélez Sársfield</text>

      <line x1="18" y1="281" x2="482" y2="281" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="355" y="273" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Gral. T. de Iriarte</text>

      {/* ── Avenidas principales ── */}
      <line x1="296" y1="18" x2="296" y2="366" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="296" y="11" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Montes de Oca</text>

      <line x1="18" y1="68" x2="482" y2="68" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="380" y="60" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      <line x1="386" y1="18" x2="386" y2="366" stroke="#C2185B" strokeWidth="3" strokeLinecap="round" />
      <text x="386" y="11" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Reg. de Patricios</text>

      {/* Av. Martín García diagonal NW→SE: (102,68)→(278,310) ≈50° */}
      <line x1="102" y1="68" x2="278" y2="310" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
      <text x="185" y="192" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        transform="rotate(54,185,192)" fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
    </g>
  )
}

// ── Parque Patricios ─────────────────────────────────────
function ParquePatriciosBackground() {
  // Bounds: latN=-34.618 latS=-34.658 lonW=-58.425 lonE=-58.387
  // Av.Caseros y=83 | Av.Chiclana y=194 | Av.Sáenz y=305
  // Av.Centenera x=158 | Av.Colonia x=311 | Av.Alcorta x=421
  const hGrid = [110, 138, 165, 222, 250, 278]
  const vGrid = [95, 128, 230, 260, 290, 366, 395]

  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f0" rx="4" />

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`ph${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#f0c8c8" strokeWidth="0.6" />)}
      {vGrid.map(x => <line key={`pv${x}`} x1={x} y1="18" x2={x} y2="388"
        stroke="#f0c8c8" strokeWidth="0.6" />)}

      {/* ── Área verde: Parque de los Patricios — entre Chiclana y Caseros, cerca de Colonia */}
      <rect x="195" y="88" width="120" height="104" fill="#86efac" opacity="0.35" rx="4" />
      <text x="255" y="147" fontSize="7" fill="#15803d" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Parque de los Patricios</text>

      {/* ── Av. Amancio Alcorta (límite este) ── */}
      <line x1="421" y1="18" x2="421" y2="388" stroke="#e57373" strokeWidth="2" strokeLinecap="round" />
      <text x="421" y="11" fontSize="6.5" fill="#B71C1C" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>

      {/* ── Avenidas principales ── */}
      <line x1="18" y1="83" x2="482" y2="83" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="75" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      <line x1="18" y1="194" x2="482" y2="194" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="186" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Chiclana</text>

      <line x1="18" y1="305" x2="482" y2="305" stroke="#B71C1C" strokeWidth="2.5" strokeLinecap="round" />
      <text x="118" y="297" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>

      <line x1="158" y1="18" x2="158" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="158" y="11" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Centenera</text>

      <line x1="311" y1="18" x2="311" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="311" y="11" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Colonia</text>

      {/* ── Landmark: Estadio de Huracán — x≈311 (Colonia) y≈305 (Sáenz) area ── */}
      <ellipse cx="320" cy="315" rx="22" ry="16" fill="#B71C1C" opacity="0.18" />
      <text x="320" y="340" fontSize="5.5" fill="#B71C1C" opacity="0.70" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Est. Huracán</text>
    </g>
  )
}

// ── Nueva Pompeya ────────────────────────────────────────
function NuevaPompeyaBackground() {
  // Bounds: latN=-34.636 latS=-34.677 lonW=-58.453 lonE=-58.395
  // Av.Sáenz y=90 | Av.OsvaldoCruz y=217 | Av.Centenera x=274
  // Av.PeritMoreno y=144 | Riachuelo y≈325
  const hGrid = [116, 168, 195, 245, 270, 295]
  const vGrid = [80, 165, 220, 330, 385, 430]

  return (
    <g>
      <rect width="500" height="400" fill="#f5f3f0" rx="4" />

      {/* Riachuelo (sur) — lat≈-34.671 → y≈325 */}
      <path d="M 0,325 Q 120,315 260,320 Q 380,324 500,318 L 500,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="250" y="360" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`nh${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#d8d4cf" strokeWidth="0.6" />)}
      {vGrid.map(x => <line key={`nv${x}`} x1={x} y1="18" x2={x} y2="325"
        stroke="#d8d4cf" strokeWidth="0.6" />)}

      {/* ── Av. Perito Moreno (secundaria) ── */}
      <line x1="18" y1="144" x2="482" y2="144" stroke="#757575" strokeWidth="2" strokeLinecap="round" />
      <text x="112" y="136" fontSize="6.5" fill="#424242" opacity="0.70" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Perito Moreno</text>

      {/* ── Avenidas principales ── */}
      <line x1="18" y1="90" x2="482" y2="90" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="105" y="82" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>

      <line x1="18" y1="217" x2="482" y2="217" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="118" y="209" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Osvaldo Cruz</text>

      <line x1="274" y1="18" x2="274" y2="325" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <text x="274" y="11" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Centenera</text>
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

export default function MapaBarrio({ barrio, onSelectPlaza }) {
  const Background = BACKGROUNDS[barrio.id]

  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label={`Mapa de ${barrio.nombre} — tocá una plaza para ver información`}
    >
      <Background />

      {barrio.plazas.map((plaza) => (
        <PlazaMarker key={plaza.id} plaza={plaza} onClick={onSelectPlaza} />
      ))}

      <rect x="2" y="2" width="496" height="396" fill="none"
        stroke="#C4B49A" strokeWidth="1" rx="4" />
    </svg>
  )
}

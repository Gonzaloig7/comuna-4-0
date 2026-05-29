// onSelectPlaza: función que recibe una plaza y abre el modal (gestionado en Barrio.jsx)

const COLOR_VISITADA = '#22c55e'
const COLOR_NO_VISITADA = '#9ca3af'
const PAPEL = '#f5ede0'
const AGUA = '#89C9DD'

// ── La Boca ──────────────────────────────────────────────
// Bounds: latN=-34.618 latS=-34.657 lonW=-58.374 lonE=-58.348 (range lon=0.026 lat=0.039)
// Av.Paseo Colón x=89 | Av.Brown (273,55)→(89,312) NE→SW | Av.Pedro Mendoza y=322
// Brown dir(-184,257) norm(-0.582,0.813) | perp(0.813,0.582) ∡+36°
function LaBocaBackground() {
  return (
    <g>
      <rect width="500" height="400" fill="#eff4f9" rx="4" />

      {/* Riachuelo (sur) — debajo de y≈370 */}
      <path
        d="M 0,368 Q 90,358 200,364 Q 310,370 415,362 L 482,368 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55"
      />
      <text x="200" y="392" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* Puerto Madero / Río de la Plata (NE, este) */}
      <path d="M 438,18 L 482,18 L 482,368 L 438,355 Q 420,270 432,140 L 438,18 Z"
        fill={AGUA} opacity="0.32" />
      <text x="463" y="175" fontSize="6.5" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90,463,175)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Puerto Madero</text>

      {/* ── Grilla rotada: paralelas a Brown ── */}
      {/* dir Brown: (-0.582,0.813)  perp: (0.813,0.582) */}
      {[40, 80, 120].map((d) => (
        <line key={`par${d}`}
          x1={273 + 0.813 * d} y1={55 + 0.582 * d}
          x2={89  + 0.813 * d} y2={312 + 0.582 * d}
          stroke="#d4e4f4" strokeWidth="0.7" strokeDasharray="2,2" />
      ))}
      {[-40, -80].map((d) => (
        <line key={`parN${d}`}
          x1={273 + 0.813 * d} y1={55 + 0.582 * d}
          x2={89  + 0.813 * d} y2={312 + 0.582 * d}
          stroke="#d4e4f4" strokeWidth="0.7" strokeDasharray="2,2" />
      ))}

      {/* ── Grilla rotada: perpendiculares a Brown ── */}
      {[0.22, 0.44, 0.66, 0.84].map((t) => {
        const px = 273 + t * (89 - 273)
        const py = 55  + t * (312 - 55)
        return (
          <line key={`perp${t}`}
            x1={px + 0.813 * 130} y1={py + 0.582 * 130}
            x2={px - 0.813 * 130} y2={py - 0.582 * 130}
            stroke="#d4e4f4" strokeWidth="0.7" strokeDasharray="2,2" />
        )
      })}

      {/* ── Calle Brandsen (t≈0.30 sobre Brown) ── */}
      <line x1="332" y1="214" x2="104" y2="51"
            stroke="#b8cfe8" strokeWidth="1.4" />
      <text x="228" y="140" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-36,228,140)" fontFamily="'Lora',Georgia,serif">Brandsen</text>

      {/* ── Calle Suárez (t≈0.56 sobre Brown) ── */}
      <line x1="268" y1="269" x2="72" y2="129"
            stroke="#b8cfe8" strokeWidth="1.4" />
      <text x="183" y="212" fontSize="6.5" fill="#7aa0c8" textAnchor="middle"
        transform="rotate(-36,183,212)" fontFamily="'Lora',Georgia,serif">Suárez</text>

      {/* ── Av. Paseo Colón (oeste, lon≈-58.370 → x=89) ── */}
      <line x1="89" y1="18" x2="89" y2="368" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="89" y="11" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Paseo Colón</text>

      {/* ── Av. Almirante Brown: (273,55) → (89,312) CORRECTO: NE → SO ── */}
      <line x1="273" y1="55" x2="89" y2="312" stroke="#1C5BA8" strokeWidth="3.5" strokeLinecap="round" />
      <text x="181" y="184" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        transform="rotate(-54,181,184)" fontFamily="'Lora',Georgia,serif">Av. Almirante Brown</text>

      {/* ── Av. Pedro de Mendoza (sur, lat≈-34.650 → y=322) ── */}
      <line x1="18" y1="322" x2="438" y2="322" stroke="#1C5BA8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="240" y="314" fontSize="6.5" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Pedro de Mendoza</text>

      {/* ── Landmark: La Bombonera (lat≈-34.635 lon≈-58.364 → x≈197 y≈179) ── */}
      <rect x="185" y="168" width="24" height="18" fill="#1C5BA8" opacity="0.18" rx="2" />
      <text x="197" y="196" fontSize="5.5" fill="#1C5BA8" opacity="0.65" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">La Bombonera</text>

      {/* ── Label Caminito (lat≈-34.638 lon≈-58.361 → x≈250 y≈208) ── */}
      <text x="248" y="208" fontSize="6" fill="#1C5BA8" opacity="0.65" textAnchor="middle"
        transform="rotate(-54,248,208)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Caminito</text>
    </g>
  )
}

// ── Barracas ─────────────────────────────────────────────
function BarracasBackground() {
  // Bounds: latN=-34.616 latS=-34.668 lonW=-58.412 lonE=-58.358 (range 0.054)
  // Lat range 0.052 (unchanged)
  // Av.MontesDeOca x=357 | Av.RegPatricios x=468
  // Av.Caseros y=68       | Av.Iriarte y=281
  // Martín García NW→SE: (121,68)→(336,310)
  const hGrid = [97, 127, 157, 187, 217, 247]
  const vGrid = [95, 172, 250, 327, 404]

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

      {/* ── Av. Gral. T. de Iriarte (secundaria) ── */}
      <line x1="18" y1="281" x2="482" y2="281" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="420" y="273" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Gral. T. de Iriarte</text>

      {/* ── Avenidas principales ── */}
      <line x1="357" y1="18" x2="357" y2="366" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="357" y="11" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Montes de Oca</text>

      <line x1="18" y1="68" x2="482" y2="68" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="200" y="60" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      <line x1="468" y1="18" x2="468" y2="366" stroke="#C2185B" strokeWidth="3" strokeLinecap="round" />
      <text x="468" y="11" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Reg. de Patricios</text>

      {/* Av. Martín García diagonal NW→SE: (121,68)→(336,310) ≈50° */}
      <line x1="121" y1="68" x2="336" y2="310" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
      <text x="229" y="189" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        transform="rotate(48,229,189)" fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
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

      {/* ── Área verde: Parque de los Patricios — entre Caseros y Chiclana (y=83–210) */}
      <rect x="190" y="83" width="128" height="127" fill="#86efac" opacity="0.35" rx="4" />
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

      {/* Riachuelo (sur) — lat≈-34.673 → y≈355 */}
      <path d="M 0,355 Q 120,346 260,351 Q 380,355 500,348 L 500,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="320" y="382" fontSize="7" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`nh${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#d8d4cf" strokeWidth="0.6" />)}
      {vGrid.map(x => <line key={`nv${x}`} x1={x} y1="18" x2={x} y2="355"
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

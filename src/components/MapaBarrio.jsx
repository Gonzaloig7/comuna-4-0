// onSelectPlaza: función que recibe una plaza y abre el modal (gestionado en Barrio.jsx)

const COLOR_VISITADA = '#22c55e'
const COLOR_NO_VISITADA = '#9ca3af'
const PAPEL = '#f5ede0'
const AGUA = '#89C9DD'

// ── La Boca ──────────────────────────────────────────────
// Bounds: latN=-34.618 latS=-34.657 lonW=-58.374 lonE=-58.348 (range lon=0.026 lat=0.039)
// Diseño minimalista: solo las 4 avenidas principales, sin grilla secundaria
// Av.Paseo Colón x=89 | Av.Brown (196,18)→(89,322) | Av.Brasil y=84 | Av.Pedro Mendoza y=322
function LaBocaBackground() {
  return (
    <g>
      {/* Fondo */}
      <rect width="500" height="400" fill="#eef3f8" rx="4" />

      {/* ── Riachuelo (sur, lat≈-34.651 → y≈322, agua debajo) ── */}
      <path d="M 0,350 Q 80,340 200,346 Q 320,352 440,344 L 482,350 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.60" />
      <text x="220" y="382" fontSize="8" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Puerto Madero / Río de la Plata (este) ── */}
      <path d="M 442,18 L 482,18 L 482,350 L 442,342 Q 422,255 436,135 L 442,18 Z"
        fill={AGUA} opacity="0.32" />
      <text x="465" y="190" fontSize="7" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90,465,190)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Puerto Madero</text>

      {/* ── Av. Brasil (norte, lat≈-34.625 → y=84) ── */}
      <line x1="18" y1="84" x2="442" y2="84"
        stroke="#1C5BA8" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,4" />
      <text x="300" y="76" fontSize="6.5" fill="#1C5BA8" opacity="0.85" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Brasil</text>

      {/* ── Av. Paseo Colón (límite oeste, lon≈-58.370 → x=89) ── */}
      <line x1="89" y1="18" x2="89" y2="350"
        stroke="#1C5BA8" strokeWidth="4.5" strokeLinecap="round" />
      <text x="89" y="11" fontSize="7.5" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Paseo Colón</text>

      {/* ── Av. Almirante Brown: (196,18)→(89,322) NE→SO ── */}
      {/* p_NE: lon=-58.364 lat=-34.618 | p_SO: lon=-58.370 lat=-34.650 */}
      <line x1="196" y1="18" x2="89" y2="322"
        stroke="#1C5BA8" strokeWidth="4.5" strokeLinecap="round" />
      <text x="143" y="170" fontSize="7.5" fill="#1C5BA8" textAnchor="middle"
        transform="rotate(-70,143,170)" fontFamily="'Lora',Georgia,serif">Av. Almirante Brown</text>

      {/* ── Av. Pedro de Mendoza (sur, lat≈-34.650 → y=322) ── */}
      <line x1="18" y1="322" x2="442" y2="322"
        stroke="#1C5BA8" strokeWidth="3" strokeLinecap="round" />
      <text x="265" y="313" fontSize="6.5" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Pedro de Mendoza</text>
    </g>
  )
}

// ── Barracas ─────────────────────────────────────────────
function BarracasBackground() {
  // Bounds: latN=-34.616 latS=-34.668 lonW=-58.412 lonE=-58.360 (range lon=0.052)
  // Lat range 0.052 (unchanged)
  // Av.Alcorta x=36 (límite O) | Av.MontesDeOca x=370 | Av.Caseros y=68 | Av.Iriarte y=281
  // Martín García NW→SE corregida: (143,68)→(286,260)  ∡53°
  const hGrid = [97, 127, 157, 187, 217, 247]
  const vGrid = [98, 179, 259, 340, 420]

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

      {/* ── Av. Amancio Alcorta (límite oeste, lon≈-58.410 → x=36) ── */}
      <line x1="36" y1="18" x2="36" y2="366" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="36" y="11" fontSize="6" fill="#C2185B" opacity="0.7" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>

      {/* ── Av. Gral. T. de Iriarte ── */}
      <line x1="18" y1="281" x2="482" y2="281" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="250" y="273" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Gral. T. de Iriarte</text>

      {/* ── Av. Caseros (norte) ── */}
      <line x1="18" y1="68" x2="482" y2="68" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="220" y="60" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      {/* ── Av. Montes de Oca (lon≈-58.3725 → x=370) ── */}
      <line x1="370" y1="18" x2="370" y2="366" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="370" y="11" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Montes de Oca</text>

      {/* ── Av. Martín García diagonal NW→SE corregida: (143,68)→(286,260) ≈53° ── */}
      {/* p1: lon=-58.398 lat=-34.623 | p2: lon=-58.382 lat=-34.650 */}
      <line x1="143" y1="68" x2="286" y2="260" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
      <text x="214" y="164" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        transform="rotate(53,214,164)" fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
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

// Elimina prefijos genéricos y deja solo el nombre distintivo (max 3 palabras)
function labelCorto(nombre) {
  return nombre
    .replace(/^Parque de Flora Nativa .*/i, 'Flora Nativa')
    .replace(/^Plazoleta de los /i, '')
    .replace(/^Plazoleta /i, '')
    .replace(/^Parque de los /i, '')
    .replace(/^Parque de?l? /i, '')
    .replace(/^Parque /i, '')
    .replace(/^Plaza de las? /i, '')
    .replace(/^Plaza Nuestra Señora de /i, '')
    .replace(/^Plaza /i, '')
    .split(' ').slice(0, 3).join(' ')
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
        {labelCorto(plaza.nombre)}
      </text>
      <text x={plaza.svgX} y={plaza.svgY + 23} fontSize="7.5" fontWeight="600"
        fill="#1c1917" textAnchor="middle"
        className="select-none pointer-events-none"
        fontFamily="'Lora',Georgia,serif">
        {labelCorto(plaza.nombre)}
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

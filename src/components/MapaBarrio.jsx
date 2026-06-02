// onSelectPlaza: función que recibe una plaza y abre el modal (gestionado en Barrio.jsx)

const COLOR_VISITADA = '#22c55e'
const COLOR_NO_VISITADA = '#9ca3af'
const PAPEL = '#f5ede0'
const AGUA = '#89C9DD'

// ── La Boca ──────────────────────────────────────────────
// Bounds: latN=-34.618 latS=-34.657 lonW=-58.374 lonE=-58.348 (range lon=0.026 lat=0.039)
// Av.Brown: NO→SE (arriba-izquierda → abajo-derecha) — (161,18)→(393,312)
// Av.Paseo Colón x=89 | Av.Brasil y=84 | Av.Pedro Mendoza y=322
// Riachuelo envuelve por el ESTE y SUR
function LaBocaBackground() {
  // Brown dir=(0.620,0.786) | perp-west=(-0.785,0.620) | perp-east=(0.785,-0.620)
  return (
    <g>
      <rect width="500" height="400" fill="#eef3f8" rx="4" />

      {/* ── Riachuelo (este y sur) ── */}
      <path d="M 382,140 C 420,136 455,144 482,154
               L 482,400 L 0,400 L 0,390
               Q 110,382 240,388 Q 330,393 362,380
               Q 382,366 382,320 L 382,220 L 382,140 Z"
        fill={AGUA} opacity="0.50" />
      <text x="448" y="278" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90,448,278)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Grilla diagonal — paralelas a Brown (hacia el oeste) ── */}
      {[20, 40, 60, 80, 100, 120].map(d => (
        <line key={`lbp${d}`}
          x1={Math.round(161-0.785*d)} y1={Math.round(18+0.620*d)}
          x2={Math.round(393-0.785*d)} y2={Math.round(312+0.620*d)}
          stroke="#7aa4c4" strokeWidth="1.0" />
      ))}

      {/* ── Grilla diagonal — calles transversales (perpendiculares a Brown) ── */}
      {[0.15, 0.27, 0.39, 0.51, 0.63, 0.75, 0.87].map(t => {
        const cx = Math.round(161 + 232 * t)
        const cy = Math.round(18  + 294 * t)
        return (
          <line key={`lbx${t}`}
            x1={cx + Math.round(0.785*140)} y1={cy - Math.round(0.620*140)}
            x2={cx - Math.round(0.785*140)} y2={cy + Math.round(0.620*140)}
            stroke="#7aa4c4" strokeWidth="1.0" />
        )
      })}

      {/* ── Av. Brasil (norte, lat≈-34.625 → y=84) ── */}
      <g>
        <title>Av. Brasil</title>
        <line x1="18" y1="84" x2="382" y2="84"
          stroke="#1C5BA8" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,4" />
        <text x="130" y="76" fontSize="6.5" fill="#1C5BA8" opacity="0.85" textAnchor="middle"
          fontFamily="'Lora',Georgia,serif">Av. Brasil</text>
      </g>

      {/* ── Av. Paseo Colón (límite oeste, x=89) ── */}
      <g>
        <title>Av. Paseo Colón</title>
        <line x1="89" y1="18" x2="89" y2="388"
          stroke="#1C5BA8" strokeWidth="4" strokeLinecap="round" />
        <text x="89" y="11" fontSize="7" fill="#1C5BA8" textAnchor="middle"
          fontFamily="'Lora',Georgia,serif">Av. Paseo Colón</text>
      </g>

      {/* ── Av. Almirante Brown: NO→SE ── */}
      <g>
        <title>Av. Almirante Brown</title>
        <line x1="161" y1="18" x2="393" y2="312"
          stroke="#1C5BA8" strokeWidth="4.5" strokeLinecap="round" />
        <text x="277" y="165" fontSize="7" fill="#1C5BA8" textAnchor="middle"
          transform="rotate(52,277,165)"
          fontFamily="'Lora',Georgia,serif">Av. Almirante Brown</text>
      </g>

      {/* ── Av. Pedro de Mendoza (sur, y=322) ── */}
      <g>
        <title>Av. Pedro de Mendoza</title>
        <line x1="18" y1="322" x2="382" y2="322"
          stroke="#1C5BA8" strokeWidth="3" strokeLinecap="round" />
        <text x="215" y="313" fontSize="6.5" fill="#1C5BA8" textAnchor="middle"
          fontFamily="'Lora',Georgia,serif">Av. Pedro de Mendoza</text>
      </g>
    </g>
  )
}

// ── Barracas ─────────────────────────────────────────────
// Bounds: latN=-34.616 latS=-34.668 lonW=-58.412 lonE=-58.346 (range lon=0.066 lat=0.052)
// Diseño minimalista — solo avenidas principales, sin grilla
// Av.Alcorta x=32 (W) | Av.MontesDeOca x=296 | Av.VélezSársfield x=446
// Av.Caseros y=68 (N) | Av.Iriarte y=281 (S) | Riachuelo y≈366
// Av.MartínGarcía (109,25)→(285,289) NO→SE ∡56°
function BarracasBackground() {
  // Grilla ortogonal: hStep≈35px (0.005° lat), vStep≈35px (0.005° lon)
  const hGrid = [53,88,123,158,193,228,263,298,333]   // entre Caseros(68) e Iriarte(281)
  const vGrid = [53,88,123,158,193,228,263,333,368,403,438,473]
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f5" rx="4" />

      {/* ── Riachuelo (sur) ── */}
      <path d="M 0,366 Q 100,356 220,362 Q 340,368 440,364 Q 465,361 482,366 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="240" y="392" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`bh${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#d88aaa" strokeWidth="1.0" />)}
      {vGrid.map(x => <line key={`bv${x}`} x1={x} y1="18" x2={x} y2="366"
        stroke="#d88aaa" strokeWidth="1.0" />)}

      {/* ── Avenidas con título hover ── */}
      <g><title>Av. Amancio Alcorta</title>
        <line x1="32" y1="18" x2="32" y2="366" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
        <text x="32" y="11" fontSize="6" fill="#C2185B" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>
      </g>
      <g><title>Av. Gral. Tomás de Iriarte</title>
        <line x1="18" y1="281" x2="482" y2="281" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
        <text x="120" y="273" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Gral. T. de Iriarte</text>
      </g>
      <g><title>Av. Caseros</title>
        <line x1="18" y1="68" x2="482" y2="68" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
        <text x="220" y="60" fontSize="7" fill="#C2185B" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Caseros</text>
      </g>
      <g><title>Av. Manuel Montes de Oca</title>
        <line x1="296" y1="18" x2="296" y2="366" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
        <text x="296" y="11" fontSize="7" fill="#C2185B" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Montes de Oca</text>
      </g>
      <g><title>Av. Vélez Sársfield</title>
        <line x1="446" y1="18" x2="446" y2="366" stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
        <text x="446" y="11" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Vélez Sársfield</text>
      </g>
      <g><title>Av. Martín García</title>
        <line x1="109" y1="25" x2="285" y2="289" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
        <text x="197" y="157" fontSize="6.5" fill="#C2185B" textAnchor="middle" transform="rotate(56,197,157)" fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
      </g>
    </g>
  )
}

// ── Parque Patricios ─────────────────────────────────────
// Bounds: latN=-34.618 latS=-34.658 lonW=-58.425 lonE=-58.387 (range lon=0.038 lat=0.040)
// Diseño minimalista — solo avenidas principales, sin grilla
// E-O: Av.Caseros y=83 | Av.Chiclana y=194 | Av.Sáenz y=305
// N-S: Av.Almafuerte x=158 | Av.Colonia x=311 | Av.Alcorta x=421
// Parque entre Almafuerte–Colonia y Caseros–Chiclana
function ParquePatriciosBackground() {
  // Grilla ortogonal: hStep≈28px (0.003° lat), vStep≈37px (0.003° lon)
  const hGrid = [46,74,102,130,158,186,214,242,270,298,326,354,382]
  const vGrid = [55,92,129,166,203,240,277,314,351,388,425,462]
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f0" rx="4" />

      {/* ── Área verde: Parque de los Patricios ── */}
      <rect x="158" y="83" width="153" height="111" fill="#86efac" opacity="0.28" rx="4" />
      <text x="234" y="142" fontSize="7" fill="#15803d" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Parque de los Patricios</text>

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`ph${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#d09090" strokeWidth="1.0" />)}
      {vGrid.map(x => <line key={`pv${x}`} x1={x} y1="18" x2={x} y2="388"
        stroke="#d09090" strokeWidth="1.0" />)}

      {/* ── Avenidas con título hover ── */}
      <g><title>Av. Sáenz</title>
        <line x1="18" y1="305" x2="482" y2="305" stroke="#e57373" strokeWidth="2" strokeLinecap="round" />
        <text x="260" y="297" fontSize="6.5" fill="#B71C1C" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>
      </g>
      <g><title>Av. Chiclana</title>
        <line x1="18" y1="194" x2="482" y2="194" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
        <text x="400" y="186" fontSize="7" fill="#B71C1C" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Chiclana</text>
      </g>
      <g><title>Av. Caseros</title>
        <line x1="18" y1="83" x2="482" y2="83" stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
        <text x="260" y="75" fontSize="7" fill="#B71C1C" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Caseros</text>
      </g>
      <g><title>Av. Almafuerte</title>
        <line x1="158" y1="18" x2="158" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
        <text x="158" y="11" fontSize="6.5" fill="#B71C1C" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Almafuerte</text>
      </g>
      <g><title>Av. Colonia</title>
        <line x1="311" y1="18" x2="311" y2="388" stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
        <text x="311" y="11" fontSize="7" fill="#B71C1C" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Colonia</text>
      </g>
      <g><title>Av. Amancio Alcorta</title>
        <line x1="421" y1="18" x2="421" y2="388" stroke="#e57373" strokeWidth="2" strokeLinecap="round" />
        <text x="421" y="11" fontSize="6.5" fill="#B71C1C" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>
      </g>

      {/* ── Estadio Huracán ── */}
      <ellipse cx="318" cy="318" rx="26" ry="20" fill="#B71C1C" opacity="0.15" />
      <text x="318" y="346" fontSize="5.5" fill="#B71C1C" opacity="0.65" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Est. Huracán</text>
    </g>
  )
}

// ── Nueva Pompeya ────────────────────────────────────────
// Bounds: latN=-34.636 latS=-34.677 lonW=-58.453 lonE=-58.395 (range lon=0.058 lat=0.041)
// Diseño minimalista — solo avenidas principales, sin grilla
// E-O: Av.Sáenz y=90 | Av.PeritMoreno y=144 | Av.OsvaldoCruz y=217 | Riachuelo y≈355
// N-S: Av.Riestra x=146 (O) | Av.Centenera x=274 | Av.Rivera x=370 (E)
function NuevaPompeyaBackground() {
  // Grilla ortogonal: hStep≈45px (0.005° lat), vStep≈40px (0.005° lon)
  const hGrid = [63,108,153,198,243,288,333]
  const vGrid = [58,98,138,178,218,258,298,338,378,418,458]
  return (
    <g>
      <rect width="500" height="400" fill="#f5f3f0" rx="4" />

      {/* ── Riachuelo (sur, lat≈-34.673 → y≈355) ── */}
      <path d="M 0,355 Q 120,346 260,351 Q 380,355 482,348 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="320" y="382" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Grilla de manzanas ── */}
      {hGrid.map(y => <line key={`nh${y}`} x1="18" y1={y} x2="482" y2={y}
        stroke="#a0a09a" strokeWidth="1.0" />)}
      {vGrid.map(x => <line key={`nv${x}`} x1={x} y1="18" x2={x} y2="355"
        stroke="#a0a09a" strokeWidth="1.0" />)}

      {/* ── Avenidas con título hover ── */}
      <g><title>Av. Osvaldo Cruz</title>
        <line x1="18" y1="217" x2="482" y2="217" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
        <text x="260" y="209" fontSize="7" fill="#424242" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Osvaldo Cruz</text>
      </g>
      <g><title>Av. Perito Moreno</title>
        <line x1="18" y1="144" x2="482" y2="144" stroke="#757575" strokeWidth="2" strokeLinecap="round" />
        <text x="200" y="136" fontSize="6.5" fill="#424242" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Perito Moreno</text>
      </g>
      <g><title>Av. Sáenz</title>
        <line x1="18" y1="90" x2="482" y2="90" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
        <text x="200" y="82" fontSize="7" fill="#424242" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>
      </g>
      <g><title>Av. Riestra</title>
        <line x1="146" y1="18" x2="146" y2="355" stroke="#757575" strokeWidth="2" strokeLinecap="round" />
        <text x="146" y="11" fontSize="6.5" fill="#424242" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Riestra</text>
      </g>
      <g><title>Av. Del Barco Centenera</title>
        <line x1="274" y1="18" x2="274" y2="355" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
        <text x="274" y="11" fontSize="7" fill="#424242" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Centenera</text>
      </g>
      <g><title>Av. Rivera Indarte</title>
        <line x1="370" y1="18" x2="370" y2="355" stroke="#757575" strokeWidth="2" strokeLinecap="round" />
        <text x="370" y="11" fontSize="6.5" fill="#424242" opacity="0.75" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Rivera</text>
      </g>
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

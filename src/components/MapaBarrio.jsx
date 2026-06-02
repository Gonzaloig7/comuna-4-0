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
  return (
    <g>
      {/* Fondo tierra */}
      <rect width="500" height="400" fill="#eef3f8" rx="4" />

      {/* ── Riachuelo — envuelve el barrio por el este (derecha) y sur (abajo) ── */}
      {/* Entra desde el borde derecho a ~y=145 y rodea el sector SE */}
      <path
        d="M 382,140 C 420,136 455,144 482,154
           L 482,400 L 0,400 L 0,390
           Q 110,382 240,388 Q 330,393 362,380
           Q 382,366 382,320 L 382,220 L 382,140 Z"
        fill={AGUA} opacity="0.50"
      />
      <text x="448" y="278" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        transform="rotate(90,448,278)"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Av. Brasil (norte, lat≈-34.625 → y=84) ── */}
      <line x1="18" y1="84" x2="382" y2="84"
        stroke="#1C5BA8" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,4" />
      <text x="220" y="76" fontSize="6.5" fill="#1C5BA8" opacity="0.85" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Brasil</text>

      {/* ── Av. Paseo Colón (límite oeste, lon≈-58.370 → x=89) ── */}
      <line x1="89" y1="18" x2="89" y2="388"
        stroke="#1C5BA8" strokeWidth="4" strokeLinecap="round" />
      <text x="89" y="11" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Paseo Colón</text>

      {/* ── Av. Almirante Brown: NO→SE (arriba-izquierda → abajo-derecha) ∡52° ── */}
      {/* p_NO: lon=-58.366 lat=-34.618 | p_SE: lon=-58.353 lat=-34.649 */}
      <line x1="161" y1="18" x2="393" y2="312"
        stroke="#1C5BA8" strokeWidth="4.5" strokeLinecap="round" />
      <text x="277" y="165" fontSize="7" fill="#1C5BA8" textAnchor="middle"
        transform="rotate(52,277,165)"
        fontFamily="'Lora',Georgia,serif">Av. Almirante Brown</text>

      {/* ── Av. Pedro de Mendoza (sur, lat≈-34.650 → y=322) ── */}
      <line x1="18" y1="322" x2="382" y2="322"
        stroke="#1C5BA8" strokeWidth="3" strokeLinecap="round" />
      <text x="215" y="313" fontSize="6.5" fill="#1C5BA8" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Pedro de Mendoza</text>
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
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f5" rx="4" />

      {/* ── Riachuelo (sur, lat≈-34.665 → y≈366) ── */}
      <path d="M 0,366 Q 100,356 220,362 Q 340,368 440,364 Q 465,361 482,366 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="240" y="392" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Av. Amancio Alcorta (límite oeste, lon≈-58.410 → x=32) ── */}
      <line x1="32" y1="18" x2="32" y2="366"
        stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="32" y="11" fontSize="6" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>

      {/* ── Av. Gral. T. de Iriarte (sur, lat≈-34.653 → y=281) ── */}
      <line x1="18" y1="281" x2="482" y2="281"
        stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="260" y="273" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Gral. T. de Iriarte</text>

      {/* ── Av. Caseros (norte, lat≈-34.623 → y=68) ── */}
      <line x1="18" y1="68" x2="482" y2="68"
        stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="220" y="60" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      {/* ── Av. Manuel Montes de Oca (lon≈-58.3725 → x=296) ── */}
      <line x1="296" y1="18" x2="296" y2="366"
        stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" />
      <text x="296" y="11" fontSize="7" fill="#C2185B" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Montes de Oca</text>

      {/* ── Av. Vélez Sársfield (límite este, lon≈-58.351 → x=446) ── */}
      <line x1="446" y1="18" x2="446" y2="366"
        stroke="#e2829a" strokeWidth="2" strokeLinecap="round" />
      <text x="446" y="11" fontSize="6.5" fill="#C2185B" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Vélez Sársfield</text>

      {/* ── Av. Martín García (diagonal NO→SE): (109,25)→(285,289) ∡56° ── */}
      {/* p_NO: lon=-58.399 lat=-34.617 | p_SE: lon=-58.374 lat=-34.654 */}
      <line x1="109" y1="25" x2="285" y2="289"
        stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
      <text x="197" y="157" fontSize="6.5" fill="#C2185B" textAnchor="middle"
        transform="rotate(56,197,157)"
        fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
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
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f0" rx="4" />

      {/* ── Área verde: Parque de los Patricios ── */}
      {/* Entre Almafuerte (x=158) y Colonia (x=311), Caseros (y=83) y Chiclana (y=194) */}
      <rect x="158" y="83" width="153" height="111" fill="#86efac" opacity="0.30" rx="4" />
      <text x="234" y="142" fontSize="7" fill="#15803d" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Parque de los Patricios</text>

      {/* ── Av. Sáenz (sur, lat≈-34.649 → y=305) ── */}
      <line x1="18" y1="305" x2="482" y2="305"
        stroke="#e57373" strokeWidth="2" strokeLinecap="round" />
      <text x="260" y="297" fontSize="6.5" fill="#B71C1C" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>

      {/* ── Av. Chiclana (central, lat≈-34.637 → y=194) ── */}
      <line x1="18" y1="194" x2="482" y2="194"
        stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="260" y="186" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Chiclana</text>

      {/* ── Av. Caseros (norte, lat≈-34.625 → y=83) ── */}
      <line x1="18" y1="83" x2="482" y2="83"
        stroke="#B71C1C" strokeWidth="3.5" strokeLinecap="round" />
      <text x="260" y="75" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Caseros</text>

      {/* ── Av. Almafuerte (occidental, lon≈-58.414 → x=158) ── */}
      <line x1="158" y1="18" x2="158" y2="388"
        stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="158" y="11" fontSize="6.5" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Almafuerte</text>

      {/* ── Av. Colonia (central, lon≈-58.400 → x=311) ── */}
      <line x1="311" y1="18" x2="311" y2="388"
        stroke="#B71C1C" strokeWidth="3" strokeLinecap="round" />
      <text x="311" y="11" fontSize="7" fill="#B71C1C" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Colonia</text>

      {/* ── Av. Amancio Alcorta (límite este, lon≈-58.391 → x=421) ── */}
      <line x1="421" y1="18" x2="421" y2="388"
        stroke="#e57373" strokeWidth="2" strokeLinecap="round" />
      <text x="421" y="11" fontSize="6.5" fill="#B71C1C" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Alcorta</text>

      {/* ── Estadio Huracán (lat≈-34.649 lon≈-58.399 → x≈318 y≈306) ── */}
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
  return (
    <g>
      <rect width="500" height="400" fill="#f5f3f0" rx="4" />

      {/* ── Riachuelo (sur, lat≈-34.673 → y≈355) ── */}
      <path d="M 0,355 Q 120,346 260,351 Q 380,355 482,348 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="320" y="382" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Av. Osvaldo Cruz (lat≈-34.658 → y=217) ── */}
      <line x1="18" y1="217" x2="482" y2="217"
        stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="260" y="209" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Osvaldo Cruz</text>

      {/* ── Av. Perito Moreno (lat≈-34.650 → y=144) ── */}
      <line x1="18" y1="144" x2="482" y2="144"
        stroke="#757575" strokeWidth="2" strokeLinecap="round" />
      <text x="200" y="136" fontSize="6.5" fill="#424242" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Perito Moreno</text>

      {/* ── Av. Sáenz (norte, lat≈-34.644 → y=90) ── */}
      <line x1="18" y1="90" x2="482" y2="90"
        stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
      <text x="200" y="82" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Sáenz</text>

      {/* ── Av. Riestra (occidental, lon≈-58.437 → x=146) ── */}
      <line x1="146" y1="18" x2="146" y2="355"
        stroke="#757575" strokeWidth="2" strokeLinecap="round" />
      <text x="146" y="11" fontSize="6.5" fill="#424242" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Riestra</text>

      {/* ── Av. Del Barco Centenera (central, lon≈-58.421 → x=274) ── */}
      <line x1="274" y1="18" x2="274" y2="355"
        stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <text x="274" y="11" fontSize="7" fill="#424242" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Centenera</text>

      {/* ── Av. Rivera (oriental, lon≈-58.409 → x=370) ── */}
      <line x1="370" y1="18" x2="370" y2="355"
        stroke="#757575" strokeWidth="2" strokeLinecap="round" />
      <text x="370" y="11" fontSize="6.5" fill="#424242" opacity="0.75" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif">Av. Rivera</text>
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

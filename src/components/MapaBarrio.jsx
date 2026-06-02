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

      {/* ── Calles transversales (perpendiculares a Brown) con nombres reales ── */}
      {[
        {t:0.15, n:'Pinzón'},
        {t:0.27, n:'Brandsen'},
        {t:0.39, n:'Suárez'},
        {t:0.51, n:'Necochea'},
        {t:0.63, n:'Olavarría'},
        {t:0.75, n:'Irala'},
        {t:0.87, n:'Magallanes'},
      ].map(({t, n}) => {
        const cx = Math.round(161 + 232 * t)
        const cy = Math.round(18  + 294 * t)
        const lx1 = cx + Math.round(0.785*140)
        const ly1 = cy - Math.round(0.620*140)
        const lx2 = cx - Math.round(0.785*140)
        const ly2 = cy + Math.round(0.620*140)
        return (
          <g key={n}>
            <title>{n}</title>
            <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="#7aa4c4" strokeWidth="1.0" />
            <text x={lx2+14} y={ly2-6} fontSize="5.5" fill="#1C5BA8" opacity="0.65"
              fontFamily="'Lora',Georgia,serif">{n}</text>
          </g>
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
// Calles reales con nombres — E-O entre Caseros/Iriarte, N-S entre Alcorta/Vélez Sársfield
function BarracasBackground() {
  // Calles E-O (horizontales) con nombres reales — lat→y = 18+(lat−latN)/range*370
  const callesEO = [
    {n:'Pedriel',          y: 90},  // lat≈-34.625
    {n:'Olavarría',        y:125},  // lat≈-34.630
    {n:'California',       y:162},  // lat≈-34.636
    {n:'Cnel. Salvadores', y:198},  // lat≈-34.641
    {n:'Gualeguay',        y:234},  // lat≈-34.646
  ]
  // Calles N-S (verticales) con nombres reales — lon→x = 18+(lon−lonW)/range*464
  const callesNS = [
    {n:'Av. Australia', x:170},  // lon≈-58.390
    {n:'Herrera',       x:228},  // lon≈-58.382
    {n:'Patagones',     x:362},  // lon≈-58.363
    {n:'Beazley',       x:410},  // lon≈-58.356
  ]
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f5" rx="4" />

      {/* ── Riachuelo (sur) ── */}
      <path d="M 0,366 Q 100,356 220,362 Q 340,368 440,364 Q 465,361 482,366 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="240" y="392" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Calles E-O con nombre ── */}
      {callesEO.map(c => (
        <g key={c.n}>
          <title>{c.n}</title>
          <line x1="18" y1={c.y} x2="482" y2={c.y} stroke="#d88aaa" strokeWidth="1.0" />
          <text x={24} y={c.y - 3} fontSize="5.5" fill="#C2185B" opacity="0.65"
            fontFamily="'Lora',Georgia,serif">{c.n}</text>
        </g>
      ))}
      {/* ── Calles N-S con nombre ── */}
      {callesNS.map(c => (
        <g key={c.n}>
          <title>{c.n}</title>
          <line x1={c.x} y1="18" x2={c.x} y2="366" stroke="#d88aaa" strokeWidth="1.0" />
          <text x={c.x} y={24} fontSize="5.5" fill="#C2185B" opacity="0.65"
            textAnchor="middle" fontFamily="'Lora',Georgia,serif"
            transform={`rotate(-90,${c.x},24)`}>{c.n}</text>
        </g>
      ))}

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
      {/* ── Av. Reg. de Patricios (entre Montes de Oca y Vélez, lon≈-58.351 → x=446) ── */}
      <g><title>Av. Regimiento de Patricios</title>
        <line x1="446" y1="18" x2="446" y2="366" stroke="#C2185B" strokeWidth="3" strokeLinecap="round" />
        <text x="446" y="11" fontSize="6.5" fill="#C2185B" textAnchor="middle" fontFamily="'Lora',Georgia,serif">Av. Reg. de Patricios</text>
      </g>
      {/* ── Av. Martín García: diagonal NO→SE ENTRE Montes de Oca y Reg. Patricios ── */}
      {/* p_NO: lon≈-58.368 (x=327) lat≈-34.623 (y=68) */}
      {/* p_SE: lon≈-58.354 (x=420) lat≈-34.653 (y=281) */}
      <g><title>Av. Martín García</title>
        <line x1="327" y1="68" x2="420" y2="281" stroke="#C2185B" strokeWidth="2.5" strokeLinecap="round" />
        <text x="374" y="175" fontSize="6.5" fill="#C2185B" textAnchor="middle"
          transform="rotate(66,374,175)" fontFamily="'Lora',Georgia,serif">Av. Martín García</text>
      </g>
    </g>
  )
}

// ── Parque Patricios ─────────────────────────────────────
// Bounds: latN=-34.618 latS=-34.658 lonW=-58.425 lonE=-58.387 (range lon=0.038 lat=0.040)
// Calles reales con nombres
function ParquePatriciosBackground() {
  // E-O: lat→y = 18+(lat−latN)/0.040*370
  const callesEO = [
    {n:'Uspallata',     y:120},  // lat≈-34.628
    {n:'Pepiri',        y:157},  // lat≈-34.632
    {n:'Montesquieu',   y:248},  // lat≈-34.641
    {n:'Av. Perito M.', y:290},  // lat≈-34.646 (Perito Moreno)
  ]
  // N-S: lon→x = 18+(lon−lonW)/0.038*464
  const callesNS = [
    {n:'Av. Luna',       x: 90},  // lon≈-58.418
    {n:'Av. Centenera',  x:230},  // lon≈-58.407
    {n:'Regimiento',     x:370},  // lon≈-58.396 (Av. Reg. de Patricios)
  ]
  return (
    <g>
      <rect width="500" height="400" fill="#fdf0f0" rx="4" />

      {/* ── Área verde: Parque de los Patricios ── */}
      <rect x="158" y="83" width="153" height="111" fill="#86efac" opacity="0.28" rx="4" />
      <text x="234" y="142" fontSize="7" fill="#15803d" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Parque de los Patricios</text>

      {/* ── Calles E-O con nombre ── */}
      {callesEO.map(c => (
        <g key={c.n}>
          <title>{c.n}</title>
          <line x1="18" y1={c.y} x2="482" y2={c.y} stroke="#d09090" strokeWidth="1.0" />
          <text x={24} y={c.y - 3} fontSize="5.5" fill="#B71C1C" opacity="0.65"
            fontFamily="'Lora',Georgia,serif">{c.n}</text>
        </g>
      ))}
      {/* ── Calles N-S con nombre ── */}
      {callesNS.map(c => (
        <g key={c.n}>
          <title>{c.n}</title>
          <line x1={c.x} y1="18" x2={c.x} y2="388" stroke="#d09090" strokeWidth="1.0" />
          <text x={c.x} y={24} fontSize="5.5" fill="#B71C1C" opacity="0.65"
            textAnchor="middle" fontFamily="'Lora',Georgia,serif"
            transform={`rotate(-90,${c.x},24)`}>{c.n}</text>
        </g>
      ))}

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
// Calles reales con nombres
function NuevaPompeyaBackground() {
  // E-O: lat→y = 18+(lat−latN)/0.041*370
  const callesEO = [
    {n:'Lacarra',        y:115},  // lat≈-34.648
    {n:'Cnel. Pagola',   y:162},  // lat≈-34.653
    {n:'Fernández',      y:196},  // lat≈-34.657
  ]
  // N-S: lon→x = 18+(lon−lonW)/0.058*464
  const callesNS = [
    {n:'Av. J.M. Moreno', x: 80},  // lon≈-58.443
    {n:'Av. Daract',      x:210},  // lon≈-58.429
    {n:'Lynch',           x:356},  // lon≈-58.411
  ]
  return (
    <g>
      <rect width="500" height="400" fill="#f5f3f0" rx="4" />

      {/* ── Riachuelo (sur, lat≈-34.673 → y≈355) ── */}
      <path d="M 0,355 Q 120,346 260,351 Q 380,355 482,348 L 482,400 L 0,400 Z"
        fill={AGUA} opacity="0.55" />
      <text x="320" y="382" fontSize="7.5" fill="#4A90A4" textAnchor="middle"
        fontFamily="'Lora',Georgia,serif" fontStyle="italic">Riachuelo</text>

      {/* ── Calles E-O con nombre ── */}
      {callesEO.map(c => (
        <g key={c.n}>
          <title>{c.n}</title>
          <line x1="18" y1={c.y} x2="482" y2={c.y} stroke="#a0a09a" strokeWidth="1.0" />
          <text x={24} y={c.y - 3} fontSize="5.5" fill="#424242" opacity="0.65"
            fontFamily="'Lora',Georgia,serif">{c.n}</text>
        </g>
      ))}
      {/* ── Calles N-S con nombre ── */}
      {callesNS.map(c => (
        <g key={c.n}>
          <title>{c.n}</title>
          <line x1={c.x} y1="18" x2={c.x} y2="355" stroke="#a0a09a" strokeWidth="1.0" />
          <text x={c.x} y={24} fontSize="5.5" fill="#424242" opacity="0.65"
            textAnchor="middle" fontFamily="'Lora',Georgia,serif"
            transform={`rotate(-90,${c.x},24)`}>{c.n}</text>
        </g>
      ))}

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

import { useNavigate } from 'react-router-dom'
import MapaComuna from '../components/MapaComuna.jsx'
import Contador from '../components/Contador.jsx'
import data from '../data/comuna4.json'

export default function Home() {
  return (
    <div className="page-enter min-h-screen flex flex-col pb-20">

      {/* ── Barra de colores — identidad de los 4 barrios ── */}
      <div className="flex h-2.5 w-full shrink-0">
        <div className="flex-1" style={{ backgroundColor: '#1C5BA8' }} />
        <div className="flex-1" style={{ backgroundColor: '#C2185B' }} />
        <div className="flex-1" style={{ backgroundColor: '#B71C1C' }} />
        <div className="flex-1" style={{ backgroundColor: '#424242' }} />
      </div>

      {/* ── Masthead ─────────────────────────────────────── */}
      <header className="w-full max-w-2xl mx-auto px-5">
        {/* Etiqueta de sección */}
        <p className="text-center text-xs tracking-[0.25em] uppercase text-stone-400 font-body pt-4 pb-2">
          Periodismo territorial · CABA
        </p>

        <hr className="masthead-rule" />

        {/* Título principal */}
        <div className="text-center py-3">
          <h1
            className="font-display leading-none text-stone-900"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 6.5rem)', letterSpacing: '0.04em' }}
          >
            COMUNA 4.0
          </h1>
        </div>

        <hr className="masthead-rule-thin" />

        {/* Subtítulo y contador */}
        <div className="flex items-center justify-between gap-4 py-3">
          <p
            className="font-heading italic text-stone-600 leading-snug text-sm sm:text-base"
            style={{ maxWidth: '26rem' }}
          >
            {data.config.subtitulo}
          </p>
          <div className="shrink-0">
            <Contador />
          </div>
        </div>

        <hr className="masthead-rule" />
      </header>

      {/* ── Mapa SVG ────────────────────────────────────── */}
      <main className="flex-1 px-4 max-w-2xl mx-auto w-full">
        <p className="text-center text-xs text-stone-400 font-body mt-4 mb-2 tracking-wide">
          Tocá un barrio para explorar sus plazas ↓
        </p>
        <MapaComuna />

        {/* ── Cards de barrio ─────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {data.barrios.map((b) => (
            <BarrioCard key={b.id} barrio={b} />
          ))}
        </div>
      </main>
    </div>
  )
}

function BarrioCard({ barrio }) {
  const navigate = useNavigate()
  const visitadas = barrio.plazas.filter((p) => p.visitada).length

  return (
    <button
      onClick={() => navigate(`/barrio/${barrio.id}`)}
      className="rounded-xl overflow-hidden text-left transition-all active:scale-95 hover:brightness-105 shadow-md hover:shadow-lg"
      style={{ backgroundColor: barrio.colorPrimario }}
    >
      {/* Cuerpo */}
      <div className="p-4 pb-3">
        <p className="text-white/60 text-xs tracking-widest uppercase font-body mb-1">
          {visitadas}/{barrio.plazas.length} plazas
        </p>
        <h2
          className="font-display text-white leading-none mb-3"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', letterSpacing: '0.04em' }}
        >
          {barrio.nombre.toUpperCase()}
        </h2>
        {/* Barra de progreso */}
        <div className="h-1 rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/60 transition-all"
            style={{ width: `${Math.max(2, Math.round((visitadas / barrio.plazas.length) * 100))}%` }}
          />
        </div>
      </div>
      {/* Franja de color secundario como pie */}
      <div
        className="h-1"
        style={{ backgroundColor: barrio.colorSecundario, opacity: 0.55 }}
      />
    </button>
  )
}

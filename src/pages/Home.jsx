import { useNavigate } from 'react-router-dom'
import MapaComuna from '../components/MapaComuna.jsx'
import Contador from '../components/Contador.jsx'
import data from '../data/comuna4.json'

export default function Home() {
  return (
    <div className="page-enter min-h-screen flex flex-col pb-20">
      {/* ── Encabezado ──────────────────────────────────── */}
      <header className="px-5 pt-8 pb-4 text-center max-w-lg mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-2 leading-tight">
          {data.config.titulo}
        </h1>
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed mb-5">
          {data.config.subtitulo}
        </p>
        <Contador />
      </header>

      {/* ── Mapa SVG ────────────────────────────────────── */}
      <main className="flex-1 px-4 max-w-2xl mx-auto w-full">
        <p className="text-center text-xs text-stone-400 mb-3">
          Tocá un barrio para explorar sus plazas ↓
        </p>
        <MapaComuna />

        {/* ── Cards de barrio (alternativa táctil mobile) ─ */}
        <div className="grid grid-cols-2 gap-3 mt-6">
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
      className="rounded-2xl p-4 text-left transition-transform active:scale-95 hover:brightness-105 bg-white shadow-sm border border-stone-100"
      style={{ borderLeftColor: barrio.colorPrimario, borderLeftWidth: '4px' }}
    >
      <span
        className="font-bold text-sm block mb-0.5"
        style={{ color: barrio.colorPrimario }}
      >
        {barrio.nombre}
      </span>
      <span className="text-xs text-stone-400">
        {visitadas}/{barrio.plazas.length} plazas visitadas
      </span>
    </button>
  )
}

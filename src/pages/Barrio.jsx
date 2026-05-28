import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MapaBarrio from '../components/MapaBarrio.jsx'
import PlazaModal from '../components/PlazaModal.jsx'
import data from '../data/comuna4.json'

export default function Barrio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plazaSeleccionada, setPlazaSeleccionada] = useState(null)

  const barrio = data.barrios.find((b) => b.id === id)

  if (!barrio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <p className="text-stone-500 mb-4">Barrio no encontrado.</p>
        <Link to="/" className="text-stone-600 underline text-sm font-body">
          ← Volver al mapa de la Comuna
        </Link>
      </div>
    )
  }

  const visitadas = barrio.plazas.filter((p) => p.visitada).length

  return (
    <div className="page-enter min-h-screen flex flex-col pb-24">

      {/* ── Franja de color del barrio ── */}
      <div className="h-2 w-full shrink-0" style={{ backgroundColor: barrio.colorPrimario }} />

      {/* ── Masthead de barrio ─────────────────────────── */}
      <header className="w-full max-w-2xl mx-auto px-5">
        {/* Volver */}
        <button
          onClick={() => navigate('/')}
          className="mt-3 mb-2 flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors font-body tracking-wide"
        >
          ← COMUNA 4.0
        </button>

        <hr className="masthead-rule" />

        {/* Nombre del barrio + contador */}
        <div className="py-3 flex items-end justify-between gap-4">
          <h1
            className="font-display leading-none"
            style={{
              fontSize: 'clamp(2.8rem, 11vw, 5rem)',
              letterSpacing: '0.04em',
              color: barrio.colorPrimario,
            }}
          >
            {barrio.nombre.toUpperCase()}
          </h1>

          {/* Contador de plazas */}
          <div className="text-right shrink-0 mb-1">
            <p className="font-display text-stone-900 leading-none" style={{ fontSize: '2rem' }}>
              {visitadas}<span className="text-stone-400 text-lg">/{barrio.plazas.length}</span>
            </p>
            <p className="text-xs text-stone-400 font-body tracking-widest uppercase">plazas</p>
          </div>
        </div>

        <hr className="masthead-rule-thin" />

        {/* Descripción */}
        <p className="font-heading italic text-stone-600 text-sm sm:text-base leading-snug py-3">
          {barrio.descripcion}
        </p>

        <hr className="masthead-rule" />
      </header>

      {/* ── Leyenda ─────────────────────────────────────── */}
      <div className="px-5 pt-3 pb-1 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-5 text-xs text-stone-400 font-body tracking-wide">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 shrink-0" />
            Visitada
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-stone-300 shrink-0" />
            Por visitar
          </span>
          <span className="text-stone-300 hidden sm:inline">·</span>
          <span className="hidden sm:inline">Tocá una plaza para ver información</span>
        </div>
      </div>

      {/* ── Mapa del barrio ─────────────────────────────── */}
      <main className="flex-1 px-3 pt-2 max-w-2xl mx-auto w-full">
        <MapaBarrio barrio={barrio} onSelectPlaza={setPlazaSeleccionada} />

        {/* ── Lista de plazas ──────────────────────────── */}
        <section className="mt-6 px-2">
          <p className="text-xs text-stone-400 font-body tracking-[0.2em] uppercase mb-3">
            Plazas del barrio
          </p>
          <hr className="masthead-rule-thin mb-0" />
          <div className="flex flex-col">
            {barrio.plazas.map((plaza, i) => (
              <PlazaListItem
                key={plaza.id}
                plaza={plaza}
                barrio={barrio}
                index={i}
                total={barrio.plazas.length}
                onSelect={() => setPlazaSeleccionada(plaza)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* ── Modal de plaza ──────────────────────────────── */}
      {plazaSeleccionada && (
        <PlazaModal
          plaza={plazaSeleccionada}
          barrio={barrio}
          formularioUrl={data.config.formularioReclamosUrl}
          onClose={() => setPlazaSeleccionada(null)}
        />
      )}
    </div>
  )
}

function PlazaListItem({ plaza, barrio, index, total, onSelect }) {
  const isLast = index === total - 1

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between py-3 gap-3 text-left transition-colors
        hover:bg-stone-900/[0.03] active:bg-stone-900/[0.06] -mx-2 px-2 rounded-sm
        ${!isLast ? 'border-b border-stone-200' : ''}`}
    >
      {/* Dot + nombre */}
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: plaza.visitada ? barrio.colorPrimario : '#d6d3d1' }}
        />
        <span className="font-body text-sm text-stone-800 truncate">{plaza.nombre}</span>
      </div>

      {/* Estado / acción */}
      {plaza.visitada ? (
        <span
          className="text-xs font-body font-semibold shrink-0 px-2.5 py-0.5 rounded-sm"
          style={{
            backgroundColor: barrio.colorPrimario + '22',
            color: barrio.colorPrimario,
          }}
        >
          Ver →
        </span>
      ) : (
        <span className="text-xs text-stone-300 font-body shrink-0 italic">pendiente</span>
      )}
    </button>
  )
}

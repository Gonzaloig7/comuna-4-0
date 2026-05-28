import { useParams, useNavigate, Link } from 'react-router-dom'
import MapaBarrio from '../components/MapaBarrio.jsx'
import data from '../data/comuna4.json'

export default function Barrio() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Busca el barrio por id en el JSON
  const barrio = data.barrios.find((b) => b.id === id)

  if (!barrio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <p className="text-stone-500 mb-4">Barrio no encontrado.</p>
        <Link to="/" className="text-blue-600 underline text-sm">
          ← Volver al mapa de la Comuna
        </Link>
      </div>
    )
  }

  const visitadas = barrio.plazas.filter((p) => p.visitada).length

  return (
    <div className="page-enter min-h-screen flex flex-col pb-24">
      {/* ── Header de barrio ────────────────────────────── */}
      <header className="px-4 pt-5 pb-2 max-w-2xl mx-auto w-full">
        {/* Volver */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors mb-4 -ml-1 py-1"
        >
          <span>←</span>
          <span>Volver a Comuna 4</span>
        </button>

        {/* Nombre y descripción */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-block w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: barrio.colorPrimario }}
              />
              <h1
                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ color: barrio.colorPrimario }}
              >
                {barrio.nombre}
              </h1>
            </div>
            <p className="text-stone-500 text-sm max-w-sm leading-relaxed">
              {barrio.descripcion}
            </p>
          </div>

          {/* Contador de plazas del barrio */}
          <div className="text-right text-xs text-stone-400 shrink-0 mt-1">
            <span className="text-green-600 font-bold text-lg">{visitadas}</span>
            <span className="text-stone-400"> / {barrio.plazas.length}</span>
            <br />
            <span>plazas</span>
          </div>
        </div>
      </header>

      {/* ── Leyenda ─────────────────────────────────────── */}
      <div className="px-4 pt-3 pb-1 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-4 text-xs text-stone-500 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
            Visitada
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-400 shrink-0" />
            Por visitar
          </span>
          <span className="text-stone-300 hidden sm:inline">·</span>
          <span className="text-stone-400 hidden sm:inline">
            Tocá una plaza para ver información
          </span>
        </div>
      </div>

      {/* ── Mapa del barrio ─────────────────────────────── */}
      <main className="flex-1 px-3 pt-2 max-w-2xl mx-auto w-full">
        <MapaBarrio barrio={barrio} />

        {/* ── Lista de plazas ──────────────────────────── */}
        <section className="mt-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 px-1">
            Plazas del barrio
          </h2>
          <div className="flex flex-col gap-2">
            {barrio.plazas.map((plaza) => (
              <PlazaListItem key={plaza.id} plaza={plaza} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function PlazaListItem({ plaza }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center justify-between border border-stone-100">
      <div className="flex items-center gap-3">
        <span
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            plaza.visitada ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
        <span className="text-sm font-medium text-stone-800">{plaza.nombre}</span>
      </div>
      {plaza.visitada ? (
        <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0 ml-2">
          <span aria-hidden="true">🎥</span>
          <span className="hidden sm:inline">Entrevistas disponibles</span>
        </span>
      ) : (
        <span className="text-xs text-stone-300 shrink-0 ml-2">Próximamente</span>
      )}
    </div>
  )
}

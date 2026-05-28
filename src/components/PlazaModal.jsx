import { useEffect } from 'react'

const REDES = [
  {
    key: 'instagram',
    label: 'Instagram',
    className: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:opacity-90',
    icon: '📸',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    className: 'bg-stone-900 hover:bg-stone-700',
    icon: '🎵',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    className: 'bg-red-600 hover:bg-red-500',
    icon: '▶',
  },
]

export default function PlazaModal({ plaza, formularioUrl, onClose }) {
  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!plaza) return null

  const linksDisponibles = plaza.visitada
    ? REDES.filter((r) => plaza.videos?.[r.key])
    : []

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={plaza.nombre}
    >
      <div
        className="modal-content bg-white w-full sm:max-w-sm sm:mx-4 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-stone-400">
              {plaza.visitada ? '🎥 Plaza visitada' : '📍 Próxima visita'}
            </p>
            <h2 className="text-xl font-bold text-stone-900 leading-tight">
              {plaza.nombre}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-stone-400 hover:text-stone-700 text-lg leading-none p-1.5 rounded-full hover:bg-stone-100 transition-colors ml-2 shrink-0"
          >
            ✕
          </button>
        </div>

        <p className="text-stone-600 text-sm mb-5 leading-relaxed">
          {plaza.descripcion}
        </p>

        {plaza.visitada ? (
          <>
            {linksDisponibles.length > 0 && (
              <>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                  Ver entrevistas
                </p>
                <div className="flex flex-col gap-2">
                  {linksDisponibles.map((r) => (
                    <a
                      key={r.key}
                      href={plaza.videos[r.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${r.className} text-white flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-opacity active:opacity-70`}
                    >
                      <span className="text-base" aria-hidden="true">
                        {r.icon}
                      </span>
                      <span>Ver en {r.label}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-sm font-semibold">
                Todavía no visitamos esta plaza.
              </p>
              <p className="text-amber-700 text-sm mt-0.5">
                ¿Querés que la incluyamos? Dejá tu sugerencia.
              </p>
            </div>
            <a
              href={formularioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span aria-hidden="true">📢</span>
              <span>Sugerir esta plaza</span>
            </a>
          </>
        )}
      </div>
    </div>
  )
}

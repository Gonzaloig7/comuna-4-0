import { useEffect } from 'react'

const REDES = [
  { key: 'instagram', label: 'Instagram', icon: '▶' },
  { key: 'tiktok',    label: 'TikTok',    icon: '▶' },
  { key: 'youtube',  label: 'YouTube',   icon: '▶' },
]

export default function PlazaModal({ plaza, barrio, formularioUrl, onClose }) {
  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!plaza) return null

  const color = barrio?.colorPrimario ?? '#1c1917'
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
        className="modal-content w-full sm:max-w-sm sm:mx-4 rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: '#f5ede0' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Franja de color del barrio */}
        <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: color }} />

        <div className="px-6 pt-5 pb-6">

          {/* Estado */}
          <p className="font-body text-xs tracking-[0.18em] uppercase text-stone-400 mb-1">
            {plaza.visitada ? 'Plaza visitada' : 'Plaza por visitar'}
          </p>

          {/* Nombre */}
          <h2
            className="font-display leading-none mb-3"
            style={{ fontSize: 'clamp(1.7rem, 6vw, 2.1rem)', color }}
          >
            {plaza.nombre.toUpperCase()}
          </h2>

          <hr className="masthead-rule-thin mb-4" />

          {/* Descripción */}
          <p className="font-body text-stone-600 text-sm leading-relaxed mb-5">
            {plaza.descripcion}
          </p>

          {/* Acción */}
          {plaza.visitada ? (
            linksDisponibles.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="font-body text-xs tracking-[0.18em] uppercase text-stone-400 mb-1">
                  Ver entrevistas
                </p>
                {linksDisponibles.map((r) => (
                  <a
                    key={r.key}
                    href={plaza.videos[r.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-body font-semibold text-sm transition-opacity active:opacity-75 text-white"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-xs opacity-80" aria-hidden="true">{r.icon}</span>
                    <span>Ver en {r.label}</span>
                    <span className="ml-auto opacity-60 text-xs">→</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="font-body text-sm italic text-stone-400">
                Video en proceso de edición — próximamente disponible.
              </p>
            )
          ) : (
            <div>
              <p className="font-body text-sm italic text-stone-500 mb-4 leading-relaxed">
                Todavía no visitamos esta plaza.
                ¿Querés que la incluyamos en el recorrido?
              </p>
              <a
                href={formularioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-body font-semibold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-opacity active:opacity-75 text-white"
                style={{ backgroundColor: color }}
              >
                Dejar mi reclamo
              </a>
            </div>
          )}

          {/* Cerrar */}
          <button
            onClick={onClose}
            className="mt-5 w-full text-center font-body text-xs text-stone-400 tracking-[0.18em] uppercase py-1.5 hover:text-stone-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

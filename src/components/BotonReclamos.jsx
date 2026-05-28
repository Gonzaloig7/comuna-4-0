// El link al formulario se configura en src/data/comuna4.json → config.formularioReclamosUrl
export default function BotonReclamos({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-5 right-4 z-50
        bg-amber-500 hover:bg-amber-400 active:bg-amber-600
        text-white font-semibold text-sm
        px-4 py-3 rounded-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-150
        hover:-translate-y-0.5 active:translate-y-0
        flex items-center gap-2
      "
    >
      <span aria-hidden="true">📢</span>
      <span>Dejá tu reclamo</span>
    </a>
  )
}

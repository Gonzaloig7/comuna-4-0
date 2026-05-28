import data from '../data/comuna4.json'

// Lee el JSON y calcula visitadas/total en tiempo de build.
// Si agregás plazas al JSON, el contador se actualiza solo.
export default function Contador() {
  const total = data.barrios.reduce((sum, b) => sum + b.plazas.length, 0)
  const visitadas = data.barrios.reduce(
    (sum, b) => sum + b.plazas.filter((p) => p.visitada).length,
    0
  )

  return (
    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-stone-200 text-sm font-medium text-stone-700">
      <span className="w-2 h-2 rounded-full bg-green-500 inline-block shrink-0" />
      <span>
        <strong className="text-green-700">{visitadas}</strong> de{' '}
        <strong>{total}</strong> plazas visitadas
      </span>
    </div>
  )
}

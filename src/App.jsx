import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Barrio from './pages/Barrio.jsx'
import BotonReclamos from './components/BotonReclamos.jsx'
import data from './data/comuna4.json'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barrio/:id" element={<Barrio />} />
      </Routes>
      {/* Botón flotante siempre visible — el link se configura en src/data/comuna4.json */}
      <BotonReclamos url={data.config.formularioReclamosUrl} />
    </div>
  )
}

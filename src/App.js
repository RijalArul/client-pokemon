import './App.css'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './features/Home'
import DetailPokemon from './components/DetailPokemon'
import NotFound from './components/404NotFound'
import CatchPage from './features/Catch'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:name' element={<DetailPokemon />} />
        <Route path='/catch' element={<CatchPage />} />
        <Route path='/not_found' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

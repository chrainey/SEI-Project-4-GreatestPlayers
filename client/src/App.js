import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Allplayers from './components/Allplayers'
import Images from './components/Images'
import Playersingle from './components/Playersingle'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/players" element={<Allplayers />} />
          <Route path="/players/:playerId/" element={<Playersingle />}  />
          <Route path="/images" element={<Images />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Landing from './components/Landing'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App

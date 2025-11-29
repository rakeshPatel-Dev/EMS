import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Users from './context/Users.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Users>
      <App />
    </Users>
  </BrowserRouter>
)

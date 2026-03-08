import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { ASSET_BASE } from './Data'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

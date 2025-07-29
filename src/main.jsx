import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppEmail from './EmailAndPass.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEmail />
  </StrictMode>,
)

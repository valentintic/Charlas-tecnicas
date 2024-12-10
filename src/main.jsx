import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Register from './components/register/register'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Register/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import './styles.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router/>,
  </StrictMode>,
)

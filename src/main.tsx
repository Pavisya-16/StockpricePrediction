import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style.css'
import App from './App.tsx'
import {ToastProvider } from './utility-components/CustomToast.tsx'

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </ToastProvider>
)

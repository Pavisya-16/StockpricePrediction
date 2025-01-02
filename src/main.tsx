import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style.css'
import App from './App.tsx'
import {ToastProvider } from './utility-components/CustomToast.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
  <ToastProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </ToastProvider>
  </ThemeProvider>
)

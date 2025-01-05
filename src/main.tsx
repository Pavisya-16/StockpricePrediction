import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import './style.css'
import App from './App.tsx'
import {ToastProvider } from './utility-components/CustomToast.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import store from "./redux/store";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <ThemeProvider>
  <ToastProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </ToastProvider>
  </ThemeProvider>
  </Provider>
)

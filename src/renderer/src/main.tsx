import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import './globals.scss'

declare global {
  interface Window {
    electron: any;
    api: unknown;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

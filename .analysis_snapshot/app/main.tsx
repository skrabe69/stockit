import './app.css'
import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-purple-400 text-xl">Loading Stockit...</div>
    </div>}>
      <Root />
    </Suspense>
  </StrictMode>
)

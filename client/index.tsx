import { createRoot } from 'react-dom/client'

import App from './components/App.js'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(<App />)
})

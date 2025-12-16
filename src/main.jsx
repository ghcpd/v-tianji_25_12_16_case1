import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChatProvider } from './state/chat'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
)

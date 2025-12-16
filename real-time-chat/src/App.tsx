import React from 'react'
import { ChatProvider } from './store/chatContext'
import Sidebar from './components/Sidebar'
import ConversationView from './components/Conversation'
import MessageInput from './components/MessageInput'
import ContactsModal from './components/ContactsModal'

export default function App() {
  return (
    <ChatProvider>
      <div className="app">
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="text-white">Real-Time Chat</h2>
            <ContactsModal />
          </div>
          <ConversationView />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  )
}

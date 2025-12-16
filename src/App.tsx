import React from 'react'
import { ChatProvider } from '@/context/ChatContext'
import { ConversationList } from '@/components/ConversationList'
import { ChatWindow } from '@/components/ChatWindow'
import { ContactList } from '@/components/ContactList'
import { SearchBar } from '@/components/SearchBar'
import '@/index.css'

function App() {
  return (
    <ChatProvider>
      <div className="h-screen flex flex-col bg-white">
        {/* Header with search */}
        <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-3">Chat App</h1>
            <SearchBar />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar - Conversations */}
          <div className="w-80 border-r border-gray-200">
            <ConversationList />
          </div>

          {/* Center - Chat window */}
          <div className="flex-1">
            <ChatWindow />
          </div>

          {/* Right sidebar - Contacts */}
          <div className="w-80">
            <ContactList />
          </div>
        </div>
      </div>
    </ChatProvider>
  )
}

export default App

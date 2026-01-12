import React, { useEffect } from 'react'
import { useChatStore } from './store'
import ChatList from './components/ChatList'
import SearchBar from './components/SearchBar'
import ChatWindow from './components/ChatWindow'
import ContactsPanel from './components/ContactsPanel'

export default function App() {
  const loadMock = useChatStore((s) => s.loadMock)

  useEffect(() => {
    loadMock()
  }, [loadMock])

  return (
    <div className="h-screen flex">
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold">Real-Time Chat</h1>
        </div>
        <SearchBar />
        <ChatList />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>
      <div className="w-72 border-l bg-white hidden md:block">
        <ContactsPanel />
      </div>
    </div>
  )
}

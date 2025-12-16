import React from 'react'
import { useChat } from '../store/chatContext'

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useChat()

  const filtered = state.conversations.filter((c) => c.title.toLowerCase().includes(state.query.toLowerCase()))

  return (
    <div className="panel sidebar">
      <div className="header">
        <h3 className="text-white">Chats</h3>
        <button className="button" onClick={() => dispatch({ type: 'search', query: '' })} aria-label="clear-search">
          Clear
        </button>
      </div>
      <div className="search">
        <input
          placeholder="Search chats"
          value={state.query}
          onChange={(e) => dispatch({ type: 'search', query: e.target.value })}
          data-testid="chat-search"
        />
      </div>
      <div className="contacts-list">
        {filtered.map((c) => (
          <div
            key={c.id}
            className={`panel ${state.selectedConversationId === c.id ? 'border-2 border-purple-500' : ''}`}
            onClick={() => dispatch({ type: 'select', id: c.id })}
            data-testid={`conv-${c.id}`}
            role="button"
          >
            <div className="flex items-center justify-between">
              <div className="text-white">{c.title}</div>
              <div className="text-sm text-gray-400">{c.lastSeen ? new Date(c.lastSeen).toLocaleTimeString() : ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

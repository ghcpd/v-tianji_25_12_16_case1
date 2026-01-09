import React from 'react'
import { useChat } from '../store/chatContext'

export const ConversationView: React.FC = () => {
  const { state } = useChat()
  const convId = state.selectedConversationId
  const messages = state.messages.filter((m) => m.conversationId === convId)

  return (
    <div className="panel conversation">
      <div className="header text-white" data-testid="conv-title">{state.conversations.find((c) => c.id === convId)?.title}</div>
      <div className="messages" data-testid="messages">
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.sender === 'me' ? 'me' : 'them'}`} data-testid={`msg-${m.id}`}>
            <div className="text-sm">{m.text}</div>
            <div className="text-xs text-gray-400">{new Date(m.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationView

import React, { useState } from 'react'
import { useChatContext } from '@/context/ChatContext'
import { Send } from 'lucide-react'

export const ChatWindow: React.FC = () => {
  const { currentConversationId, messages, sendMessage, conversations } = useChatContext()
  const [messageInput, setMessageInput] = useState('')

  const conversation = conversations.find((c) => c.id === currentConversationId)
  const conversationMessages = messages.filter((m) => m.conversationId === currentConversationId)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput)
      setMessageInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!currentConversationId) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700 mb-2">Select a conversation</p>
          <p className="text-gray-500">Choose a chat to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{conversation?.participantAvatar}</span>
          <div>
            <h2 className="font-bold text-lg text-gray-900">{conversation?.participantName}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        data-testid="messages-container"
      >
        {conversationMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No messages yet. Start the conversation!</div>
        ) : (
          conversationMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${msg.id}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderId === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="message-input"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            data-testid="send-button"
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

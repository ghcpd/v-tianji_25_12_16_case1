import React from 'react'
import { useChatContext } from '@/context/ChatContext'
import { MessageCircle, Plus, X } from 'lucide-react'

export const ConversationList: React.FC = () => {
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    deleteConversation,
    searchQuery,
    getFilteredConversations,
  } = useChatContext()

  const filteredConversations = getFilteredConversations()

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
          <MessageCircle size={28} className="text-blue-600" />
          Chats
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredConversations.map((conv) => (
              <li key={conv.id}>
                <button
                  onClick={() => setCurrentConversationId(conv.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    currentConversationId === conv.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                  data-testid={`conversation-${conv.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{conv.participantAvatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{conv.participantName}</div>
                        <div className="text-sm text-gray-500 truncate">{conv.lastMessage}</div>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span
                          className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                          data-testid={`unread-badge-${conv.id}`}
                        >
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

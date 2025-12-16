import React, { useState } from 'react'
import { useChatContext } from '@/context/ChatContext'
import { Plus, X, Circle } from 'lucide-react'

export const ContactList: React.FC = () => {
  const { contacts, createConversation, conversations } = useChatContext()
  const [showNewContactForm, setShowNewContactForm] = useState(false)
  const [newContactName, setNewContactName] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-500'
      case 'away':
        return 'text-yellow-500'
      case 'offline':
        return 'text-gray-400'
      default:
        return 'text-gray-400'
    }
  }

  const hasConversation = (contactId: string) => {
    return conversations.some((c) => c.participantId === contactId)
  }

  const handleAddContact = () => {
    if (!newContactName.trim()) return

    const newContact = {
      id: `contact-${Date.now()}`,
      name: newContactName,
      avatar: '👤',
      status: 'online' as const,
    }

    setNewContactName('')
    setShowNewContactForm(false)
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Contacts</h2>
          <button
            onClick={() => setShowNewContactForm(!showNewContactForm)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            data-testid="add-contact-button"
            title="Add contact"
          >
            {showNewContactForm ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>

        {showNewContactForm && (
          <div className="space-y-2 pb-4 border-t pt-4">
            <input
              type="text"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              placeholder="Contact name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              data-testid="new-contact-input"
            />
            <button
              onClick={handleAddContact}
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              data-testid="create-contact-button"
            >
              Create
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No contacts</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <li key={contact.id}>
                <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{contact.avatar}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{contact.name}</div>
                      <div className="flex items-center gap-1">
                        <Circle size={8} className={getStatusColor(contact.status)} fill="currentColor" />
                        <span className="text-xs text-gray-500 capitalize">{contact.status}</span>
                      </div>
                    </div>
                  </div>
                  {!hasConversation(contact.id) && (
                    <button
                      onClick={() => createConversation(contact.id)}
                      className="w-full px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors font-medium"
                      data-testid={`start-chat-${contact.id}`}
                    >
                      Start Chat
                    </button>
                  )}
                  {hasConversation(contact.id) && (
                    <button
                      disabled
                      className="w-full px-3 py-1 bg-gray-200 text-gray-600 rounded text-xs font-medium cursor-not-allowed"
                    >
                      Chat Exists
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

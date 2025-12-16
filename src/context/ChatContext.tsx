import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react'

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  timestamp: number
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  lastMessage?: string
  lastMessageTime?: number
  unreadCount: number
}

export interface Contact {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away'
}

interface ChatContextType {
  conversations: Conversation[]
  contacts: Contact[]
  currentConversationId: string | null
  messages: Message[]
  searchQuery: string
  setCurrentConversationId: (id: string | null) => void
  setSearchQuery: (query: string) => void
  sendMessage: (content: string) => void
  addContact: (contact: Contact) => void
  removeContact: (contactId: string) => void
  createConversation: (participantId: string) => void
  deleteConversation: (conversationId: string) => void
  searchMessages: (query: string) => Message[]
  getFilteredConversations: () => Conversation[]
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

const mockContacts: Contact[] = [
  { id: '1', name: 'Alice Johnson', avatar: '👩‍💼', status: 'online' },
  { id: '2', name: 'Bob Smith', avatar: '👨‍💻', status: 'online' },
  { id: '3', name: 'Carol White', avatar: '👩‍🎨', status: 'away' },
  { id: '4', name: 'David Brown', avatar: '👨‍🏫', status: 'offline' },
  { id: '5', name: 'Eve Davis', avatar: '👩‍💻', status: 'online' },
]

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantId: '1',
    participantName: 'Alice Johnson',
    participantAvatar: '👩‍💼',
    lastMessage: 'That sounds great! When are you free?',
    lastMessageTime: Date.now() - 300000,
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    participantId: '2',
    participantName: 'Bob Smith',
    participantAvatar: '👨‍💻',
    lastMessage: 'Check out the new design I created',
    lastMessageTime: Date.now() - 600000,
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participantId: '3',
    participantName: 'Carol White',
    participantAvatar: '👩‍🎨',
    lastMessage: 'Looking forward to it!',
    lastMessageTime: Date.now() - 1800000,
    unreadCount: 1,
  },
]

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user',
    senderName: 'You',
    content: 'Hi Alice! How are you doing?',
    timestamp: Date.now() - 600000,
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: '1',
    senderName: 'Alice Johnson',
    content: 'Great! Just finished the project presentation.',
    timestamp: Date.now() - 500000,
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'user',
    senderName: 'You',
    content: 'Awesome! How did it go?',
    timestamp: Date.now() - 400000,
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: '1',
    senderName: 'Alice Johnson',
    content: 'That sounds great! When are you free?',
    timestamp: Date.now() - 300000,
  },
  {
    id: 'msg-5',
    conversationId: 'conv-2',
    senderId: 'user',
    senderName: 'You',
    content: 'Hi Bob, how is the project?',
    timestamp: Date.now() - 700000,
  },
  {
    id: 'msg-6',
    conversationId: 'conv-2',
    senderId: '2',
    senderName: 'Bob Smith',
    content: 'Check out the new design I created',
    timestamp: Date.now() - 600000,
  },
]

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(
    mockConversations[0]?.id || null
  )
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [searchQuery, setSearchQuery] = useState('')

  const sendMessage = useCallback((content: string) => {
    if (!currentConversationId || !content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: currentConversationId,
      senderId: 'user',
      senderName: 'You',
      content: content.trim(),
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversationId
          ? {
              ...conv,
              lastMessage: content.trim(),
              lastMessageTime: Date.now(),
              unreadCount: 0,
            }
          : conv
      )
    )

    // Simulate a response after 1 second
    setTimeout(() => {
      const conversation = conversations.find((c) => c.id === currentConversationId)
      if (!conversation) return

      const responseMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId: currentConversationId,
        senderId: conversation.participantId,
        senderName: conversation.participantName,
        content: getRandomResponse(),
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, responseMessage])
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                lastMessage: responseMessage.content,
                lastMessageTime: Date.now(),
                unreadCount: conv.unreadCount + 1,
              }
            : conv
        )
      )
    }, 1000)
  }, [currentConversationId, conversations])

  const addContact = useCallback((contact: Contact) => {
    setContacts((prev) => [...prev, contact])
  }, [])

  const removeContact = useCallback((contactId: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId))
  }, [])

  const createConversation = useCallback((participantId: string) => {
    const contact = contacts.find((c) => c.id === participantId)
    if (!contact) return

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      participantId,
      participantName: contact.name,
      participantAvatar: contact.avatar,
      unreadCount: 0,
    }

    setConversations((prev) => [...prev, newConversation])
    setCurrentConversationId(newConversation.id)
  }, [contacts])

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId))
    setMessages((prev) => prev.filter((m) => m.conversationId !== conversationId))
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null)
    }
  }, [currentConversationId])

  const searchMessages = useCallback((query: string): Message[] => {
    if (!query.trim()) return []
    const lowerQuery = query.toLowerCase()
    return messages.filter((m) => m.content.toLowerCase().includes(lowerQuery))
  }, [messages])

  const getFilteredConversations = useCallback((): Conversation[] => {
    if (!searchQuery.trim()) return conversations
    const lowerQuery = searchQuery.toLowerCase()
    return conversations.filter(
      (c) =>
        c.participantName.toLowerCase().includes(lowerQuery) ||
        c.lastMessage?.toLowerCase().includes(lowerQuery)
    )
  }, [conversations, searchQuery])

  const value: ChatContextType = {
    conversations,
    contacts,
    currentConversationId,
    messages,
    searchQuery,
    setCurrentConversationId,
    setSearchQuery,
    sendMessage,
    addContact,
    removeContact,
    createConversation,
    deleteConversation,
    searchMessages,
    getFilteredConversations,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider')
  }
  return context
}

const responses = [
  'That sounds good!',
  'I agree with you.',
  'Let me think about that.',
  'Great idea!',
  'Thanks for letting me know.',
  'I understand.',
  'Let\'s discuss this more later.',
  'Sounds perfect!',
  'I\'ll get back to you on that.',
  'Looking forward to it!',
]

function getRandomResponse(): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

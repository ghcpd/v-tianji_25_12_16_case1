import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Conversation, Message, Contact } from '../types'
import * as mock from '../mock/data'
import { v4 as uuid } from 'uuid'

type State = {
  conversations: Conversation[]
  messages: Message[]
  contacts: Contact[]
  selectedConversationId?: string
  query: string
}

type Action =
  | { type: 'select'; id: string }
  | { type: 'send'; convId: string; text: string }
  | { type: 'receive'; convId: string; text: string }
  | { type: 'search'; query: string }
  | { type: 'addContact'; name: string }
  | { type: 'removeContact'; id: string }

const init: State = {
  conversations: mock.conversations,
  messages: mock.messages,
  contacts: mock.contacts,
  selectedConversationId: mock.conversations[0].id,
  query: ''
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select':
      return { ...state, selectedConversationId: action.id }
    case 'send': {
      const msg: Message = { id: uuid(), conversationId: action.convId, sender: 'me', text: action.text, timestamp: Date.now() }
      return { ...state, messages: [...state.messages, msg] }
    }
    case 'receive': {
      const msg: Message = { id: uuid(), conversationId: action.convId, sender: 'them', text: action.text, timestamp: Date.now() }
      return { ...state, messages: [...state.messages, msg] }
    }
    case 'search':
      return { ...state, query: action.query }
    case 'addContact': {
      const c: Contact = { id: uuid(), name: action.name }
      return { ...state, contacts: [...state.contacts, c] }
    }
    case 'removeContact':
      return { ...state, contacts: state.contacts.filter((c) => c.id !== action.id) }
    default:
      return state
  }
}

const ChatContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init)

  // Simulate incoming messages occasionally
  useEffect(() => {
    const t = setInterval(() => {
      const conv = state.conversations[Math.floor(Math.random() * state.conversations.length)]
      if (!conv) return
      dispatch({ type: 'receive', convId: conv.id, text: 'Automated reply ✨' })
    }, 30_000)
    return () => clearInterval(t)
  }, [state.conversations])

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}

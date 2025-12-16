import React, { createContext, useContext, useReducer } from 'react'

const ChatStateCtx = createContext()
const ChatDispatchCtx = createContext()

const now = () => new Date().toISOString()

const initial = {
  contacts: [
    { id: 'u1', name: 'Ava Turner', bio: 'Product designer', avatarColor: '#7c3aed' },
    { id: 'u2', name: 'Noah Kim', bio: 'Frontend engineer', avatarColor: '#06b6d4' },
    { id: 'u3', name: 'Liam Chen', bio: 'DevOps', avatarColor: '#f97316' }
  ],
  conversations: [
    {
      id: 'c1', participants: ['u1'], title: 'Ava', messages: [
        { id: 'm1', author: 'u1', text: 'Hey! Did you see the new design tokens?', ts: now() },
        { id: 'm2', author: 'me', text: "Yeah — they look great. I'll wire them up today.", ts: now() }
      ]
    },
    {
      id: 'c2', participants: ['u2'], title: 'Noah', messages: [
        { id: 'm3', author: 'u2', text: 'Stuck on a CSS bug — can you take a look?', ts: now() }
      ]
    }
  ],
  selected: 'c1',
  search: ''
}

function chatReducer(state, action){
  switch(action.type){
    case 'select':
      return { ...state, selected: action.id, search: '' }
    case 'setSearch':
      return { ...state, search: action.search }
    case 'send': {
      const { text } = action
      if(!text || !text.trim()) return state
      const convs = state.conversations.map(c => {
        if(c.id !== state.selected) return c
        return { ...c, messages: [...c.messages, { id: 'm' + Math.random().toString(36).slice(2,9), author: 'me', text: text.trim(), ts: now() }] }
      })
      return { ...state, conversations: convs }
    }
    case 'receive': {
      const { convId, text, author } = action
      const convs = state.conversations.map(c => {
        if(c.id !== convId) return c
        return { ...c, messages: [...c.messages, { id: 'm' + Math.random().toString(36).slice(2,9), author: author || 'u1', text, ts: now() }] }
      })
      return { ...state, conversations: convs }
    }
    case 'addContact': {
      const contact = { id: 'u' + Math.random().toString(36).slice(2,6), name: action.name, bio: action.bio || '', avatarColor: '#64748b' }
      return { ...state, contacts: [contact, ...state.contacts] }
    }
    case 'startConversation': {
      const { contactId } = action
      const exists = state.conversations.find(c => c.participants.includes(contactId))
      if(exists) return { ...state, selected: exists.id }
      const contact = state.contacts.find(c => c.id === contactId)
      const conv = { id: 'c' + Math.random().toString(36).slice(2,6), participants: [contactId], title: contact ? contact.name.split(' ')[0] : 'New', messages: [] }
      return { ...state, conversations: [conv, ...state.conversations], selected: conv.id }
    }
    default: return state
  }
}

// Export reducer and initial for unit testing
export { chatReducer, initial }

export function ChatProvider({ children }){
  const [state, dispatch] = useReducer(chatReducer, initial)
  return (
    <ChatDispatchCtx.Provider value={dispatch}>
      <ChatStateCtx.Provider value={state}>{children}</ChatStateCtx.Provider>
    </ChatDispatchCtx.Provider>
  )
}
export const useChatState = () => useContext(ChatStateCtx)
export const useChatDispatch = () => useContext(ChatDispatchCtx)

export type Message = {
  id: string
  conversationId: string
  sender: 'me' | 'them'
  text: string
  timestamp: number
}

export type Conversation = {
  id: string
  title: string
  contactId?: string
  lastSeen?: number
}

export type Contact = {
  id: string
  name: string
  avatar?: string
}

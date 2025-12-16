import { Conversation, Message, Contact } from '../types'
import { v4 as uuid } from 'uuid'

const now = Date.now()

export const contacts: Contact[] = [
  { id: 'c1', name: 'Ava' },
  { id: 'c2', name: 'Liam' },
  { id: 'c3', name: 'Noah' }
]

export const conversations: Conversation[] = [
  { id: 'conv1', title: 'General', contactId: 'c1', lastSeen: now - 1000 * 60 * 60 },
  { id: 'conv2', title: 'Project', contactId: 'c2', lastSeen: now - 1000 * 60 * 30 },
  { id: 'conv3', title: 'Friends', contactId: 'c3', lastSeen: now - 1000 * 60 * 5 }
]

export const messages: Message[] = [
  { id: uuid(), conversationId: 'conv1', sender: 'them', text: 'Welcome to General!', timestamp: now - 1000 * 60 * 60 },
  { id: uuid(), conversationId: 'conv1', sender: 'me', text: 'Thanks! Excited to be here.', timestamp: now - 1000 * 60 * 55 },
  { id: uuid(), conversationId: 'conv2', sender: 'them', text: 'Any updates on the design?', timestamp: now - 1000 * 60 * 30 },
  { id: uuid(), conversationId: 'conv3', sender: 'them', text: 'Game night tomorrow?', timestamp: now - 1000 * 60 * 10 }
]

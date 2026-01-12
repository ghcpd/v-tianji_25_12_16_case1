import create from 'zustand'
import { nanoid } from 'nanoid'

export type Message = {
  id: string
  text: string
  sender: 'me' | 'them'
  ts: number
}

export type Conversation = {
  id: string
  title: string
  messages: Message[]
}

type State = {
  conversations: Conversation[]
  activeId?: string
  contacts: { id: string; name: string }[]
  setActive: (id: string) => void
  sendMessage: (text: string) => void
  searchMessages: (query: string) => Message[]
  addContact: (name: string) => void
  loadMock: () => void
}

export const useChatStore = create<State>((set, get) => ({
  conversations: [],
  contacts: [],
  setActive: (id) => set({ activeId: id }),
  sendMessage: (text) => {
    const { activeId, conversations } = get()
    if (!activeId) return
    const msg: Message = { id: nanoid(), text, sender: 'me', ts: Date.now() }
    set({
      conversations: conversations.map((c) =>
        c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c
      ),
    })
  },
  searchMessages: (query) => {
    if (!query) return []
    const { conversations } = get()
    const results: Message[] = []
    conversations.forEach((c) => {
      c.messages.forEach((m) => {
        if (m.text.toLowerCase().includes(query.toLowerCase())) results.push(m)
      })
    })
    return results
  },
  addContact: (name) => set({ contacts: [...get().contacts, { id: nanoid(), name }] }),
  loadMock: () =>
    set({
      contacts: [
        { id: 'c1', name: 'Alice' },
        { id: 'c2', name: 'Bob' },
        { id: 'c3', name: 'Eve' },
      ],
      conversations: [
        {
          id: 'conv1',
          title: 'Alice',
          messages: [
            { id: 'm1', text: 'Hi, how are you?', sender: 'them', ts: Date.now() - 1000 * 60 * 60 },
            { id: 'm2', text: "I'm good, thanks!", sender: 'me', ts: Date.now() - 1000 * 60 * 50 },
          ],
        },
        {
          id: 'conv2',
          title: 'Bob',
          messages: [
            { id: 'm3', text: 'Are you coming to the meeting?', sender: 'them', ts: Date.now() - 1000 * 60 * 60 * 2 },
          ],
        },
      ],
      activeId: 'conv1',
    }),
}))

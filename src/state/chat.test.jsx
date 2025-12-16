import { describe, it, expect } from 'vitest'
import { chatReducer, initial } from './chat'

describe('chat reducer', () => {
  it('select action updates selected and clears search', () => {
    const s = { ...initial, search: 'foo', selected: 'c1' }
    const out = chatReducer(s, { type: 'select', id: 'c2' })
    expect(out.selected).toBe('c2')
    expect(out.search).toBe('')
  })

  it('setSearch updates search term', () => {
    const out = chatReducer(initial, { type: 'setSearch', search: 'design' })
    expect(out.search).toBe('design')
  })

  it('send adds a message to the selected conversation', () => {
    const s = { ...initial }
    const out = chatReducer(s, { type: 'send', text: 'Hello there' })
    const conv = out.conversations.find(c => c.id === s.selected)
    expect(conv.messages.some(m => m.text === 'Hello there')).toBe(true)
  })

  it('receive adds a message to the given conversation id', () => {
    const s = { ...initial }
    const out = chatReducer(s, { type: 'receive', convId: 'c2', text: 'Incoming', author: 'u2' })
    const conv = out.conversations.find(c => c.id === 'c2')
    expect(conv.messages.some(m => m.text === 'Incoming')).toBe(true)
  })

  it('addContact prepends a contact', () => {
    const out = chatReducer(initial, { type: 'addContact', name: 'Sam', bio: 'QA' })
    expect(out.contacts[0].name).toBe('Sam')
    expect(out.contacts.length).toBe(initial.contacts.length + 1)
  })

  it('startConversation selects existing conversation or creates new one', () => {
    // existing contact u2 has a conversation (c2)
    const out1 = chatReducer(initial, { type: 'startConversation', contactId: 'u2' })
    expect(out1.selected).toBe('c2')

    // create new contact and start
    const withNew = chatReducer(initial, { type: 'addContact', name: 'Xena', bio: '' })
    const newId = withNew.contacts[0].id
    const out2 = chatReducer(withNew, { type: 'startConversation', contactId: newId })
    expect(out2.selected).toBeTruthy()
    expect(out2.conversations[0].participants.includes(newId)).toBe(true)
  })
})

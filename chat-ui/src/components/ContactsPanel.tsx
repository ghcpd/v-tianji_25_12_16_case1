import React, { useState } from 'react'
import { useChatStore } from '../store'

export default function ContactsPanel() {
  const contacts = useChatStore((s) => s.contacts)
  const addContact = useChatStore((s) => s.addContact)
  const [name, setName] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    addContact(name.trim())
    setName('')
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-2">Contacts</h2>
      <div className="space-y-2">
        {contacts.map((c) => (
          <div key={c.id} className="p-2 bg-gray-50 rounded">{c.name}</div>
        ))}
      </div>
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Add contact" className="flex-1 border rounded px-2 py-1" data-testid="add-contact-input" />
        <button className="bg-green-500 text-white px-3 rounded" data-testid="add-contact-btn">Add</button>
      </form>
    </div>
  )
}

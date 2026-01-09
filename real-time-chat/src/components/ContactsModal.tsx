import React, { useState } from 'react'
import { useChat } from '../store/chatContext'

export const ContactsModal: React.FC = () => {
  const { state, dispatch } = useChat()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  return (
    <div>
      <button className="button" onClick={() => setOpen(true)} data-testid="open-contacts">
        Contacts
      </button>
      {open && (
        <div className="panel" role="dialog" aria-modal data-testid="contacts-modal">
          <div className="header">
            <h4 className="text-white">Contacts</h4>
            <button onClick={() => setOpen(false)} className="button">
              Close
            </button>
          </div>

          <div className="contacts-list" data-testid="contacts-list">
            {state.contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div>{c.name}</div>
                <div>
                  <button
                    className="button"
                    onClick={() => dispatch({ type: 'removeContact', id: c.id })}
                    aria-label={`remove-${c.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <input placeholder="New contact name" value={name} onChange={(e) => setName(e.target.value)} data-testid="new-contact" />
            <button
              className="button"
              onClick={() => {
                if (!name.trim()) return
                dispatch({ type: 'addContact', name: name.trim() })
                setName('')
              }}
              data-testid="add-contact"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactsModal

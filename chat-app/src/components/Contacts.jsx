import { useChat } from '../context/ChatContext';
import { useState } from 'react';

const Contacts = () => {
  const { contacts, addContact } = useChat();
  const [newContact, setNewContact] = useState('');

  const handleAdd = () => {
    if (newContact.trim()) {
      addContact(newContact.trim());
      setNewContact('');
    }
  };

  return (
    <div className="contacts">
      <h3>Contacts</h3>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.avatar} {contact.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add contact"
        value={newContact}
        onChange={(e) => setNewContact(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Contacts;
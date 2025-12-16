import React from 'react';
import type { User } from '../types';

export interface ContactListProps {
  users: User[];
  currentUserId: string;
}

export const ContactList: React.FC<ContactListProps> = ({ users, currentUserId }) => {
  return (
    <div className="contact-list">
      <h3>Contacts</h3>
      <ul>
        {users
          .filter((u) => u.id !== currentUserId)
          .map((u) => (
            <li key={u.id} className="contact-item">
              {u.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

import React from 'react';
import type { Message, User } from '../types';

export interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  users: User[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId, users }) => {
  const findUser = (id: string) => users.find((u) => u.id === id)?.name ?? id;

  return (
    <div className="message-list">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`message ${m.sender === currentUserId ? 'sent' : 'received'}`}
        >
          <div className="meta">
            <span className="sender">{findUser(m.sender)}</span>
            <span className="time">{new Date(m.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className="content">{m.content}</div>
        </div>
      ))}
    </div>
  );
};

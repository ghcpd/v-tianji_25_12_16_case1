import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest';
import { MessageList } from '../components/MessageList';
import type { Message, User } from '../types';

test('renders messages with sender names', () => {
  const messages: Message[] = [
    { id: 'm1', conversationId: 'c1', sender: 'u1', content: 'Hi', timestamp: Date.now() },
  ];
  const users: User[] = [{ id: 'u1', name: 'Alice' }];

  render(
    <MessageList messages={messages} currentUserId="u1" users={users} />
  );

  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Hi')).toBeInTheDocument();
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from 'vitest';
import { ConversationList } from '../components/ConversationList';
import type { Conversation } from '../types';

test('renders conversations and handles selection', () => {
  const conversations: Conversation[] = [
    { id: 'c1', title: 'Chat1', participants: [], messages: [] },
    { id: 'c2', title: 'Chat2', participants: [], messages: [] },
  ];
  const onSelect = vi.fn();
  render(
    <ConversationList
      conversations={conversations}
      currentConversationId={null}
      onSelect={onSelect}
    />
  );

  const items = screen.getAllByRole('button');
  expect(items.length).toBe(2);

  fireEvent.click(items[0]);
  expect(onSelect).toHaveBeenCalledWith('c1');
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from 'vitest';
import { ChatInput } from '../components/ChatInput';

test('submits message on send', () => {
  const onSend = vi.fn();
  render(<ChatInput onSend={onSend} />);

  const input = screen.getByLabelText('chat-input');
  fireEvent.change(input, { target: { value: 'Hello' } });
  fireEvent.submit(input);

  expect(onSend).toHaveBeenCalledWith('Hello');
});

import { render, screen, fireEvent } from '@testing-library/react';
import { ChatProvider } from '../context/ChatContext';
import MessageInput from '../components/MessageInput';

test('MessageInput renders', () => {
  render(
    <ChatProvider>
      <MessageInput />
    </ChatProvider>
  );
  expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
});
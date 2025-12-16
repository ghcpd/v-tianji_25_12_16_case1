import { render, screen, fireEvent } from '@testing-library/react';
import { ChatProvider } from '../context/ChatContext';
import ConversationsList from '../components/ConversationsList';

test('ConversationsList renders conversations', () => {
  render(
    <ChatProvider>
      <ConversationsList />
    </ChatProvider>
  );
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});

test('ConversationsList selects conversation', () => {
  render(
    <ChatProvider>
      <ConversationsList />
    </ChatProvider>
  );
  const aliceConv = screen.getByText('Alice').closest('.conversation');
  fireEvent.click(aliceConv);
  expect(aliceConv).toHaveClass('active');
});
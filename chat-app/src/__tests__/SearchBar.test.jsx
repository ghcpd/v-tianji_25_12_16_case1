import { render, screen, fireEvent } from '@testing-library/react';
import { ChatProvider } from '../context/ChatContext';
import SearchBar from '../components/SearchBar';

test('SearchBar updates search term', () => {
  render(
    <ChatProvider>
      <SearchBar />
    </ChatProvider>
  );
  const input = screen.getByPlaceholderText('Search chats...');
  fireEvent.change(input, { target: { value: 'Alice' } });
  expect(input.value).toBe('Alice');
});
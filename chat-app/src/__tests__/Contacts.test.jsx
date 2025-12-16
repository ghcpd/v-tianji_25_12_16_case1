import { render, screen, fireEvent } from '@testing-library/react';
import { ChatProvider } from '../context/ChatContext';
import Contacts from '../components/Contacts';

test('Contacts renders contacts', () => {
  render(
    <ChatProvider>
      <Contacts />
    </ChatProvider>
  );
  expect(screen.getByText('A Alice')).toBeInTheDocument();
});

test('Contacts adds contact', () => {
  render(
    <ChatProvider>
      <Contacts />
    </ChatProvider>
  );
  const input = screen.getByPlaceholderText('Add contact');
  const button = screen.getByText('Add');
  fireEvent.change(input, { target: { value: 'Dave' } });
  fireEvent.click(button);
  expect(screen.getByText('D Dave')).toBeInTheDocument();
});
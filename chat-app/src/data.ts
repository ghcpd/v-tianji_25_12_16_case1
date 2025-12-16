import type { Conversation, User, Message } from './types';

export const currentUser: User = { id: 'u1', name: 'Alice' };

export const users: User[] = [
  currentUser,
  { id: 'u2', name: 'Bob' },
  { id: 'u3', name: 'Carol' },
  { id: 'u4', name: 'David' },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    title: 'Project Alpha',
    participants: ['u1', 'u2'],
    messages: [
      {
        id: 'm1',
        conversationId: 'c1',
        sender: 'u1',
        content: 'Hi Bob, how are you?',
        timestamp: Date.now() - 600000,
      },
      {
        id: 'm2',
        conversationId: 'c1',
        sender: 'u2',
        content: 'I am good, thanks!',
        timestamp: Date.now() - 590000,
      },
    ],
  },
  {
    id: 'c2',
    title: 'Random Chat',
    participants: ['u1', 'u3', 'u4'],
    messages: [
      {
        id: 'm3',
        conversationId: 'c2',
        sender: 'u3',
        content: 'Anyone up for lunch?',
        timestamp: Date.now() - 3600000,
      },
    ],
  },
];

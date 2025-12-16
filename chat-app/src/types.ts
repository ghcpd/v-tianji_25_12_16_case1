export interface Message {
  id: string;
  conversationId: string;
  sender: string; // user id
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  participants: string[]; // user ids
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
}

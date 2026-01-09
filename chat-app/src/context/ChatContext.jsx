import { createContext, useContext, useState } from 'react';

// Mock data
const initialContacts = [
  { id: 1, name: 'Alice', avatar: 'A' },
  { id: 2, name: 'Bob', avatar: 'B' },
  { id: 3, name: 'Charlie', avatar: 'C' },
];

const initialConversations = [
  { id: 1, name: 'Alice', lastMessage: 'Hey!', timestamp: new Date() },
  { id: 2, name: 'Bob', lastMessage: 'How are you?', timestamp: new Date() },
];

const initialMessages = {
  1: [{ id: 1, text: 'Hey!', sender: 'Alice', timestamp: new Date() }],
  2: [{ id: 1, text: 'How are you?', sender: 'Bob', timestamp: new Date() }],
};

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [contacts, setContacts] = useState(initialContacts);
  const [messages, setMessages] = useState(initialMessages);
  const [currentChat, setCurrentChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectConversation = (id) => {
    setCurrentChat(id);
  };

  const sendMessage = (text) => {
    if (!currentChat) return;
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'Me',
      timestamp: new Date(),
    };
    setMessages(prev => ({
      ...prev,
      [currentChat]: [...(prev[currentChat] || []), newMessage],
    }));
    // Update last message
    setConversations(prev => prev.map(conv =>
      conv.id === currentChat ? { ...conv, lastMessage: text, timestamp: new Date() } : conv
    ));
  };

  const addContact = (name) => {
    const newContact = { id: Date.now(), name, avatar: name[0].toUpperCase() };
    setContacts(prev => [...prev, newContact]);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChatContext.Provider value={{
      conversations: filteredConversations,
      contacts,
      messages,
      currentChat,
      searchTerm,
      setSearchTerm,
      selectConversation,
      sendMessage,
      addContact,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
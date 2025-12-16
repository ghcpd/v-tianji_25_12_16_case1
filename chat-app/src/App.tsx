import React, { useState } from 'react';
import './App.css';
import { mockConversations, currentUser, users } from './data';
import type { Conversation } from './types';
import { ConversationList } from './components/ConversationList';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { SearchBar } from './components/SearchBar';
import { ContactList } from './components/ContactList';

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(
    mockConversations[0]?.id || null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const currentConversation = conversations.find((c) => c.id === currentConversationId) || null;

  const handleSendMessage = (content: string) => {
    if (!currentConversation) return;
    const newMessage = {
      id: `m${Date.now()}`,
      conversationId: currentConversation.id,
      sender: currentUser.id,
      content,
      timestamp: Date.now(),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentConversation.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );
  };

  const filteredConversations = conversations.filter((c) => {
    const inTitle = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const inMessages = c.messages.some((m) =>
      m.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return inTitle || inMessages;
  });

  return (
    <div className="app-container">
      <aside className="sidebar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search chats..." />
        <ConversationList
          conversations={filteredConversations}
          currentConversationId={currentConversationId}
          onSelect={setCurrentConversationId}
        />
        <ContactList users={users} currentUserId={currentUser.id} />
      </aside>
      <main className="chat-window">
        {currentConversation ? (
          <>
            <h2>{currentConversation.title}</h2>
            <MessageList
              messages={currentConversation.messages}
              currentUserId={currentUser.id}
              users={users}
            />
            <ChatInput onSend={handleSendMessage} />
          </>
        ) : (
          <div>Select a conversation</div>
        )}
      </main>
    </div>
  );
}

export default App;

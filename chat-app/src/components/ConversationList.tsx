import React from 'react';
import type { Conversation } from '../types';

export interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelect: (conversationId: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentConversationId,
  onSelect,
}) => {
  return (
    <div className="conversation-list">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={`conversation-item ${conv.id === currentConversationId ? 'active' : ''}`}
          onClick={() => onSelect(conv.id)}
          role="button"
        >
          <div className="title">{conv.title}</div>
          <div className="last-message">
            {conv.messages[conv.messages.length - 1]?.content ?? 'No messages'}
          </div>
        </div>
      ))}
    </div>
  );
};

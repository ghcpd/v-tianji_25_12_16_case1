import { useChat } from '../context/ChatContext';

const ConversationsList = () => {
  const { conversations, selectConversation, currentChat } = useChat();

  return (
    <div className="conversations">
      {conversations.map(conv => (
        <div
          key={conv.id}
          className={`conversation ${currentChat === conv.id ? 'active' : ''}`}
          onClick={() => selectConversation(conv.id)}
        >
          <div className="avatar">{conv.name[0]}</div>
          <div className="info">
            <div className="name">{conv.name}</div>
            <div className="last-message">{conv.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList;
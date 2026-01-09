import { useChat } from '../context/ChatContext';

const MessageList = () => {
  const { currentChat, messages } = useChat();
  const msgs = messages[currentChat] || [];

  return (
    <div className="messages">
      {msgs.map(msg => (
        <div key={msg.id} className={`message ${msg.sender === 'Me' ? 'mine' : ''}`}>
          <div className="text">{msg.text}</div>
          <div className="timestamp">{msg.timestamp.toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
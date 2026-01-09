import { useChat } from '../context/ChatContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const { currentChat, conversations } = useChat();
  const currentConv = conversations.find(c => c.id === currentChat);

  if (!currentChat) {
    return <div className="chat-window">Select a conversation</div>;
  }

  return (
    <div className="chat-window">
      <div className="header">{currentConv.name}</div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
import { useChat } from '../context/ChatContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useChat();

  return (
    <input
      type="text"
      placeholder="Search chats..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
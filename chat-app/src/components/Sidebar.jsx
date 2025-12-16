import ConversationsList from './ConversationsList';
import Contacts from './Contacts';
import SearchBar from './SearchBar';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchBar />
      <ConversationsList />
      <Contacts />
    </div>
  );
};

export default Sidebar;
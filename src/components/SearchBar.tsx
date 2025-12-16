import React from 'react'
import { useChatContext } from '@/context/ChatContext'
import { Search } from 'lucide-react'

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, searchMessages } = useChatContext()

  const results = searchMessages(searchQuery)

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="search-input"
        />
      </div>
      {searchQuery && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {results.map((msg) => (
            <div key={msg.id} className="px-4 py-2 border-b border-gray-100 last:border-b-0 text-sm">
              <p className="text-gray-700">{msg.content}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.senderName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

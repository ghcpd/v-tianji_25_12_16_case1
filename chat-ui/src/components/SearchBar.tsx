import React, { useState } from 'react'
import { useChatStore } from '../store'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const searchMessages = useChatStore((s) => s.searchMessages)
  const conversations = useChatStore((s) => s.conversations)
  const setActive = useChatStore((s) => s.setActive)

  const results = q ? searchMessages(q) : []

  const jumpToMessage = (msgId: string) => {
    // find conversation containing message
    const conv = conversations.find((c) => c.messages.find((m) => m.id === msgId))
    if (conv) {
      setActive(conv.id)
      setQ('')
    }
  }

  return (
    <div className="p-3 border-b">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search messages"
        className="w-full border rounded px-2 py-1"
        data-testid="search-input"
      />
      {q && (
        <div className="mt-2 bg-white rounded shadow p-2 max-h-48 overflow-auto" data-testid="search-results">
          {results.length === 0 ? (
            <div className="text-sm text-gray-500">No results</div>
          ) : (
            results.map((r) => (
              <div key={r.id} className="p-2 border-b cursor-pointer" onClick={() => jumpToMessage(r.id)}>{r.text}</div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

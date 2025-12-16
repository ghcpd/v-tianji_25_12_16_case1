import React from 'react'
import { useChatStore } from '../store'

export default function ChatList() {
  const conversations = useChatStore((s) => s.conversations)
  const activeId = useChatStore((s) => s.activeId)
  const setActive = useChatStore((s) => s.setActive)

  return (
    <div className="p-2 overflow-auto h-full">
      {conversations.map((c) => (
        <div
          key={c.id}
          className={`p-3 rounded-md cursor-pointer mb-2 hover:bg-gray-100 flex items-center justify-between ${
            activeId === c.id ? 'bg-gray-100' : ''
          }`}
          onClick={() => setActive(c.id)}
          data-testid={`chat-${c.id}`}
        >
          <div>
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-gray-500 truncate" style={{ maxWidth: 200 }}>
              {c.messages[c.messages.length - 1]?.text}
            </div>
          </div>
          <div className="text-xs text-gray-400">{c.messages.length}</div>
        </div>
      ))}
    </div>
  )
}

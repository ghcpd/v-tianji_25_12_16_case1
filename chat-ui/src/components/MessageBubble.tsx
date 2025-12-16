import React from 'react'
import { Message } from '../store'

export default function MessageBubble({ m }: { m: Message }) {
  const time = new Date(m.ts).toLocaleTimeString()
  return (
    <div className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg my-1 text-sm ${
          m.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
        }`}
        data-testid={`message-${m.id}`}
      >
        <div>{m.text}</div>
        <div className="text-xs text-gray-300 mt-1 text-right">{time}</div>
      </div>
    </div>
  )
}

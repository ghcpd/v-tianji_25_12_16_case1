import React, { useState } from 'react'
import { useChatStore } from '../store'

export default function MessageInput() {
  const [text, setText] = useState('')
  const sendMessage = useChatStore((s) => s.sendMessage)

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!text.trim()) return
    sendMessage(text.trim())
    setText('')
  }

  return (
    <form onSubmit={submit} className="p-4 border-t bg-white flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="flex-1 border rounded px-3 py-2"
        data-testid="message-input"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded" data-testid="send-btn">
        Send
      </button>
    </form>
  )
}

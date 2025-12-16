import React, { useMemo, useRef, useEffect } from 'react'
import { useChatStore } from '../store'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'

export default function ChatWindow() {
  const activeId = useChatStore((s) => s.activeId)
  const conv = useChatStore((s) => s.conversations.find((c) => c.id === s.activeId))
  const search = useChatStore((s) => s.searchMessages)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      // jsdom doesn't implement scrollTo — fallback to scrollTop
      if (typeof (ref.current as any).scrollTo === 'function') {
        ref.current.scrollTo({ top: ref.current.scrollHeight })
      } else {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }
  }, [conv?.messages.length])

  if (!conv) return <div className="p-4">No conversation selected</div>

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <div className="text-lg font-semibold" data-testid="active-title">{conv.title}</div>
      </div>
      <div className="flex-1 overflow-auto p-4" ref={ref} data-testid="messages">
        {conv.messages.map((m) => (
          <MessageBubble m={m} key={m.id} />
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

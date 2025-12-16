import React, { useState } from 'react'
import { useChat } from '../store/chatContext'

export const MessageInput: React.FC = () => {
  const { state, dispatch } = useChat()
  const [text, setText] = useState('')
  const convId = state.selectedConversationId

  function send() {
    if (!text.trim() || !convId) return
    dispatch({ type: 'send', convId, text: text.trim() })
    setText('')

    // simulate reply
    setTimeout(() => {
      dispatch({ type: 'receive', convId, text: 'Thanks — got it!' })
    }, 600)
  }

  return (
    <div className="input-row">
      <input
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        data-testid="message-input"
      />
      <button className="button" onClick={send} data-testid="send-button">
        Send
      </button>
    </div>
  )
}

export default MessageInput

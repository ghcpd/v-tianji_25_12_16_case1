import React, { useEffect, useMemo, useState } from 'react'
import { useChatState, useChatDispatch } from './state/chat'
import clsx from 'clsx'

function SearchBar({ value, onChange, placeholder }){
  return (
    <div className="search" role="search">
      <input aria-label="search" className="input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

function ConversationList(){
  const s = useChatState()
  const d = useChatDispatch()
  return (
    <div className="panel">
      <div className="header">
        <div className="title">Conversations</div>
        <div style={{marginLeft:'auto'}} className="muted">{s.conversations.length}</div>
      </div>
      <SearchBar value={s.search} onChange={q => d({ type: 'setSearch', search: q })} placeholder="Search messages or names" />

      <div style={{marginTop:12}}>
        {s.conversations.filter(c => {
          if(!s.search) return true
          const q = s.search.toLowerCase()
          if(c.title.toLowerCase().includes(q)) return true
          return c.messages.some(m => m.text.toLowerCase().includes(q))
        }).map(c => {
          const last = c.messages[c.messages.length - 1]
          const active = s.selected === c.id
          return (
            <div key={c.id} className={clsx('conv-item', { active })} onClick={() => d({ type: 'select', id: c.id })} data-testid={`conv-${c.id}`}>
              <div className="avatar">{c.title.slice(0,2)}</div>
              <div className="meta">
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{fontWeight:700}}>{c.title}</div>
                  <div className="muted" style={{fontSize:12}}>{c.participants.length > 1 ? `${c.participants.length} members` : ''}</div>
                </div>
                <div className="muted" style={{marginTop:6,fontSize:13}}>{last ? last.text : <i className="muted">No messages yet</i>}</div>
              </div>
              <div className="right">
                <div className="muted">{last ? new Date(last.ts).toLocaleTimeString() : ''}</div>
                <div style={{marginTop:8}} className="small">{last && last.author === 'me' ? 'You' : 'Contact'}</div>
              </div>
            </div>
          )
        })}
        {s.conversations.length === 0 && <div className="empty">No conversations yet</div>}
      </div>

      <div className="footer-note">Tip: search matches message text or conversation title.</div>
    </div>
  )
}

function Message({ m }){
  const me = m.author === 'me'
  return (
    <div className={clsx('msg-row', { me })}>
      {!me && <div className="avatar" style={{width:36,height:36,borderRadius:8,fontSize:13}}>{m.author === 'me' ? 'Me' : m.author.slice(0,2)}</div>}
      <div className={clsx('bubble', { me })} title={new Date(m.ts).toLocaleString()}>{m.text}</div>
      {me && <div style={{minWidth:44}}></div>}
    </div>
  )
}

function ChatWindow(){
  const s = useChatState()
  const d = useChatDispatch()
  const conv = s.conversations.find(c => c.id === s.selected)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const messagesRef = React.useRef()

  useEffect(() => { // auto-scroll
    const el = messagesRef.current
    if(el) el.scrollTop = el.scrollHeight
  }, [conv && conv.messages.length])

  useEffect(() => { // simulate inbound messages occasionally for active conversation
    if(!conv) return
    const t = setInterval(() => {
      // 10% chance
      if(Math.random() > 0.9) d({ type: 'receive', convId: conv.id, text: '👋 auto hello from ' + conv.title })
    }, 4500)
    return () => clearInterval(t)
  }, [conv])

  function doSend(){
    if(!text.trim()) return
    setSending(true)
    d({ type: 'send', text })
    const sentText = text
    setText('')
    // simulate reply
    setTimeout(() => {
      d({ type: 'receive', convId: conv.id, text: `Reply to: ${sentText}`, author: conv.participants[0] })
      setSending(false)
    }, 520)
  }

  if(!conv) return <div className="panel chat-area"><div className="empty">No conversation selected</div></div>

  const visible = conv.messages.filter(m => {
    if(!s.search) return true
    return m.text.toLowerCase().includes(s.search.toLowerCase())
  })

  return (
    <div className="panel chat-area">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{fontWeight:800,fontSize:16}}>{conv.title}</div>
        <div className="muted">{conv.participants.length} • {conv.messages.length} messages</div>
        <div style={{marginLeft:'auto'}} className="muted">Last: {conv.messages.length ? new Date(conv.messages[conv.messages.length -1].ts).toLocaleTimeString() : '—'}</div>
      </div>

      <div ref={messagesRef} className="messages" data-testid="messages">
        {visible.length === 0 && <div className="empty">No messages match your search</div>}
        {visible.map(m => <Message key={m.id} m={m} />)}
      </div>

      <div className="input-row">
        <input aria-label="message-input" className="input" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') doSend() }} placeholder="Write a message and press Enter" />
        <button aria-label="send" className="btn" onClick={doSend} disabled={sending}>{sending ? '...' : 'Send'}</button>
      </div>
    </div>
  )
}

function Contacts(){
  const s = useChatState()
  const d = useChatDispatch()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  return (
    <div className="panel right">
      <div className="header">
        <div className="title">Contacts</div>
        <div style={{marginLeft:'auto'}} className="muted">{s.contacts.length}</div>
      </div>

      <div style={{display:'grid',gap:8}}>
        <div style={{display:'flex',gap:8}}>
          <input aria-label="new-contact-name" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Add contact name" />
          <button className="small btn" onClick={() => { if(!name.trim()) return; d({ type: 'addContact', name: name.trim(), bio: bio.trim() }); setName(''); setBio('') }}>Add</button>
        </div>
        <input aria-label="new-contact-bio" className="input" value={bio} onChange={e => setBio(e.target.value)} placeholder="Job / note (optional)" />
      </div>

      <div style={{marginTop:12}}>
        {s.contacts.map(c => (
          <div key={c.id} className="contact-item" data-testid={`contact-${c.id}`}>
            <div className="avatar" style={{background: c.avatarColor}}>{c.name.split(' ')[0].slice(0,2)}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{c.name}</div>
              <div className="muted" style={{fontSize:13,marginTop:6}}>{c.bio || '—'}</div>
              <div className="contact-actions">
                <button className="small" onClick={() => d({ type: 'startConversation', contactId: c.id })}>Chat</button>
                <button className="small" onClick={() => { navigator?.clipboard?.writeText?.(c.name).catch(()=>{}) }}>Copy</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-note">Demo app — data is mock/in-memory only.</div>
    </div>
  )
}

export default function App(){
  return (
    <div className="app" data-testid="app-root">
      <div className="container">
        <ConversationList />
        <ChatWindow />
        <Contacts />
      </div>
    </div>
  )
}

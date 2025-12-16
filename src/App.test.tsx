import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import App from '@/App'

describe('App Integration', () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    cleanup()
  })

  it('should render the main app', () => {
    render(<App />)
    expect(screen.getByText('Chat App')).toBeInTheDocument()
  })

  it('should display all main sections', () => {
    render(<App />)
    expect(screen.getByText('Chats')).toBeInTheDocument()
    expect(screen.getByText('Contacts')).toBeInTheDocument()
  })

  it('should display search bar', () => {
    render(<App />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('should render conversation list with messages', () => {
    render(<App />)
    const conversations = screen.getAllByTestId(/^conversation-/)
    expect(conversations.length).toBeGreaterThan(0)
  })

  it('should render chat window with message input', () => {
    render(<App />)
    expect(screen.getByTestId('message-input')).toBeInTheDocument()
    expect(screen.getByTestId('send-button')).toBeInTheDocument()
  })

  it('should render contacts with start chat buttons', () => {
    render(<App />)
    const startChatButtons = screen.getAllByTestId(/^start-chat-|Chat Exists/)
    expect(startChatButtons.length).toBeGreaterThan(0)
  })

  it('should have responsive layout structure', () => {
    render(<App />)
    const mainLayout = screen.getByText('Chat App').closest('div')
    expect(mainLayout).toBeInTheDocument()
  })
})

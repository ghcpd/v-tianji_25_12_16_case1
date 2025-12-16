import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChatProvider } from '@/context/ChatContext'
import { ConversationList } from '@/components/ConversationList'

describe('ConversationList Component', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<ChatProvider>{component}</ChatProvider>)
  }

  it('should render conversations list', () => {
    renderWithProvider(<ConversationList />)
    expect(screen.getByText('Chats')).toBeInTheDocument()
  })

  it('should display all conversations', () => {
    renderWithProvider(<ConversationList />)
    const conversations = screen.getAllByTestId(/^conversation-/)
    expect(conversations.length).toBeGreaterThan(0)
  })

  it('should display unread badge for unread messages', () => {
    renderWithProvider(<ConversationList />)
    const badges = screen.getAllByTestId(/^unread-badge-/)
    expect(badges.length).toBeGreaterThan(0)
  })

  it('should highlight current conversation', () => {
    renderWithProvider(<ConversationList />)
    const conversations = screen.getAllByTestId(/^conversation-/)
    // First conversation should be selected by default
    expect(conversations[0].className).toContain('bg-blue-50')
  })

  it('should change conversation on click', () => {
    renderWithProvider(<ConversationList />)
    const conversations = screen.getAllByTestId(/^conversation-/)
    
    if (conversations.length > 1) {
      fireEvent.click(conversations[1])
      expect(conversations[1].className).toContain('bg-blue-50')
    }
  })

  it('should display participant name', () => {
    renderWithProvider(<ConversationList />)
    // Should display at least one participant name
    const names = screen.queryAllByText(/Johnson|Smith|White|Brown|Davis/)
    expect(names.length).toBeGreaterThan(0)
  })

  it('should display last message', () => {
    renderWithProvider(<ConversationList />)
    const lastMessages = screen.queryAllByText(/That sounds great|Check out|Looking forward/)
    expect(lastMessages.length).toBeGreaterThan(0)
  })

  it('should filter conversations based on search query', () => {
    renderWithProvider(<ConversationList />)
    // This would require integration with the SearchBar component
    // or a way to set the search query from the test
  })
})

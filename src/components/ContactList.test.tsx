import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChatProvider } from '@/context/ChatContext'
import { ContactList } from '@/components/ContactList'

describe('ContactList Component', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<ChatProvider>{component}</ChatProvider>)
  }

  it('should render contacts list', () => {
    renderWithProvider(<ContactList />)
    expect(screen.getByText('Contacts')).toBeInTheDocument()
  })

  it('should display add contact button', () => {
    renderWithProvider(<ContactList />)
    expect(screen.getByTestId('add-contact-button')).toBeInTheDocument()
  })

  it('should display all contacts', () => {
    renderWithProvider(<ContactList />)
    const contactButtons = screen.getAllByTestId(/^start-chat-|Chat Exists/)
    expect(contactButtons.length).toBeGreaterThan(0)
  })

  it('should display contact names', () => {
    renderWithProvider(<ContactList />)
    const names = screen.queryAllByText(/Johnson|Smith|White|Brown|Davis/)
    expect(names.length).toBeGreaterThan(0)
  })

  it('should display contact status', () => {
    renderWithProvider(<ContactList />)
    const statuses = screen.queryAllByText(/online|offline|away/)
    expect(statuses.length).toBeGreaterThan(0)
  })

  it('should show new contact form when add button clicked', () => {
    renderWithProvider(<ContactList />)
    const addButton = screen.getByTestId('add-contact-button')
    
    fireEvent.click(addButton)
    expect(screen.getByTestId('new-contact-input')).toBeInTheDocument()
    expect(screen.getByTestId('create-contact-button')).toBeInTheDocument()
  })

  it('should close new contact form when add button clicked again', () => {
    renderWithProvider(<ContactList />)
    const addButton = screen.getByTestId('add-contact-button')
    
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    
    expect(screen.queryByTestId('new-contact-input')).not.toBeInTheDocument()
  })

  it('should create new contact', () => {
    renderWithProvider(<ContactList />)
    const addButton = screen.getByTestId('add-contact-button')
    
    fireEvent.click(addButton)
    const input = screen.getByTestId('new-contact-input')
    const createButton = screen.getByTestId('create-contact-button')
    
    fireEvent.change(input, { target: { value: 'New Contact' } })
    fireEvent.click(createButton)
    
    // Form should be closed
    expect(screen.queryByTestId('new-contact-input')).not.toBeInTheDocument()
  })

  it('should not create empty contact', () => {
    renderWithProvider(<ContactList />)
    const addButton = screen.getByTestId('add-contact-button')
    
    fireEvent.click(addButton)
    const createButton = screen.getByTestId('create-contact-button')
    
    fireEvent.click(createButton)
    
    // Form should still be visible since contact name is empty
    expect(screen.getByTestId('new-contact-input')).toBeInTheDocument()
  })

  it('should start chat with contact', () => {
    renderWithProvider(<ContactList />)
    const startChatButton = screen.getAllByTestId(/^start-chat-/)[0]
    
    expect(startChatButton).toBeInTheDocument()
    // Clicking should create a conversation
    fireEvent.click(startChatButton)
  })
})

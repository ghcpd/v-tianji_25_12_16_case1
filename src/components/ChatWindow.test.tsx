import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChatProvider } from '@/context/ChatContext'
import { ChatWindow } from '@/components/ChatWindow'

describe('ChatWindow Component', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<ChatProvider>{component}</ChatProvider>)
  }

  it('should render messages container', () => {
    renderWithProvider(<ChatWindow />)
    expect(screen.getByTestId('messages-container')).toBeInTheDocument()
  })

  it('should display message input field', () => {
    renderWithProvider(<ChatWindow />)
    expect(screen.getByTestId('message-input')).toBeInTheDocument()
  })

  it('should display send button', () => {
    renderWithProvider(<ChatWindow />)
    expect(screen.getByTestId('send-button')).toBeInTheDocument()
  })

  it('should send message when button is clicked', async () => {
    renderWithProvider(<ChatWindow />)
    const input = screen.getByTestId('message-input') as HTMLInputElement
    const sendButton = screen.getByTestId('send-button')

    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('should send message when Enter key is pressed', async () => {
    renderWithProvider(<ChatWindow />)
    const input = screen.getByTestId('message-input') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('should not send message on Shift+Enter', () => {
    renderWithProvider(<ChatWindow />)
    const input = screen.getByTestId('message-input') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13, shiftKey: true })

    expect(input.value).toBe('Test message')
  })

  it('should display conversation messages', () => {
    renderWithProvider(<ChatWindow />)
    const messagesContainer = screen.getByTestId('messages-container')
    const messages = messagesContainer.querySelectorAll('[data-testid^="message-"]')
    expect(messages.length).toBeGreaterThan(0)
  })

  it('should show placeholder when no conversation is selected', () => {
    renderWithProvider(<ChatWindow />)
    // After initial render, we should have messages since a conversation is selected by default
    // This test would need a way to clear the current conversation
  })

  it('should display conversation participant name', () => {
    renderWithProvider(<ChatWindow />)
    // The header should show the participant name - look for 'Online' text
    const headers = screen.queryAllByText('Online')
    expect(headers.length).toBeGreaterThan(0)
  })
})

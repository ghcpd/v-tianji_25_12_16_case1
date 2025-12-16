import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders chat app and sends a message', async () => {
    render(<App />)

    const input = screen.getByTestId('message-input') as HTMLInputElement
    const send = screen.getByTestId('send-button')

    fireEvent.change(input, { target: { value: 'Hello test' } })
    fireEvent.click(send)

    await waitFor(() => expect(screen.getByText('Hello test')).toBeInTheDocument())
  })

  test('search filters conversations', () => {
    render(<App />)
    const search = screen.getByTestId('chat-search') as HTMLInputElement
    fireEvent.change(search, { target: { value: 'Project' } })
    expect(screen.getByText('Project')).toBeInTheDocument()
  })

  test('can add and remove contacts', async () => {
    render(<App />)
    const open = screen.getByTestId('open-contacts')
    fireEvent.click(open)

    const newInput = screen.getByTestId('new-contact') as HTMLInputElement
    const add = screen.getByTestId('add-contact')

    fireEvent.change(newInput, { target: { value: 'Zoe' } })
    fireEvent.click(add)

    await waitFor(() => expect(screen.getByText('Zoe')).toBeInTheDocument())

    const removeBtn = screen.getByLabelText('remove-Zoe')
    fireEvent.click(removeBtn)

    await waitFor(() => expect(screen.queryByText('Zoe')).not.toBeInTheDocument())
  })

  test('selects a conversation and shows its messages', async () => {
    render(<App />)
    const convBtn = screen.getByTestId('conv-conv2')
    fireEvent.click(convBtn)
    expect(screen.getByTestId('conv-title')).toHaveTextContent('Project')
    // project has an initial message about design
    expect(screen.getByText(/design/i)).toBeInTheDocument()
  })

  test('sends a message and receives automated reply', async () => {
    render(<App />)
    const input = screen.getByTestId('message-input') as HTMLInputElement
    const send = screen.getByTestId('send-button')
    fireEvent.change(input, { target: { value: 'Ping' } })
    fireEvent.click(send)
    await waitFor(() => expect(screen.getByText('Ping')).toBeInTheDocument())
    // wait for automated reply inside MessageInput (600ms)
    await waitFor(() => expect(screen.getByText(/Thanks — got it!/)).toBeInTheDocument(), { timeout: 2000 })
  })
})

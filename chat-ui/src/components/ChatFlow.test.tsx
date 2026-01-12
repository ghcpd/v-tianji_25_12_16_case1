import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Chat interactions', () => {
  it('can switch conversations and send message', async () => {
    render(<App />)
    // wait for mock to load (effect runs synchronously)
    const chatAlice = await screen.findByTestId('chat-conv1')
    // click Bob
    const chatBob = screen.getByTestId('chat-conv2')
    await userEvent.click(chatBob)
    // active should show Bob in header
    expect(screen.getByTestId('active-title')).toHaveTextContent('Bob')

    // send message
    const input = screen.getByTestId('message-input') as HTMLInputElement
    const sendBtn = screen.getByTestId('send-btn')
    await userEvent.type(input, 'Hello Bob')
    await userEvent.click(sendBtn)

    // new message should appear inside the message list
    const messages = within(screen.getByTestId('messages'))
    expect(messages.getByText('Hello Bob')).toBeInTheDocument()
  })

  it('search finds messages and jumps to conversation', async () => {
    render(<App />)
    const search = screen.getByTestId('search-input')
    await userEvent.type(search, 'meeting')
    const results = await screen.findByTestId('search-results')
    expect(results).toBeInTheDocument()
    const resultsScope = within(results)
    expect(resultsScope.getByText(/meeting/i)).toBeInTheDocument()
  })

  it('can add contacts', async () => {
    render(<App />)
    const addInput = screen.getByTestId('add-contact-input')
    const addBtn = screen.getByTestId('add-contact-btn')
    await userEvent.type(addInput, 'Charlie')
    await userEvent.click(addBtn)
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })
})

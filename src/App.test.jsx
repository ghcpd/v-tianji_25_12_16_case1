import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'
import { ChatProvider } from './state/chat'

test('renders main UI (smoke)', () => {
  render(
    <ChatProvider>
      <App />
    </ChatProvider>
  )
  expect(screen.getByTestId('app-root')).toBeInTheDocument()
  expect(screen.getByText(/Conversations/i)).toBeInTheDocument()
})

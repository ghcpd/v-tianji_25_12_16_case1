import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { vi } from 'vitest'

vi.mock('./store', () => {
  const actual = vi.importActual('./store')
  return actual
})

describe('App', () => {
  it('renders header', () => {
    render(<App />)
    expect(screen.getByText(/Real-Time Chat/i)).toBeInTheDocument()
  })
})

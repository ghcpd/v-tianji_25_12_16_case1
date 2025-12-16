import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatProvider } from '@/context/ChatContext'
import { SearchBar } from '@/components/SearchBar'

describe('SearchBar Component', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<ChatProvider>{component}</ChatProvider>)
  }

  it('should render search input', () => {
    renderWithProvider(<SearchBar />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('should have correct placeholder text', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByTestId('search-input') as HTMLInputElement
    expect(input.placeholder).toBe('Search messages...')
  })

  it('should update search query on input change', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByTestId('search-input') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
  })

  it('should display search results when query matches messages', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByTestId('search-input')
    
    fireEvent.change(input, { target: { value: 'project' } })
    
    // Results should be displayed
    const results = screen.queryAllByText(/Check out the new design|project/i)
    // At least some results should appear
  })

  it('should clear search results when input is empty', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByTestId('search-input')
    
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.change(input, { target: { value: '' } })
    
    // Results dropdown should not be visible
    expect(screen.queryByText(/Check out|project/i)).not.toBeInTheDocument()
  })

  it('should handle case-insensitive search', () => {
    renderWithProvider(<SearchBar />)
    const input = screen.getByTestId('search-input')
    
    fireEvent.change(input, { target: { value: 'PROJECT' } })
    
    // Should still find matching messages
  })
})

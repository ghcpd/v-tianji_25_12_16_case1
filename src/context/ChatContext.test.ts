import { expect, describe, it, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ChatProvider, useChatContext } from '@/context/ChatContext'
import { ReactNode } from 'react'
import React from 'react'

const wrapper = ({ children }: { children: ReactNode }) => React.createElement(ChatProvider, { children })

describe('ChatContext', () => {
  describe('Initial State', () => {
    it('should initialize with mock conversations', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      expect(result.current.conversations.length).toBeGreaterThan(0)
    })

    it('should initialize with mock contacts', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      expect(result.current.contacts.length).toBeGreaterThan(0)
    })

    it('should initialize with mock messages', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      expect(result.current.messages.length).toBeGreaterThan(0)
    })

    it('should set first conversation as current', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      expect(result.current.currentConversationId).toBeTruthy()
    })
  })

  describe('Message Management', () => {
    it('should send a message', async () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const initialCount = result.current.messages.length

      act(() => {
        result.current.sendMessage('Hello, world!')
      })

      expect(result.current.messages.length).toBe(initialCount + 1)
      expect(result.current.messages[result.current.messages.length - 1].content).toBe('Hello, world!')
    })

    it('should not send empty message', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const initialCount = result.current.messages.length

      act(() => {
        result.current.sendMessage('')
      })

      expect(result.current.messages.length).toBe(initialCount)
    })

    it('should update conversation last message when sending', async () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const conversationId = result.current.currentConversationId!
      const conversation = result.current.conversations.find((c) => c.id === conversationId)

      act(() => {
        result.current.sendMessage('Test message')
      })

      const updatedConv = result.current.conversations.find((c) => c.id === conversationId)
      expect(updatedConv?.lastMessage).toBe('Test message')
    })

    it('should search messages by content', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })

      const results = result.current.searchMessages('project')
      expect(results.length).toBeGreaterThan(0)
      expect(results.every((m) => m.content.toLowerCase().includes('project'))).toBe(true)
    })

    it('should return empty array for empty search', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const results = result.current.searchMessages('')
      expect(results.length).toBe(0)
    })
  })

  describe('Conversation Management', () => {
    it('should set current conversation', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const conversationId = result.current.conversations[1]?.id

      act(() => {
        result.current.setCurrentConversationId(conversationId)
      })

      expect(result.current.currentConversationId).toBe(conversationId)
    })

    it('should create new conversation from contact', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const initialCount = result.current.conversations.length
      const contactId = result.current.contacts[0]?.id

      act(() => {
        result.current.createConversation(contactId)
      })

      expect(result.current.conversations.length).toBe(initialCount + 1)
    })

    it('should delete conversation', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const conversationId = result.current.conversations[0]?.id
      const initialCount = result.current.conversations.length

      act(() => {
        result.current.deleteConversation(conversationId)
      })

      expect(result.current.conversations.length).toBe(initialCount - 1)
      expect(result.current.conversations.find((c) => c.id === conversationId)).toBeUndefined()
    })

    it('should filter conversations by name', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })

      act(() => {
        result.current.setSearchQuery('Alice')
      })

      const filtered = result.current.getFilteredConversations()
      expect(filtered.every((c) => c.participantName.toLowerCase().includes('alice'))).toBe(true)
    })

    it('should filter conversations by message content', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })

      act(() => {
        result.current.setSearchQuery('sounds')
      })

      const filtered = result.current.getFilteredConversations()
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('should return all conversations with empty search', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })

      act(() => {
        result.current.setSearchQuery('')
      })

      const filtered = result.current.getFilteredConversations()
      expect(filtered.length).toBe(result.current.conversations.length)
    })
  })

  describe('Contact Management', () => {
    it('should add contact', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const initialCount = result.current.contacts.length

      act(() => {
        result.current.addContact({
          id: 'test-contact',
          name: 'Test Contact',
          avatar: '👤',
          status: 'online',
        })
      })

      expect(result.current.contacts.length).toBe(initialCount + 1)
      expect(result.current.contacts.some((c) => c.id === 'test-contact')).toBe(true)
    })

    it('should remove contact', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })
      const contactId = result.current.contacts[0]?.id
      const initialCount = result.current.contacts.length

      act(() => {
        result.current.removeContact(contactId)
      })

      expect(result.current.contacts.length).toBe(initialCount - 1)
      expect(result.current.contacts.find((c) => c.id === contactId)).toBeUndefined()
    })
  })

  describe('Search Query Management', () => {
    it('should set search query', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })

      act(() => {
        result.current.setSearchQuery('test query')
      })

      expect(result.current.searchQuery).toBe('test query')
    })

    it('should clear search query', () => {
      const { result } = renderHook(() => useChatContext(), { wrapper })

      act(() => {
        result.current.setSearchQuery('test')
        result.current.setSearchQuery('')
      })

      expect(result.current.searchQuery).toBe('')
    })
  })
})

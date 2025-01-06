'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Loader } from 'lucide-react'

export default function ChatButton() {
  const [isVisible, setIsVisible] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setError(null)
    const newMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(data.details || 'Too many requests. Please wait a moment before trying again.')
        }
        throw new Error(data.error || 'Failed to get response')
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(errorMessage)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  if (!isVisible && !isChatOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-red-700 text-white rounded-full p-3 shadow-lg hover:bg-red-800 transition-colors duration-300"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {isChatOpen && (
        <div className="bg-gray-900 rounded-lg shadow-xl w-80 sm:w-96 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Chat with AI</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-red-700 text-white' : 'bg-gray-700 text-white'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-red-700 text-white rounded-full px-4 py-2 hover:bg-red-800 transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}


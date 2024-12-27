'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'bot', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 w-96 h-[500px] bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-blue-600 bg-opacity-80 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat with Raj's AI Assistant</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.role === 'user' ? 'bg-blue-100 bg-opacity-80' : 'bg-gray-100 bg-opacity-80'
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <span className="inline-block p-2 rounded-lg bg-gray-100 bg-opacity-80">
                    Thinking...
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


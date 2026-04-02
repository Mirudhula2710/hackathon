'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/translations'
import VoiceInput from './VoiceInput'
import PhotoUpload from './PhotoUpload'

export default function ChatInterface({ categorySlug, onMessageComplete }) {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() && !uploadedImage) return

    const userMessage = input || (uploadedImage ? 'Analyze this photo' : '')
    
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          userMessage,
          language,
          image: uploadedImage,
          category: categorySlug,
        }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
      setUploadedImage(null)
      onMessageComplete?.(data.message)
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: t.errorSendingMessage,
        },
      ])
    }

    setLoading(false)
  }

  const handleVoiceInput = (text) => {
    setInput(text)
  }

  const handlePhotoUpload = (image) => {
    setUploadedImage(image)
  }

  return (
    <div className="flex flex-col h-96 bg-white dark:bg-gray-800 rounded-lg border-2 border-india-green p-4">
      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p className="text-lg mb-2">💬 {t.chatPlaceholder}</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-saffron text-white'
                  : 'bg-white dark:bg-gray-700 border-2 border-india-green text-gray-800 dark:text-white'
              }`}
            >
              <p className="text-sm md:text-base">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <p className="text-sm">✨ {t.analyzingPhoto}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview */}
      {uploadedImage && (
        <div className="mb-2 flex items-center justify-between bg-saffron/10 p-2 rounded">
          <span className="text-sm">📸 Photo attached</span>
          <button
            onClick={() => setUploadedImage(null)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t.chatPlaceholder}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm min-w-40"
        />

        <VoiceInput onTranscript={handleVoiceInput} />
        <PhotoUpload onPhotoUpload={handlePhotoUpload} />

        <button
          onClick={handleSendMessage}
          disabled={loading || (!input.trim() && !uploadedImage)}
          className="bg-india-green hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 min-h-10"
        >
          {loading ? '⏳' : '✈️'}
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/translations'

export default function VoiceInput({ onTranscript }) {
  const { t } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition) ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null

  const startListening = () => {
    if (!recognitionRef) {
      alert('Speech recognition not supported in your browser')
      return
    }

    recognitionRef.lang = 'en-IN' // Default to Indian English
    recognitionRef.continuous = false
    recognitionRef.interimResults = false

    recognitionRef.onstart = () => setIsListening(true)
    recognitionRef.onend = () => setIsListening(false)
    recognitionRef.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('')
      onTranscript(transcript)
    }

    recognitionRef.start()
  }

  return (
    <button
      onClick={startListening}
      disabled={isListening}
      className="bg-india-green hover:bg-green-700 text-white px-3 py-2 rounded disabled:opacity-50 min-h-10 w-10 flex items-center justify-center"
      title={t.voiceInput}
    >
      {isListening ? '🎙️' : '🎤'}
    </button>
  )
}

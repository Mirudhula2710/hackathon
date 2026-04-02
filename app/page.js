'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LanguageCard from '@/components/LanguageCard'
import ThemeToggle from '@/components/ThemeToggle'

export default function Page() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (savedLanguage) {
      router.push('/home')
    } else {
      setShowContent(true)
    }
  }, [router])

  if (!showContent) {
    return <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🏗️</div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  }

  const languages = [
    { code: 'en', native: 'English' },
    { code: 'hi', native: 'हिंदी' },
    { code: 'bn', native: 'বাংলা' },
    { code: 'te', native: 'తెలుగు' },
    { code: 'mr', native: 'मराठी' },
    { code: 'ta', native: 'தமிழ்' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] p-4 md:p-8">
      <ThemeToggle />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-saffron mb-4">हक AI</h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-2">
            Know Your Rights
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select your language to begin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.code}
              language={lang.code}
              nativeName={lang.native}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 max-w-md">
          <p>🇮🇳 Free legal help for every Indian worker</p>
        </div>
      </div>
    </div>
  )
}

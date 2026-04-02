'use client'

import { useRouter } from 'next/navigation'

export default function LanguageCard({ language, nativeName }) {
  const router = useRouter()

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', language)
      router.push('/home')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="
        bg-white dark:bg-gray-800
        border-4 border-saffron
        rounded-lg p-6
        text-center
        hover:scale-105 hover:shadow-lg
        transition-smooth
        min-h-48 flex flex-col justify-center items-center
        cursor-pointer
        touch-target-48
      "
    >
      <div className="text-6xl mb-3">🌐</div>
      <p className="text-2xl font-bold text-saffron">
        {nativeName}
      </p>
    </button>
  )
}

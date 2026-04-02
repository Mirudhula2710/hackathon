'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-4 right-4
        bg-saffron hover:bg-india-green
        text-white rounded-full
        p-3 h-12 w-12
        flex items-center justify-center
        transition-smooth
        z-50
        shadow-lg
      "
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

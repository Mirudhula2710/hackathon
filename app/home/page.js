'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/translations'
import { categoryData } from '@/lib/categories'
import CategoryCard from '@/components/CategoryCard'
import ThemeToggle from '@/components/ThemeToggle'

export default function HomePage() {
  const router = useRouter()
  const { t, language, mounted } = useLanguage()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!mounted) return
    
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (!savedLanguage) {
      router.push('/')
    } else {
      setShowContent(true)
    }
  }, [mounted, router])

  if (!mounted || !showContent) {
    return <div className="min-h-screen bg-white dark:bg-[#0f0f0f]" />
  }

  const getCategoryName = (category) => {
    const langKey = `${language}Name`
    return category[langKey] || category.enName
  }

  const languageFlags = {
    en: '🇬🇧',
    hi: '🇮🇳',
    bn: '🇧🇩',
    te: '🇮🇳',
    mr: '🇮🇳',
    ta: '🇮🇳',
  }

  const languageNames = {
    en: 'English',
    hi: 'हिंदी',
    bn: 'বাংলা',
    te: 'తెలుగు',
    mr: 'मराठी',
    ta: 'தமிழ்',
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <ThemeToggle />

      {/* Header with branding */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b-4 border-saffron p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-saffron">हक AI</h1>
          <div className="flex items-center gap-2 text-center">
            <span className="text-2xl">{languageFlags[language]}</span>
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              {languageNames[language]}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-saffron/10 to-india-green/10 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t.appTagline}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t.appSubtitle}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {language === 'en' ? 'Categories' : 'श्रेणियाँ'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                categoryName={getCategoryName(category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer info */}
      <section className="bg-saffron/5 py-8 px-4 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          💡 Select any category to learn about your legal rights and get help
        </p>
      </section>
    </div>
  )
}

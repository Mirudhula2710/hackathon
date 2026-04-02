'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/translations'
import { categoryData } from '@/lib/categories'
import ChatInterface from '@/components/ChatInterface'
import ActionButtons from '@/components/ActionButtons'
import ThemeToggle from '@/components/ThemeToggle'

export default function CategoryPage({ params }) {
  const router = useRouter()
  const { t, language, mounted } = useLanguage()
  const [category, setCategory] = useState(null)
  const [lastMessage, setLastMessage] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!mounted) return

    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (!savedLanguage) {
      router.push('/')
      return
    }

    const found = categoryData.find((cat) => cat.slug === params.slug)
    if (found) {
      setCategory(found)
      setShowContent(true)
    } else {
      router.push('/home')
    }
  }, [mounted, params.slug, router])

  if (!mounted || !showContent || !category) {
    return <div className="min-h-screen bg-white dark:bg-[#0f0f0f]" />
  }

  const langKey = `${language}Name`
  const categoryName = category[langKey] || category.enName

  // Map slug to translation key
  const slugToTranslationKey = {
    'unpaid-wages': 'unpaidWages',
    'workplace-safety': 'workplaceSafety',
    'unfair-firing': 'unfairFiring',
    'contract-issues': 'contractIssues',
    'maternity-rights': 'maternityRights',
    'child-labour': 'childLabour',
    'know-your-rights': 'knowYourRights',
    'emergency-helplines': 'emergencyHelplines',
    'rural-issues': 'ruralIssues',
  }

  const translationKey = slugToTranslationKey[category.slug] || 'unpaidWages'
  const rights = t.rights?.[translationKey] || t.rights?.unpaidWages
  const steps = t.steps?.[translationKey] || t.steps?.unpaidWages || []

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] pb-8">
      <ThemeToggle />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b-4 border-saffron p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/home')}
              className="text-2xl hover:scale-110 transition-smooth"
            >
              ← 
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-saffron">
              {category.icon} {categoryName}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Section A: Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-saffron mb-4 flex items-center gap-2">
            📖 {t.rights ? Object.keys(t)[0] : ''} Your Rights
          </h2>
          <div className="bg-white dark:bg-gray-800 border-4 border-india-green rounded-lg p-6">
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              {rights}
            </p>
          </div>
        </section>

        {/* Section B: AI Chatbot */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-saffron mb-4 flex items-center gap-2">
            💬 {language === 'en' ? 'Ask Your Questions' : 'अपने सवाल पूछें'}
          </h2>
          <ChatInterface
            categorySlug={category.slug}
            onMessageComplete={(msg) => setLastMessage(msg)}
          />
        </section>

        {/* Section C: What To Do Next */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-saffron mb-4 flex items-center gap-2">
            📋 {language === 'en' ? 'What To Do Next' : 'अगले कदम'}
          </h2>
          <div className="bg-white dark:bg-gray-800 border-4 border-india-green rounded-lg p-6 space-y-4">
            {steps.length > 0 ? (
              steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 pt-1">
                    {step}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Steps not available</p>
            )}
          </div>
        </section>

        {/* Section D: Action Buttons */}
        {lastMessage && (
          <section>
            <h2 className="text-2xl font-bold text-saffron mb-4 flex items-center gap-2">
              ✉️ {language === 'en' ? 'Take Action Now' : 'अभी कार्रवाई करें'}
            </h2>
            <ActionButtons categorySlug={category.slug} lastMessage={lastMessage} />
          </section>
        )}
      </main>
    </div>
  )
}

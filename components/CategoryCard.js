'use client'

import { useRouter } from 'next/navigation'

export default function CategoryCard({ category, categoryName }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/category/${category.slug}`)
  }

  return (
    <button
      onClick={handleClick}
      className="
        bg-white dark:bg-gray-800
        border-4 border-saffron
        rounded-lg p-6
        text-center
        hover:scale-110 hover:shadow-2xl
        transition-smooth
        min-h-40 flex flex-col justify-center items-center
        cursor-pointer
      "
    >
      <div className="text-5xl mb-3">{category.icon}</div>
      <p className="text-lg font-bold text-gray-800 dark:text-white">
        {categoryName}
      </p>
    </button>
  )
}

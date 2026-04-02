'use client'

import { useRef } from 'react'
import { useLanguage } from '@/lib/translations'

export default function PhotoUpload({ onPhotoUpload }) {
  const { t } = useLanguage()
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      onPhotoUpload(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-saffron hover:bg-orange-500 text-white px-3 py-2 rounded min-h-10 w-10 flex items-center justify-center"
        title={t.uploadPhoto}
      >
        📸
      </button>
    </>
  )
}

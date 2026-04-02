'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import { useLanguage } from '@/lib/translations'

export default function ActionButtons({ categorySlug, lastMessage }) {
  const { t, language } = useLanguage()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    workerName: '',
    workerPhone: '',
    workerAddress: '',
    employerName: '',
    state: '',
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateWhatsAppMessage = () => {
    const message = `*नमस्ते* (Hello),

मैं ${formData.workerName} हूँ और ${formData.employerName} के पास काम करता हूँ।

मेरी समस्या: ${lastMessage}

भारतीय श्रम कानून के तहत, मुझे सही इलाज का अधिकार है। मैं 7 दिनों में समाधान की मांग करता हूँ।

कृपया तत्काल सहायता प्रदान करें।

धन्यवाद,
${formData.workerName}
फोन: ${formData.workerPhone}`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encoded}`)
  }

  const generatePDFLetter = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 20

    // Title
    doc.setFontSize(16)
    doc.setTextColor(255, 153, 51) // Saffron
    doc.text('शिकायत पत्र (COMPLAINT LETTER)', pageWidth / 2, yPos, { align: 'center' })

    yPos += 15
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    doc.text(`तारीख: ${new Date().toLocaleDateString()}`, 20, yPos)

    yPos += 15
    doc.text(`कार्यकर्ता का नाम: ${formData.workerName}`, 20, yPos)
    yPos += 10
    doc.text(`पता: ${formData.workerAddress}`, 20, yPos)
    yPos += 10
    doc.text(`फोन: ${formData.workerPhone}`, 20, yPos)

    yPos += 15
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('प्रति:', 20, yPos)
    doc.setFont(undefined, 'normal')
    yPos += 10
    doc.text(`${formData.employerName}`, 20, yPos)
    yPos += 10
    doc.text(`${formData.state}, भारत`, 20, yPos)

    yPos += 15
    doc.setFont(undefined, 'bold')
    doc.text('विषय: औपचारिक शिकायत', 20, yPos)

    yPos += 15
    doc.setFont(undefined, 'normal')
    const splitText = doc.splitTextToSize(
      `मुझे आपको सूचित करना है कि: ${lastMessage}\n\nभारतीय श्रम कानून के तहत, मुझे उचित व्यवहार और सम्मान का अधिकार है। उपरोक्त मुद्दे को हल करने के लिए मैं 7 दिनों का समय देता हूँ।\n\nयदि इस अवधि में कोई समाधान नहीं होता है, तो मैं श्रम विभाग में औपचारिक शिकायत दर्ज करूँगा।`,
      pageWidth - 40
    )
    doc.text(splitText, 20, yPos)

    yPos = pageHeight - 40
    doc.text('हस्ताक्षर: _______________', 20, yPos)
    doc.text('दिनांक: _________________', 120, yPos)

    doc.save('ShikayatPatra.pdf')
  }

  const handleCallHelpline = () => {
    const helplineNumbers = [
      '1800111139',
      '181',
      '1098',
      '1800180',
      '15100',
    ]
    
    // Show helpline info modal
    alert(`${t.helplines.nationalLabour}\n${t.helplines.women}\n${t.helplines.childLabour}\n${t.helplines.farmer}\n${t.helplines.legalAid}`)
  }

  const handleShareAnonymously = () => {
    const caseData = {
      category: categorySlug,
      message: lastMessage,
      timestamp: new Date().toISOString(),
    }
    
    let cases = JSON.parse(localStorage.getItem('anonCases') || '[]')
    cases.push(caseData)
    localStorage.setItem('anonCases', JSON.stringify(cases))
    
    alert(t.caseSharedSuccessfully)
  }

  return (
    <div className="mt-6 space-y-4">
      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold text-sm md:text-base min-h-12"
          >
            📱 {t.whatsappButton}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-saffron hover:bg-orange-500 text-white py-3 rounded font-bold text-sm md:text-base min-h-12"
          >
            📄 {t.pdfButton}
          </button>
          <button
            onClick={handleCallHelpline}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold text-sm md:text-base min-h-12"
          >
            ☎️ {t.helplineButton}
          </button>
          <button
            onClick={handleShareAnonymously}
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded font-bold text-sm md:text-base min-h-12"
          >
            👥 {t.shareButton}
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
          <input
            type="text"
            name="workerName"
            placeholder={t.workerName}
            value={formData.workerName}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-white text-sm"
          />
          <input
            type="tel"
            name="workerPhone"
            placeholder={t.phoneNumber}
            value={formData.workerPhone}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-white text-sm"
          />
          <input
            type="text"
            name="workerAddress"
            placeholder={t.workerAddress}
            value={formData.workerAddress}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-white text-sm"
          />
          <input
            type="text"
            name="employerName"
            placeholder={t.employerName}
            value={formData.employerName}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-white text-sm"
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-white text-sm"
          >
            <option value="">{t.selectState}</option>
            <option value="Maharashtra">महाराष्ट्र (Maharashtra)</option>
            <option value="Tamil Nadu">तमिलनाडु (Tamil Nadu)</option>
            <option value="Delhi">दिल्ली (Delhi)</option>
            <option value="Karnataka">कर्नाटक (Karnataka)</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={generateWhatsAppMessage}
              disabled={!formData.workerName || !formData.employerName}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded font-bold text-sm min-h-10"
            >
              📱 WhatsApp
            </button>
            <button
              onClick={generatePDFLetter}
              disabled={!formData.workerName || !formData.employerName}
              className="flex-1 bg-saffron hover:bg-orange-500 disabled:opacity-50 text-white py-2 rounded font-bold text-sm min-h-10"
            >
              📄 PDF
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-bold text-sm min-h-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

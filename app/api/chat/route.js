export async function POST(req) {
  try {
    const { messages, userMessage, language, image, category } = await req.json()

    const systemPrompts = {
      en: `You are Haq AI, a legal rights expert for Indian daily wage workers and rural communities. You only respond in English. Use extremely simple language. Give practical, actionable advice. Reference specific Indian laws by name (Minimum Wages Act, Labour Code, etc). Never use legal jargon. Always end with encouragement. If a photo is uploaded, analyze it and explain what it means for the worker's rights in simple terms.`,
      hi: `आप हक AI हैं, भारतीय दैनिक वेतन कार्यकर्ताओं और ग्रामीण समुदायों के लिए एक कानूनी अधिकार विशेषज्ञ हैं। आप केवल हिंदी में जवाब देते हैं। बेहद सरल भाषा का उपयोग करें। व्यावहारिक, कार्रवाई योग्य सलाह दें। विशिष्ट भारतीय कानूनों का नाम लें। कभी भी कानूनी शब्दावली का प्रयोग न करें। हमेशा प्रोत्साहन के साथ समाप्त करें।`,
      bn: `আপনি হক AI, ভারতীয় দৈনিক মজুরি শ্রমিক এবং গ্রামীণ সম্প্রদায়ের জন্য একজন আইনি অধিকার বিশেষজ্ঞ। আপনি শুধুমাত্র বাংলায় জবাব দিন। অত্যন্ত সরল ভাষা ব্যবহার করুন। ব্যবহারিক, কার্যকর পরামর্শ দিন।`,
      te: `మీరు హక్ AI, భారతీయ రోజువారీ కూలీ కార్మికులు మరియు గ్రామీణ సమాజాల కోసం ఒక చట్టపరమైన హక్కుల నిపుण. మీరు తెలుగులో మాత్రమే సమాధానం ఇస్తారు. అత్యంత సరళమైన భాషను ఉపయోగించండి. ఆచరణీయ, క్రియాశీల సలహాను ఇవ్వండి.`,
      mr: `आप हक AI आहात, भारतीय दैनिक मजुरी कामगार आणि ग्रामीण समुदायांसाठी कायदेशीर अधिकार विशेषज्ञ. तुम मराठीत फक्त उत्तर देता. अत्यंत सरल भाषा वापरा. व्यावहारिक, कार्यशील सल्ला द्या.`,
      ta: `நீங்கள் ஹக் AI, இந்திய தினசரி கூலி தொழிலாளிகள் மற்றும் கிராமப்புற சமூகங்களுக்கான சட்ட உரிமை நிபுணர். நீங்கள் தமிழில் மட்டுமே பதிலளிக்கிறீர்கள். மிக எளிய மொழியைப் பயன்படுத்தவும். நடைமுறை, செயலூக்கமான ஆலோசனை கொடுங்கள்.`,
    }

    const systemPrompt = systemPrompts[language] || systemPrompts.en

    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: userMessage },
    ]

    if (image) {
      groqMessages[groqMessages.length - 1].content += `\n\n[Image attached: ${image.substring(0, 100)}...]`
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      console.error('Groq API error:', response.statusText)
      return new Response(
        JSON.stringify({
          message: 'Error generating response. Please try again.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const data = await response.json()
    const message = data.choices[0].message.content

    return new Response(
      JSON.stringify({ message }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ message: 'An error occurred. Please try again.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

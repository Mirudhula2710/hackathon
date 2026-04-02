# Haq AI - Legal Rights Assistant for Indian Workers

## 🌍 Overview

Haq AI (हक AI) is a free, multilingual legal rights assistant designed for India's daily wage workers and rural communities. Built with Next.js, it provides legal guidance in 6 Indian languages.

### Languages Supported
- English
- हिंदी (Hindi)
- বাংলা (Bengali)
- తెలుగు (Telugu)
- मराठी (Marathi)
- தமிழ் (Tamil)

## ✨ Features

- 🌐 **Multilingual Support**: All content in 6 Indian languages
- 🤖 **AI Chatbot**: Powered by Groq API (llama3-70b-8192)
- 📱 **Mobile-First**: Optimized for mobile devices on slow 2G connections
- 🎤 **Voice Input**: Web Speech API for voice-to-text queries
- 📸 **Photo Analysis**: Upload documents to get legal insights
- 📄 **PDF Generation**: Create formal complaint letters
- 📱 **WhatsApp Integration**: Share messages directly via WhatsApp
- 🌓 **Dark/Light Mode**: Full theme support
- ⚖️ **9 Legal Categories**: Covering unpaid wages, workplace safety, maternity rights, child labour, and more
- 📞 **Emergency Helplines**: Quick access to important helpline numbers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Groq API key (free at console.groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/haq-ai.git
   cd haq-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy .env.example to .env.local
   cp .env.example .env.local
   
   # Add your Groq API key
   echo "NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here" >> .env.local
   ```

   Get a free Groq API key at: https://console.groq.com

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `GROQ_API_KEY=your_api_key`
   - Deploy!

Vercel will automatically deploy on every push to main branch.

## 📁 Project Structure

```
/app
  /page.js                    # Language selection screen
  /home/page.js               # Home screen with categories
  /category/[slug]/page.js    # Category detail page
  /api/chat/route.js          # Groq API endpoint
  /layout.js                  # Root layout
  /globals.css                # Global styles
  /providers.js               # Theme provider

/components
  /LanguageCard.js            # Language selection card
  /CategoryCard.js            # Category card
  /ChatInterface.js           # AI chatbot interface
  /ActionButtons.js           # Action buttons (PDF, WhatsApp, etc)
  /ThemeToggle.js             # Dark/Light mode toggle
  /VoiceInput.js              # Voice input with Web Speech API
  /PhotoUpload.js             # Photo upload component

/lib
  /translations.js            # All translations (6 languages)
  /categories.js              # Category data and labour office info

/public
  # Static assets (icons, images)
```

## 🎨 Features Breakdown

### Language Selection
Users select their preferred language on the first screen. This choice is saved to localStorage and applied across the entire app.

### Home Screen
Shows 9 legal categories in a 3x3 grid:
1. Unpaid Wages
2. Workplace Safety
3. Unfair Firing
4. Contract Issues
5. Maternity Rights
6. Child Labour
7. Know Your Rights
8. Emergency Helplines
9. Rural Issues

### Category Pages
Each category has:
- **Your Rights Section**: Explains relevant Indian laws
- **AI Chatbot**: Ask questions and get advice powered by Groq
- **Voice Input**: Speak your query
- **Photo Upload**: Upload documents for analysis
- **What To Do Next**: Step-by-step action guide

### Action Buttons
- **WhatsApp Message**: Generate professional complaint messages
- **PDF Complaint Letter**: Download formal complaint letter
- **Find Labour Office**: Google Maps integration for nearest office
- **Call Helpline**: Quick access to emergency numbers
- **Share Anonymously**: Share case to community board

## 🔑 Environment Variables

```
GROQ_API_KEY=your_groq_api_key
```

Get free key at: https://console.groq.com

## 📱 Mobile Optimization

- Minimum font size: 16px
- Touch targets: 48x48px minimum
- Safe area padding for notched devices
- Works on 2G connections
- Lazy loading for all images
- Optimized bundle size

## 🌐 Supported Regions

Full labour office information for:
- Maharashtra
- Tamil Nadu
- Karnataka
- Delhi
- Uttar Pradesh
- Andhra Pradesh
- West Bengal
- Gujarat
- Punjab
- Rajasthan

(More states can be added in `/lib/categories.js`)

## 💡 How to Use

1. **Open the app** → Select your language
2. **Explore categories** → Choose a legal topic you need help with
3. **Read your rights** → Understand your legal protections
4. **Chat with AI** → Ask any questions (text, voice, or photos)
5. **Take action** → Use WhatsApp, PDF, or call helpline

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Colors**: Indian flag colors (Saffron, Green, White)
- **AI**: Groq API (llama3-70b-8192)
- **PDF**: jsPDF library
- **Voice**: Web Speech API
- **Storage**: Browser localStorage

## 📊 Legal Categories

Each category includes:
- Specific Indian laws (e.g., Minimum Wages Act, 1948)
- Simple explanations
- Step-by-step guides
- Emergency contacts
- Helpful resources

## 🔒 Privacy

- No data sent to servers except chatbot queries
- No personal information collection
- LocalStorage used for language/theme preferences
- Anonymous case sharing option

## 📞 Support

For issues or feature requests, create a GitHub issue.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 🎯 Future Features

- SMS helpline integration
- Offline support via Service Workers
- Multi-state labour office directory
- Video tutorials
- Community forum
- Legal aid directory

## 📈 Analytics

Track user engagement and improve the app:
- Language preferences
- Most used categories
- Common questions
- Helpline effectiveness

---

**हक AI** - Know Your Rights. Fight for Justice. 🇮🇳

Free legal help for every Indian worker.

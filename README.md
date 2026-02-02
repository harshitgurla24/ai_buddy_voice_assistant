# 🎙️ AI Voice Assistant

A multilingual voice-controlled AI assistant built with React, OpenAI, and Web Speech API.

## ✨ Features

- 🗣️ **Voice Input**: Speak naturally using Web Speech API
- 🤖 **AI Responses**: Powered by OpenAI GPT-3.5-turbo
- 🌍 **Multilingual Support**: English, Hindi, Urdu, Spanish, French
- 🔊 **Text-to-Speech**: AI responses are spoken back
- 🌓 **Dark/Light Mode**: Toggle between themes
- 💬 **Chat History**: View conversation history

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API Key

Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Add your OpenAI API key in `.env`:
```env
VITE_OPENAI_API_KEY=your-actual-api-key-here
```

**Get your API key from**: https://platform.openai.com/api-keys

### 3. Start Backend Server (Terminal 1)
```bash
npm run server
```

You should see:
```
🚀 Backend server running on http://localhost:3001
✅ API Key configured: true
```

### 4. Start Frontend (Terminal 2 - New Terminal)
```bash
npm run dev
```

Open your browser to the URL shown (usually http://localhost:5173)

## 🎯 How to Use

1. Click the 🎤 microphone button
2. Speak your question or command
3. Wait for AI response (text and voice)
4. Select language from dropdown for different languages
5. Toggle dark/light mode with sun/moon button

## 📋 Requirements

- Node.js 16+ 
- Modern browser with Web Speech API support (Chrome, Edge recommended)
- OpenAI API account with credits

## ⚠️ Important Notes

- **Browser Compatibility**: Speech Recognition works best in Chrome/Edge
- **HTTPS Required**: Speech API requires HTTPS in production
- **API Costs**: OpenAI API calls are charged per token used
- **Security**: Never commit your `.env` file to git!

## 🛠️ Tech Stack

- React 19
- Vite
- OpenAI API
- Web Speech API (SpeechRecognition + SpeechSynthesis)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

Made with ❤️ using React and OpenAI

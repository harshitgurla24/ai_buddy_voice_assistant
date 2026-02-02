import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import VoiceAssistant from './components/VoiceAssistant';
import ChatMessage from './components/ChatMessage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [language, setLanguage] = useState('en-US');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Save dark mode preference
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { 
      sender, 
      text, 
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
      localStorage.removeItem('chatHistory');
    }
  };

  const downloadChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp}] ${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-buddy-chat-${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>🎙️ AI BUDDY</h1>
        <div className="header-controls">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en-US">🇺🇸 English</option>
            <option value="hi-IN">🇮🇳 हिंदी</option>
            <option value="en-IN">🇮🇳 Hinglish</option>
          </select>
          <button 
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="container">
        <div className="chat-area">
          <div className="messages">
            {messages.length === 0 ? (
              <div className="empty-state">
                <p>🎤 Start speaking to chat with AI</p>
              </div>
            ) : (
              messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            )}
            {isLoading && (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>AI is thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <VoiceAssistant 
          onAddMessage={addMessage}
          language={language}
          setIsLoading={setIsLoading}
          messages={messages}
        />

        {messages.length > 0 && (
          <div className="chat-actions">
            <button className="action-btn download-btn" onClick={downloadChat}>
              📥 Download Chat
            </button>
            <button className="action-btn clear-btn" onClick={clearChat}>
              🗑️ Clear Chat
            </button>
          </div>
        )}
      </div>

      <footer>
        <p>💡 Powered by OpenAI | Made with React</p>
      </footer>
    </div>
  );
}

export default App;

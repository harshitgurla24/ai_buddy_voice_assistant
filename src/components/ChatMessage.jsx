import React, { useState } from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message ${isUser ? 'user-message' : 'ai-message'}`}>
      <div className="message-content">
        <span className="avatar">{isUser ? '👤' : '🤖'}</span>
        <div className="message-text">
          <div className="message-header">
            <strong>{isUser ? 'You' : 'AI Assistant'}</strong>
            {message.timestamp && <span className="timestamp">{message.timestamp}</span>}
          </div>
          <p>{message.text}</p>
          <button 
            className="copy-btn" 
            onClick={copyToClipboard}
            title="Copy message"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

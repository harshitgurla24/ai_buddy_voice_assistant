import React, { useState, useRef, useEffect } from 'react';
import './VoiceAssistant.css';

const VoiceAssistant = ({ onAddMessage, language, setIsLoading, messages }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = async (event) => {
      // Clear previous silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      // Get the latest transcript
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update accumulated transcript
      if (finalTranscript) {
        transcriptRef.current += finalTranscript + ' ';
      }

      console.log('Current transcript:', transcriptRef.current + interimTranscript);

      // Set timer for 2 seconds of silence
      silenceTimerRef.current = setTimeout(async () => {
        const fullTranscript = transcriptRef.current.trim();
        
        if (fullTranscript) {
          // Stop listening
          recognition.stop();
          setIsListening(false);
          
          // Add user message
          onAddMessage('user', fullTranscript);
          
          // Reset transcript
          transcriptRef.current = '';
          
          // Get AI response
          try {
            setIsLoading(true);
            const aiResponse = await getAIResponse(fullTranscript);
            onAddMessage('ai', aiResponse);
            
            // Speak the response
            speakText(aiResponse);
          } catch (error) {
            console.error('Error details:', error);
            const errorMsg = error.message || 'Unknown error occurred';
            onAddMessage('ai', `❌ Error: ${errorMsg}`);
          } finally {
            setIsLoading(false);
          }
        }
      }, 2000); // 2 seconds silence detection
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      if (event.error !== 'no-speech') {
        alert('Error: ' + event.error);
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [language, onAddMessage, setIsLoading]);

  const startListening = () => {
    if (recognitionRef.current) {
      transcriptRef.current = ''; // Reset transcript
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      recognitionRef.current.stop();
      transcriptRef.current = ''; // Clear transcript
    }
  };

  const getAIResponse = async (userText) => {
    console.log('Sending to backend:', userText);

    // Use relative URL for Vercel deployment, localhost for development
    const apiUrl = import.meta.env.PROD 
      ? '' // Use same domain in production (Vercel)
      : 'http://localhost:3001'; // Use local server in development

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          conversationHistory: messages // Send conversation context
        })
      });

      console.log('Backend response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend error:', errorData);
        throw new Error(errorData.error || `Backend error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);
      
      if (!data.message) {
        throw new Error('Invalid response format from backend');
      }
      
      return data.message;
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Backend server not running. Please start with: npm run server');
      }
      throw error;
    }
  };

  const speakText = (text) => {
    // Don't remove non-English characters - support all languages
    const cleanText = text.replace(/[❌⚠️🎤🎵🔊]/g, ''); // Only remove emoji icons
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = language; // Set language from props

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    
    // Small delay to ensure previous speech is cancelled
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="voice-assistant">
      <div className="button-group">
        <button
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={startListening}
          disabled={isListening || isSpeaking}
          title="Click to speak"
        >
          🎤
          {isListening && <span className="pulse"></span>}
        </button>

        {isListening && (
          <button
            className="stop-btn"
            onClick={stopListening}
            title="Stop listening"
          >
            ⏹️ Stop
          </button>
        )}

        {isSpeaking && (
          <button
            className="stop-speak-btn"
            onClick={stopSpeaking}
            title="Stop speaking"
          >
            🔇 Stop Speaking
          </button>
        )}
      </div>

      <div className="status">
        {isListening && <p className="listening-status">🎵 Listening...</p>}
        {isSpeaking && <p className="speaking-status">🔊 Speaking...</p>}
      </div>
    </div>
  );
};

export default VoiceAssistant;

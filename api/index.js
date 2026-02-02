// Vercel Serverless Function for API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Debug: Log the request path
  console.log('API Request:', req.method, req.url, req.path);

  // Handle POST requests to /chat or /api/chat
  if (req.method === 'POST' && (req.url === '/chat' || req.url === '/api/chat' || req.path === '/chat')) {
    const { message, conversationHistory } = req.body;

    console.log('Received message:', message);

    // Vercel environment variable (without VITE_ prefix)
    const API_KEY = process.env.GROQ_API_KEY || process.env.VITE_OPENAI_API_KEY;

    if (!API_KEY) {
      console.error('API key not found in environment variables');
      return res.status(500).json({ 
        error: 'API key not configured on server. Please add GROQ_API_KEY in Vercel Environment Variables.' 
      });
    }

    try {
      // Build messages array with conversation history
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful, friendly voice assistant. Keep your responses short and clear (max 2-3 sentences). Respond in the same language as the user.'
        }
      ];

      // Add conversation history if available
      if (conversationHistory && conversationHistory.length > 0) {
        const recentHistory = conversationHistory.slice(-6);
        recentHistory.forEach(msg => {
          messages.push({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          });
        });
      }

      // Add current message
      messages.push({
        role: 'user',
        content: message
      });

      // Using Groq API
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: messages,
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('AI API Error:', errorData);
        return res.status(response.status).json({ 
          error: errorData.error?.message || 'AI API request failed' 
        });
      }

      const data = await response.json();
      console.log('AI Response received');

      return res.json({ 
        message: data.choices[0].message.content 
      });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ 
        error: 'Internal server error: ' + error.message 
      });
    }
  }

  if (req.method === 'GET' && (req.url === '/health' || req.url === '/api/health' || req.path === '/health')) {
    return res.json({ status: 'OK', message: 'AI Voice Assistant API is running' });
  }

  // Default 404 response
  return res.status(404).json({ error: 'Not found. Available endpoints: POST /chat, GET /health' });
}

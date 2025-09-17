const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/article', async (req, res) => {
  try {
    const { prompt } = req.body
    const { generateText } = require('ai')
    const { anthropic } = require('@ai-sdk/anthropic')

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Anthropic API key not configured' });
    }

    const systemPrompt = fs.readFileSync(path.join(__dirname, 'articleprompt.md'), 'utf8');

    const result = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: systemPrompt,
      prompt: prompt,
    });

    console.log(result)

    res.send(result.content)
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  // Handle React routing - return index.html for all non-API routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
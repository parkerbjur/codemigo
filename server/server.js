const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan')
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const ARTICLES_FILE = path.join(__dirname, 'articles.json');

const app = express();
app.use(morgan('combined'))
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const readArticles = () => {
  try {
    if (fs.existsSync(ARTICLES_FILE)) {
      const data = fs.readFileSync(ARTICLES_FILE, 'utf8');
      return JSON.parse(data)
    }
    return [];
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
};

const writeArticles = (articles) => {
  try {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
  } catch (error) {
    console.error('Error writing articles:', error);
  }
};

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
    
    const articles = readArticles()
    articles.append({
      content: result.content[0].text,
      images: {},
      widgets: {}
    })
    writeArticles(articles)
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Get all articles
app.get('/api/articles', (req, res) => {
  try {
    const articles = readArticles();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Create a new article
app.post('/api/articles', (req, res) => {
  try {
    const { title, content, images, widgets } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const articles = readArticles();
    const newArticle = {
      id: require('crypto').randomUUID(),
      title,
      content,
      images: images || {},
      widgets: widgets || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    articles.push(newArticle);
    writeArticles(articles);
    
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

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
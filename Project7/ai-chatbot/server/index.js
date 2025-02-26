import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Making request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Always provide accurate and up-to-date information. For questions about time, dates, or current events, make sure to use real-time information."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
    });

    console.log('OpenAI response:', completion.choices[0].message);
    res.json({ message: completion.choices[0].message.content });

  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      error: 'Server error: ' + error.message
    });
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('OpenAI API Key status:', process.env.OPENAI_API_KEY ? 'Configured' : 'Missing');
});
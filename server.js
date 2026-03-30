const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'google/gemma-3-27b-it:free';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function buildPrompt({ message, tone, intent }) {
  return `You are helping a user build a tiny shareable microsite.
Current message: ${message}
Desired tone: ${tone || 'playful'}
Design intent: ${intent || 'minimal bold typography'}
Return strict JSON with this shape:
{"suggestions":[{"message":"...","styleName":"...","reason":"...","theme":{"background":"#111827","foreground":"#f9fafb","accent":"#f59e0b","font":"display","align":"center","size":72}}]}
Provide exactly 3 suggestions. Keep each message under 60 characters.`;
}

app.post('/api/suggest', async (req, res) => {
  try {
    const { message = 'Hello 1!!', tone = 'playful', intent = 'friendly launch splash' } = req.body || {};

    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENROUTER_API_KEY' });
    }

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.sundai.club',
        'X-Title': 'Hello Forge'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You produce concise creative microsite suggestions as valid JSON only.' },
          { role: 'user', content: buildPrompt({ message, tone, intent }) }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({ error: 'OpenRouter request failed', details: errorText });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return res.json({ model: OPENROUTER_MODEL, ...parsed });
  } catch (error) {
    return res.status(500).json({ error: 'Suggestion request failed', details: error.message });
  }
});

app.get('/healthz', (_req, res) => {
  res.json({ ok: true, model: OPENROUTER_MODEL });
});

app.get('/published', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'published.html'));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Hello Forge listening on ${PORT}`);
});

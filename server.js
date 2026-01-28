// server.mjs
import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// BoodleBox config
const BOODLEBOX_API_KEY = process.env.BOODLEBOX_API_KEY;
const BOODLEBOX_MODEL = process.env.BOODLEBOX_MODEL || 'gpt-4o'; // adjust per your Box/model
const BOODLEBOX_ENDPOINT = process.env.BOODLEBOX_ENDPOINT || 'https://api.boodlebox.ai/v1/chat/completions';
// Optional: If your BoodleBox setup uses a Box ID, include it
const BOODLEBOX_BOX_ID = process.env.BOODLEBOX_BOX_ID || null;

if (!BOODLEBOX_API_KEY) {
  console.error("Missing BOODLEBOX_API_KEY. Copy .env.example to .env and set your key.");
  process.exit(1);
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.post('/api/ask', async (req, res) => {
  try {
    const prompt = String(req.body?.prompt || '').trim();
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Build the request body in an OpenAI-compatible shape
    const body = {
      model: BOODLEBOX_MODEL,
      messages: [{ role: 'user', content: prompt }],
      ...(BOODLEBOX_BOX_ID ? { box_id: BOODLEBOX_BOX_ID } : {}),
    };

    const response = await fetch(BOODLEBOX_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BOODLEBOX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || `BoodleBox API Error (${response.status})`;
      throw Object.assign(new Error(message), { status: response.status });
    }

    // Standard OpenAI-style extraction
    const text =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.delta?.content ??
      '';

    return res.json({ text });
  } catch (err) {
    const status = err?.status || 500;
    const message = err?.message || String(err);
    console.error("BoodleBox error:", { status, message });
    return res.status(status).json({
      error: message,
      hint: "Check your BoodleBox API key, endpoint, model/box_id, and organization permissions.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

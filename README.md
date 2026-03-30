# Hello Forge

Hello Forge is an AI-assisted one-line microsite builder seeded from the provided **"Hello 1!!"** design pack. You can type a short message, tune the visual style, ask the AI for sharper copy and design directions, and publish a shareable page URL instantly.

## What it does
- Starts with the exact design-seed text: `Hello 1!!`
- Shows a live preview while you edit message, colors, alignment, font, and size
- Calls a real OpenRouter free model to generate copy + style suggestions
- Publishes a shareable public page URL that recreates the chosen draft
- Stores recent drafts in browser-local history for quick reopening

## How to Run (from zero)
1. **Prerequisites**
   - Node.js 22+
   - An OpenRouter API key
2. **Clone**
   - `git clone https://github.com/sundaiclaw/hello-forge.git`
3. **Enter the folder**
   - `cd hello-forge`
4. **Install dependencies**
   - `npm install`
5. **Set environment variables**
   - `export OPENROUTER_API_KEY=your_key_here`
   - `export OPENROUTER_BASE_URL=https://openrouter.ai/api/v1`
   - `export OPENROUTER_MODEL=google/gemma-3-27b-it:free`
6. **Run the app**
   - `npm start`
7. **Open locally**
   - Visit `http://localhost:8080`

## Limitations / known gaps
- Published pages are encoded in the URL instead of stored in a database
- Draft history is local to the browser using localStorage
- AI suggestions depend on OpenRouter free-model availability and latency

Build on Sundai Club on March 30, 2026  
Sundai Project: https://www.sundai.club/projects/625ef8ec-7477-417b-ac12-1756c101557e

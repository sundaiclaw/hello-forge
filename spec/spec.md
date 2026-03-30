# Hello Forge

OpenSpec change: hello-forge-builder

## What it does
Hello Forge is an AI-assisted one-line microsite builder based on the supplied design bundle. It starts with the exact `Hello 1!!` concept from the brief, lets the user restyle or rewrite the line with AI help, previews the result live, and publishes a shareable page URL.

## Who it's for
People who want to turn a short idea, greeting, joke, or CTA into a tiny shareable page in seconds.

## Demo flow
1. Open the app and see the default `Hello 1!!` message.
2. Change text and colors in the editor.
3. Click the AI suggestion button to get better headline/style ideas.
4. Apply one suggestion.
5. Publish and open the generated page URL.

## Tech stack
- Node.js + Express server
- Static HTML/CSS/JS frontend
- OpenRouter free model for AI suggestions
- Cloud Run deployment

## Implementation notes
- Keep the UI playful, typographic, and minimal.
- Encode published state in the URL instead of adding a database.
- Include a browser-local recent projects list.
- Make the published page clean and chrome-free.

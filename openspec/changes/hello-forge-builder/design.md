# Design: Hello Forge Builder

## Context
The attached ZIP defines a very small design target: a basic web page displaying `Hello 1!!`, plus a sketch implying a friendly page builder flow. The implementation should stay simple, deploy fast, and provide an immediately understandable demo.

## Goals
- Preserve the provided design seed and default message.
- Let the user edit a short message, preview it live, and open a public/shareable page.
- Make AI a core, visible part of the product via message/style suggestions.
- Keep the stack simple enough to build and deploy in one run.

## Non-Goals
- Durable user accounts or cloud persistence.
- Complex team collaboration or analytics.
- Full CMS behavior.

## Decisions
- Use a Node/Express server with static frontend assets for low-friction Cloud Run deploys.
- Represent published pages as encoded query parameters in the share URL instead of a database-backed CMS.
- Use localStorage for the dashboard/history within the browser session.
- Use OpenRouter free models through a server endpoint for AI suggestions.

## Alternatives Considered
- React/Next.js app: more structure, but unnecessary overhead for this MVP.
- Database-backed publishing: more durable, but too heavy for this design seed.
- Pure static page with no AI: matches the original requirement, but fails the AI-native Sundai bar.

## Risks / Trade-offs
- URL-encoded publishing is lightweight but not durable across arbitrary edits beyond the encoded state.
- OpenRouter free models may vary in latency/quality, so the API layer should degrade gracefully.
- localStorage-backed history is device-local only.

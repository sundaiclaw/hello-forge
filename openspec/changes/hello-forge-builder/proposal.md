# Proposal: Hello Forge Builder

## Why
The supplied design pack asks for a minimal website that displays "Hello 1!!" and proves the basic deployment path. To make it Sundai-worthy and AI-native, this change expands that seed into a tiny AI-assisted microsite builder that starts with the provided hello-page design and lets users turn one line into a styled, shareable page.

## What Changes
- Build a one-line microsite editor seeded with the exact `Hello 1!!` content from the design pack.
- Add AI-assisted copy and style suggestions using an OpenRouter free model.
- Add live preview, lightweight theming controls, and shareable published links encoded in the URL.
- Ship a public deployment and Sundai-ready README/docs.

## Capabilities
- New capability: `site-builder`
- New capability: `ai-suggestions`
- New capability: `shareable-output`

## Impact
- Creates a deployable demo aligned with the attached sketch/spec bundle.
- Preserves the original requirement by making the default demo page render `Hello 1!!` exactly.
- Adds a clearly user-facing AI interaction so the project fits Sundai's AI-native expectations.

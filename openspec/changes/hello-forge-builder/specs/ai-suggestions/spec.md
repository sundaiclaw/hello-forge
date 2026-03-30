## ADDED Requirements

### Requirement: User-facing AI suggestions
The system SHALL provide an AI-powered assistant that suggests improved copy and visual direction for the microsite.

#### Scenario: Generate AI suggestions
- **WHEN** a user asks for AI help
- **THEN** the system sends the current message and style intent to an LLM through OpenRouter
- **AND** returns at least one improved message suggestion and one style suggestion.

#### Scenario: Apply suggestion
- **WHEN** a user selects an AI suggestion
- **THEN** the editor applies it to the current draft
- **AND** the live preview updates immediately.

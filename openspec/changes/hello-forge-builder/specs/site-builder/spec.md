## ADDED Requirements

### Requirement: Live microsite editor
The system SHALL provide a browser-based editor for a short message microsite seeded with the default text `Hello 1!!`.

#### Scenario: Default content from supplied design
- **WHEN** a user opens the app for the first time
- **THEN** the editor shows `Hello 1!!` as the starting message
- **AND** the preview renders that exact text.

#### Scenario: Live editing
- **WHEN** a user changes the message or style controls
- **THEN** the preview updates immediately without a page reload.

### Requirement: Shareable published output
The system SHALL let a user generate a public-facing page URL that reproduces the configured message and styles.

#### Scenario: Publish a shareable page
- **WHEN** a user clicks publish
- **THEN** the system generates a URL that can be opened directly in a browser
- **AND** the published page displays the chosen message and styles.

### Requirement: Browser-local project history
The system SHALL retain recent creations in browser-local storage for quick reopening.

#### Scenario: Save recent project locally
- **WHEN** a user publishes or saves a draft
- **THEN** the current configuration is stored in browser-local history
- **AND** the dashboard lists it until cleared.

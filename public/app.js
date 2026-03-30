const state = {
  message: 'Hello 1!!',
  tone: 'playful',
  intent: 'friendly launch splash',
  background: '#0b1014',
  foreground: '#f9fafb',
  accent: '#f59e0b',
  align: 'center',
  size: 72,
  font: 'display'
};

const els = {
  message: document.getElementById('message'),
  tone: document.getElementById('tone'),
  intent: document.getElementById('intent'),
  background: document.getElementById('background'),
  foreground: document.getElementById('foreground'),
  accent: document.getElementById('accent'),
  align: document.getElementById('align'),
  size: document.getElementById('size'),
  font: document.getElementById('font'),
  sizeValue: document.getElementById('size-value'),
  preview: document.getElementById('preview'),
  previewText: document.getElementById('preview-text'),
  status: document.getElementById('status'),
  suggestions: document.getElementById('suggestions'),
  history: document.getElementById('history'),
  publishResult: document.getElementById('publish-result'),
  modelPill: document.getElementById('model-pill')
};

const fonts = {
  display: '"Bebas Neue", sans-serif',
  sans: '"DM Sans", sans-serif',
  serif: '"Playfair Display", serif'
};

function syncStateFromInputs() {
  state.message = els.message.value;
  state.tone = els.tone.value;
  state.intent = els.intent.value;
  state.background = els.background.value;
  state.foreground = els.foreground.value;
  state.accent = els.accent.value;
  state.align = els.align.value;
  state.size = Number(els.size.value);
  state.font = els.font.value;
}

function renderPreview() {
  syncStateFromInputs();
  document.documentElement.style.setProperty('--accent', state.accent);
  els.preview.style.background = state.background;
  els.preview.style.color = state.foreground;
  els.preview.style.textAlign = state.align;
  els.preview.style.justifyItems = state.align === 'left' ? 'start' : state.align === 'right' ? 'end' : 'center';
  els.previewText.textContent = state.message || 'Hello 1!!';
  els.previewText.style.fontSize = `${state.size}px`;
  els.previewText.style.fontFamily = fonts[state.font] || fonts.display;
  els.sizeValue.textContent = String(state.size);
}

function encodeDraft(draft = state) {
  return btoa(JSON.stringify(draft));
}

function saveHistoryItem() {
  syncStateFromInputs();
  const item = { ...state, id: crypto.randomUUID(), savedAt: new Date().toISOString() };
  const current = JSON.parse(localStorage.getItem('hello-forge-history') || '[]');
  const next = [item, ...current].slice(0, 8);
  localStorage.setItem('hello-forge-history', JSON.stringify(next));
  renderHistory();
  return item;
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem('hello-forge-history') || '[]');
  if (!history.length) {
    els.history.className = 'history-list empty';
    els.history.textContent = 'No drafts saved yet.';
    return;
  }
  els.history.className = 'history-list';
  els.history.innerHTML = history.map(item => `
    <article class="history-card">
      <h3>${item.message}</h3>
      <p>${new Date(item.savedAt).toLocaleString()}</p>
      <div class="history-actions">
        <button data-load="${item.id}" class="secondary">Load</button>
        <button data-open="${encodeDraft(item)}" class="primary">Open published</button>
      </div>
    </article>
  `).join('');
}

function loadHistoryItem(id) {
  const history = JSON.parse(localStorage.getItem('hello-forge-history') || '[]');
  const item = history.find(entry => entry.id === id);
  if (!item) return;
  Object.assign(state, item);
  els.message.value = item.message;
  els.tone.value = item.tone;
  els.intent.value = item.intent;
  els.background.value = item.background;
  els.foreground.value = item.foreground;
  els.accent.value = item.accent;
  els.align.value = item.align;
  els.size.value = item.size;
  els.font.value = item.font;
  renderPreview();
  els.status.textContent = `Loaded draft: ${item.message}`;
}

function publishCurrentDraft() {
  const item = saveHistoryItem();
  const data = encodeDraft(item);
  const url = `${window.location.origin}/published?data=${encodeURIComponent(data)}`;
  els.publishResult.classList.remove('hidden');
  els.publishResult.innerHTML = `
    <h2>Published</h2>
    <p>Your shareable page is ready.</p>
    <p><a href="${url}" target="_blank" rel="noreferrer">${url}</a></p>
    <div class="history-actions">
      <button id="copy-link" class="secondary">Copy link</button>
      <a class="ghost-link" href="${url}" target="_blank" rel="noreferrer">Open page</a>
    </div>
  `;
  document.getElementById('copy-link').addEventListener('click', async () => {
    await navigator.clipboard.writeText(url);
    els.status.textContent = 'Published link copied.';
  });
  els.status.textContent = 'Draft published to shareable URL.';
  return { item, url };
}

async function askAi() {
  syncStateFromInputs();
  els.status.textContent = 'Generating suggestions...';
  els.modelPill.textContent = 'Thinking';
  els.suggestions.className = 'suggestions';
  els.suggestions.innerHTML = '<div class="suggestion-card"><p>Talking to the model...</p></div>';
  const response = await fetch('/api/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  const data = await response.json();
  if (!response.ok) {
    els.status.textContent = 'AI request failed.';
    els.modelPill.textContent = 'Error';
    els.suggestions.innerHTML = `<div class="suggestion-card"><p>${data.details || data.error}</p></div>`;
    return;
  }
  els.modelPill.textContent = data.model || 'Ready';
  els.status.textContent = 'AI suggestions ready.';
  const suggestions = data.suggestions || [];
  els.suggestions.innerHTML = suggestions.map((suggestion, index) => `
    <article class="suggestion-card">
      <h3>${suggestion.message}</h3>
      <p><strong>${suggestion.styleName}</strong> — ${suggestion.reason}</p>
      <div class="suggestion-actions">
        <button data-apply="${index}" class="primary">Apply</button>
      </div>
    </article>
  `).join('');
  els.suggestions.dataset.payload = JSON.stringify(suggestions);
}

function applySuggestion(index) {
  const suggestions = JSON.parse(els.suggestions.dataset.payload || '[]');
  const suggestion = suggestions[index];
  if (!suggestion) return;
  els.message.value = suggestion.message;
  if (suggestion.theme) {
    els.background.value = suggestion.theme.background || els.background.value;
    els.foreground.value = suggestion.theme.foreground || els.foreground.value;
    els.accent.value = suggestion.theme.accent || els.accent.value;
    els.align.value = suggestion.theme.align || els.align.value;
    els.font.value = suggestion.theme.font || els.font.value;
    els.size.value = suggestion.theme.size || els.size.value;
  }
  renderPreview();
  els.status.textContent = `Applied AI suggestion: ${suggestion.message}`;
}

['input', 'change'].forEach(eventName => {
  document.querySelectorAll('textarea, input, select').forEach(el => el.addEventListener(eventName, renderPreview));
});

document.getElementById('save-draft').addEventListener('click', () => {
  saveHistoryItem();
  els.status.textContent = 'Draft saved locally.';
});
document.getElementById('publish').addEventListener('click', publishCurrentDraft);
document.getElementById('ask-ai').addEventListener('click', askAi);
document.getElementById('clear-history').addEventListener('click', () => {
  localStorage.removeItem('hello-forge-history');
  renderHistory();
  els.status.textContent = 'History cleared.';
});
els.history.addEventListener('click', event => {
  const loadId = event.target.getAttribute('data-load');
  const openPayload = event.target.getAttribute('data-open');
  if (loadId) loadHistoryItem(loadId);
  if (openPayload) window.open(`/published?data=${encodeURIComponent(openPayload)}`, '_blank', 'noreferrer');
});
els.suggestions.addEventListener('click', event => {
  const index = event.target.getAttribute('data-apply');
  if (index !== null) applySuggestion(Number(index));
});

renderPreview();
renderHistory();

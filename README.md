# AI Harness Studio

A local Python + desktop-style frontend for chatting with DeepSeek and other providers. The browser talks to the FastAPI server; server-side provider keys are stored locally (not in browser JS) or can be saved from the Settings UI.

## Highlights (recent)

- Fixed chat pane scrolling and visible scrollbars for better navigation.
- Reworked right-side workspace tabs to icon-only tabs with hover labels and improved layout.
- Added provider API key entry in Settings: keys are persisted on the Python server (`.local_provider_keys.json`) and used immediately.
- Conversations (chat history) are saved in the browser and can be moved to an Artifact (Project) or deleted.
- Conversation persistence across sessions and selective conversation switching.

## Features

- Three-pane desktop interface with conversations, chat, and workspace controls.
- Multi-provider support: DeepSeek, OpenAI, OpenRouter, Groq, Together AI, Mistral, xAI, and custom OpenAI-compatible endpoints.
- Tool toggles (server time, project context, code helper) that add local context to prompts.
- Artifact studio (documents, code, HTML, Markdown, JSON, tables, Mermaid diagrams, prompts, plans, data) with preview, copy, download, and save.
- Agent harness (planner, researcher, builder, debugger, critic) with bounded runs, step budgets, and artifact outputs.
- Data analysis panel for messy text, CSV/JSON, logs, and reports.
- Composer enhancements: attachments, slash commands, mentions, and context chips.
- Project browser: file search, preview, attach as context, and a small task board.
- Truthfulness safeguards: grounded-only, uncertainty notes, self-check, and context citation guidance.

## Run (local)

Create & activate a virtualenv, install dependencies, then start the server:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # (PowerShell)
pip install -r requirements.txt
python -m uvicorn app:app --host 127.0.0.1 --port 8000
```

Open http://127.0.0.1:8000 in your browser.

## Configure providers & API keys

Primary configuration is in `.env`. Example values:

```env
DEFAULT_AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

Alternatively, use the Settings panel in the app to save a provider API key. Enter the key for the selected provider and click "Save key" — the key is stored locally on the Python server in `.local_provider_keys.json` and the provider will be marked as configured.

Security note: Do not commit real API keys to the repository. The app saves keys locally to the project folder; if you share the project, remove `.local_provider_keys.json` first.

## Conversations & History

- Conversations are listed in the left rail. Each conversation has actions: Move (save as an Artifact) and Delete.
- Creating a new chat starts a fresh conversation; switching restores history.
- Conversations persist in browser localStorage; for longer-term storage, use the Artifact export or wire a server-side storage layer.

## Git & Deployment

This repository has been initialized and pushed to a remote if you provided one. To push locally yourself:

```powershell
git remote add origin https://github.com/your/repo.git
git push -u origin master:main
```

After verifying the remote on GitHub, consider enabling branch protection and storing any CI/CD secrets as repository secrets.

## Troubleshooting

- If a provider shows "needs key", either add the API key to `.env` and restart the server or save the key via Settings.
- If the chat pane does not scroll, hard-refresh the browser to pick up CSS changes.
- For long or truncated file previews, open the file directly in your editor or increase the preview limit in `app.py`.

## Next steps (planned)

- Implement structured, feature-rich assistant responses (cards, actions, citations, code blocks, collapsible summaries).
- Server-side conversation persistence optional (SQLite-backed) and export/import workflows.
- Add OAuth integrations for Google and GitHub and server-scheduled routines.

---

Maintainers: you (local project owner).



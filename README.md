# AI Harness Studio

A local Python + desktop-style frontend for chatting with DeepSeek. The browser talks to the FastAPI server, and the DeepSeek API key stays out of browser JavaScript.

## Features

- Three-pane desktop interface with conversations, chat, and workspace controls.
- DeepSeek model switcher for `deepseek-v4-flash` and `deepseek-v4-pro`.
- Tool toggles that add local context to the model, including server time and project context.
- MCP server manager UI for adding, enabling, disabling, and removing server definitions.
- Functional integration panel for local files, GitHub, browser workflows, Google Analytics, Google Search Console, Google Ads, Google Sheets, CRM/leads, email campaigns, and team notes.
- Integration actions can enable a connector, prepare export analysis, start a coordinated agent workflow, or create a recurring review routine.
- Local chat persistence in browser storage and one-click transcript export.
- Per-request token usage, estimated request cost, and running session token totals.
- DeepSeek account balance display through `/user/balance`.
- Session spend limit control in Settings.
- Artifact studio for documents, code, standalone HTML, Markdown, JSON, tables, Mermaid diagrams, prompts, plans, and structured data.
- Artifact preview, copy, download, delete, and local persistence.
- Automatic artifact capture from fenced code blocks in chat replies.
- Multi-provider support for DeepSeek, OpenAI, OpenRouter, Groq, Together AI, Mistral, xAI, and a custom OpenAI-compatible endpoint.
- Agent harness panel with planner, researcher, builder, debugger, and critic modes.
- Bounded harness runs with step budget, optional context, token/cost tracking, copy, and save-as-artifact.
- Daily routine system for recurring AI workflows, with daily, weekday, and weekly schedules.
- Routine run tracking with last/next run, due detection, pause/resume, run-due, and save-output-as-artifact.
- Codex-style workspace UI with a left icon rail, icon-led tools/actions, and richer chat message cards.
- Enhanced composer with file attachment context, slash commands, @ mentions, context chips, and chat/artifact/agent routing.
- Cursor-like project panel with workspace file browsing, code search, file preview, attach-file-as-context, `/code`, `/fix`, `/explain`, and a Todo/Doing/Done task board.
- Dedicated data analysis harness for messy text, logs, notes, CSV/JSON-like content, unstructured data, file uploads, profiling, cleaning plans, extraction, visualization ideas, and reports.
- Truthfulness safeguards: grounded-only mode, uncertainty/assumptions, self-checking unsupported claims, and context citation guidance across chat, agents, artifacts, and data analysis.
- More agentic harness behavior with evidence/assumption tracking, execution trace, self-check, verification, and next actions.
- Ready-made coordinated agent stacks for Website Design, Website SEO, and Digital Marketing workflows.

## Run

```powershell
.\.venv\Scripts\python.exe -m uvicorn app:app --host 127.0.0.1 --port 8000
```

Open http://127.0.0.1:8000.

## Configure

Settings live in `.env`:

```env
DEFAULT_AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash

OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=your_openai_model_here
```

You can switch providers and models in Settings. For any provider, add its API key and model to `.env`, restart the server, then select it in the UI. Providers supported by the current OpenAI-compatible path include OpenAI, OpenRouter, Groq, Together AI, Mistral, xAI, and custom endpoints.

## Usage and balance

The top usage strip shows the last request tokens, estimated request cost, session token total, session estimated cost, and current DeepSeek balance. Cost estimates use DeepSeek's public per-1M-token pricing and the token usage returned by the chat completion response.

## Routines

Routines are stored in browser local storage and run while the app is open. Use the Routines tab to create daily, weekday, or weekly AI workflows. Each routine runs through the agent harness and can save its output as an artifact. A future server scheduler can reuse the same routine shape for true background execution.

## Integrations

Google Analytics, Google Search Console, Google Ads, Sheets, CRM, email, and notes integrations currently work through pasted or uploaded exports. Each integration includes a tailored data-analysis prompt, an agent workflow starter, and a one-click routine template. Real OAuth/API sync can be added next on the same provider shape.

## MCP notes

The MCP panel stores server definitions in browser local storage for now. It is ready for the next step: launching those MCP server commands from Python and routing tool calls into DeepSeek conversations.

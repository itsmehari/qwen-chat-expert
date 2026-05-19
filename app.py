import os
from pathlib import Path
from datetime import datetime
from decimal import Decimal
from typing import Literal

import httpx
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from openai import APIStatusError, OpenAI
from pydantic import BaseModel, Field


load_dotenv()

PROJECT_ROOT = Path(__file__).resolve().parent
IGNORED_PROJECT_DIRS = {".git", ".venv", "venv", "env", "__pycache__", "node_modules", ".pytest_cache"}
TEXT_FILE_SUFFIXES = {
    ".py", ".js", ".ts", ".tsx", ".jsx", ".html", ".css", ".md", ".txt", ".json", ".yaml",
    ".yml", ".toml", ".ini", ".env", ".example", ".csv", ".xml", ".sql", ".ps1", ".sh",
}

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
DEEPSEEK_BASE_URL = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
DEFAULT_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-v4-flash")
DEFAULT_PROVIDER_ID = os.getenv("DEFAULT_AI_PROVIDER", "deepseek")
PROVIDERS = {
    "deepseek": {
        "id": "deepseek",
        "name": "DeepSeek",
        "api_key": DEEPSEEK_API_KEY,
        "api_key_env": "DEEPSEEK_API_KEY",
        "base_url": DEEPSEEK_BASE_URL,
        "default_model": DEFAULT_MODEL,
        "models": ["deepseek-v4-flash", "deepseek-v4-pro"],
        "balance": "deepseek",
    },
    "openai": {
        "id": "openai",
        "name": "OpenAI",
        "api_key": os.getenv("OPENAI_API_KEY"),
        "api_key_env": "OPENAI_API_KEY",
        "base_url": os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1"),
        "default_model": os.getenv("OPENAI_MODEL", ""),
        "models": [model for model in [os.getenv("OPENAI_MODEL")] if model],
        "balance": None,
    },
    "openrouter": {
        "id": "openrouter",
        "name": "OpenRouter",
        "api_key": os.getenv("OPENROUTER_API_KEY"),
        "api_key_env": "OPENROUTER_API_KEY",
        "base_url": os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1"),
        "default_model": os.getenv("OPENROUTER_MODEL", ""),
        "models": [model for model in [os.getenv("OPENROUTER_MODEL")] if model],
        "balance": None,
    },
    "groq": {
        "id": "groq",
        "name": "Groq",
        "api_key": os.getenv("GROQ_API_KEY"),
        "api_key_env": "GROQ_API_KEY",
        "base_url": os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1"),
        "default_model": os.getenv("GROQ_MODEL", ""),
        "models": [model for model in [os.getenv("GROQ_MODEL")] if model],
        "balance": None,
    },
    "together": {
        "id": "together",
        "name": "Together AI",
        "api_key": os.getenv("TOGETHER_API_KEY"),
        "api_key_env": "TOGETHER_API_KEY",
        "base_url": os.getenv("TOGETHER_BASE_URL", "https://api.together.xyz/v1"),
        "default_model": os.getenv("TOGETHER_MODEL", ""),
        "models": [model for model in [os.getenv("TOGETHER_MODEL")] if model],
        "balance": None,
    },
    "mistral": {
        "id": "mistral",
        "name": "Mistral",
        "api_key": os.getenv("MISTRAL_API_KEY"),
        "api_key_env": "MISTRAL_API_KEY",
        "base_url": os.getenv("MISTRAL_BASE_URL", "https://api.mistral.ai/v1"),
        "default_model": os.getenv("MISTRAL_MODEL", ""),
        "models": [model for model in [os.getenv("MISTRAL_MODEL")] if model],
        "balance": None,
    },
    "xai": {
        "id": "xai",
        "name": "xAI",
        "api_key": os.getenv("XAI_API_KEY"),
        "api_key_env": "XAI_API_KEY",
        "base_url": os.getenv("XAI_BASE_URL", "https://api.x.ai/v1"),
        "default_model": os.getenv("XAI_MODEL", ""),
        "models": [model for model in [os.getenv("XAI_MODEL")] if model],
        "balance": None,
    },
    "custom": {
        "id": "custom",
        "name": "Custom OpenAI-compatible",
        "api_key": os.getenv("CUSTOM_AI_API_KEY"),
        "api_key_env": "CUSTOM_AI_API_KEY",
        "base_url": os.getenv("CUSTOM_AI_BASE_URL", ""),
        "default_model": os.getenv("CUSTOM_AI_MODEL", ""),
        "models": [model for model in [os.getenv("CUSTOM_AI_MODEL")] if model],
        "balance": None,
    },
}
PRICING_USD_PER_1M = {
    "deepseek-v4-flash": {
        "cache_hit_input": Decimal("0.0028"),
        "cache_miss_input": Decimal("0.14"),
        "output": Decimal("0.28"),
    },
    "deepseek-v4-pro": {
        "cache_hit_input": Decimal("0.003625"),
        "cache_miss_input": Decimal("0.435"),
        "output": Decimal("0.87"),
    },
}

app = FastAPI(title="DeepSeek Local Chat")

# Persisted provider API keys file (local to project)
PERSISTED_KEYS_PATH = PROJECT_ROOT / ".local_provider_keys.json"

# Load persisted provider keys on startup (if present)
if PERSISTED_KEYS_PATH.exists():
    try:
        with open(PERSISTED_KEYS_PATH, "r", encoding="utf-8") as f:
            stored = json.load(f)
            for pid, key in stored.items():
                if pid in PROVIDERS:
                    PROVIDERS[pid]["api_key"] = key
    except Exception:
        # ignore failures reading persisted keys
        pass


def persist_provider_keys():
    try:
        data = {pid: PROVIDERS[pid].get("api_key") for pid in PROVIDERS if PROVIDERS[pid].get("api_key")}
        with open(PERSISTED_KEYS_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f)
    except Exception:
        # ignore write errors for now
        pass


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str = Field(min_length=1, max_length=12000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=50)
    model: str = Field(default=DEFAULT_MODEL, max_length=80)
    provider_id: str = Field(default=DEFAULT_PROVIDER_ID, max_length=80)
    temperature: float = Field(default=0.7, ge=0, le=2)
    enabled_tools: list[str] = Field(default_factory=list, max_length=20)
    safeguards: dict[str, bool] = Field(default_factory=dict)


class ArtifactRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=12000)
    artifact_type: Literal[
        "document",
        "code",
        "html",
        "markdown",
        "json",
        "table",
        "diagram",
        "prompt",
        "plan",
        "data",
    ] = "document"
    title: str | None = Field(default=None, max_length=120)
    model: str = Field(default=DEFAULT_MODEL, max_length=80)
    provider_id: str = Field(default=DEFAULT_PROVIDER_ID, max_length=80)
    temperature: float = Field(default=0.5, ge=0, le=2)
    enabled_tools: list[str] = Field(default_factory=list, max_length=20)
    safeguards: dict[str, bool] = Field(default_factory=dict)


class AgentHarnessRequest(BaseModel):
    goal: str = Field(min_length=1, max_length=12000)
    mode: Literal["planner", "researcher", "builder", "debugger", "critic"] = "planner"
    max_steps: int = Field(default=5, ge=1, le=8)
    context: str | None = Field(default=None, max_length=12000)
    model: str = Field(default=DEFAULT_MODEL, max_length=80)
    provider_id: str = Field(default=DEFAULT_PROVIDER_ID, max_length=80)
    temperature: float = Field(default=0.4, ge=0, le=2)
    enabled_tools: list[str] = Field(default_factory=list, max_length=20)
    safeguards: dict[str, bool] = Field(default_factory=dict)


class AgentStackRequest(BaseModel):
    stack_id: Literal["website-design", "website-seo", "digital-marketing"]
    goal: str = Field(min_length=1, max_length=12000)
    context: str | None = Field(default=None, max_length=12000)
    model: str = Field(default=DEFAULT_MODEL, max_length=80)
    provider_id: str = Field(default=DEFAULT_PROVIDER_ID, max_length=80)
    temperature: float = Field(default=0.4, ge=0, le=2)
    enabled_tools: list[str] = Field(default_factory=list, max_length=20)
    safeguards: dict[str, bool] = Field(default_factory=dict)


class DataAnalysisRequest(BaseModel):
    data: str = Field(min_length=1, max_length=120000)
    question: str = Field(default="Analyze this data and extract useful insights.", max_length=12000)
    analysis_type: Literal["profile", "clean", "insights", "extract", "visualize", "report"] = "insights"
    model: str = Field(default=DEFAULT_MODEL, max_length=80)
    provider_id: str = Field(default=DEFAULT_PROVIDER_ID, max_length=80)
    temperature: float = Field(default=0.2, ge=0, le=2)
    safeguards: dict[str, bool] = Field(default_factory=dict)


class ChatResponse(BaseModel):
    message: str
    model: str
    provider_id: str
    usage: dict[str, int | float | str | None]


class ArtifactResponse(BaseModel):
    title: str
    artifact_type: str
    content: str
    model: str
    provider_id: str
    usage: dict[str, int | float | str | None]


class AgentHarnessResponse(BaseModel):
    mode: str
    result: str
    model: str
    provider_id: str
    usage: dict[str, int | float | str | None]


class AgentStackResponse(BaseModel):
    stack_id: str
    result: str
    model: str
    provider_id: str
    usage: dict[str, int | float | str | None]


class DataAnalysisResponse(BaseModel):
    analysis_type: str
    result: str
    profile: dict[str, object]
    model: str
    provider_id: str
    usage: dict[str, int | float | str | None]


@app.get("/api/health")
def health() -> dict[str, bool | str]:
    configured = [provider["id"] for provider in PROVIDERS.values() if provider["api_key"] and provider["base_url"]]
    return {
        "ok": True,
        "configured": bool(configured),
        "provider": DEFAULT_PROVIDER_ID,
        "model": str(PROVIDERS.get(DEFAULT_PROVIDER_ID, PROVIDERS["deepseek"])["default_model"]),
    }


@app.get("/api/providers")
def providers() -> dict[str, list[dict[str, object]] | str]:
    return {
        "default_provider": DEFAULT_PROVIDER_ID,
        "providers": [
            {
                "id": provider["id"],
                "name": provider["name"],
                "configured": bool(provider["api_key"] and provider["base_url"]),
                "api_key_env": provider["api_key_env"],
                "base_url": provider["base_url"],
                "default_model": provider["default_model"],
                "models": provider["models"],
                "balance_supported": bool(provider["balance"]),
            }
            for provider in PROVIDERS.values()
        ],
    }


@app.get("/api/balance")
def balance(provider_id: str = DEFAULT_PROVIDER_ID) -> dict[str, object]:
    provider = get_provider(provider_id)
    if provider["balance"] != "deepseek":
        return {
            "is_available": bool(provider["api_key"] and provider["base_url"]),
            "balance_infos": [],
            "message": f"Balance lookup is not implemented for {provider['name']}.",
        }

    try:
        response = httpx.get(
            f"{str(provider['base_url']).rstrip('/')}/user/balance",
            headers={"Authorization": f"Bearer {provider['api_key']}"},
            timeout=10,
        )
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as exc:
        detail = "Could not fetch DeepSeek balance."
        try:
            detail = exc.response.json().get("error", {}).get("message", detail)
        except Exception:
            pass
        raise HTTPException(status_code=exc.response.status_code, detail=detail) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Balance request failed: {exc}") from exc


class ProviderKeyRequest(BaseModel):
    provider_id: str = Field(max_length=80)
    api_key: str = Field(min_length=1, max_length=2000)


@app.post("/api/provider-key")
def set_provider_key(req: ProviderKeyRequest) -> dict[str, object]:
    pid = req.provider_id
    if pid not in PROVIDERS:
        raise HTTPException(status_code=400, detail="Unknown provider")
    PROVIDERS[pid]["api_key"] = req.api_key
    persist_provider_keys()
    return {"ok": True, "provider_id": pid, "configured": bool(PROVIDERS[pid].get("api_key") and PROVIDERS[pid].get("base_url"))}


@app.get("/api/workspace")
def workspace() -> dict[str, list[dict[str, str]]]:
    return {
        "tools": [
            {
                "id": "clock",
                "name": "Clock",
                "icon": "clock",
                "description": "Adds the current server date and time to the prompt context.",
            },
            {
                "id": "project",
                "name": "Project Context",
                "icon": "folder",
                "description": "Tells the model it is helping inside this local DeepSeek chat project.",
            },
            {
                "id": "safe-code",
                "name": "Code Helper",
                "icon": "code",
                "description": "Asks the model for careful, step-by-step coding answers.",
            },
        ],
        "integrations": [
            {"id": "files", "name": "Local Files", "icon": "folder", "category": "project", "description": "Browse, preview, search, and attach local project files."},
            {"id": "github", "name": "GitHub", "icon": "branch", "category": "code", "description": "Repository planning workflow for issues, PRs, releases, and code review."},
            {"id": "browser", "name": "Browser", "icon": "globe", "category": "research", "description": "Website research and QA workflow starter."},
            {"id": "google-analytics", "name": "Google Analytics", "icon": "data", "category": "analytics", "description": "Analyze GA4 exports, traffic, channels, landing pages, events, and conversions."},
            {"id": "google-search-console", "name": "Google Search Console", "icon": "globe", "category": "seo", "description": "Analyze GSC exports, queries, pages, impressions, CTR, positions, and SEO opportunities."},
            {"id": "google-ads", "name": "Google Ads", "icon": "spark", "category": "marketing", "description": "Analyze campaign exports, keywords, ads, costs, conversions, and optimization ideas."},
            {"id": "google-sheets", "name": "Google Sheets", "icon": "data", "category": "data", "description": "Paste or upload sheet exports for structured data analysis."},
            {"id": "crm", "name": "CRM / Leads", "icon": "agent", "category": "sales", "description": "Analyze lead lists, pipeline notes, customer segments, and follow-up workflows."},
            {"id": "email-campaigns", "name": "Email Campaigns", "icon": "message", "category": "marketing", "description": "Analyze email performance exports and create lifecycle improvements."},
            {"id": "slack-notes", "name": "Slack / Notes", "icon": "message", "category": "ops", "description": "Summarize messy team notes, logs, decisions, and action items."},
        ],
    }


def safe_project_path(path: str) -> Path:
    candidate = (PROJECT_ROOT / path).resolve()
    if PROJECT_ROOT not in candidate.parents and candidate != PROJECT_ROOT:
        raise HTTPException(status_code=400, detail="Path is outside the project.")
    if not candidate.exists() or not candidate.is_file():
        raise HTTPException(status_code=404, detail="Project file not found.")
    return candidate


def is_project_text_file(path: Path) -> bool:
    return path.suffix.lower() in TEXT_FILE_SUFFIXES or path.name in {".env.example", ".gitignore"}


@app.get("/api/project/files")
def project_files() -> dict[str, object]:
    files = []
    for path in PROJECT_ROOT.rglob("*"):
        if any(part in IGNORED_PROJECT_DIRS for part in path.relative_to(PROJECT_ROOT).parts):
            continue
        if path.is_file() and is_project_text_file(path):
            files.append(
                {
                    "path": str(path.relative_to(PROJECT_ROOT)).replace("\\", "/"),
                    "size": path.stat().st_size,
                    "suffix": path.suffix,
                }
            )
    return {"root": str(PROJECT_ROOT), "files": sorted(files, key=lambda item: str(item["path"]))}


@app.get("/api/project/file")
def project_file(path: str) -> dict[str, object]:
    file_path = safe_project_path(path)
    if not is_project_text_file(file_path):
        raise HTTPException(status_code=400, detail="Only text-like project files can be read.")
    content = file_path.read_text(encoding="utf-8", errors="replace")
    return {
        "path": str(file_path.relative_to(PROJECT_ROOT)).replace("\\", "/"),
        "content": content[:60000],
        "truncated": len(content) > 60000,
    }


@app.get("/api/project/search")
def project_search(q: str, limit: int = 50) -> dict[str, list[dict[str, object]]]:
    query = q.strip().lower()
    if not query:
        return {"matches": []}

    matches = []
    for path in PROJECT_ROOT.rglob("*"):
        if len(matches) >= limit:
            break
        if any(part in IGNORED_PROJECT_DIRS for part in path.relative_to(PROJECT_ROOT).parts):
            continue
        if not path.is_file() or not is_project_text_file(path):
            continue
        rel = str(path.relative_to(PROJECT_ROOT)).replace("\\", "/")
        try:
            for line_number, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
                if query in line.lower() or query in rel.lower():
                    matches.append({"path": rel, "line": line_number, "text": line[:240]})
                    break
        except OSError:
            continue
    return {"matches": matches}


def tool_context(enabled_tools: list[str]) -> str:
    context: list[str] = []
    if "clock" in enabled_tools:
        context.append(f"Current server time: {datetime.now().isoformat(timespec='seconds')}")
    if "project" in enabled_tools:
        context.append("Project: DeepSeek Local Chat, a Python FastAPI desktop-style chat frontend.")
    if "safe-code" in enabled_tools:
        context.append("For coding requests, explain assumptions, give runnable commands, and avoid unsafe actions.")
    return "\n".join(context)


def safeguard_context(safeguards: dict[str, bool] | None) -> str:
    settings = safeguards or {}
    rules = [
        "Truthfulness rules:",
        "- Do not invent facts, sources, files, tool outputs, API behavior, or project state.",
        "- If information is missing, say what is unknown and what would verify it.",
        "- Separate observed facts from assumptions and recommendations.",
        "- Do not claim a tool, file, command, or integration was used unless provided in the prompt context.",
    ]
    if settings.get("groundedOnly"):
        rules.append("- Grounded-only mode is enabled: answer only from supplied chat, file, tool, or project context. If context is insufficient, say so.")
    if settings.get("showUncertainty", True):
        rules.append("- Include uncertainty when confidence is limited.")
    if settings.get("selfCheck", True):
        rules.append("- Before finalizing, silently check for unsupported claims; in the answer include a brief 'Verification' or 'Assumptions' note when relevant.")
    if settings.get("citeContext"):
        rules.append("- Cite the relevant context label, file name, artifact, or routine when using provided context.")
    return "\n".join(rules)


def get_provider(provider_id: str) -> dict[str, object]:
    provider = PROVIDERS.get(provider_id)
    if provider is None:
        raise HTTPException(status_code=400, detail=f"Unknown provider: {provider_id}")
    if not provider["api_key"]:
        raise HTTPException(status_code=500, detail=f"Missing {provider['api_key_env']}. Add it to .env and restart.")
    if not provider["base_url"]:
        raise HTTPException(status_code=500, detail=f"Missing base URL for {provider['name']}.")
    return provider


def get_client(provider_id: str) -> tuple[OpenAI, dict[str, object]]:
    provider = get_provider(provider_id)
    return OpenAI(api_key=str(provider["api_key"]), base_url=str(provider["base_url"])), provider


def estimate_usage_cost(provider_id: str, model: str, usage: object) -> dict[str, int | float | str | None]:
    usage_data = usage.model_dump() if hasattr(usage, "model_dump") else {}
    prompt_tokens = int(usage_data.get("prompt_tokens") or 0)
    completion_tokens = int(usage_data.get("completion_tokens") or 0)
    total_tokens = int(usage_data.get("total_tokens") or prompt_tokens + completion_tokens)

    details = usage_data.get("prompt_tokens_details") or {}
    cache_hit_tokens = int(
        usage_data.get("prompt_cache_hit_tokens")
        or details.get("cached_tokens")
        or 0
    )
    cache_hit_tokens = min(cache_hit_tokens, prompt_tokens)
    cache_miss_tokens = max(prompt_tokens - cache_hit_tokens, 0)

    prices = PRICING_USD_PER_1M.get(model) if provider_id == "deepseek" else None
    input_cost = None
    output_cost = None
    estimated_cost = None
    pricing_note = "Pricing is not configured for this provider; token counts are exact when returned by the API."
    if prices:
        input_cost = (
            Decimal(cache_hit_tokens) * prices["cache_hit_input"]
            + Decimal(cache_miss_tokens) * prices["cache_miss_input"]
        ) / Decimal(1_000_000)
        output_cost = Decimal(completion_tokens) * prices["output"] / Decimal(1_000_000)
        estimated_cost = input_cost + output_cost
        pricing_note = "Estimated from DeepSeek public pricing; actual billing may differ with cache accounting and price changes."

    return {
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "total_tokens": total_tokens,
        "cache_hit_tokens": cache_hit_tokens,
        "cache_miss_tokens": cache_miss_tokens,
        "estimated_input_cost_usd": float(input_cost) if input_cost is not None else None,
        "estimated_output_cost_usd": float(output_cost) if output_cost is not None else None,
        "estimated_cost_usd": float(estimated_cost) if estimated_cost is not None else None,
        "pricing_note": pricing_note,
    }


def artifact_system_prompt(artifact_type: str) -> str:
    instructions = {
        "document": "Create a polished document. Use clear headings and concise sections.",
        "code": "Create complete, runnable code. Include only the code unless comments are needed inside the code.",
        "html": "Create a complete standalone HTML document with embedded CSS and JavaScript when useful.",
        "markdown": "Create clean Markdown content.",
        "json": "Create valid JSON only. Do not wrap it in Markdown fences.",
        "table": "Create a useful Markdown table with short column names and clear rows.",
        "diagram": "Create a Mermaid diagram only, without Markdown fences.",
        "prompt": "Create a reusable prompt template with placeholders where helpful.",
        "plan": "Create a practical implementation plan with ordered steps.",
        "data": "Create structured data in the most useful text format for the request.",
    }
    return (
        "You are generating a standalone artifact for a desktop AI workspace. "
        "Return only the artifact content, with no conversational preface or afterword. "
        + instructions.get(artifact_type, instructions["document"])
    )


def agent_harness_system_prompt(mode: str, max_steps: int) -> str:
    mode_guidance = {
        "planner": "Break the goal into a practical plan with dependencies, risks, and acceptance checks.",
        "researcher": "Map the unknowns, likely sources, assumptions, evidence to gather, and synthesis format.",
        "builder": "Act like an implementation agent: design the approach, sequence work, define files/modules, and note verification.",
        "debugger": "Act like a debugging agent: form hypotheses, define inspection steps, isolate causes, and propose fixes.",
        "critic": "Act like a review agent: identify risks, edge cases, failure modes, and missing tests.",
    }
    return f"""
You are an agent harness running a bounded AI worker inside a local desktop workspace.

Harness rules:
- Mode: {mode}
- Step budget: {max_steps}
- Stay inside the stated goal.
- Make assumptions explicit.
- Prefer concrete outputs over vague advice.
- Include checkpoints and verification.
- Do not claim to have used external tools unless tool output is provided.

Return a structured Markdown report with exactly these sections:
# Mission
# Harness Configuration
# Evidence And Assumptions
# Step Plan
Use at most {max_steps} numbered steps.
# Execution Trace
For each step, include: intent, action, expected output, actual/assumed output, status.
# Self Check
List unsupported claims, risks, and what would verify them.
# Final Output
# Verification
# Next Actions

Mode behavior: {mode_guidance.get(mode, mode_guidance["planner"])}
""".strip()

 
AGENT_STACKS = {
    "website-design": {
        "name": "Website Design Stack",
        "agents": [
            "Product strategist: clarify audience, offer, pages, and conversion goal.",
            "UX architect: create IA, flows, layout priorities, and interaction model.",
            "Visual designer: define style direction, component system, spacing, and responsive behavior.",
            "Frontend implementer: convert design into implementation-ready components and states.",
            "QA reviewer: check accessibility, responsiveness, clarity, and missing states.",
        ],
        "output": "site brief, sitemap, page sections, design system, implementation plan, QA checklist",
    },
    "website-seo": {
        "name": "Website SEO Stack",
        "agents": [
            "SEO strategist: define search intent, positioning, and target page types.",
            "Keyword researcher: produce keyword clusters and content opportunities.",
            "Technical SEO auditor: check crawlability, metadata, structure, speed, schema, and links.",
            "Content optimizer: create titles, descriptions, headings, and content briefs.",
            "Measurement analyst: define KPIs, tracking, and reporting cadence.",
        ],
        "output": "SEO audit, keyword map, metadata plan, technical fixes, content calendar, KPI dashboard",
    },
    "digital-marketing": {
        "name": "Digital Marketing Stack",
        "agents": [
            "Growth strategist: define audience, funnel, channels, budget logic, and conversion goals.",
            "Content planner: create campaign themes, posts, email ideas, and landing page angles.",
            "Paid media specialist: propose ad structure, targeting hypotheses, creatives, and tests.",
            "Lifecycle marketer: design email/CRM nurture and retention flows.",
            "Analytics lead: define experiments, KPIs, attribution assumptions, and reporting.",
        ],
        "output": "campaign plan, channel strategy, content calendar, ad test plan, lifecycle flows, measurement plan",
    },
}


def agent_stack_prompt(stack_id: str) -> str:
    stack = AGENT_STACKS[stack_id]
    agents = "\n".join(f"- {agent}" for agent in stack["agents"])
    return f"""
You are running a coordinated multi-agent workflow called {stack["name"]}.

Coordinate these specialist agents:
{agents}

Rules:
- Do not invent market facts, rankings, metrics, competitor data, or external research.
- Mark assumptions clearly.
- Produce a coordinated workflow, not disconnected advice.
- Include dependencies, handoffs, acceptance checks, and next actions.
- Output target: {stack["output"]}.

Return Markdown with these sections:
# Workflow Mission
# Agent Team
# Assumptions And Inputs Needed
# Coordinated Plan
# Specialist Outputs
# Handoffs
# Risks And Safeguards
# Final Deliverables
# Next Actions
""".strip()


def data_profile(data: str) -> dict[str, object]:
    lines = data.splitlines()
    non_empty = [line for line in lines if line.strip()]
    delimiters = {",": 0, "\t": 0, "|": 0, ";": 0}
    for line in non_empty[:50]:
        for delimiter in delimiters:
            delimiters[delimiter] += line.count(delimiter)
    likely_delimiter = max(delimiters, key=delimiters.get) if non_empty else ""
    return {
        "characters": len(data),
        "lines": len(lines),
        "non_empty_lines": len(non_empty),
        "looks_like_json": data.strip().startswith(("{", "[")),
        "likely_delimiter": likely_delimiter if delimiters.get(likely_delimiter, 0) else None,
        "sample": data[:1000],
    }


def data_analysis_prompt(analysis_type: str) -> str:
    guidance = {
        "profile": "Profile the dataset. Infer structure, fields, data types, quality issues, and useful next checks.",
        "clean": "Create a data cleaning plan. Include normalization rules, missing data handling, deduplication, parsing, and validation.",
        "insights": "Extract meaningful insights, patterns, anomalies, and questions worth investigating.",
        "extract": "Extract structured entities and return useful tables or JSON-like summaries where appropriate.",
        "visualize": "Recommend charts and produce chart-ready summaries. Include suggested axes and encodings.",
        "report": "Write a clear analysis report with executive summary, methodology, findings, risks, and next steps.",
    }
    return (
        "You are a data analysis harness for messy, semi-structured, and unstructured inputs. "
        "The input may be malformed, inconsistent, pasted from documents, logs, notes, tables, CSV, JSON, or mixed sources. "
        "Infer structure carefully, state assumptions, preserve uncertainty, and never pretend unavailable statistics are exact. "
        + guidance.get(analysis_type, guidance["insights"])
    )


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        client, provider = get_client(request.provider_id)
        messages = [message.model_dump() for message in request.messages]
        context = tool_context(request.enabled_tools)
        if context:
            messages.insert(
                0,
                {
                    "role": "system",
                    "content": f"Enabled local tool context:\n{context}",
                },
            )
        messages.insert(0, {"role": "system", "content": safeguard_context(request.safeguards)})

        completion = client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
        )
    except APIStatusError as exc:
        message = "DeepSeek API request failed."
        if isinstance(exc.response, object):
            try:
                payload = exc.response.json()
                message = payload.get("error", {}).get("message", message)
            except Exception:
                message = str(exc)
        raise HTTPException(status_code=exc.status_code, detail=message) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"DeepSeek API error: {exc}") from exc

    answer = completion.choices[0].message.content
    if not answer:
        raise HTTPException(status_code=502, detail="DeepSeek returned an empty response.")

    return ChatResponse(
        message=answer,
        model=request.model,
        provider_id=str(provider["id"]),
        usage=estimate_usage_cost(str(provider["id"]), request.model, completion.usage),
    )


@app.post("/api/data-analysis", response_model=DataAnalysisResponse)
def data_analysis(request: DataAnalysisRequest) -> DataAnalysisResponse:
    profile = data_profile(request.data)
    messages = [
        {"role": "system", "content": safeguard_context(request.safeguards)},
        {"role": "system", "content": data_analysis_prompt(request.analysis_type)},
        {
            "role": "user",
            "content": (
                f"Question:\n{request.question}\n\n"
                f"Automatic profile:\n{profile}\n\n"
                f"Raw input data:\n{request.data}"
            ),
        },
    ]

    try:
        client, provider = get_client(request.provider_id)
        completion = client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
        )
    except APIStatusError as exc:
        message = "AI provider request failed."
        if isinstance(exc.response, object):
            try:
                payload = exc.response.json()
                message = payload.get("error", {}).get("message", message)
            except Exception:
                message = str(exc)
        raise HTTPException(status_code=exc.status_code, detail=message) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Data analysis error: {exc}") from exc

    result = completion.choices[0].message.content
    if not result:
        raise HTTPException(status_code=502, detail="Data analysis returned an empty result.")

    return DataAnalysisResponse(
        analysis_type=request.analysis_type,
        result=result,
        profile=profile,
        model=request.model,
        provider_id=str(provider["id"]),
        usage=estimate_usage_cost(str(provider["id"]), request.model, completion.usage),
    )


@app.post("/api/agent-harness", response_model=AgentHarnessResponse)
def run_agent_harness(request: AgentHarnessRequest) -> AgentHarnessResponse:
    context_parts = []
    tool_info = tool_context(request.enabled_tools)
    if tool_info:
        context_parts.append(f"Enabled local tool context:\n{tool_info}")
    context_parts.append(safeguard_context(request.safeguards))
    if request.context:
        context_parts.append(f"User-provided context:\n{request.context}")

    messages = [
        {"role": "system", "content": agent_harness_system_prompt(request.mode, request.max_steps)},
        {
            "role": "user",
            "content": "\n\n".join([*context_parts, f"Goal:\n{request.goal}"]),
        },
    ]

    try:
        client, provider = get_client(request.provider_id)
        completion = client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
        )
    except APIStatusError as exc:
        message = "AI provider request failed."
        if isinstance(exc.response, object):
            try:
                payload = exc.response.json()
                message = payload.get("error", {}).get("message", message)
            except Exception:
                message = str(exc)
        raise HTTPException(status_code=exc.status_code, detail=message) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Agent harness error: {exc}") from exc

    result = completion.choices[0].message.content
    if not result:
        raise HTTPException(status_code=502, detail="Agent harness returned an empty result.")

    return AgentHarnessResponse(
        mode=request.mode,
        result=result,
        model=request.model,
        provider_id=str(provider["id"]),
        usage=estimate_usage_cost(str(provider["id"]), request.model, completion.usage),
    )


@app.post("/api/agent-stack", response_model=AgentStackResponse)
def run_agent_stack(request: AgentStackRequest) -> AgentStackResponse:
    context_parts = [safeguard_context(request.safeguards)]
    tool_info = tool_context(request.enabled_tools)
    if tool_info:
        context_parts.append(f"Enabled local tool context:\n{tool_info}")
    if request.context:
        context_parts.append(f"User-provided context:\n{request.context}")

    messages = [
        {"role": "system", "content": agent_stack_prompt(request.stack_id)},
        {"role": "user", "content": "\n\n".join([*context_parts, f"Workflow goal:\n{request.goal}"])},
    ]

    try:
        client, provider = get_client(request.provider_id)
        completion = client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
        )
    except APIStatusError as exc:
        message = "AI provider request failed."
        if isinstance(exc.response, object):
            try:
                payload = exc.response.json()
                message = payload.get("error", {}).get("message", message)
            except Exception:
                message = str(exc)
        raise HTTPException(status_code=exc.status_code, detail=message) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Agent stack error: {exc}") from exc

    result = completion.choices[0].message.content
    if not result:
        raise HTTPException(status_code=502, detail="Agent stack returned an empty result.")

    return AgentStackResponse(
        stack_id=request.stack_id,
        result=result,
        model=request.model,
        provider_id=str(provider["id"]),
        usage=estimate_usage_cost(str(provider["id"]), request.model, completion.usage),
    )


@app.post("/api/artifact", response_model=ArtifactResponse)
def create_artifact(request: ArtifactRequest) -> ArtifactResponse:
    messages = [
        {"role": "system", "content": safeguard_context(request.safeguards)},
        {"role": "system", "content": artifact_system_prompt(request.artifact_type)},
        {"role": "user", "content": request.prompt},
    ]
    context = tool_context(request.enabled_tools)
    if context:
        messages.insert(1, {"role": "system", "content": f"Enabled local tool context:\n{context}"})

    try:
        client, provider = get_client(request.provider_id)
        completion = client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
        )
    except APIStatusError as exc:
        message = "DeepSeek API request failed."
        if isinstance(exc.response, object):
            try:
                payload = exc.response.json()
                message = payload.get("error", {}).get("message", message)
            except Exception:
                message = str(exc)
        raise HTTPException(status_code=exc.status_code, detail=message) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"DeepSeek API error: {exc}") from exc

    content = completion.choices[0].message.content
    if not content:
        raise HTTPException(status_code=502, detail="DeepSeek returned an empty artifact.")

    title = request.title or f"{request.artifact_type.title()} artifact"
    return ArtifactResponse(
        title=title,
        artifact_type=request.artifact_type,
        content=content,
        model=request.model,
        provider_id=str(provider["id"]),
        usage=estimate_usage_cost(str(provider["id"]), request.model, completion.usage),
    )


app.mount("/", StaticFiles(directory="static", html=True), name="static")

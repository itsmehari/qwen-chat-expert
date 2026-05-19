const messagesEl = document.querySelector("#messages");
const form = document.querySelector("#chat-form");
const promptEl = document.querySelector("#prompt");
const sendButton = document.querySelector("#send");
const fileInputEl = document.querySelector("#file-input");
const slashButton = document.querySelector("#slash-button");
const mentionButton = document.querySelector("#mention-button");
const composerModeEl = document.querySelector("#composer-mode");
const composerMenuEl = document.querySelector("#composer-menu");
const contextChipsEl = document.querySelector("#context-chips");
const clearButton = document.querySelector("#clear");
const exportButton = document.querySelector("#export-chat");
const newChatButton = document.querySelector("#new-chat");
const providerEl = document.querySelector("#provider");
const modelEl = document.querySelector("#model");
const modelOptionsEl = document.querySelector("#model-options");
const providerHelpEl = document.querySelector("#provider-help");
const providerKeyInputEl = document.querySelector("#provider-api-key");
const saveProviderKeyButton = document.querySelector("#save-provider-key");
const temperatureEl = document.querySelector("#temperature");
const tempValueEl = document.querySelector("#temp-value");
const statusEl = document.querySelector("#status");
const lastRequestTokensEl = document.querySelector("#last-request-tokens");
const lastRequestCostEl = document.querySelector("#last-request-cost");
const sessionTokensEl = document.querySelector("#session-tokens");
const sessionCostEl = document.querySelector("#session-cost");
const balanceTotalEl = document.querySelector("#balance-total");
const balanceStateEl = document.querySelector("#balance-state");
const balanceLabelEl = document.querySelector("#balance-label");
const refreshBalanceButton = document.querySelector("#refresh-balance");
const settingsBalanceEl = document.querySelector("#settings-balance");
const balanceDetailsEl = document.querySelector("#balance-details");
const sessionLimitEl = document.querySelector("#session-limit");
const guardGroundedEl = document.querySelector("#guard-grounded");
const guardUncertaintyEl = document.querySelector("#guard-uncertainty");
const guardSelfCheckEl = document.querySelector("#guard-self-check");
const guardCiteContextEl = document.querySelector("#guard-cite-context");
const systemPromptEl = document.querySelector("#system-prompt");
const toolListEl = document.querySelector("#tool-list");
const integrationListEl = document.querySelector("#integration-list");
const activeToolsEl = document.querySelector("#active-tools");
const providerCardEl = document.querySelector("#provider-card");
const artifactCountEl = document.querySelector("#artifact-count");
const agentRunCountEl = document.querySelector("#agent-run-count");
const routineCountEl = document.querySelector("#routine-count");
const guardCardEl = document.querySelector("#guard-card");
const mcpForm = document.querySelector("#mcp-form");
const mcpNameEl = document.querySelector("#mcp-name");
const mcpCommandEl = document.querySelector("#mcp-command");
const mcpListEl = document.querySelector("#mcp-list");
const artifactForm = document.querySelector("#artifact-form");
const artifactTypeEl = document.querySelector("#artifact-type");
const artifactTitleEl = document.querySelector("#artifact-title");
const artifactPromptEl = document.querySelector("#artifact-prompt");
const createArtifactButton = document.querySelector("#create-artifact");
const artifactListEl = document.querySelector("#artifact-list");
const artifactPreviewTitleEl = document.querySelector("#artifact-preview-title");
const artifactPreviewMetaEl = document.querySelector("#artifact-preview-meta");
const artifactPreviewContentEl = document.querySelector("#artifact-preview-content");
const artifactHtmlPreviewEl = document.querySelector("#artifact-html-preview");
const copyArtifactButton = document.querySelector("#copy-artifact");
const downloadArtifactButton = document.querySelector("#download-artifact");
const deleteArtifactButton = document.querySelector("#delete-artifact");
const agentForm = document.querySelector("#agent-form");
const agentStackEl = document.querySelector("#agent-stack");
const agentModeEl = document.querySelector("#agent-mode");
const agentStepsEl = document.querySelector("#agent-steps");
const agentStepValueEl = document.querySelector("#agent-step-value");
const agentGoalEl = document.querySelector("#agent-goal");
const agentContextEl = document.querySelector("#agent-context");
const runAgentButton = document.querySelector("#run-agent");
const agentRunsEl = document.querySelector("#agent-runs");
const agentPreviewTitleEl = document.querySelector("#agent-preview-title");
const agentPreviewMetaEl = document.querySelector("#agent-preview-meta");
const agentResultEl = document.querySelector("#agent-result");
const saveAgentArtifactButton = document.querySelector("#save-agent-artifact");
const copyAgentResultButton = document.querySelector("#copy-agent-result");
const routineForm = document.querySelector("#routine-form");
const routineNameEl = document.querySelector("#routine-name");
const routineScheduleEl = document.querySelector("#routine-schedule");
const routineTimeEl = document.querySelector("#routine-time");
const routineDayFieldEl = document.querySelector("#routine-day-field");
const routineDayEl = document.querySelector("#routine-day");
const routineModeEl = document.querySelector("#routine-mode");
const routinePromptEl = document.querySelector("#routine-prompt");
const routineArtifactEl = document.querySelector("#routine-artifact");
const runDueRoutinesButton = document.querySelector("#run-due-routines");
const pauseRoutinesButton = document.querySelector("#pause-routines");
const routineListEl = document.querySelector("#routine-list");
const projectSearchEl = document.querySelector("#project-search");
const projectSearchButton = document.querySelector("#project-search-button");
const projectFileListEl = document.querySelector("#project-file-list");
const projectPreviewTitleEl = document.querySelector("#project-preview-title");
const projectPreviewMetaEl = document.querySelector("#project-preview-meta");
const projectPreviewContentEl = document.querySelector("#project-preview-content");
const attachProjectFileButton = document.querySelector("#attach-project-file");
const projectTaskForm = document.querySelector("#project-task-form");
const projectTaskTitleEl = document.querySelector("#project-task-title");
const projectTaskStatusEl = document.querySelector("#project-task-status");
const projectTaskBoardEl = document.querySelector("#project-task-board");
const dataForm = document.querySelector("#data-form");
const dataAnalysisTypeEl = document.querySelector("#data-analysis-type");
const dataQuestionEl = document.querySelector("#data-question");
const dataInputEl = document.querySelector("#data-input");
const dataFileInputEl = document.querySelector("#data-file-input");
const runDataAnalysisButton = document.querySelector("#run-data-analysis");
const saveDataArtifactButton = document.querySelector("#save-data-artifact");
const copyDataResultButton = document.querySelector("#copy-data-result");
const dataPreviewTitleEl = document.querySelector("#data-preview-title");
const dataPreviewMetaEl = document.querySelector("#data-preview-meta");
const dataResultEl = document.querySelector("#data-result");
const cardTemplate = document.querySelector("#toggle-card-template");

const iconPaths = {
  agent: '<path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z"/><path d="M9 12h6"/><path d="M12 9v6"/>',
  artifact: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6"/><path d="M10 17h4"/>',
  branch: '<path d="M6 4v8"/><path d="M18 4v4a4 4 0 0 1-4 4H6"/><circle cx="6" cy="18" r="2"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/>',
  calendar: '<path d="M5 5h14v14H5z"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M5 10h14"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>',
  code: '<path d="M8 9l-4 3 4 3"/><path d="M16 9l4 3-4 3"/><path d="M14 5l-4 14"/>',
  copy: '<path d="M8 8h10v10H8z"/><path d="M6 16H4V4h12v2"/>',
  download: '<path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M5 20h14"/>',
  folder: '<path d="M3 6h7l2 2h9v10H3z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  message: '<path d="M4 5h16v11H8l-4 4z"/>',
  pause: '<path d="M8 5v14"/><path d="M16 5v14"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  plug: '<path d="M9 7V3"/><path d="M15 7V3"/><path d="M7 7h10v4a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v6h-6"/>',
  send: '<path d="M3 11l18-8-8 18-2-7z"/><path d="M11 14l10-11"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3a7 7 0 0 0-1.7 1l-2.4-1-2 3.5L5.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 3h5l.3-3a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5a7 7 0 0 0 .1-1z"/>',
  spark: '<path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  data: '<path d="M4 7c0-2 4-3 8-3s8 1 8 3-4 3-8 3-8-1-8-3z"/><path d="M4 7v5c0 2 4 3 8 3s8-1 8-3V7"/><path d="M4 12v5c0 2 4 3 8 3s8-1 8-3v-5"/>',
  terminal: '<path d="M4 5h16v14H4z"/><path d="M7 9l3 3-3 3"/><path d="M12 15h5"/>',
  tool: '<path d="M14 6l4 4-8 8H6v-4z"/><path d="M16 4l4 4"/>',
  trash: '<path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M8 10v9"/><path d="M12 10v9"/><path d="M16 10v9"/>',
};

function createIcon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("ui-icon");
  svg.innerHTML = iconPaths[name] || iconPaths.tool;
  return svg;
}

function decorateIcons(scope = document) {
  for (const element of scope.querySelectorAll("[data-icon]:not(.icon-ready)")) {
    element.prepend(createIcon(element.dataset.icon));
    element.classList.add("icon-ready");
  }
}

let messages = JSON.parse(localStorage.getItem("deepseek.messages") || "[]");
let sessionUsage = JSON.parse(
  localStorage.getItem("deepseek.sessionUsage") ||
    "{\"promptTokens\":0,\"completionTokens\":0,\"totalTokens\":0,\"estimatedCostUsd\":0,\"last\":null}",
);
let enabledTools = new Set(JSON.parse(localStorage.getItem("deepseek.tools") || "[\"clock\"]"));
let enabledIntegrations = new Set(JSON.parse(localStorage.getItem("deepseek.integrations") || "[]"));
let mcpServers = JSON.parse(
  localStorage.getItem("deepseek.mcp") ||
    "[{\"name\":\"Filesystem\",\"command\":\"npx -y @modelcontextprotocol/server-filesystem F:\\\\Deepseek-projects\"}]",
);
let artifacts = JSON.parse(localStorage.getItem("deepseek.artifacts") || "[]");
let selectedArtifactId = localStorage.getItem("deepseek.selectedArtifactId") || "";
let agentRuns = JSON.parse(localStorage.getItem("deepseek.agentRuns") || "[]");
let selectedAgentRunId = localStorage.getItem("deepseek.selectedAgentRunId") || "";
let routines = JSON.parse(localStorage.getItem("deepseek.routines") || "[]");
let composerContext = JSON.parse(localStorage.getItem("deepseek.composerContext") || "[]");
let projectFiles = [];
let selectedProjectFile = null;
let projectTasks = JSON.parse(localStorage.getItem("deepseek.projectTasks") || "[]");
let lastDataAnalysis = JSON.parse(localStorage.getItem("deepseek.lastDataAnalysis") || "null");
let workspace = { tools: [], integrations: [] };
let providers = [];

// Conversations (chat history)
let conversations = JSON.parse(localStorage.getItem("deepseek.conversations") || "[]");
let selectedConversationId = localStorage.getItem("deepseek.selectedConversationId") || "";

const savedSafeguards = JSON.parse(
  localStorage.getItem("deepseek.safeguards") ||
    "{\"groundedOnly\":false,\"showUncertainty\":true,\"selfCheck\":true,\"citeContext\":true}",
);
guardGroundedEl.checked = savedSafeguards.groundedOnly;
guardUncertaintyEl.checked = savedSafeguards.showUncertainty;
guardSelfCheckEl.checked = savedSafeguards.selfCheck;
guardCiteContextEl.checked = savedSafeguards.citeContext;

function saveState() {
  localStorage.setItem("deepseek.messages", JSON.stringify(messages));
  localStorage.setItem("deepseek.sessionUsage", JSON.stringify(sessionUsage));
  localStorage.setItem("deepseek.tools", JSON.stringify([...enabledTools]));
  localStorage.setItem("deepseek.integrations", JSON.stringify([...enabledIntegrations]));
  localStorage.setItem("deepseek.mcp", JSON.stringify(mcpServers));
  localStorage.setItem("deepseek.artifacts", JSON.stringify(artifacts));
  localStorage.setItem("deepseek.selectedArtifactId", selectedArtifactId);
  localStorage.setItem("deepseek.agentRuns", JSON.stringify(agentRuns));
  localStorage.setItem("deepseek.selectedAgentRunId", selectedAgentRunId);
  localStorage.setItem("deepseek.routines", JSON.stringify(routines));
  localStorage.setItem("deepseek.composerContext", JSON.stringify(composerContext));
  localStorage.setItem("deepseek.projectTasks", JSON.stringify(projectTasks));
  localStorage.setItem("deepseek.lastDataAnalysis", JSON.stringify(lastDataAnalysis));
  localStorage.setItem("deepseek.safeguards", JSON.stringify(safeguards()));
  // conversations state
  localStorage.setItem("deepseek.conversations", JSON.stringify(conversations));
  localStorage.setItem("deepseek.selectedConversationId", selectedConversationId || "");
}

function safeguards() {
  return {
    groundedOnly: guardGroundedEl.checked,
    showUncertainty: guardUncertaintyEl.checked,
    selfCheck: guardSelfCheckEl.checked,
    citeContext: guardCiteContextEl.checked,
  };
}

function updateWorkspaceCards() {
  const provider = selectedProvider();
  providerCardEl.textContent = provider ? provider.name : "None";
  artifactCountEl.textContent = String(artifacts.length);
  agentRunCountEl.textContent = String(agentRuns.length);
  routineCountEl.textContent = String(routines.length);
  guardCardEl.textContent = safeguards().groundedOnly ? "Strict" : "On";
}

function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function routineScheduledDate(routine, baseDate = new Date()) {
  const [hours, minutes] = routine.time.split(":").map(Number);
  const scheduled = new Date(baseDate);
  scheduled.setHours(hours || 0, minutes || 0, 0, 0);
  return scheduled;
}

function isRoutineDay(routine, date = new Date()) {
  const day = date.getDay();
  if (routine.schedule === "daily") return true;
  if (routine.schedule === "weekdays") return day >= 1 && day <= 5;
  if (routine.schedule === "weekly") return day === Number(routine.day);
  return false;
}

function nextRoutineRun(routine, fromDate = new Date()) {
  for (let offset = 0; offset < 14; offset += 1) {
    const candidate = new Date(fromDate);
    candidate.setDate(fromDate.getDate() + offset);
    if (!isRoutineDay(routine, candidate)) continue;
    const scheduled = routineScheduledDate(routine, candidate);
    if (scheduled > fromDate) return scheduled;
  }
  return routineScheduledDate(routine, fromDate);
}

function isRoutineDue(routine) {
  if (!routine.enabled) return false;
  const now = new Date();
  const scheduled = routineScheduledDate(routine, now);
  return isRoutineDay(routine, now) && now >= scheduled && routine.lastRunDate !== localDateKey(now);
}

function routineStatus(routine) {
  if (!routine.enabled) return "Paused";
  if (isRoutineDue(routine)) return "Due now";
  return `Next ${nextRoutineRun(routine).toLocaleString()}`;
}

const slashCommands = [
  { id: "artifact", label: "/artifact", icon: "artifact", description: "Create a standalone artifact from this request.", insert: "/artifact " },
  { id: "agent", label: "/agent", icon: "agent", description: "Run this as an agent harness goal.", insert: "/agent " },
  { id: "plan", label: "/plan", icon: "calendar", description: "Ask for a practical plan.", insert: "/plan " },
  { id: "debug", label: "/debug", icon: "tool", description: "Analyze and debug a problem.", insert: "/debug " },
  { id: "code", label: "/code", icon: "code", description: "Use project context for a Cursor-style code task.", insert: "/code " },
  { id: "fix", label: "/fix", icon: "tool", description: "Ask for a focused fix with patch guidance.", insert: "/fix " },
  { id: "explain", label: "/explain", icon: "code", description: "Explain selected project context.", insert: "/explain " },
  { id: "routine", label: "/routine", icon: "calendar", description: "Draft a recurring routine prompt.", insert: "/routine " },
  { id: "json", label: "/json", icon: "code", description: "Ask for JSON-only output.", insert: "/json " },
  { id: "data", label: "/data", icon: "data", description: "Analyze messy or structured data.", insert: "/data " },
];

function contextSummary() {
  if (composerContext.length === 0) return "";
  return composerContext
    .map((item) => `@${item.type}:${item.label}${item.detail ? ` - ${item.detail}` : ""}`)
    .join("\n");
}

function renderContextChips() {
  contextChipsEl.innerHTML = "";
  for (const [index, item] of composerContext.entries()) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "context-chip";
    chip.append(createIcon(item.icon || "plug"), document.createTextNode(item.label));
    chip.title = "Remove context";
    chip.addEventListener("click", () => {
      composerContext.splice(index, 1);
      saveState();
      renderContextChips();
    });
    contextChipsEl.append(chip);
  }
}

function addComposerContext(item) {
  composerContext.push(item);
  saveState();
  renderContextChips();
}

function closeComposerMenu() {
  composerMenuEl.classList.remove("active");
  composerMenuEl.innerHTML = "";
}

function openComposerMenu(items) {
  composerMenuEl.innerHTML = "";
  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-menu-item";
    const icon = createIcon(item.icon || "tool");
    const text = document.createElement("span");
    const label = document.createElement("strong");
    const desc = document.createElement("small");
    label.textContent = item.label;
    desc.textContent = item.description || "";
    text.append(label, desc);
    button.append(icon, text);
    button.addEventListener("click", () => {
      item.action();
      closeComposerMenu();
      promptEl.focus();
    });
    composerMenuEl.append(button);
  }
  composerMenuEl.classList.toggle("active", items.length > 0);
}

function commandItems(filter = "") {
  return slashCommands
    .filter((command) => command.label.includes(filter.toLowerCase()))
    .map((command) => ({
      ...command,
      action: () => {
        promptEl.value = promptEl.value.replace(/\/[\w-]*$/, command.insert);
        resizePrompt();
      },
    }));
}

function mentionItems(filter = "") {
  const needle = filter.toLowerCase();
  const items = [];
  for (const tool of workspace.tools) {
    if (!tool.name.toLowerCase().includes(needle)) continue;
    items.push({
      label: tool.name,
      icon: tool.icon || "tool",
      description: "Tool context",
      action: () => addComposerContext({ type: "tool", id: tool.id, label: tool.name, icon: tool.icon || "tool", detail: tool.description }),
    });
  }
  for (const artifact of artifacts.slice(0, 8)) {
    if (!artifact.title.toLowerCase().includes(needle)) continue;
    items.push({
      label: artifact.title,
      icon: "artifact",
      description: `Artifact · ${artifact.type}`,
      action: () => addComposerContext({ type: "artifact", id: artifact.id, label: artifact.title, icon: "artifact", detail: artifact.content.slice(0, 500) }),
    });
  }
  for (const routine of routines.slice(0, 8)) {
    if (!routine.name.toLowerCase().includes(needle)) continue;
    items.push({
      label: routine.name,
      icon: "calendar",
      description: `Routine · ${routine.schedule}`,
      action: () => addComposerContext({ type: "routine", id: routine.id, label: routine.name, icon: "calendar", detail: routine.prompt }),
    });
  }
  for (const file of projectFiles.slice(0, 30)) {
    if (!file.path.toLowerCase().includes(needle)) continue;
    items.push({
      label: file.path,
      icon: "folder",
      description: "Project file",
      action: () => attachProjectFile(file.path),
    });
  }
  for (const provider of providers) {
    if (!provider.name.toLowerCase().includes(needle)) continue;
    items.push({
      label: provider.name,
      icon: "plug",
      description: provider.configured ? "Configured provider" : "Provider needs key",
      action: () => {
        providerEl.value = provider.id;
        updateProviderModel();
      },
    });
  }
  return items;
}

function formatMoney(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  const number = Number(value || 0);
  return `$${number.toFixed(number >= 0.01 ? 4 : 6)}`;
}

function formatTokens(value) {
  return Number(value || 0).toLocaleString();
}

function updateUsageDisplay() {
  const last = sessionUsage.last;
  lastRequestTokensEl.textContent = last ? `${formatTokens(last.total_tokens)} tokens` : "0 tokens";
  lastRequestCostEl.textContent = last ? formatMoney(last.estimated_cost_usd) : "$0.000000";
  sessionTokensEl.textContent = formatTokens(sessionUsage.totalTokens);
  sessionCostEl.textContent = `${formatMoney(sessionUsage.estimatedCostUsd)} estimated`;

  const limit = Number(sessionLimitEl.value || 0);
  if (limit > 0 && sessionUsage.estimatedCostUsd >= limit) {
    sessionCostEl.textContent = `${formatMoney(sessionUsage.estimatedCostUsd)} limit reached`;
  }
}

function addUsage(usage) {
  if (!usage) return;
  sessionUsage.promptTokens += Number(usage.prompt_tokens || 0);
  sessionUsage.completionTokens += Number(usage.completion_tokens || 0);
  sessionUsage.totalTokens += Number(usage.total_tokens || 0);
  sessionUsage.estimatedCostUsd += Number(usage.estimated_cost_usd || 0);
  sessionUsage.last = usage;
  saveState();
  updateUsageDisplay();
}

function artifactExtension(type) {
  return (
    {
      document: "txt",
      code: "txt",
      html: "html",
      markdown: "md",
      json: "json",
      table: "md",
      diagram: "mmd",
      prompt: "md",
      plan: "md",
      data: "txt",
    }[type] || "txt"
  );
}

function artifactFromCodeLang(lang) {
  const normalized = (lang || "").toLowerCase();
  if (["html", "htm"].includes(normalized)) return "html";
  if (["json"].includes(normalized)) return "json";
  if (["md", "markdown"].includes(normalized)) return "markdown";
  if (["mermaid", "mmd"].includes(normalized)) return "diagram";
  if (["csv", "tsv", "yaml", "yml", "toml", "xml"].includes(normalized)) return "data";
  return "code";
}

function createArtifactRecord({ title, artifact_type, content, usage }) {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  return {
    id,
    title: title || `${artifact_type} artifact`,
    type: artifact_type,
    content,
    usage: usage || null,
    createdAt: new Date().toISOString(),
  };
}

function extractArtifactsFromMessage(content) {
  const found = [];
  const pattern = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const lang = match[1] || "code";
    const body = match[2].trim();
    if (body.length < 20) continue;
    const type = artifactFromCodeLang(lang);
    found.push(
      createArtifactRecord({
        title: `${lang || type} from chat`,
        artifact_type: type,
        content: body,
      }),
    );
  }
  return found;
}

function selectArtifact(id) {
  selectedArtifactId = id;
  saveState();
  renderArtifacts();
}

function selectedArtifact() {
  return artifacts.find((artifact) => artifact.id === selectedArtifactId) || artifacts[0] || null;
}

function renderArtifacts() {
  artifactListEl.innerHTML = "";

  for (const artifact of artifacts) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `artifact-item ${artifact.id === selectedArtifactId ? "active" : ""}`;
    const title = document.createElement("span");
    const meta = document.createElement("small");
    title.textContent = artifact.title;
    meta.textContent = `${artifact.type} · ${new Date(artifact.createdAt).toLocaleString()}`;
    button.append(title, meta);
    button.addEventListener("click", () => selectArtifact(artifact.id));
    artifactListEl.append(button);
  }
  updateWorkspaceCards();

  const current = selectedArtifact();
  const hasArtifact = Boolean(current);
  copyArtifactButton.disabled = !hasArtifact;
  downloadArtifactButton.disabled = !hasArtifact;
  deleteArtifactButton.disabled = !hasArtifact;

  if (!current) {
    artifactPreviewTitleEl.textContent = "No artifact selected";
    artifactPreviewMetaEl.textContent = "Create or select an artifact.";
    artifactPreviewContentEl.textContent = "";
    artifactHtmlPreviewEl.removeAttribute("srcdoc");
    artifactHtmlPreviewEl.classList.remove("active");
    artifactPreviewContentEl.classList.add("active");
    return;
  }

  artifactPreviewTitleEl.textContent = current.title;
  artifactPreviewMetaEl.textContent = `${current.type} · ${formatTokens(current.usage?.total_tokens)} tokens · ${formatMoney(current.usage?.estimated_cost_usd)} estimated`;

  if (current.type === "html") {
    artifactHtmlPreviewEl.srcdoc = current.content;
    artifactHtmlPreviewEl.classList.add("active");
    artifactPreviewContentEl.classList.remove("active");
    artifactPreviewContentEl.textContent = current.content;
  } else {
    artifactHtmlPreviewEl.removeAttribute("srcdoc");
    artifactHtmlPreviewEl.classList.remove("active");
    artifactPreviewContentEl.classList.add("active");
    artifactPreviewContentEl.textContent = current.content;
  }
}

function createAgentRunRecord({ mode, result, usage, model, provider_id }) {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  return {
    id,
    mode,
    result,
    usage: usage || null,
    model,
    providerId: provider_id,
    createdAt: new Date().toISOString(),
  };
}

function selectedAgentRun() {
  return agentRuns.find((run) => run.id === selectedAgentRunId) || agentRuns[0] || null;
}

function selectAgentRun(id) {
  selectedAgentRunId = id;
  saveState();
  renderAgentRuns();
}

function renderAgentRuns() {
  agentRunsEl.innerHTML = "";

  for (const run of agentRuns) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `artifact-item ${run.id === selectedAgentRunId ? "active" : ""}`;
    const title = document.createElement("span");
    const meta = document.createElement("small");
    title.textContent = `${run.mode} harness`;
    meta.textContent = `${new Date(run.createdAt).toLocaleString()} · ${formatTokens(run.usage?.total_tokens)} tokens`;
    button.append(title, meta);
    button.addEventListener("click", () => selectAgentRun(run.id));
    agentRunsEl.append(button);
  }

  const current = selectedAgentRun();
  const hasRun = Boolean(current);
  saveAgentArtifactButton.disabled = !hasRun;
  copyAgentResultButton.disabled = !hasRun;

  if (!current) {
    agentPreviewTitleEl.textContent = "No harness run yet";
    agentPreviewMetaEl.textContent = "Run a harness to generate a managed agent output.";
    agentResultEl.textContent = "";
    updateWorkspaceCards();
    return;
  }

  agentPreviewTitleEl.textContent = `${current.mode} harness`;
  agentPreviewMetaEl.textContent = `${current.providerId} · ${current.model} · ${formatTokens(current.usage?.total_tokens)} tokens · ${formatMoney(current.usage?.estimated_cost_usd)} estimated`;
  agentResultEl.textContent = current.result;
  updateWorkspaceCards();
}

function createRoutineRecord() {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  return {
    id,
    name: routineNameEl.value.trim(),
    schedule: routineScheduleEl.value,
    time: routineTimeEl.value,
    day: routineDayEl.value,
    mode: routineModeEl.value,
    prompt: routinePromptEl.value.trim(),
    saveArtifact: routineArtifactEl.checked,
    enabled: true,
    lastRunDate: "",
    lastRunAt: "",
    createdAt: new Date().toISOString(),
  };
}

function renderRoutines() {
  routineListEl.innerHTML = "";
  routineDayFieldEl.style.display = routineScheduleEl.value === "weekly" ? "grid" : "none";

  for (const [index, routine] of routines.entries()) {
    const card = document.createElement("article");
    card.className = `routine-card ${isRoutineDue(routine) ? "due" : ""}`;

    const content = document.createElement("div");
    const title = document.createElement("h4");
    const prompt = document.createElement("p");
    const meta = document.createElement("small");
    title.append(createIcon("calendar"), document.createTextNode(routine.name));
    prompt.textContent = routine.prompt;
    meta.textContent = `${routine.schedule} · ${routine.time} · ${routine.mode} · ${routineStatus(routine)}`;
    content.append(title, prompt, meta);

    const actions = document.createElement("div");
    actions.className = "routine-actions";
    const runButton = document.createElement("button");
    const toggleButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    runButton.type = "button";
    runButton.className = "small";
    runButton.textContent = "Run";
    toggleButton.type = "button";
    toggleButton.className = "ghost small";
    toggleButton.textContent = routine.enabled ? "Pause" : "Resume";
    deleteButton.type = "button";
    deleteButton.className = "danger small";
    deleteButton.textContent = "Delete";
    actions.append(runButton, toggleButton, deleteButton);

    runButton.addEventListener("click", () => runRoutine(index));
    toggleButton.addEventListener("click", () => {
      routines[index].enabled = !routines[index].enabled;
      saveState();
      renderRoutines();
    });
    deleteButton.addEventListener("click", () => {
      routines.splice(index, 1);
      saveState();
      renderRoutines();
    });

    card.append(content, actions);
    routineListEl.append(card);
  }

  updateWorkspaceCards();
}

async function runRoutine(index) {
  const routine = routines[index];
  if (!routine) return;
  const limit = Number(sessionLimitEl.value || 0);
  if (limit > 0 && sessionUsage.estimatedCostUsd >= limit) {
    addError(`Session spend limit reached (${formatMoney(limit)}). Increase the limit in Settings to continue.`);
    return;
  }

  const runPrompt = `Routine: ${routine.name}\nSchedule: ${routine.schedule} at ${routine.time}\n\n${routine.prompt}`;
  try {
    const response = await fetch("/api/agent-harness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal: runPrompt,
        context: "This is a recurring routine run. Produce a useful, dated output and include concise next actions.",
        mode: routine.mode,
        max_steps: 5,
        provider_id: providerEl.value,
        model: modelEl.value,
        temperature: Number(temperatureEl.value),
        enabled_tools: [...enabledTools],
        safeguards: safeguards(),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Routine run failed");

    const run = createAgentRunRecord(data);
    run.mode = `${routine.name} routine`;
    agentRuns.unshift(run);
    selectedAgentRunId = run.id;

    if (routine.saveArtifact) {
      const artifact = createArtifactRecord({
        title: `${routine.name} - ${localDateKey()}`,
        artifact_type: "markdown",
        content: data.result,
        usage: data.usage,
      });
      artifacts.unshift(artifact);
      selectedArtifactId = artifact.id;
    }

    routines[index].lastRunDate = localDateKey();
    routines[index].lastRunAt = new Date().toISOString();
    addUsage(data.usage);
    saveState();
    renderAgentRuns();
    renderArtifacts();
    renderRoutines();
  } catch (error) {
    addError(error.message);
  }
}

function runDueRoutines() {
  routines.forEach((routine, index) => {
    if (isRoutineDue(routine)) runRoutine(index);
  });
}

async function loadProjectFiles() {
  try {
    const response = await fetch("/api/project/files");
    const data = await response.json();
    projectFiles = data.files || [];
    renderProjectFiles(projectFiles);
  } catch (error) {
    projectFileListEl.textContent = `Could not load project files: ${error.message}`;
  }
}

function renderProjectFiles(files) {
  projectFileListEl.innerHTML = "";
  for (const file of files.slice(0, 120)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-file";
    button.append(createIcon("folder"), document.createTextNode(file.path));
    button.addEventListener("click", () => previewProjectFile(file.path));
    projectFileListEl.append(button);
  }
}

async function previewProjectFile(path) {
  try {
    const response = await fetch(`/api/project/file?path=${encodeURIComponent(path)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Could not read file");
    selectedProjectFile = data;
    projectPreviewTitleEl.textContent = data.path;
    projectPreviewMetaEl.textContent = data.truncated ? "Preview truncated at 60k characters." : "Ready to attach as context.";
    projectPreviewContentEl.textContent = data.content;
  } catch (error) {
    projectPreviewTitleEl.textContent = path;
    projectPreviewMetaEl.textContent = error.message;
    projectPreviewContentEl.textContent = "";
  }
}

async function attachProjectFile(path) {
  if (!selectedProjectFile || selectedProjectFile.path !== path) {
    await previewProjectFile(path);
  }
  if (!selectedProjectFile) return;
  addComposerContext({
    type: "file",
    id: selectedProjectFile.path,
    label: selectedProjectFile.path,
    icon: "folder",
    detail: selectedProjectFile.content.slice(0, 8000),
  });
}

async function searchProject() {
  const query = projectSearchEl.value.trim();
  if (!query) {
    renderProjectFiles(projectFiles);
    return;
  }
  try {
    const response = await fetch(`/api/project/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const files = (data.matches || []).map((match) => ({ path: match.path, size: 0, match }));
    renderProjectFiles(files);
  } catch (error) {
    projectFileListEl.textContent = `Search failed: ${error.message}`;
  }
}

function renderProjectTasks() {
  projectTaskBoardEl.innerHTML = "";
  for (const status of ["todo", "doing", "done"]) {
    const column = document.createElement("section");
    column.className = "task-column";
    const heading = document.createElement("h4");
    heading.textContent = status;
    column.append(heading);
    for (const [index, task] of projectTasks.entries()) {
      if (task.status !== status) continue;
      const card = document.createElement("article");
      card.className = "task-card";
      const title = document.createElement("span");
      const actions = document.createElement("div");
      title.textContent = task.title;
      actions.className = "task-actions";
      for (const nextStatus of ["todo", "doing", "done"]) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ghost small";
        button.textContent = nextStatus;
        button.disabled = nextStatus === task.status;
        button.addEventListener("click", () => {
          projectTasks[index].status = nextStatus;
          saveState();
          renderProjectTasks();
        });
        actions.append(button);
      }
      card.append(title, actions);
      column.append(card);
    }
    projectTaskBoardEl.append(column);
  }
}

function renderDataAnalysis() {
  const hasAnalysis = Boolean(lastDataAnalysis);
  saveDataArtifactButton.disabled = !hasAnalysis;
  copyDataResultButton.disabled = !hasAnalysis;
  if (!hasAnalysis) {
    dataPreviewTitleEl.textContent = "No analysis yet";
    dataPreviewMetaEl.textContent = "Run analysis to see profile, assumptions, findings, and next steps.";
    dataResultEl.textContent = "";
    return;
  }
  dataPreviewTitleEl.textContent = `${lastDataAnalysis.analysis_type} analysis`;
  dataPreviewMetaEl.textContent = `${lastDataAnalysis.provider_id} · ${lastDataAnalysis.model} · ${formatTokens(lastDataAnalysis.usage?.total_tokens)} tokens · ${formatMoney(lastDataAnalysis.usage?.estimated_cost_usd)} estimated`;
  dataResultEl.textContent = lastDataAnalysis.result;
}

async function appendFilesToDataInput(files) {
  const chunks = [];
  for (const file of files) {
    let text = "";
    try {
      text = await file.text();
    } catch {
      text = `[Could not read ${file.name}]`;
    }
    chunks.push(`\n\n--- FILE: ${file.name} (${Math.round(file.size / 1024)} KB) ---\n${text.slice(0, 50000)}`);
  }
  dataInputEl.value += chunks.join("");
}

function persistCurrentConversation() {
  if (!selectedConversationId) {
    // create a conversation for current messages
    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    const title = messages.find((m) => m.role === 'user')?.content?.slice(0, 60) || 'Chat';
    const conv = { id, title, messages: [...messages], createdAt: new Date().toISOString() };
    conversations.unshift(conv);
    selectedConversationId = id;
  } else {
    const conv = conversations.find((c) => c.id === selectedConversationId);
    if (conv) conv.messages = [...messages];
    else conversations.unshift({ id: selectedConversationId, title: messages[0]?.content?.slice(0, 60) || 'Chat', messages: [...messages], createdAt: new Date().toISOString() });
  }
}

function renderConversations() {
  const convList = document.querySelector('.conversation-list');
  if (!convList) return;
  convList.innerHTML = '';
  for (const conv of conversations) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `conversation ${conv.id === selectedConversationId ? 'active' : ''}`;
    btn.dataset.id = conv.id;

    const title = document.createElement('span');
    title.textContent = conv.title || 'Chat';
    const meta = document.createElement('small');
    meta.textContent = new Date(conv.createdAt).toLocaleString();

    const actions = document.createElement('div');
    actions.style.display = 'inline-flex';
    actions.style.gap = '6px';
    actions.style.marginLeft = '8px';

    const moveBtn = document.createElement('button');
    moveBtn.type = 'button';
    moveBtn.className = 'ghost small';
    moveBtn.textContent = 'Move';
    moveBtn.title = 'Save this conversation to Project (artifact)';
    moveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moveConversationToProject(conv.id);
    });

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'danger small';
    delBtn.textContent = 'Delete';
    delBtn.title = 'Delete conversation';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteConversation(conv.id);
    });

    actions.append(moveBtn, delBtn);

    btn.append(createIcon('message'), title, meta, actions);
    btn.addEventListener('click', () => selectConversation(conv.id));
    convList.append(btn);
  }
}

function selectConversation(id) {
  const conv = conversations.find((c) => c.id === id);
  if (!conv) return;
  selectedConversationId = id;
  messages = conv.messages || [];
  saveState();
  renderConversations();
  renderMessages();
}

function deleteConversation(id) {
  conversations = conversations.filter((c) => c.id !== id);
  if (selectedConversationId === id) {
    if (conversations.length > 0) {
      selectedConversationId = conversations[0].id;
      messages = conversations[0].messages || [];
    } else {
      selectedConversationId = '';
      messages = [];
    }
  }
  saveState();
  renderConversations();
  renderMessages();
}

function moveConversationToProject(id) {
  const conv = conversations.find((c) => c.id === id);
  if (!conv) return;
  const content = conv.messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
  const artifact = createArtifactRecord({ title: conv.title || 'Chat export', artifact_type: 'markdown', content });
  artifacts.unshift(artifact);
  saveState();
  renderArtifacts();
  addError('Conversation saved as artifact');
}

function renderMessages() {
  messagesEl.innerHTML = "";

  if (messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <h3>Ask, build, connect.</h3>
      <p>Use the side panels to enable local tool context, register MCP servers, and prepare integrations for a desktop-style DeepSeek workflow.</p>
    `;
    messagesEl.append(empty);
    return;
  }

  for (const message of messages) {
    const row = document.createElement("article");
    row.className = `message-row ${message.role}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = message.role === "user" ? "You" : "AI";

    const bubble = document.createElement("div");
    bubble.className = "message";
    const header = document.createElement("div");
    const role = document.createElement("span");
    const content = document.createElement("div");
    header.className = "message-head";
    role.className = "message-role";
    role.append(createIcon(message.role === "user" ? "message" : "agent"));
    role.append(document.createTextNode(message.role === "user" ? "You" : "Assistant"));
    header.append(role);
    content.className = "message-content";
    content.textContent = message.content;
    bubble.append(header, content);

    if (message.usage) {
      const meta = document.createElement("div");
      meta.className = "usage-meta";
      meta.textContent = `${formatTokens(message.usage.total_tokens)} tokens · ${formatMoney(message.usage.estimated_cost_usd)} estimated`;
      bubble.append(meta);
    }

    row.append(avatar, bubble);
    messagesEl.append(row);
  }

  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setBusy(isBusy) {
  sendButton.disabled = isBusy;
  promptEl.disabled = isBusy;
  sendButton.textContent = isBusy ? "Thinking" : "Send";
}

function addError(content) {
  messages.push({ role: "assistant", content: `Error: ${content}` });
  saveState();
  renderMessages();
}

function renderActiveTools() {
  activeToolsEl.innerHTML = "";
  const activeItems = workspace.tools.filter((tool) => enabledTools.has(tool.id));
  const activeMcp = mcpServers.filter((server) => server.enabled !== false);

  for (const item of [...activeItems, ...activeMcp.map((server) => ({ name: `MCP: ${server.name}` }))]) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.append(createIcon(item.icon || "tool"), document.createTextNode(item.name));
    activeToolsEl.append(chip);
  }
}

function activatePanel(panel) {
  document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item.dataset.panel === panel));
  document.querySelectorAll(".panel").forEach((item) => item.classList.toggle("active", item.id === `panel-${panel}`));
  document.querySelectorAll(".icon-nav").forEach((item) => item.classList.toggle("active", item.dataset.target === panel));
}

function createToggleCard(item, checked, onChange) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const title = card.querySelector("h4");
  title.append(createIcon(item.icon || "tool"), document.createTextNode(item.name));
  card.querySelector("p").textContent = item.description || item.command;
  const input = card.querySelector("input");
  input.checked = checked;
  input.addEventListener("change", () => onChange(input.checked));
  return card;
}

function renderTools() {
  toolListEl.innerHTML = "";
  for (const tool of workspace.tools) {
    toolListEl.append(
      createToggleCard(tool, enabledTools.has(tool.id), (checked) => {
        checked ? enabledTools.add(tool.id) : enabledTools.delete(tool.id);
        saveState();
        renderActiveTools();
      }),
    );
  }
  renderActiveTools();
}

const integrationPlaybooks = {
  "google-analytics": {
    analysisType: "report",
    question:
      "Analyze this GA4 export. Identify traffic trends, channel performance, landing pages, engagement/events/conversions, anomalies, and the next actions with assumptions called out.",
    stack: "digital-marketing",
    goal:
      "Create a GA4 performance review workflow. Use exported analytics data when available, separate facts from assumptions, and produce a prioritized growth plan.",
    routine:
      "Review the latest GA4 export or pasted analytics notes. Summarize traffic movement, channel changes, conversion issues, anomalies, and today's highest-leverage actions.",
  },
  "google-search-console": {
    analysisType: "seo",
    question:
      "Analyze this Google Search Console export. Find query/page opportunities, CTR gaps, position movement, cannibalization risks, content fixes, and SEO priorities.",
    stack: "website-seo",
    goal:
      "Create a Search Console SEO workflow. Use GSC exports when provided, find query/page opportunities, and return a prioritized content and technical SEO action plan.",
    routine:
      "Review the latest Google Search Console export or notes. Flag rankings, impressions, CTR opportunities, page issues, and content updates to prioritize today.",
  },
  "google-ads": {
    analysisType: "report",
    question:
      "Analyze this Google Ads export. Review campaigns, ad groups, keywords, spend, conversions, CPA/ROAS, wasted spend, testing opportunities, and budget moves.",
    stack: "digital-marketing",
    goal:
      "Create a Google Ads optimization workflow from exports or campaign notes. Separate observed metrics from assumptions and produce budget, keyword, and testing actions.",
    routine:
      "Review Google Ads performance exports or notes. Identify wasted spend, CPA/ROAS changes, keyword/ad issues, and campaign actions for today.",
  },
  "google-sheets": {
    analysisType: "profile",
    question:
      "Profile and analyze this sheet export. Detect structure, missing values, anomalies, categories, useful summaries, cleaning steps, and business insights.",
    stack: "",
    goal:
      "Build a data-cleaning and insight workflow for a spreadsheet export. Produce a profile, cleaning plan, useful summaries, and next analysis questions.",
    routine:
      "Review the latest sheet export or pasted rows. Profile structure, data quality, anomalies, important trends, and recommended cleanup or analysis steps.",
  },
  crm: {
    analysisType: "extraction",
    question:
      "Analyze this CRM or lead data. Segment leads, extract next actions, flag stale opportunities, identify pipeline risks, and propose follow-up workflows.",
    stack: "digital-marketing",
    goal:
      "Create a CRM follow-up workflow. Segment leads, identify pipeline risks, draft next actions, and recommend coordinated sales/marketing tasks.",
    routine:
      "Review CRM or lead notes. Segment prospects, flag urgent follow-ups, summarize pipeline risks, and suggest today's outreach priorities.",
  },
  "email-campaigns": {
    analysisType: "report",
    question:
      "Analyze this email campaign export. Review opens, clicks, conversions, segments, subject lines, deliverability hints, lifecycle gaps, and next tests.",
    stack: "digital-marketing",
    goal:
      "Create an email campaign optimization workflow. Use exports or campaign notes to recommend lifecycle, segmentation, subject-line, and testing improvements.",
    routine:
      "Review email campaign exports or notes. Summarize performance, segment issues, lifecycle gaps, subject-line learnings, and next experiments.",
  },
  "slack-notes": {
    analysisType: "extraction",
    question:
      "Analyze these team notes or chat logs. Extract decisions, blockers, owners, dates, unresolved questions, risks, and a clean action-item list.",
    stack: "",
    goal:
      "Create an operations synthesis workflow for messy team notes. Extract decisions, blockers, owners, dates, risks, and follow-up actions.",
    routine:
      "Review pasted team notes or chat logs. Extract decisions, blockers, owners, unresolved questions, and a concise action plan.",
  },
  github: {
    analysisType: "extraction",
    question:
      "Analyze this repository, issue, PR, or release context. Extract risks, changed areas, missing tests, and implementation next steps.",
    stack: "",
    goal:
      "Create a repository planning workflow for issues, PRs, releases, and code review. Use available project context and produce implementation next steps.",
    routine:
      "Review current repository notes, issues, or pending work. Identify risks, blockers, missing tests, and the next implementation steps.",
  },
  browser: {
    analysisType: "report",
    question:
      "Analyze this website research or QA evidence. Summarize UX issues, SEO concerns, content gaps, bugs, and prioritized fixes.",
    stack: "website-design",
    goal:
      "Create a browser QA and website improvement workflow. Review website evidence and produce UX, content, SEO, and technical recommendations.",
    routine:
      "Review website QA notes or research. Summarize UX issues, SEO/content gaps, bugs, and prioritized improvements.",
  },
  files: {
    analysisType: "extraction",
    question:
      "Analyze these local project files or notes. Extract important structure, risks, TODOs, implementation opportunities, and next actions.",
    stack: "",
    goal:
      "Create a local project workflow using file context. Inspect the project material provided and produce practical implementation next steps.",
    routine:
      "Review local project notes or attached file context. Summarize progress, risks, TODOs, and the next best implementation actions.",
  },
};

function integrationPlaybook(integration) {
  return (
    integrationPlaybooks[integration.id] || {
      analysisType: "report",
      question: `Analyze data or notes from ${integration.name}. Extract facts, assumptions, risks, opportunities, and next actions.`,
      stack: integration.category === "seo" ? "website-seo" : integration.category === "marketing" ? "digital-marketing" : "",
      goal: `Create a practical workflow for ${integration.name}. Use available context, avoid invented facts, and produce prioritized next actions.`,
      routine: `Review the latest ${integration.name} notes or export. Summarize changes, risks, opportunities, and next actions.`,
    }
  );
}

function prepareIntegrationAnalysis(integration) {
  const playbook = integrationPlaybook(integration);
  enabledIntegrations.add(integration.id);
  dataAnalysisTypeEl.value = playbook.analysisType;
  dataQuestionEl.value = playbook.question;
  if (!dataInputEl.value.trim()) {
    dataInputEl.placeholder = `Paste or upload ${integration.name} export, logs, notes, CSV, JSON, or unstructured text here...`;
  }
  saveState();
  renderIntegrations();
  activatePanel("data");
  dataInputEl.focus();
}

function prepareIntegrationWorkflow(integration) {
  const playbook = integrationPlaybook(integration);
  enabledIntegrations.add(integration.id);
  agentStackEl.value = playbook.stack || "";
  agentModeEl.value = integration.category === "code" || integration.id === "github" ? "builder" : "planner";
  agentGoalEl.value = playbook.goal;
  agentContextEl.value = `Enabled integration: ${integration.name}\nCategory: ${integration.category || "general"}\n\nUse pasted exports, attached files, or project context when available.`;
  document.querySelectorAll(".agent-stack-card").forEach((item) => {
    item.classList.toggle("active", item.dataset.stack === agentStackEl.value);
  });
  saveState();
  renderIntegrations();
  activatePanel("agents");
  agentGoalEl.focus();
}

function addIntegrationRoutine(integration) {
  const playbook = integrationPlaybook(integration);
  const exists = routines.some((routine) => routine.sourceIntegration === integration.id);
  if (!exists) {
    routines.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: `${integration.name} review`,
      schedule: integration.category === "seo" || integration.category === "analytics" ? "weekdays" : "daily",
      time: "09:00",
      day: "1",
      mode: integration.category === "code" ? "builder" : integration.category === "analytics" ? "researcher" : "planner",
      prompt: playbook.routine,
      saveArtifact: true,
      enabled: true,
      sourceIntegration: integration.id,
      lastRunDate: "",
      lastRunAt: "",
      createdAt: new Date().toISOString(),
    });
  }
  enabledIntegrations.add(integration.id);
  saveState();
  renderIntegrations();
  renderRoutines();
  activatePanel("routines");
}

function renderIntegrations() {
  integrationListEl.innerHTML = "";
  for (const integration of workspace.integrations) {
    const isEnabled = enabledIntegrations.has(integration.id);
    const card = document.createElement("article");
    card.className = `integration-card ${isEnabled ? "enabled" : ""}`;

    const head = document.createElement("div");
    head.className = "integration-head";
    const titleWrap = document.createElement("div");
    const title = document.createElement("h4");
    const description = document.createElement("p");
    const meta = document.createElement("small");
    const toggle = document.createElement("button");

    title.append(createIcon(integration.icon || "plug"), document.createTextNode(integration.name));
    description.textContent = integration.description;
    meta.textContent = `${integration.category || "workflow"} · ${isEnabled ? "enabled" : "ready"}`;
    titleWrap.append(title, description, meta);

    toggle.type = "button";
    toggle.className = isEnabled ? "ghost small" : "small";
    toggle.textContent = isEnabled ? "Disable" : "Enable";
    toggle.addEventListener("click", () => {
      isEnabled ? enabledIntegrations.delete(integration.id) : enabledIntegrations.add(integration.id);
      saveState();
      renderIntegrations();
    });

    head.append(titleWrap, toggle);

    const actions = document.createElement("div");
    actions.className = "integration-actions";
    const analyze = document.createElement("button");
    const workflow = document.createElement("button");
    const routine = document.createElement("button");

    analyze.type = "button";
    analyze.className = "ghost small";
    analyze.textContent = integration.category === "project" || integration.category === "code" ? "Use data" : "Analyze export";
    workflow.type = "button";
    workflow.className = "ghost small";
    workflow.textContent = "Workflow";
    routine.type = "button";
    routine.className = "ghost small";
    routine.textContent = routines.some((item) => item.sourceIntegration === integration.id) ? "Routine made" : "Routine";
    routine.disabled = routines.some((item) => item.sourceIntegration === integration.id);

    analyze.addEventListener("click", () => prepareIntegrationAnalysis(integration));
    workflow.addEventListener("click", () => prepareIntegrationWorkflow(integration));
    routine.addEventListener("click", () => addIntegrationRoutine(integration));
    actions.append(analyze, workflow, routine);

    card.append(head, actions);
    integrationListEl.append(card);
  }
}

function renderMcpServers() {
  mcpListEl.innerHTML = "";
  for (const [index, server] of mcpServers.entries()) {
    const card = document.createElement("article");
    card.className = "mcp-card";
    const detail = document.createElement("div");
    const title = document.createElement("h4");
    const command = document.createElement("code");
    const actions = document.createElement("div");
    const toggleButton = document.createElement("button");
    const removeButton = document.createElement("button");

    title.append(createIcon("terminal"), document.createTextNode(server.name));
    command.textContent = server.command;
    detail.append(title, command);

    actions.className = "mcp-actions";
    toggleButton.type = "button";
    toggleButton.className = "ghost small";
    toggleButton.textContent = server.enabled === false ? "Enable" : "Disable";
    removeButton.type = "button";
    removeButton.className = "danger small";
    removeButton.textContent = "Remove";
    actions.append(toggleButton, removeButton);
    card.append(detail, actions);

    toggleButton.addEventListener("click", () => {
      mcpServers[index].enabled = mcpServers[index].enabled === false;
      saveState();
      renderMcpServers();
      renderActiveTools();
    });
    removeButton.addEventListener("click", () => {
      mcpServers.splice(index, 1);
      saveState();
      renderMcpServers();
      renderActiveTools();
    });
    mcpListEl.append(card);
  }
  renderActiveTools();
}

async function checkHealth() {
  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    statusEl.textContent = data.configured ? `Ready: ${data.provider}` : "Add at least one API key to .env";
  } catch {
    statusEl.textContent = "Server offline";
  }
}

async function loadBalance() {
  balanceTotalEl.textContent = "Checking...";
  settingsBalanceEl.textContent = "Checking...";
  const provider = selectedProvider();
  balanceLabelEl.textContent = `${provider?.name || "Provider"} balance`;
  balanceStateEl.textContent = provider?.name || "AI account";
  balanceDetailsEl.textContent = "Fetching provider balance.";

  try {
    const response = await fetch(`/api/balance?provider_id=${encodeURIComponent(providerEl.value)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Could not fetch balance");

    const balances = data.balance_infos || [];
    const primary = balances[0];
    const total = primary ? `${primary.total_balance} ${primary.currency}` : data.is_available ? "Configured" : "Unavailable";
    const detail = balances
      .map(
        (item) =>
          `${item.currency}: total ${item.total_balance}, granted ${item.granted_balance}, topped up ${item.topped_up_balance}`,
      )
      .join(" | ");

    balanceTotalEl.textContent = total;
    settingsBalanceEl.textContent = total;
    balanceStateEl.textContent = data.is_available ? "Available" : "Unavailable";
    balanceDetailsEl.textContent = detail || data.message || "No balance rows returned.";
  } catch (error) {
    balanceTotalEl.textContent = "Unavailable";
    settingsBalanceEl.textContent = "Unavailable";
    balanceStateEl.textContent = "Balance API error";
    balanceDetailsEl.textContent = error.message;
  }
}

function selectedProvider() {
  return providers.find((provider) => provider.id === providerEl.value) || providers[0] || null;
}

function renderProviders(data) {
  providers = data.providers || [];
  const savedProvider = localStorage.getItem("deepseek.providerId") || data.default_provider || "deepseek";
  providerEl.innerHTML = "";

  for (const provider of providers) {
    const option = document.createElement("option");
    option.value = provider.id;
    option.textContent = `${provider.name}${provider.configured ? "" : " (needs key)"}`;
    providerEl.append(option);
  }

  providerEl.value = providers.some((provider) => provider.id === savedProvider) ? savedProvider : providers[0]?.id || "";
  updateProviderModel();
}

function updateProviderModel() {
  const provider = selectedProvider();
  localStorage.setItem("deepseek.providerId", providerEl.value);
  modelOptionsEl.innerHTML = "";

  if (!provider) {
    modelEl.value = "";
    providerHelpEl.textContent = "No providers are available.";
    return;
  }

  for (const model of provider.models || []) {
    const option = document.createElement("option");
    option.value = model;
    modelOptionsEl.append(option);
  }

  const savedModels = JSON.parse(localStorage.getItem("deepseek.providerModels") || "{}");
  modelEl.value = savedModels[provider.id] || provider.default_model || provider.models?.[0] || "";
  providerHelpEl.textContent = provider.configured
    ? `${provider.name} uses ${provider.api_key_env} on the Python server.`
    : `Add ${provider.api_key_env} to .env and restart the server.`;
  // provider API key input hint
  if (typeof providerKeyInputEl !== 'undefined' && providerKeyInputEl !== null) {
    providerKeyInputEl.value = '';
    providerKeyInputEl.placeholder = provider.configured ? 'Configured (key saved locally)' : `Add ${provider.api_key_env} to .env or enter key below`;
  }
  updateWorkspaceCards();
  loadBalance();
}

async function loadProviders() {
  try {
    const response = await fetch("/api/providers");
    const data = await response.json();
    renderProviders(data);
  } catch {
    providers = [];
    providerHelpEl.textContent = "Could not load providers from the Python server.";
  }
}

async function loadWorkspace() {
  try {
    const response = await fetch("/api/workspace");
    workspace = await response.json();
  } catch {
    workspace = { tools: [], integrations: [] };
  }
  renderTools();
  renderIntegrations();
  renderMcpServers();
}

function resizePrompt() {
  promptEl.style.height = "auto";
  promptEl.style.height = `${promptEl.scrollHeight}px`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = promptEl.value.trim();
  if (!text) return;
  const limit = Number(sessionLimitEl.value || 0);
  if (limit > 0 && sessionUsage.estimatedCostUsd >= limit) {
    addError(`Session spend limit reached (${formatMoney(limit)}). Increase the limit in Settings to continue.`);
    return;
  }

  const slashMode = text.match(/^\/(\w+)/)?.[1] || "";
  const cleanText = text.replace(/^\/\w+\s*/, "");
  const context = contextSummary();
  const outgoingText = context ? `${cleanText}\n\nContext mentions:\n${context}` : cleanText;

  if (composerModeEl.value === "artifact" || slashMode === "artifact") {
    artifactPromptEl.value = outgoingText;
    document.querySelector('.tab[data-panel="artifacts"]')?.click();
    artifactForm.requestSubmit();
    promptEl.value = "";
    composerContext = [];
    saveState();
    renderContextChips();
    resizePrompt();
    return;
  }

  if (composerModeEl.value === "data" || slashMode === "data") {
    dataInputEl.value = outgoingText;
    document.querySelector('.tab[data-panel="data"]')?.click();
    dataForm.requestSubmit();
    promptEl.value = "";
    composerContext = [];
    saveState();
    renderContextChips();
    resizePrompt();
    return;
  }

  if (
    composerModeEl.value === "agent" ||
    composerModeEl.value === "code" ||
    ["agent", "plan", "debug", "code", "fix", "explain"].includes(slashMode)
  ) {
    agentGoalEl.value = outgoingText;
    if (slashMode === "debug") agentModeEl.value = "debugger";
    if (slashMode === "plan") agentModeEl.value = "planner";
    if (slashMode === "code" || slashMode === "fix" || composerModeEl.value === "code") agentModeEl.value = "builder";
    if (slashMode === "explain") agentModeEl.value = "researcher";
    document.querySelector('.tab[data-panel="agents"]')?.click();
    agentForm.requestSubmit();
    promptEl.value = "";
    composerContext = [];
    saveState();
    renderContextChips();
    resizePrompt();
    return;
  }

  messages.push({ role: "user", content: text });
  promptEl.value = "";
  composerContext = [];
  resizePrompt();
  persistCurrentConversation();
  saveState();
  renderMessages();
  setBusy(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "system", content: systemPromptEl.value }, ...messages.slice(0, -1), { role: "user", content: outgoingText }],
        provider_id: providerEl.value,
        model: modelEl.value,
        temperature: Number(temperatureEl.value),
        enabled_tools: [...enabledTools],
        safeguards: safeguards(),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Request failed");

    messages.push({ role: "assistant", content: data.message, usage: data.usage });
    const chatArtifacts = extractArtifactsFromMessage(data.message);
    if (chatArtifacts.length > 0) {
      artifacts = [...chatArtifacts, ...artifacts];
      selectedArtifactId = chatArtifacts[0].id;
      renderArtifacts();
    }
    addUsage(data.usage);
    persistCurrentConversation();
    saveState();
    renderMessages();
  } catch (error) {
    addError(error.message);
  } finally {
    setBusy(false);
    renderContextChips();
    promptEl.focus();
  }
});

promptEl.addEventListener("input", resizePrompt);
promptEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

promptEl.addEventListener("input", () => {
  resizePrompt();
  const beforeCursor = promptEl.value.slice(0, promptEl.selectionStart);
  const slash = beforeCursor.match(/\/([\w-]*)$/);
  const mention = beforeCursor.match(/@([\w\s-]*)$/);
  if (slash) {
    openComposerMenu(commandItems(slash[1]));
  } else if (mention) {
    openComposerMenu(mentionItems(mention[1].trim()));
  } else {
    closeComposerMenu();
  }
});

slashButton.addEventListener("click", () => openComposerMenu(commandItems()));
mentionButton.addEventListener("click", () => openComposerMenu(mentionItems()));

fileInputEl.addEventListener("change", async () => {
  for (const file of fileInputEl.files) {
    let detail = `${Math.round(file.size / 1024)} KB attached locally.`;
    if (file.type.startsWith("text/") || /\.(md|txt|json|csv|js|ts|py|html|css|xml|yaml|yml)$/i.test(file.name)) {
      try {
        detail = (await file.text()).slice(0, 6000);
      } catch {
        detail = `${Math.round(file.size / 1024)} KB attached locally. Could not read text content.`;
      }
    }
    addComposerContext({
      type: "file",
      id: `${file.name}-${file.lastModified}`,
      label: file.name,
      icon: "artifact",
      detail,
    });
  }
  fileInputEl.value = "";
});

projectSearchButton.addEventListener("click", searchProject);
projectSearchEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchProject();
  }
});
attachProjectFileButton.addEventListener("click", () => {
  if (selectedProjectFile) attachProjectFile(selectedProjectFile.path);
});
projectTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  projectTasks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: projectTaskTitleEl.value.trim(),
    status: projectTaskStatusEl.value,
    createdAt: new Date().toISOString(),
  });
  projectTaskForm.reset();
  saveState();
  renderProjectTasks();
});

dataFileInputEl.addEventListener("change", async () => {
  await appendFilesToDataInput(dataFileInputEl.files);
  dataFileInputEl.value = "";
});

dataForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = dataInputEl.value.trim();
  if (!data) return;
  const limit = Number(sessionLimitEl.value || 0);
  if (limit > 0 && sessionUsage.estimatedCostUsd >= limit) {
    addError(`Session spend limit reached (${formatMoney(limit)}). Increase the limit in Settings to continue.`);
    return;
  }

  runDataAnalysisButton.disabled = true;
  runDataAnalysisButton.textContent = "Analyzing";
  try {
    const response = await fetch("/api/data-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
        question: dataQuestionEl.value.trim() || "Analyze this data and extract useful insights.",
        analysis_type: dataAnalysisTypeEl.value,
        provider_id: providerEl.value,
        model: modelEl.value,
        temperature: Number(temperatureEl.value),
        safeguards: safeguards(),
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.detail || "Data analysis failed");
    lastDataAnalysis = result;
    addUsage(result.usage);
    saveState();
    renderDataAnalysis();
  } catch (error) {
    addError(error.message);
  } finally {
    runDataAnalysisButton.disabled = false;
    runDataAnalysisButton.textContent = "Analyze data";
  }
});

copyDataResultButton.addEventListener("click", async () => {
  if (!lastDataAnalysis) return;
  await navigator.clipboard.writeText(lastDataAnalysis.result);
  copyDataResultButton.textContent = "Copied";
  setTimeout(() => {
    copyDataResultButton.textContent = "Copy result";
  }, 1200);
});

saveDataArtifactButton.addEventListener("click", () => {
  if (!lastDataAnalysis) return;
  const artifact = createArtifactRecord({
    title: `${lastDataAnalysis.analysis_type} data analysis`,
    artifact_type: "markdown",
    content: lastDataAnalysis.result,
    usage: lastDataAnalysis.usage,
  });
  artifacts.unshift(artifact);
  selectedArtifactId = artifact.id;
  saveState();
  renderArtifacts();
});

clearButton.addEventListener("click", () => {
  // Clear current conversation messages
  messages = [];
  sessionUsage = { promptTokens: 0, completionTokens: 0, totalTokens: 0, estimatedCostUsd: 0, last: null };
  // update conversation if any
  if (selectedConversationId) {
    const conv = conversations.find((c) => c.id === selectedConversationId);
    if (conv) conv.messages = [];
  }
  saveState();
  updateUsageDisplay();
  renderConversations();
  renderMessages();
  promptEl.focus();
});

newChatButton.addEventListener("click", () => {
  // Create & switch to a new conversation
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  const conv = { id, title: "New chat", messages: [], createdAt: new Date().toISOString() };
  conversations.unshift(conv);
  selectedConversationId = id;
  messages = [];
  sessionUsage = { promptTokens: 0, completionTokens: 0, totalTokens: 0, estimatedCostUsd: 0, last: null };
  saveState();
  renderConversations();
  updateUsageDisplay();
  renderMessages();
  promptEl.focus();
});

exportButton.addEventListener("click", async () => {
  const transcript = messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join("\n\n");
  await navigator.clipboard.writeText(transcript || "No chat messages yet.");
  exportButton.textContent = "Copied";
  setTimeout(() => {
    exportButton.textContent = "Export";
  }, 1200);
});

temperatureEl.addEventListener("input", () => {
  tempValueEl.textContent = temperatureEl.value;
});

providerEl.addEventListener("change", updateProviderModel);
modelEl.addEventListener("input", () => {
  const savedModels = JSON.parse(localStorage.getItem("deepseek.providerModels") || "{}");
  savedModels[providerEl.value] = modelEl.value;
  localStorage.setItem("deepseek.providerModels", JSON.stringify(savedModels));
});

// Save provider API key to server (persisted locally on Python server)
if (saveProviderKeyButton) {
  saveProviderKeyButton.addEventListener('click', async () => {
    const key = providerKeyInputEl?.value?.trim();
    if (!key) {
      providerKeyInputEl?.focus();
      return;
    }
    saveProviderKeyButton.disabled = true;
    const prev = saveProviderKeyButton.textContent;
    saveProviderKeyButton.textContent = 'Saving';
    try {
      const res = await fetch('/api/provider-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider_id: providerEl.value, api_key: key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to save provider key');
      providerKeyInputEl.value = '';
      providerHelpEl.textContent = data.configured ? 'Provider configured on server.' : providerHelpEl.textContent;
      loadProviders();
    } catch (err) {
      addError(err.message || String(err));
    } finally {
      saveProviderKeyButton.disabled = false;
      saveProviderKeyButton.textContent = prev;
    }
  });
}
sessionLimitEl.addEventListener("input", updateUsageDisplay);
refreshBalanceButton.addEventListener("click", loadBalance);
[guardGroundedEl, guardUncertaintyEl, guardSelfCheckEl, guardCiteContextEl].forEach((input) => {
  input.addEventListener("change", saveState);
});

mcpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  mcpServers.push({
    name: mcpNameEl.value.trim(),
    command: mcpCommandEl.value.trim(),
    enabled: true,
  });
  mcpForm.reset();
  saveState();
  renderMcpServers();
});

artifactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = artifactPromptEl.value.trim();
  if (!prompt) return;

  const limit = Number(sessionLimitEl.value || 0);
  if (limit > 0 && sessionUsage.estimatedCostUsd >= limit) {
    addError(`Session spend limit reached (${formatMoney(limit)}). Increase the limit in Settings to continue.`);
    return;
  }

  createArtifactButton.disabled = true;
  createArtifactButton.textContent = "Creating";

  try {
    const response = await fetch("/api/artifact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        title: artifactTitleEl.value.trim() || undefined,
        artifact_type: artifactTypeEl.value,
        provider_id: providerEl.value,
        model: modelEl.value,
        temperature: Number(temperatureEl.value),
        enabled_tools: [...enabledTools],
        safeguards: safeguards(),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Artifact creation failed");

    const artifact = createArtifactRecord(data);
    artifacts.unshift(artifact);
    selectedArtifactId = artifact.id;
    artifactPromptEl.value = "";
    artifactTitleEl.value = "";
    addUsage(data.usage);
    saveState();
    renderArtifacts();
  } catch (error) {
    addError(error.message);
  } finally {
    createArtifactButton.disabled = false;
    createArtifactButton.textContent = "Create artifact";
  }
});

agentStepsEl.addEventListener("input", () => {
  agentStepValueEl.textContent = agentStepsEl.value;
});

for (const card of document.querySelectorAll(".agent-stack-card")) {
  card.addEventListener("click", () => {
    agentStackEl.value = card.dataset.stack;
    document.querySelectorAll(".agent-stack-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
  });
}

agentStackEl.addEventListener("change", () => {
  document.querySelectorAll(".agent-stack-card").forEach((item) => {
    item.classList.toggle("active", item.dataset.stack === agentStackEl.value);
  });
});

agentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const goal = agentGoalEl.value.trim();
  if (!goal) return;

  const limit = Number(sessionLimitEl.value || 0);
  if (limit > 0 && sessionUsage.estimatedCostUsd >= limit) {
    addError(`Session spend limit reached (${formatMoney(limit)}). Increase the limit in Settings to continue.`);
    return;
  }

  runAgentButton.disabled = true;
  runAgentButton.textContent = "Running";

  try {
    const isStack = Boolean(agentStackEl.value);
    const response = await fetch(isStack ? "/api/agent-stack" : "/api/agent-harness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal,
        context: agentContextEl.value.trim() || undefined,
        stack_id: agentStackEl.value || undefined,
        mode: agentModeEl.value,
        max_steps: Number(agentStepsEl.value),
        provider_id: providerEl.value,
        model: modelEl.value,
        temperature: Number(temperatureEl.value),
        enabled_tools: [...enabledTools],
        safeguards: safeguards(),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Agent workflow failed");

    const run = createAgentRunRecord({
      ...data,
      mode: data.stack_id ? `${data.stack_id} stack` : data.mode,
    });
    agentRuns.unshift(run);
    selectedAgentRunId = run.id;
    addUsage(data.usage);
    saveState();
    renderAgentRuns();
  } catch (error) {
    addError(error.message);
  } finally {
    runAgentButton.disabled = false;
    runAgentButton.textContent = "Run harness";
  }
});

copyAgentResultButton.addEventListener("click", async () => {
  const run = selectedAgentRun();
  if (!run) return;
  await navigator.clipboard.writeText(run.result);
  copyAgentResultButton.textContent = "Copied";
  setTimeout(() => {
    copyAgentResultButton.textContent = "Copy result";
  }, 1200);
});

saveAgentArtifactButton.addEventListener("click", () => {
  const run = selectedAgentRun();
  if (!run) return;
  const artifact = createArtifactRecord({
    title: `${run.mode} harness result`,
    artifact_type: "markdown",
    content: run.result,
    usage: run.usage,
  });
  artifacts.unshift(artifact);
  selectedArtifactId = artifact.id;
  saveState();
  renderArtifacts();
});

routineScheduleEl.addEventListener("change", renderRoutines);

routineForm.addEventListener("submit", (event) => {
  event.preventDefault();
  routines.unshift(createRoutineRecord());
  routineForm.reset();
  routineTimeEl.value = "09:00";
  routineArtifactEl.checked = true;
  saveState();
  renderRoutines();
});

runDueRoutinesButton.addEventListener("click", runDueRoutines);

pauseRoutinesButton.addEventListener("click", () => {
  const anyEnabled = routines.some((routine) => routine.enabled);
  routines = routines.map((routine) => ({ ...routine, enabled: !anyEnabled }));
  pauseRoutinesButton.textContent = anyEnabled ? "Resume all" : "Pause all";
  saveState();
  renderRoutines();
});

setInterval(() => {
  renderRoutines();
}, 60000);

copyArtifactButton.addEventListener("click", async () => {
  const artifact = selectedArtifact();
  if (!artifact) return;
  await navigator.clipboard.writeText(artifact.content);
  copyArtifactButton.textContent = "Copied";
  setTimeout(() => {
    copyArtifactButton.textContent = "Copy";
  }, 1200);
});

downloadArtifactButton.addEventListener("click", () => {
  const artifact = selectedArtifact();
  if (!artifact) return;
  const blob = new Blob([artifact.content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  const safeTitle = artifact.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  link.href = URL.createObjectURL(blob);
  link.download = `${safeTitle || "artifact"}.${artifactExtension(artifact.type)}`;
  link.click();
  URL.revokeObjectURL(link.href);
});

deleteArtifactButton.addEventListener("click", () => {
  const artifact = selectedArtifact();
  if (!artifact) return;
  artifacts = artifacts.filter((item) => item.id !== artifact.id);
  selectedArtifactId = artifacts[0]?.id || "";
  saveState();
  renderArtifacts();
});

for (const tab of document.querySelectorAll(".tab")) {
  tab.addEventListener("click", () => {
    activatePanel(tab.dataset.panel);
  });
}

for (const item of document.querySelectorAll(".icon-nav")) {
  item.addEventListener("click", () => {
    document.querySelectorAll(".icon-nav").forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    if (item.dataset.target === "chat") {
      promptEl.focus();
      return;
    }
    const tabButton = document.querySelector(`.tab[data-panel="${item.dataset.target}"]`);
    tabButton?.click();
  });
}

// initialize conversations and messages
if (!conversations || conversations.length === 0) {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  conversations = [ { id, title: 'Local workspace', messages: messages || [], createdAt: new Date().toISOString() } ];
  selectedConversationId = id;
} else {
  if (selectedConversationId) {
    const conv = conversations.find((c) => c.id === selectedConversationId);
    if (conv) messages = conv.messages || [];
    else {
      selectedConversationId = conversations[0].id;
      messages = conversations[0].messages || [];
    }
  } else {
    selectedConversationId = conversations[0].id;
    messages = conversations[0].messages || [];
  }
}

renderConversations();
decorateIcons();
renderContextChips();
renderArtifacts();
renderAgentRuns();
renderRoutines();
renderProjectTasks();
renderDataAnalysis();
updateUsageDisplay();
checkHealth();
loadProviders();
loadWorkspace();
loadProjectFiles();
renderMessages();

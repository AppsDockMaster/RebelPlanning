const state = {
  consultants: [],
  selectedId: null,
  offers: [],
  selectedOfferId: null,
  projects: [],
  selectedProjectId: null,
  projectAllocationsScrollLeft: {},
  selectedPlanningConsultantId: null,
  planningExpandedConsultants: {},
  analysis: {
    months: [],
    weeks: [],
    consultants: [],
    rows: [],
    weeklyRows: [],
    monthlyTotals: [],
    detailRows: [],
    projectTotals: [],
    internalRows: [],
    mixTotals: { billable: 0, acquisitie: 0, administratie: 0 },
    mixMonthly: [],
    mixConsultant: [],
    mixConsultantMonthly: [],
    selectedConsultant: "",
    error: ""
  },
  ohw: {
    projects: [],
    totals: { openingOHW: 0, performedRevenue: 0, invoiced: 0, vendorInvoiced: 0, currentOHW: 0 },
    source: { ohwFile: "", invoiceFile: "", timesheets: [] },
    error: ""
  },
  overheadCosts: [],
  projectSort: {
    key: "projectNumber",
    dir: "asc"
  },
  ohwSort: {
    key: "currentOHW",
    dir: "desc"
  },
  ohwEntityFilter: "ALL",
  ohwExpandedProjects: {},
  invoices: {
    rows: [],
    columns: [],
    error: ""
  },
  invoiceSort: { key: null, dir: "asc" },
  invoiceSearch: ""
};
const API_BASE_CANDIDATES = [
  (typeof window.PLANNING_BASE_PATH !== "undefined" ? window.PLANNING_BASE_PATH : ""),
  "http://127.0.0.1:8000",
  "http://localhost:8000"
];
let resolvedApiBase = null;

const consultantForm = document.getElementById("consultant-form");
const consultantsList = document.getElementById("consultants-list");
const consultantStatusFilter = document.getElementById("consultant-status-filter");
const consultantEntityFilter = document.getElementById("consultant-entity-filter");
const noSelection = document.getElementById("no-selection");
const details = document.getElementById("details");
const meta = document.getElementById("meta");
const entityInput = document.getElementById("entity");
const roleForm = document.getElementById("role-form");
const regimeForm = document.getElementById("regime-form");
const consultantEditForm = document.getElementById("consultant-edit-form");
const consultantEditStartDate = document.getElementById("consultant-edit-start-date");
const consultantEditExitDate = document.getElementById("consultant-edit-exit-date");
const consultantEditEntity = document.getElementById("consultant-edit-entity");
const roleTable = document.getElementById("role-table");
const regimeTable = document.getElementById("regime-table");
const costForm = document.getElementById("cost-form");
const costYearInput = document.getElementById("cost-year");
const costAmountInput = document.getElementById("cost-amount");
const costTable = document.getElementById("cost-table");
const vacationForm = document.getElementById("vacation-form");
const vacationConsultantInput = document.getElementById("vacation-consultant");
const vacationStartDateInput = document.getElementById("vacation-start-date");
const vacationEndDateInput = document.getElementById("vacation-end-date");
const vacationTable = document.getElementById("vacation-table");
const consultantDeleteBtn = document.getElementById("consultant-delete-btn");
const fileStatus = document.getElementById("file-status");
const fteSummary = document.getElementById("fte-summary");
const fteChart = document.getElementById("fte-chart");
const fteEntityFilter = document.getElementById("fte-entity-filter");
const fteLegend = document.getElementById("fte-legend");
const overheadForm = document.getElementById("overhead-form");
const overheadYearInput = document.getElementById("overhead-year");
const overheadEntityInput = document.getElementById("overhead-entity");
const overheadCostInput = document.getElementById("overhead-cost");
const overheadTable = document.getElementById("overhead-table");
const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
const tabPanels = {
  consultants: document.getElementById("tab-consultants"),
  vakanties: document.getElementById("tab-vakanties"),
  offertes: document.getElementById("tab-offertes"),
  projecten: document.getElementById("tab-projecten"),
  planning: document.getElementById("tab-planning"),
  analyse: document.getElementById("tab-analyse"),
  pipeline: document.getElementById("tab-pipeline"),
  ohw: document.getElementById("tab-ohw"),
  facturatie: document.getElementById("tab-facturatie"),
  bestanden: document.getElementById("tab-bestanden")
};
const offerForm = document.getElementById("offer-form");
const offersTableWrap = document.getElementById("offers-table-wrap");
const offerStatusFilter = document.getElementById("offer-status-filter");
const noOfferSelection = document.getElementById("no-offer-selection");
const offerDetails = document.getElementById("offer-details");
const offerMeta = document.getElementById("offer-meta");
const offerEditForm = document.getElementById("offer-edit-form");
const offerEditName = document.getElementById("offer-edit-name");
const offerEditSubmissionDate = document.getElementById("offer-edit-submission-date");
const offerEditStatus = document.getElementById("offer-edit-status");
const offerStaffForm = document.getElementById("offer-staff-form");
const offerConsultant = document.getElementById("offer-consultant");
const offerAllocationsMatrix = document.getElementById("offer-allocations-matrix");
const offerDeleteBtn = document.getElementById("offer-delete-btn");
const projectForm = document.getElementById("project-form");
const projectLeadConsultant = document.getElementById("project-lead-consultant");
const projectBillingType = document.getElementById("project-billing-type");
const projectCapRow = document.getElementById("project-cap-row");
const projectCapAmount = document.getElementById("project-cap-amount");
const projectPrevBudgetTotal = document.getElementById("project-prev-budget-total");
const projectNextBudgetTotal = document.getElementById("project-next-budget-total");
const projectsTableWrap = document.getElementById("projects-table-wrap");
const projectStatusFilter = document.getElementById("project-status-filter");
const projectConsultantFilter = document.getElementById("project-consultant-filter");
const noProjectSelection = document.getElementById("no-project-selection");
const projectDetails = document.getElementById("project-details");
const projectMeta = document.getElementById("project-meta");
const projectEditForm = document.getElementById("project-edit-form");
const projectEditNumber = document.getElementById("project-edit-number");
const projectEditName = document.getElementById("project-edit-name");
const projectEditStartDate = document.getElementById("project-edit-start-date");
const projectEditDeliveryDate = document.getElementById("project-edit-delivery-date");
const projectEditBudget = document.getElementById("project-edit-budget");
const projectEditLeadConsultant = document.getElementById("project-edit-lead-consultant");
const projectEditBillingType = document.getElementById("project-edit-billing-type");
const projectEditCapRow = document.getElementById("project-edit-cap-row");
const projectEditCapAmount = document.getElementById("project-edit-cap-amount");
const projectEditPrevBudgetTotal = document.getElementById("project-edit-prev-budget-total");
const projectEditNextBudgetTotal = document.getElementById("project-edit-next-budget-total");
const projectEditStatus = document.getElementById("project-edit-status");
const projectStaffForm = document.getElementById("project-staff-form");
const projectConsultant = document.getElementById("project-consultant");
const projectAllocationsMatrix = document.getElementById("project-allocations-matrix");
const projectDeleteBtn = document.getElementById("project-delete-btn");
const projectTimelineChart = document.getElementById("project-timeline-chart");
const projectTimelineScroll = document.getElementById("project-timeline-scroll");
const projectTimelineSummary = document.getElementById("project-timeline-summary");
const planningEntityFilter = document.getElementById("planning-entity-filter");
const planningTableWrap = document.getElementById("planning-table-wrap");
const planningRefreshBtn = document.getElementById("planning-refresh-btn");
const planningPersonChart = document.getElementById("planning-person-chart");
const planningPersonMeta = document.getElementById("planning-person-meta");
const planningProjectTimelineChart = document.getElementById("planning-project-timeline-chart");
const planningProjectTimelineScroll = document.getElementById("planning-project-timeline-scroll");
const planningProjectTimelineMeta = document.getElementById("planning-project-timeline-meta");
const analysisMeta = document.getElementById("analysis-meta");
const analysisEntityFilter = document.getElementById("analysis-entity-filter");
const analysisRevenueChart = document.getElementById("analysis-revenue-chart");
const analysisMixChart = document.getElementById("analysis-mix-chart");
const analysisTableWrap = document.getElementById("analysis-table-wrap");
const analysisWeeklyTableWrap = document.getElementById("analysis-weekly-table-wrap");
const analysisDetailMeta = document.getElementById("analysis-detail-meta");
const analysisPrintReportBtn = document.getElementById("analysis-print-report-btn");
const analysisConsultantMixChart = document.getElementById("analysis-consultant-mix-chart");
const analysisConsultantMonthlyMixChart = document.getElementById("analysis-consultant-monthly-mix-chart");
const analysisHoursProjectChart = document.getElementById("analysis-hours-project-chart");
const analysisDetailTableWrap = document.getElementById("analysis-detail-table-wrap");
const analysisInternalWrap = document.getElementById("analysis-internal-wrap");
const pipelineMeta = document.getElementById("pipeline-meta");
const pipelineLegend = document.getElementById("pipeline-legend");
const pipelineChart = document.getElementById("pipeline-chart");
const pipelineTableWrap = document.getElementById("pipeline-table-wrap");
const pipelineEntityFilter = document.getElementById("pipeline-entity-filter");
const pipelineConsultantFilter = document.getElementById("pipeline-consultant-filter");
const ohwMeta = document.getElementById("ohw-meta");
const ohwSummary = document.getElementById("ohw-summary");
const ohwTableWrap = document.getElementById("ohw-table-wrap");
const ohwEntityFilter = document.getElementById("ohw-entity-filter");
const ohwExportBtn = document.getElementById("ohw-export-btn");
const facturatieTableWrap = document.getElementById("facturatie-table-wrap");
const facturatieSearch = document.getElementById("facturatie-search");
const facturatieMeta = document.getElementById("facturatie-meta");

const ROLE_ORDER = ["junior", "medior", "senior", "expert", "director"];
const ROLE_COLORS = {
  junior: "#2f80ed",
  medior: "#27ae60",
  senior: "#f2994a",
  expert: "#9b51e0",
  director: "#eb5757"
};
const ROLE_FILL_COLORS = {
  junior: "rgba(47, 128, 237, 0.35)",
  medior: "rgba(39, 174, 96, 0.35)",
  senior: "rgba(242, 153, 74, 0.35)",
  expert: "rgba(155, 81, 224, 0.35)",
  director: "rgba(235, 87, 87, 0.35)"
};

function toBelgianDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "";
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function toIsoDate(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`;
  }
  return "";
}

function fmtDate(value) {
  return value ? toBelgianDate(value) : "lopende";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMonthLabel(monthIso) {
  if (!/^\d{4}-\d{2}$/.test(monthIso || "")) return monthIso || "";
  const [year, month] = monthIso.split("-");
  return `${month}/${year}`;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function parseIsoDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function expectedWeeklyHoursForConsultant(consultant, weekStartIso) {
  const weekStart = parseIsoDate(weekStartIso);
  if (!consultant || !weekStart) return 0;
  let expectedHours = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
    const weekday = d.getDay();
    if (weekday === 0 || weekday === 6) continue;
    const dayIso = toIsoFromDate(d);
    if (!isConsultantActiveOnDate(consultant, dayIso)) continue;
    const regime = Math.max(0, Math.min(100, Number(getRegimeForDate(consultant, dayIso) || 0)));
    expectedHours += (8 * regime) / 100;
  }
  return expectedHours;
}

function monthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function toIsoFromDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function setStatus(text, isError = false) {
  fileStatus.textContent = text;
  fileStatus.style.color = isError ? "#b42318" : "#5e6a7c";
}

function getSelected() {
  return state.consultants.find((c) => c.id === state.selectedId) || null;
}

function getSelectedOffer() {
  return state.offers.find((o) => o.id === state.selectedOfferId) || null;
}

function getSelectedProject() {
  return state.projects.find((p) => p.id === state.selectedProjectId) || null;
}

function isConsultantActiveOnDate(consultant, isoDate) {
  if (!consultant || !consultant.startDate) return false;
  if (consultant.startDate > isoDate) return false;
  if (consultant.exitDate && consultant.exitDate < isoDate) return false;
  return true;
}

function getActiveConsultantsToday() {
  const todayIso = toIsoFromDate(new Date());
  return state.consultants.filter((c) => isConsultantActiveOnDate(c, todayIso));
}

function addError(form, message) {
  let err = form.querySelector(".error");
  if (!err) {
    err = document.createElement("div");
    err.className = "error";
    form.appendChild(err);
  }
  err.textContent = message;
}

function clearError(form) {
  const err = form.querySelector(".error");
  if (err) err.remove();
}

function apiDateToInput(iso) {
  return iso ? toBelgianDate(iso) : "";
}

async function fetchWithBase(base, path, options = {}) {
  const url = `${base}${path}`;
  return await fetch(url, options);
}

async function apiRequest(path, options) {
  if (resolvedApiBase !== null) {
    return await fetchWithBase(resolvedApiBase, path, options);
  }

  let lastError = null;
  for (const base of API_BASE_CANDIDATES) {
    try {
      const response = await fetchWithBase(base, path, options);
      resolvedApiBase = base;
      return response;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("API niet bereikbaar");
}
async function apiGet(path) {
  const response = await apiRequest(path, { method: "GET" });
  const raw = await response.text();
  let payload = {};
  try {
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    payload = {};
  }
  if (!response.ok) {
    throw new Error(payload.error || `HTTP ${response.status}`);
  }
  return payload;
}

async function apiPost(path, body) {
  const response = await apiRequest(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Ongeldige aanvraag.");
  }
  return payload;
}

function applyConsultants(consultants, overheadCosts = null) {
  state.consultants = Array.isArray(consultants) ? consultants : [];
  if (Array.isArray(overheadCosts)) {
    state.overheadCosts = overheadCosts;
  }
  if (!state.consultants.some((c) => c.id === state.selectedId)) {
    state.selectedId = state.consultants[0] ? state.consultants[0].id : null;
  }
}

function applyOffers(offers) {
  state.offers = Array.isArray(offers) ? offers : [];
  if (!state.offers.some((o) => o.id === state.selectedOfferId)) {
    state.selectedOfferId = state.offers[0] ? state.offers[0].id : null;
  }
}

function applyProjects(projects) {
  state.projects = Array.isArray(projects) ? projects : [];
  if (!state.projects.some((p) => p.id === state.selectedProjectId)) {
    state.selectedProjectId = state.projects[0] ? state.projects[0].id : null;
  }
}

function applyAnalysis(payload) {
  const previousSelected = state.analysis?.selectedConsultant || "";
  state.analysis = {
    months: Array.isArray(payload?.months) ? payload.months : [],
    weeks: Array.isArray(payload?.weeks) ? payload.weeks : [],
    consultants: Array.isArray(payload?.consultants) ? payload.consultants : [],
    rows: Array.isArray(payload?.rows) ? payload.rows : [],
    weeklyRows: Array.isArray(payload?.weeklyRows) ? payload.weeklyRows : [],
    monthlyTotals: Array.isArray(payload?.monthlyTotals) ? payload.monthlyTotals : [],
    detailRows: Array.isArray(payload?.detailRows) ? payload.detailRows : [],
    projectTotals: Array.isArray(payload?.projectTotals) ? payload.projectTotals : [],
    internalRows: Array.isArray(payload?.internalRows) ? payload.internalRows : [],
    mixTotals: payload?.mixTotals || { billable: 0, acquisitie: 0, administratie: 0 },
    mixMonthly: Array.isArray(payload?.mixMonthly) ? payload.mixMonthly : [],
    mixConsultant: Array.isArray(payload?.mixConsultant) ? payload.mixConsultant : [],
    mixConsultantMonthly: Array.isArray(payload?.mixConsultantMonthly) ? payload.mixConsultantMonthly : [],
    selectedConsultant: previousSelected,
    error: payload?.error || ""
  };
  if (!state.analysis.consultants.includes(state.analysis.selectedConsultant)) {
    state.analysis.selectedConsultant = state.analysis.consultants[0] || "";
  }
}

function applyOhw(payload) {
  state.ohw = {
    projects: Array.isArray(payload?.projects) ? payload.projects : [],
    totals: payload?.totals || { openingOHW: 0, performedRevenue: 0, invoiced: 0, vendorInvoiced: 0, currentOHW: 0 },
    source: payload?.source || { ohwFile: "", invoiceFile: "", timesheets: [] },
    error: payload?.error || ""
  };
}

function renderConsultants() {
  consultantsList.innerHTML = "";
  if (!state.consultants.length) {
    consultantsList.innerHTML = "<p>Nog geen consultants.</p>";
    return;
  }

  const filterValue = consultantStatusFilter ? consultantStatusFilter.value : "active";
  const entityFilter = consultantEntityFilter ? consultantEntityFilter.value : "ALL";
  const todayIso = toIsoFromDate(new Date());
  const visibleConsultants = state.consultants.filter((c) => {
    if (entityFilter !== "ALL" && (c.entity || "RPL BE") !== entityFilter) return false;
    if (filterValue === "all") return true;
    const started = !!c.startDate && c.startDate <= todayIso;
    const notExited = !c.exitDate || c.exitDate >= todayIso;
    return started && notExited;
  });

  if (!visibleConsultants.length) {
    consultantsList.innerHTML = "<p>Geen consultants voor deze filter.</p>";
    return;
  }

  visibleConsultants.forEach((c) => {
    const div = document.createElement("div");
    div.className = `item ${c.id === state.selectedId ? "active" : ""}`;
    const exitText = c.exitDate ? ` | Uit dienst: ${fmtDate(c.exitDate)}` : "";
    div.innerHTML = `<strong>${c.name}</strong><br><small>${c.entity || "RPL BE"} | In dienst: ${fmtDate(c.startDate)}${exitText}</small>`;
    div.addEventListener("click", () => {
      state.selectedId = c.id;
      render();
    });
    consultantsList.appendChild(div);
  });
}

function renderTimelineTable(target, entries, valueKey, valueLabel, type) {
  if (!entries || !entries.length) {
    target.innerHTML = "<p>Geen historiek.</p>";
    return;
  }

  const rows = entries
    .slice()
    .sort((a, b) => (a.from || "").localeCompare(b.from || ""))
    .map((e) => {
      return `<tr>
        <td>${e[valueKey]}</td>
        <td>${fmtDate(e.from)}</td>
        <td>${fmtDate(e.to)}</td>
        <td>
          <button class="row-action edit-action" data-type="${type}" data-id="${e.id}">Bewerk</button>
          <button class="row-action delete-action" data-type="${type}" data-id="${e.id}">Verwijder</button>
        </td>
      </tr>`;
    })
    .join("");

  target.innerHTML = `
    <table>
      <thead><tr><th>${valueLabel}</th><th>Van</th><th>Tot</th><th>Acties</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function renderCostTable(entries) {
  if (!costTable) return;
  if (!entries || !entries.length) {
    costTable.innerHTML = "<p>Geen kostprijzen.</p>";
    return;
  }
  const rows = entries
    .slice()
    .sort((a, b) => Number(a.year || 0) - Number(b.year || 0))
    .map((e) => {
      return `<tr>
        <td>${e.year}</td>
        <td>${formatBudget(e.cost || 0)}</td>
        <td>
          <button class="row-action edit-action" data-type="cost" data-id="${e.id}">Bewerk</button>
          <button class="row-action delete-action" data-type="cost" data-id="${e.id}">Verwijder</button>
        </td>
      </tr>`;
    })
    .join("");
  costTable.innerHTML = `
    <table>
      <thead><tr><th>Jaar</th><th>Kostprijs</th><th>Acties</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function renderVacationTable(entries) {
  if (!vacationTable) return;
  if (!entries || !entries.length) {
    vacationTable.innerHTML = "<p>Geen vakanties.</p>";
    return;
  }
  const rows = entries
    .slice()
    .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""))
    .map((e) => {
      return `<tr>
        <td>${e.consultantName || ""}</td>
        <td>${fmtDate(e.startDate)}</td>
        <td>${fmtDate(e.endDate)}</td>
        <td><button class="row-action delete-action vacation-delete-btn" data-id="${e.id}">Verwijder</button></td>
      </tr>`;
    })
    .join("");
  vacationTable.innerHTML = `
    <table>
      <thead><tr><th>Consultant</th><th>Van</th><th>Tot</th><th>Acties</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function renderVacationConsultantOptions() {
  if (!vacationConsultantInput) return;
  const activeConsultants = getActiveConsultantsToday()
    .slice()
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  const selectedValue = vacationConsultantInput.value;
  if (!activeConsultants.length) {
    vacationConsultantInput.innerHTML = "<option value=\"\">Geen actieve consultants</option>";
    return;
  }
  vacationConsultantInput.innerHTML = activeConsultants
    .map((c) => `<option value="${c.id}">${c.name} (${c.entity || "RPL BE"})</option>`)
    .join("");
  if (selectedValue && activeConsultants.some((c) => String(c.id) === String(selectedValue))) {
    vacationConsultantInput.value = selectedValue;
  }
}

function renderVacationsSection() {
  renderVacationConsultantOptions();
  const vacationEntries = state.consultants.flatMap((consultant) =>
    (consultant.vacationHistory || []).map((v) => ({
      id: v.id,
      consultantId: consultant.id,
      consultantName: consultant.name,
      startDate: v.startDate,
      endDate: v.endDate
    }))
  );
  renderVacationTable(vacationEntries);
}

function renderDetails() {
  const selected = getSelected();
  if (!selected) {
    noSelection.classList.remove("hidden");
    details.classList.add("hidden");
    if (consultantDeleteBtn) consultantDeleteBtn.disabled = true;
    if (consultantEditForm) consultantEditForm.querySelectorAll("input,select,button").forEach((el) => { el.disabled = true; });
    return;
  }

  noSelection.classList.add("hidden");
  details.classList.remove("hidden");
  if (consultantDeleteBtn) consultantDeleteBtn.disabled = false;
  if (consultantEditForm) consultantEditForm.querySelectorAll("input,select,button").forEach((el) => { el.disabled = false; });
  const exitText = selected.exitDate ? ` | Uit dienst: ${fmtDate(selected.exitDate)}` : "";
  meta.textContent = `${selected.name} | ${selected.entity || "RPL BE"} | Indienst: ${fmtDate(selected.startDate)}${exitText}`;
  if (consultantEditStartDate) consultantEditStartDate.value = fmtDate(selected.startDate);
  if (consultantEditExitDate) consultantEditExitDate.value = selected.exitDate ? fmtDate(selected.exitDate) : "";
  if (consultantEditEntity) consultantEditEntity.value = selected.entity || "RPL BE";
  renderTimelineTable(roleTable, selected.roleHistory || [], "role", "Functie", "role");
  renderTimelineTable(regimeTable, selected.regimeHistory || [], "regime", "Regime %", "regime");
  renderCostTable(selected.costHistory || []);
}

function renderOverheadTable() {
  if (!overheadTable) return;
  const rows = Array.isArray(state.overheadCosts) ? state.overheadCosts.slice() : [];
  if (!rows.length) {
    overheadTable.innerHTML = "<p>Nog geen overheadkosten ingegeven.</p>";
    return;
  }
  const years = Array.from(new Set(rows.map((r) => Number(r.year)))).sort((a, b) => a - b);
  const byKey = new Map(rows.map((r) => [`${r.year}|${r.entity}`, r]));
  const bodyRows = years.map((year) => {
    const be = byKey.get(`${year}|RPL BE`);
    const nl = byKey.get(`${year}|RPL NL`);
    const beVal = be ? formatBudget(be.cost) : "-";
    const nlVal = nl ? formatBudget(nl.cost) : "-";
    const beBtn = be ? `<button class="row-action delete-action overhead-delete-btn" data-id="${be.id}">Verwijder BE</button>` : "";
    const nlBtn = nl ? `<button class="row-action delete-action overhead-delete-btn" data-id="${nl.id}">Verwijder NL</button>` : "";
    return `<tr>
      <td>${year}</td>
      <td>${beVal}</td>
      <td>${nlVal}</td>
      <td>${beBtn} ${nlBtn}</td>
    </tr>`;
  }).join("");
  overheadTable.innerHTML = `
    <table>
      <thead><tr><th>Jaar</th><th>RPL BE</th><th>RPL NL</th><th>Acties</th></tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;
}

function render() {
  renderConsultants();
  renderDetails();
  renderVacationsSection();
  renderOverheadTable();
  renderOffers();
  renderProjects();
  renderFteChart();
  renderPlanningTable();
  renderAnalysis();
  renderPipeline();
  renderOhw();
}

function renderAnalysis() {
  if (!analysisTableWrap || !analysisRevenueChart) return;
  const entityFilter = analysisEntityFilter ? analysisEntityFilter.value : "ALL";
  const allowedConsultants = new Set(
    state.consultants
      .filter((c) => entityFilter === "ALL" || (c.entity || "RPL BE") === entityFilter)
      .map((c) => c.name)
  );
  const {
    months,
    weeks,
    monthlyTotals,
    rows,
    weeklyRows,
    consultants,
    detailRows,
    projectTotals,
    internalRows,
    mixTotals,
    mixConsultant,
    mixConsultantMonthly,
    error,
    selectedConsultant
  } = state.analysis;
  const filteredConsultants = consultants.filter((c) => allowedConsultants.has(c));
  const filteredRows = rows.filter((r) => allowedConsultants.has(r.consultant));
  const filteredWeeklyRows = weeklyRows.filter((r) => allowedConsultants.has(r.consultant));
  const filteredDetailRows = detailRows.filter((r) => allowedConsultants.has(r.consultant));
  const filteredProjectTotals = projectTotals.filter((r) => allowedConsultants.has(r.consultant));
  const filteredInternalRows = (internalRows || []).filter((r) => allowedConsultants.has(r.consultant));
  const filteredMixConsultant = mixConsultant.filter((r) => allowedConsultants.has(r.consultant));
  const filteredMixConsultantMonthly = mixConsultantMonthly.filter((r) => allowedConsultants.has(r.consultant));
  const filteredMixTotals = filteredMixConsultant.reduce(
    (acc, row) => {
      acc.billable += Number(row.billable || 0);
      acc.acquisitie += Number(row.acquisitie || 0);
      acc.administratie += Number(row.administratie || 0);
      return acc;
    },
    { billable: 0, acquisitie: 0, administratie: 0 }
  );
  const filteredMonthlyTotalsMap = new Map(months.map((m) => [m, { month: m, hours: 0, revenue: 0, overrun: 0 }]));
  filteredRows.forEach((r) => {
    const cur = filteredMonthlyTotalsMap.get(r.month);
    if (!cur) return;
    cur.hours += Number(r.hours || 0);
    cur.revenue += Number(r.revenue || 0);
    cur.overrun += Number(r.overrun || 0);
  });
  const filteredMonthlyTotals = months.map((m) => filteredMonthlyTotalsMap.get(m));
  const consultantByName = new Map((state.consultants || []).map((c) => [c.name, c]));
  const analysisTargetSeries = months.map((m) => {
    const year = Number((m || "").slice(0, 4));
    const monthMidIso = `${m}-15`;
    let total = 0;
    filteredConsultants.forEach((name) => {
      const c = consultantByName.get(name);
      if (!c) return;
      if (!isConsultantActiveInMonth(c, m)) return;
      const consultantMonthlyCost = Number(getConsultantCostForYear(c, year) || 0);
      const overheadMonthlyCost = Number(getOverheadAnnualCostForEntity(year, c.entity || "RPL BE") || 0) / 12;
      const regimePct = Number(getRegimeForDate(c, monthMidIso) || 100);
      const scale = regimePct / 100;
      total += (consultantMonthlyCost + overheadMonthlyCost) * scale;
    });
    return total;
  });
  if (analysisMeta) {
    const base = "Bron: Employee Timesheet BE.xlsx + Employee Timesheet NL.xlsx (enkel consultants uit tab Consultants)";
    const filterLabel = entityFilter === "ALL" ? "RPL" : entityFilter;
    analysisMeta.textContent = error ? `${base} | Filter: ${filterLabel} - ${error}` : `${base} | Filter: ${filterLabel}`;
    analysisMeta.style.color = error ? "#b42318" : "#5e6a7c";
  }

  if (!months.length || !filteredConsultants.length) {
    analysisTableWrap.innerHTML = "<p>Geen analyse-data beschikbaar.</p>";
    if (analysisWeeklyTableWrap) analysisWeeklyTableWrap.innerHTML = "";
    const ctx = analysisRevenueChart.getContext("2d");
    const width = Math.max(760, analysisRevenueChart.clientWidth || 760);
    const height = 280;
    const dpr = window.devicePixelRatio || 1;
    analysisRevenueChart.width = Math.floor(width * dpr);
    analysisRevenueChart.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen data om grafiek te tonen.", 20, 34);
    if (analysisDetailTableWrap) analysisDetailTableWrap.innerHTML = "";
    if (analysisDetailMeta) analysisDetailMeta.textContent = "Klik op een consultant in de analysetabel.";
    renderAnalysisHoursProjectChart([]);
    renderMixDonutChart(analysisMixChart, { billable: 0, acquisitie: 0, administratie: 0 }, "Inzet alle consultants");
    renderMixDonutChart(analysisConsultantMixChart, { billable: 0, acquisitie: 0, administratie: 0 }, "Inzet consultant");
    renderConsultantMonthlyMixChart([], []);
    return;
  }

  const rowMap = new Map();
  filteredRows.forEach((r) => rowMap.set(`${r.month}|${r.consultant}`, r));
  const headCols = months.map((m) => `<th>${formatMonthLabel(m)}</th>`).join("");
  const bodyRows = filteredConsultants.map((c) => {
    const vals = months.map((m) => {
      const entry = rowMap.get(`${m}|${c}`) || { hours: 0, revenue: 0, overrun: 0 };
      return `<td>${Number(entry.hours || 0).toFixed(1)}u<br><small>Omzet ${formatBudget(entry.revenue || 0)}</small><br><small>Overschr. ${formatBudget(entry.overrun || 0)}</small></td>`;
    }).join("");
    const selectedCls = c === selectedConsultant ? " analysis-row-selected" : "";
    return `<tr class="analysis-consultant-row${selectedCls}" data-consultant="${c}"><th>${c}</th>${vals}</tr>`;
  }).join("");
  const totalVals = months.map((m) => {
    const t = filteredMonthlyTotals.find((x) => x.month === m) || { hours: 0, revenue: 0, overrun: 0 };
    return `<td><strong>${Number(t.hours || 0).toFixed(1)}u</strong><br><strong>Omzet ${formatBudget(t.revenue || 0)}</strong><br><strong>Overschr. ${formatBudget(t.overrun || 0)}</strong></td>`;
  }).join("");
  analysisTableWrap.innerHTML = `
    <div style="overflow:auto;">
      <table class="planning-table">
        <thead><tr><th>Consultant</th>${headCols}</tr></thead>
        <tbody>
          ${bodyRows}
          <tr><th>Totaal</th>${totalVals}</tr>
        </tbody>
      </table>
    </div>
  `;
  renderAnalysisWeeklyOverview(filteredConsultants, weeks, filteredWeeklyRows);

  if (!filteredConsultants.includes(state.analysis.selectedConsultant)) {
    state.analysis.selectedConsultant = filteredConsultants[0] || "";
  }
  renderAnalysisRevenueChart(months, filteredMonthlyTotals, analysisTargetSeries);
  renderMixDonutChart(analysisMixChart, filteredMixTotals, "Inzet alle consultants");
  renderAnalysisConsultantDetail(state.analysis.selectedConsultant, filteredDetailRows, filteredProjectTotals, filteredMixConsultant, filteredMixConsultantMonthly);
  renderAnalysisInternalProjects(filteredInternalRows, months, filteredConsultants);

  analysisTableWrap.querySelectorAll(".analysis-consultant-row").forEach((rowEl) => {
    rowEl.addEventListener("click", () => {
      const consultant = rowEl.dataset.consultant || "";
      state.analysis.selectedConsultant = consultant;
      renderAnalysis();
    });
  });
}

function renderAnalysisWeeklyOverview(filteredConsultants, weeks, weeklyRows) {
  if (!analysisWeeklyTableWrap) return;
  if (!Array.isArray(weeks) || !weeks.length || !Array.isArray(filteredConsultants) || !filteredConsultants.length) {
    analysisWeeklyTableWrap.innerHTML = "<p>Geen weekdata beschikbaar.</p>";
    return;
  }
  const weeklyMap = new Map();
  (weeklyRows || []).forEach((r) => {
    weeklyMap.set(`${r.weekStart}|${r.consultant}`, Number(r.hours || 0));
  });
  const consultantsByName = new Map((state.consultants || []).map((c) => [c.name, c]));
  const headCols = weeks.map((w) => `<th>${weekLabel(w)}</th>`).join("");
  const bodyRows = filteredConsultants.map((consultantName) => {
    const consultant = consultantsByName.get(consultantName);
    const cells = weeks.map((w) => {
      const actual = Number(weeklyMap.get(`${w}|${consultantName}`) || 0);
      const expected = consultant ? expectedWeeklyHoursForConsultant(consultant, w) : 0;
      if (actual === 0 && expected === 0) return "<td></td>";
      if (expected <= 0) return `<td>${actual.toFixed(1)}u</td>`;
      const pct = (actual / expected) * 100;
      const cls = pct >= 100 ? "analysis-week-ok" : "";
      return `<td class="${cls}">${actual.toFixed(1)}u<br><small>${Math.round(pct)}%</small></td>`;
    }).join("");
    return `<tr><th>${consultantName}</th>${cells}</tr>`;
  }).join("");
  analysisWeeklyTableWrap.innerHTML = `
    <div style="overflow:auto;">
      <table class="planning-table">
        <thead><tr><th>Consultant</th>${headCols}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;
}

function renderAnalysisInternalProjects(internalRows, months, consultants) {
  if (!analysisInternalWrap) { console.warn("analysisInternalWrap not found"); return; }
  try {
  if (!internalRows || !internalRows.length) {
    analysisInternalWrap.innerHTML = "<p>Geen interne projecturen beschikbaar.</p>";
    return;
  }

  // Collect unique tasks grouped by category, sorted by task code
  const taskSet = new Map();
  const taskCategory = new Map();
  internalRows.forEach((r) => {
    taskSet.set(r.taskCode, r.taskLabel);
    taskCategory.set(r.taskCode, r.category);
  });
  const allTasks = [...taskSet.entries()].sort((a, b) => (a[0] || 0) - (b[0] || 0));
  const acquisTasks = allTasks.filter(([code]) => taskCategory.get(code) === "acquisitie");
  const adminTasks  = allTasks.filter(([code]) => taskCategory.get(code) === "administratie");

  // --- Table 1: RPL niveau — taken als rijen, maanden als kolommen ---
  const rplMap = new Map();
  const taskTotals = new Map();
  const monthTotals1 = new Map();
  let grandTotal1 = 0;
  internalRows.forEach((r) => {
    const k = `${r.taskCode}|${r.month}`;
    rplMap.set(k, (rplMap.get(k) || 0) + r.hours);
    taskTotals.set(r.taskCode, (taskTotals.get(r.taskCode) || 0) + r.hours);
    monthTotals1.set(r.month, (monthTotals1.get(r.month) || 0) + r.hours);
    grandTotal1 += r.hours;
  });

  function catMonthSubtotal1(taskList, month) {
    return taskList.reduce((s, [code]) => s + (rplMap.get(`${code}|${month}`) || 0), 0);
  }
  function catTotal1(taskList) {
    return taskList.reduce((s, [code]) => s + (taskTotals.get(code) || 0), 0);
  }
  function buildTaskRows1(taskList) {
    return taskList.map(([code, label]) => {
      const catBadge = `<span class="mix-badge mix-${taskCategory.get(code)}">${taskCategory.get(code)}</span>`;
      const cells = months.map((m) => {
        const h = rplMap.get(`${code}|${m}`) || 0;
        return `<td>${h > 0 ? h.toFixed(1) + "u" : ""}</td>`;
      }).join("");
      const tot = taskTotals.get(code) || 0;
      return `<tr><th style="white-space:nowrap;">${label} ${catBadge}</th>${cells}<td><strong>${tot.toFixed(1)}u</strong></td></tr>`;
    }).join("");
  }
  function buildSubtotalRow1(label, taskList) {
    const cells = months.map((m) => {
      const h = catMonthSubtotal1(taskList, m);
      return `<td><strong>${h > 0 ? h.toFixed(1) + "u" : ""}</strong></td>`;
    }).join("");
    const tot = catTotal1(taskList);
    return `<tr style="background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line);">
      <th style="white-space:nowrap;">${label}</th>${cells}<td><strong>${tot.toFixed(1)}u</strong></td>
    </tr>`;
  }

  const headCols1 = months.map((m) => `<th>${formatMonthLabel(m)}</th>`).join("");
  const bodyRows1 = [
    buildTaskRows1(acquisTasks),
    buildSubtotalRow1("Subtotaal acquisitie", acquisTasks),
    buildTaskRows1(adminTasks),
    buildSubtotalRow1("Subtotaal administratie", adminTasks),
  ].join("");
  const totalCols1 = months.map((m) => {
    const h = monthTotals1.get(m) || 0;
    return `<td><strong>${h > 0 ? h.toFixed(1) + "u" : ""}</strong></td>`;
  }).join("");

  // --- Table 2: Per consultant — taken als kolommen, consultants als rijen ---
  const conMap = new Map();
  const conTotals = new Map();
  internalRows.forEach((r) => {
    const k = `${r.consultant}|${r.taskCode}`;
    conMap.set(k, (conMap.get(k) || 0) + r.hours);
    conTotals.set(r.consultant, (conTotals.get(r.consultant) || 0) + r.hours);
  });

  function taskTotal2(code) {
    return consultants.reduce((s, c) => s + (conMap.get(`${c}|${code}`) || 0), 0);
  }
  function catConsultantSubtotal2(consultant, taskList) {
    return taskList.reduce((s, [code]) => s + (conMap.get(`${consultant}|${code}`) || 0), 0);
  }
  function catColumnTotal2(taskList) {
    return consultants.reduce((s, c) => s + catConsultantSubtotal2(c, taskList), 0);
  }
  function buildHeadCols2(taskList) {
    return taskList.map(([, label]) =>
      `<th title="${label}" style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${label}</th>`
    ).join("");
  }

  const headCols2 = [
    buildHeadCols2(acquisTasks),
    `<th style="background:var(--soft);white-space:nowrap;">Subtotaal acquisitie</th>`,
    buildHeadCols2(adminTasks),
    `<th style="background:var(--soft);white-space:nowrap;">Subtotaal administratie</th>`,
  ].join("");

  const bodyRows2 = consultants.map((c) => {
    const acquisCells = acquisTasks.map(([code]) => {
      const h = conMap.get(`${c}|${code}`) || 0;
      return `<td>${h > 0 ? h.toFixed(1) + "u" : ""}</td>`;
    }).join("");
    const acquisSub = catConsultantSubtotal2(c, acquisTasks);
    const adminCells = adminTasks.map(([code]) => {
      const h = conMap.get(`${c}|${code}`) || 0;
      return `<td>${h > 0 ? h.toFixed(1) + "u" : ""}</td>`;
    }).join("");
    const adminSub = catConsultantSubtotal2(c, adminTasks);
    const tot = conTotals.get(c) || 0;
    return `<tr>
      <th style="white-space:nowrap;">${c}</th>
      ${acquisCells}
      <td style="background:var(--soft);"><strong>${acquisSub > 0 ? acquisSub.toFixed(1) + "u" : ""}</strong></td>
      ${adminCells}
      <td style="background:var(--soft);"><strong>${adminSub > 0 ? adminSub.toFixed(1) + "u" : ""}</strong></td>
      <td><strong>${tot > 0 ? tot.toFixed(1) + "u" : ""}</strong></td>
    </tr>`;
  }).join("");

  const totalCols2 = [
    acquisTasks.map(([code]) => {
      const h = taskTotal2(code);
      return `<td><strong>${h > 0 ? h.toFixed(1) + "u" : ""}</strong></td>`;
    }).join(""),
    `<td style="background:var(--soft);"><strong>${catColumnTotal2(acquisTasks).toFixed(1)}u</strong></td>`,
    adminTasks.map(([code]) => {
      const h = taskTotal2(code);
      return `<td><strong>${h > 0 ? h.toFixed(1) + "u" : ""}</strong></td>`;
    }).join(""),
    `<td style="background:var(--soft);"><strong>${catColumnTotal2(adminTasks).toFixed(1)}u</strong></td>`,
  ].join("");

  analysisInternalWrap.innerHTML = `
    <h4 style="margin:16px 0 6px;">4a. RPL niveau — uren per taak per maand</h4>
    <div style="overflow:auto;">
      <table class="planning-table">
        <thead><tr><th>Taak</th>${headCols1}<th>Totaal</th></tr></thead>
        <tbody>
          ${bodyRows1}
          <tr style="border-top:2px solid var(--line);">
            <th>Totaal</th>${totalCols1}<td><strong>${grandTotal1.toFixed(1)}u</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 style="margin:20px 0 6px;">4b. Per consultant — uren per taak (totaal over alle maanden)</h4>
    <div style="overflow:auto;">
      <table class="planning-table">
        <thead><tr><th>Consultant</th>${headCols2}<th>Totaal</th></tr></thead>
        <tbody>
          ${bodyRows2}
          <tr style="border-top:2px solid var(--line);">
            <th>Totaal</th>${totalCols2}<td><strong>${grandTotal1.toFixed(1)}u</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  } catch (err) {
    console.error("renderAnalysisInternalProjects error:", err);
    analysisInternalWrap.innerHTML = `<p style="color:red;">Fout bij laden interne projecten: ${err.message}</p>`;
  }
}

function renderAnalysisConsultantDetail(consultant, detailRows, projectTotals, mixConsultant, mixConsultantMonthly) {
  if (!analysisDetailTableWrap || !analysisHoursProjectChart) return;
  if (!consultant) {
    if (analysisPrintReportBtn) analysisPrintReportBtn.disabled = true;
    analysisDetailTableWrap.innerHTML = "";
    if (analysisDetailMeta) analysisDetailMeta.textContent = "Klik op een consultant in de analysetabel.";
    renderAnalysisHoursProjectChart([]);
    renderMixDonutChart(analysisConsultantMixChart, { billable: 0, acquisitie: 0, administratie: 0 }, "Inzet consultant");
    renderConsultantMonthlyMixChart([], []);
    return;
  }

  const details = (detailRows || []).filter((r) => r.consultant === consultant);
  const totals = (projectTotals || [])
    .filter((r) => r.consultant === consultant)
    .sort((a, b) => Number(b.hours || 0) - Number(a.hours || 0));

  if (analysisPrintReportBtn) analysisPrintReportBtn.disabled = false;

  if (analysisDetailMeta) {
    analysisDetailMeta.textContent = `${consultant} - detail omzet/uren per maand en project`;
  }

  if (!details.length) {
    analysisDetailTableWrap.innerHTML = "<p>Geen detailregels voor deze consultant.</p>";
    renderAnalysisHoursProjectChart([]);
    renderMixDonutChart(analysisConsultantMixChart, { billable: 0, acquisitie: 0, administratie: 0 }, `Inzet ${consultant}`);
    renderConsultantMonthlyMixChart([], []);
    return;
  }

  const rowsHtml = details
    .slice()
    .sort((a, b) => (a.project || "").localeCompare(b.project || "") || (a.month || "").localeCompare(b.month || ""));

  const monthsWithData = Array.from(new Set(details.map((r) => r.month).filter(Boolean))).sort();
  const monthCols = monthsWithData.length ? monthsWithData : (state.analysis.months || []);
  const projectMap = new Map();
  rowsHtml.forEach((r) => {
    const project = r.project || "Onbekend project";
    if (!projectMap.has(project)) {
      projectMap.set(project, {});
    }
    projectMap.get(project)[r.month] = {
      hours: Number(r.hours || 0),
      revenue: Number(r.revenue || 0),
      overrun: Number(r.overrun || 0)
    };
  });

  const monthHeadCols = monthCols.map((m) => `<th colspan="3">${formatMonthLabel(m)}</th>`).join("");
  const subHead = monthCols.map(() => "<th>Uren</th><th>Omzet</th><th>Overschrijding</th>").join("");
  const bodyRows = Array.from(projectMap.entries()).map(([project, byMonth]) => {
    const cells = monthCols.map((m) => {
      const row = byMonth[m] || { hours: 0, revenue: 0, overrun: 0 };
      return `<td>${row.hours.toFixed(1)}</td><td>${formatBudget(row.revenue)}</td><td>${formatBudget(row.overrun)}</td>`;
    }).join("");
    return `<tr><th>${project}</th>${cells}</tr>`;
  }).join("");
  const totalByMonth = monthCols.map((m) => {
    let hours = 0;
    let revenue = 0;
    let overrun = 0;
    projectMap.forEach((byMonth) => {
      const row = byMonth[m] || { hours: 0, revenue: 0, overrun: 0 };
      hours += Number(row.hours || 0);
      revenue += Number(row.revenue || 0);
      overrun += Number(row.overrun || 0);
    });
    return { hours, revenue, overrun };
  });
  const totalCells = totalByMonth
    .map((t) => `<td><strong>${t.hours.toFixed(1)}</strong></td><td><strong>${formatBudget(t.revenue)}</strong></td><td><strong>${formatBudget(t.overrun)}</strong></td>`)
    .join("");
  const totalRow = `<tr><th>Totaal</th>${totalCells}</tr>`;

  analysisDetailTableWrap.innerHTML = `
    <div style="overflow:auto;">
      <table class="planning-table">
        <thead>
          <tr><th rowspan="2">Project</th>${monthHeadCols}</tr>
          <tr>${subHead}</tr>
        </thead>
        <tbody>${bodyRows}${totalRow}</tbody>
      </table>
    </div>
  `;

  renderAnalysisHoursProjectChart(totals);
  const mix = (mixConsultant || []).find((x) => x.consultant === consultant) || { billable: 0, acquisitie: 0, administratie: 0 };
  renderMixDonutChart(analysisConsultantMixChart, mix, `Inzet ${consultant}`);
  const monthlyMix = (mixConsultantMonthly || []).filter((x) => x.consultant === consultant);
  renderConsultantMonthlyMixChart(monthlyMix, state.analysis.months || []);
}

function buildConsultantWeeklyOverviewHtml(consultant, weeklyRows) {
  if (!consultant || !Array.isArray(weeklyRows) || !weeklyRows.length) {
    return "<p class=\"report-empty\">Geen weekdata beschikbaar.</p>";
  }
  const cells = weeklyRows.map((row) => {
    const actual = Number(row.hours || 0);
    const expected = expectedWeeklyHoursForConsultant(consultant, row.weekStart);
    const pct = expected > 0 ? (actual / expected) * 100 : 0;
    const passed = isWeekFullyPassed(row.weekStart);
    let cls = "is-empty";
    if (expected > 0 && actual > 0) {
      cls = pct >= 98 ? "is-good" : "is-low";
    } else if (passed && actual === 0 && expected > 0) {
      cls = "is-low";
    }
    const display = actual > 0 ? actual.toFixed(1) : (passed && expected > 0 ? "0" : "");
    return `<td class="${cls}">${display}</td>`;
  }).join("");
  const heads = weeklyRows.map((row) => {
    const d = parseIsoDate(row.weekStart);
    const label = d ? `${d.getDate()} ${d.toLocaleString("nl-BE", { month: "short" })}` : row.weekStart;
    return `<th style="font-size:7px;padding:2px 3px;">${escapeHtml(label)}</th>`;
  }).join("");
  return `
    <table class="report-table compact week-grid">
      <thead><tr>${heads}</tr></thead>
      <tbody><tr>${cells}</tr></tbody>
    </table>
  `;
}

function buildConsultantMonthlySummaryHtml(monthlyRows) {
  const dataMap = new Map();
  if (Array.isArray(monthlyRows)) {
    monthlyRows.forEach((row) => dataMap.set(row.month, row));
  }
  const year = monthlyRows && monthlyRows.length
    ? Number((monthlyRows[0].month || "").slice(0, 4)) || new Date().getFullYear()
    : new Date().getFullYear();

  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const m = String(i + 1).padStart(2, "0");
    return `${year}-${m}`;
  });

  const totals = { hours: 0, revenue: 0, overrun: 0 };
  const body = allMonths.map((monthKey) => {
    const row = dataMap.get(monthKey);
    const hours = Number(row?.hours || 0);
    const revenue = Number(row?.revenue || 0);
    const overrun = Number(row?.overrun || 0);
    totals.hours += hours;
    totals.revenue += revenue;
    totals.overrun += overrun;
    const d = new Date(year, Number(monthKey.slice(5, 7)) - 1, 1);
    const label = d.toLocaleString("nl-BE", { month: "long" });
    return `
      <tr>
        <th>${escapeHtml(label)}</th>
        <td>${hours > 0 ? hours.toFixed(1) + "u" : ""}</td>
        <td>${revenue !== 0 ? formatBudget(revenue) : ""}</td>
        <td>${overrun !== 0 ? formatBudget(overrun) : ""}</td>
      </tr>
    `;
  }).join("");

  return `
    <table class="report-table" style="table-layout:fixed;width:100%;">
      <colgroup>
        <col style="width:28%;">
        <col style="width:24%;">
        <col style="width:24%;">
        <col style="width:24%;">
      </colgroup>
      <thead>
        <tr><th>Maand</th><th>Uren</th><th>Omzet</th><th>Overschrijding</th></tr>
      </thead>
      <tbody>
        ${body}
        <tr class="total-row">
          <th>Totaal</th>
          <td>${totals.hours.toFixed(1)}u</td>
          <td>${formatBudget(totals.revenue)}</td>
          <td>${formatBudget(totals.overrun)}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function buildConsultantProjectDetailHtml(detailRows) {
  if (!Array.isArray(detailRows) || !detailRows.length) {
    return "<p class=\"report-empty\">Geen projectdetail beschikbaar.</p>";
  }
  const monthCols = Array.from(new Set(detailRows.map((r) => r.month).filter(Boolean))).sort();
  const projectMap = new Map();
  detailRows.forEach((row) => {
    const project = row.project || "Onbekend project";
    if (!projectMap.has(project)) projectMap.set(project, {});
    projectMap.get(project)[row.month] = row;
  });
  const headTop = monthCols.map((m) => `<th colspan="3">${escapeHtml(formatMonthLabel(m))}</th>`).join("");
  const headSub = monthCols.map(() => "<th>Uren</th><th>Omzet</th><th>Overschrijding</th>").join("");
  const body = Array.from(projectMap.entries()).map(([project, byMonth]) => {
    const cells = monthCols.map((month) => {
      const row = byMonth[month];
      return `
        <td>${Number(row?.hours || 0).toFixed(1)}</td>
        <td>${formatBudget(row?.revenue || 0)}</td>
        <td>${formatBudget(row?.overrun || 0)}</td>
      `;
    }).join("");
    return `<tr><th>${escapeHtml(project)}</th>${cells}</tr>`;
  }).join("");
  const totalCells = monthCols.map((month) => {
    const totals = detailRows
      .filter((row) => row.month === month)
      .reduce((acc, row) => {
        acc.hours += Number(row.hours || 0);
        acc.revenue += Number(row.revenue || 0);
        acc.overrun += Number(row.overrun || 0);
        return acc;
      }, { hours: 0, revenue: 0, overrun: 0 });
    return `
      <td>${totals.hours.toFixed(1)}</td>
      <td>${formatBudget(totals.revenue)}</td>
      <td>${formatBudget(totals.overrun)}</td>
    `;
  }).join("");
  return `
    <table class="report-table report-table-wide">
      <thead>
        <tr><th rowspan="2">Project</th>${headTop}</tr>
        <tr>${headSub}</tr>
      </thead>
      <tbody>
        ${body}
        <tr class="total-row"><th>Totaal</th>${totalCells}</tr>
      </tbody>
    </table>
  `;
}

function buildConsultantDetailPlanningHtml(weeks, assignmentRows, consultant) {
  if (!Array.isArray(weeks) || !weeks.length || !Array.isArray(assignmentRows) || !assignmentRows.length) {
    return "<p class=\"report-empty\">Geen planning beschikbaar.</p>";
  }
  const today = startOfDay(new Date());
  const twelveWeeksAhead = new Date(today.getTime() + 84 * 86400000);
  const futureWeeks = weeks
    .filter((w) => { const d = parseIsoDate(w); return d && d >= today && d <= twelveWeeksAhead; })
    .slice(0, 12);
  if (!futureWeeks.length) return "<p class=\"report-empty\">Geen planning voor de komende 12 weken.</p>";

  const thStyle = "background:#252525;color:#fff;padding:5px 6px;font-size:7.5px;font-weight:700;text-align:center;white-space:nowrap;-webkit-print-color-adjust:exact;print-color-adjust:exact;";
  const thFirst = "background:#252525;color:#fff;padding:5px 8px;font-size:7.5px;font-weight:700;text-align:left;-webkit-print-color-adjust:exact;print-color-adjust:exact;";

  const head = futureWeeks.map((week) => {
    const d = parseIsoDate(week);
    const label = d ? `${d.getDate()} ${d.toLocaleString("nl-BE", { month: "short" })}` : week;
    return `<th style="${thStyle}">${escapeHtml(label)}</th>`;
  }).join("");

  const body = assignmentRows.map((row, i) => {
    const name = row.kind === "project" && row.code ? `${row.code} - ${row.name}` : row.name;
    const rowBg = i % 2 === 0 ? "#ffffff" : "#f9f9f9";
    const cells = futureWeeks.map((week) => {
      const value = Number(row.totals?.[week] || 0);
      return `<td style="text-align:center;padding:4px 5px;border-bottom:1px solid #ebebeb;font-size:7.5px;">${value > 0 ? value.toFixed(1) : ""}</td>`;
    }).join("");
    return `<tr style="background:${rowBg};-webkit-print-color-adjust:exact;print-color-adjust:exact;">
      <td style="text-align:left;padding:4px 8px;border-bottom:1px solid #ebebeb;font-size:7.5px;">${escapeHtml(name)}</td>${cells}
    </tr>`;
  }).join("");

  const totalCells = futureWeeks.map((week) => {
    const total = assignmentRows.reduce((sum, row) => sum + Number(row.totals?.[week] || 0), 0);
    // Planning is in days; full-time capacity = 5 days/week
    const weekDate = parseIsoDate(week);
    const weekIso = weekDate ? toIsoFromDate(weekDate) : week;
    const regime = consultant ? Number(getRegimeForDate(consultant, weekIso) || 100) : 100;
    const capacity = 5 * (regime / 100);
    const pct = capacity > 0 ? (total / capacity) * 100 : 0;

    let bg, textColor, borderColor;
    if (total === 0) {
      bg = "#f5f5f5"; textColor = "#aaa"; borderColor = "#f4524d";
    } else if (pct < 75) {
      bg = "#dbeafe"; textColor = "#1e40af"; borderColor = "#3b82f6";
    } else if (pct <= 95) {
      bg = "#d8f0df"; textColor = "#1a6b38"; borderColor = "#22a84a";
    } else {
      bg = "#fde0df"; textColor = "#9b1c1c"; borderColor = "#f4524d";
    }

    const content = total > 0
      ? `<strong style="display:block;font-size:8px;">${total.toFixed(1)}</strong><span style="font-size:6.5px;">${pct.toFixed(0)}%</span>`
      : `<span style="font-size:7px;color:#aaa;">—</span>`;
    return `<td style="background:${bg};color:${textColor};border-top:2px solid ${borderColor};text-align:center;padding:4px 3px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${content}</td>`;
  }).join("");

  return `
    <table style="width:100%;border-collapse:collapse;font-size:8px;font-family:inherit;">
      <thead>
        <tr>
          <th style="${thFirst}">Project / activiteit</th>
          ${head}
        </tr>
      </thead>
      <tbody>
        ${body}
        <tr>
          <td style="padding:5px 8px;font-weight:700;font-size:7.5px;background:#f2f2f2;border-top:2px solid #f4524d;-webkit-print-color-adjust:exact;print-color-adjust:exact;">Totaal</td>
          ${totalCells}
        </tr>
      </tbody>
    </table>
  `;
}

function renderConsultantTimelineForReport(consultant) {
  const today = startOfDay(new Date());
  const dayMs = 86400000;
  const rangeStart = new Date(today.getTime() - 14 * dayMs);
  const rangeEnd = new Date(today.getTime() + 84 * dayMs);

  const items = state.projects
    .filter((p) => getProjectStatus(p) === "actief")
    .filter((p) => (p.staff || []).some((s) => Number(s.consultantId) === Number(consultant.id)) ||
                   (p.allocations || []).some((a) => Number(a.consultantId) === Number(consultant.id)))
    .map((p) => ({ ...p, kind: "project", created: parseIsoDate(p.startDate || p.createdDate), delivery: parseIsoDate(p.deliveryDate) }))
    .filter((p) => p.delivery && p.delivery >= rangeStart)
    .sort((a, b) => a.delivery - b.delivery);

  const vacations = (consultant.vacationHistory || [])
    .map((v) => ({ kind: "vacation", name: "Vakantie", created: parseIsoDate(v.startDate), delivery: parseIsoDate(v.endDate) }))
    .filter((v) => v.created && v.delivery && v.delivery >= today)
    .sort((a, b) => a.delivery - b.delivery);

  const pad = { left: 24, right: 24, top: 18, bottom: 44 };
  const rowHeight = 24;
  const rowGap = 10;
  const chartWidth = 1200;
  const chartW = chartWidth - pad.left - pad.right;
  const totalRows = items.length + (vacations.length ? 1 : 0);
  const rowsHeight = totalRows ? (totalRows * rowHeight) + ((totalRows - 1) * rowGap) : 40;
  const height = Math.max(120, pad.top + pad.bottom + rowsHeight);
  const dpr = 2;
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(chartWidth * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, chartWidth, height);

  const totalMs = rangeEnd.getTime() - rangeStart.getTime();
  const xFor = (date) => {
    const clamped = Math.max(rangeStart.getTime(), Math.min(rangeEnd.getTime(), date.getTime()));
    return pad.left + ((clamped - rangeStart.getTime()) / totalMs) * chartW;
  };
  const axisY = height - pad.bottom + 0.5;
  const todayX = xFor(today);

  ctx.strokeStyle = "#d7dce5"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad.left, axisY); ctx.lineTo(chartWidth - pad.right, axisY); ctx.stroke();

  let tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
  if (tick < rangeStart) tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth() + 1, 1);
  ctx.font = "11px Segoe UI";
  while (tick <= rangeEnd) {
    const x = xFor(tick);
    ctx.strokeStyle = "#e8ecf3"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, axisY); ctx.stroke();
    const label = `${String(tick.getMonth() + 1).padStart(2, "0")}/${tick.getFullYear()}`;
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(label, x - ctx.measureText(label).width / 2, height - 14);
    tick = new Date(tick.getFullYear(), tick.getMonth() + 1, 1);
  }
  ctx.strokeStyle = "#d33b3b"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(todayX, pad.top); ctx.lineTo(todayX, axisY); ctx.stroke();
  ctx.setLineDash([]);

  items.forEach((project, idx) => {
    const y = pad.top + idx * (rowHeight + rowGap);
    const xStart = xFor(project.created || today);
    const xEnd = xFor(project.delivery);
    const xDoneEnd = xFor(today > project.delivery ? project.delivery : today);
    const doneWidth = Math.max(0, xDoneEnd - xStart);
    const futureStart = Math.max(xStart, xDoneEnd);
    const futureWidth = Math.max(2, xEnd - futureStart);
    const trackY = y + 3; const trackH = rowHeight - 6;
    if (doneWidth > 0) { ctx.fillStyle = "#90a4b8"; ctx.fillRect(xStart, trackY, doneWidth, trackH); }
    ctx.fillStyle = "#f4524d"; ctx.fillRect(futureStart, trackY, futureWidth, trackH);
    ctx.font = "11px Segoe UI";
    const label = `${project.projectNumber ? `${project.projectNumber} - ` : ""}${project.name}`;
    const labelWidth = ctx.measureText(label).width;
    if (futureWidth - 14 >= labelWidth) {
      ctx.fillStyle = "#ffffff"; ctx.fillText(label, futureStart + 7, y + 15);
    } else {
      ctx.fillStyle = "#1c2431"; ctx.fillText(label, Math.min(chartWidth - pad.right - labelWidth, xEnd + 6), y + 15);
    }
  });

  if (vacations.length) {
    const y = pad.top + items.length * (rowHeight + rowGap);
    const trackY = y + 3; const trackH = rowHeight - 6;
    vacations.forEach((v) => {
      ctx.fillStyle = "#8b949f";
      ctx.fillRect(xFor(v.created || today), trackY, Math.max(2, xFor(v.delivery) - xFor(v.created || today)), trackH);
    });
    ctx.font = "11px Segoe UI"; ctx.fillStyle = "#1c2431"; ctx.fillText("Vakantie", pad.left, y + 15);
  }
  return canvas.toDataURL("image/png");
}

function buildConsultantPlanningTablesHtml(weeks, assignmentRows) {
  if (!Array.isArray(weeks) || !weeks.length || !Array.isArray(assignmentRows) || !assignmentRows.length) {
    return "<p class=\"report-empty\">Geen planning beschikbaar.</p>";
  }
  const weekGroups = chunkArray(weeks, 10);
  return weekGroups.map((weekGroup, groupIdx) => {
    const head = weekGroup.map((week) => `<th>${escapeHtml(weekLabel(week))}</th>`).join("");
    const body = assignmentRows.map((row) => {
      const typeLabel = row.kind === "project"
        ? "Project"
        : row.kind === "offer"
          ? "Offerte"
          : "Vakantie";
      const name = row.kind === "project" && row.code
        ? `${row.code} - ${row.name}`
        : row.name;
      const cells = weekGroup.map((week) => {
        const value = Number(row.totals?.[week] || 0);
        return `<td>${value > 0 ? value.toFixed(1) : ""}</td>`;
      }).join("");
      return `<tr><th>${escapeHtml(typeLabel)}</th><td>${escapeHtml(name)}</td>${cells}</tr>`;
    }).join("");
    return `
      <div class="report-table-block${groupIdx > 0 ? " page-break" : ""}">
        <table class="report-table report-table-wide planning-table-report">
          <thead><tr><th>Type</th><th>Project / activiteit</th>${head}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    `;
  }).join("");
}

function buildConsultantReportHtml(report) {
  const ROUND_LOGO = "data:image/png;base64,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";
  const STD_LOGO = "data:image/png;base64,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";
  const generatedAt = new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
  const currentRole = getRoleForDate(report.consultant, toIsoFromDate(new Date())) || "-";
  const currentRegime = Number(getRegimeForDate(report.consultant, toIsoFromDate(new Date())) || 100);
  const billablePct = report.totalHours > 0 ? Math.round((report.mix.billable / report.totalHours) * 100) : 0;
  return `
<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <title>Consultantrapport - ${escapeHtml(report.consultant.name)}</title>
  <style>
    :root {
      --rebel: #f4524d;
      --dark: #252525;
      --muted: #555;
      --line: #e8e8e8;
      --soft: #f7f7f7;
      --green: #d8f0df;
      --amber: #fff0c8;
      --red-bg: #fde0df;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-size: 9px;
      font-family: "Segoe UI", Arial, sans-serif;
      color: var(--dark);
      background: #fff;
    }

    /* ══ COVER ══════════════════════════════════════════════════════ */
    .cover {
      width: 100%;
      height: 100vh;
      background: var(--rebel);
      color: #fff;
      padding: 14mm 14mm 12mm;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      clip-path: polygon(0 0, calc(100% - 52px) 0, 100% 52px, 100% 100%, 0 100%);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cover-logo {
      margin-bottom: auto;
    }
    .cover-logo img {
      height: 52px;
      width: auto;
      display: block;
    }
    .page-logo {
      position: fixed;
      bottom: 8mm;
      right: 10mm;
      height: 22px;
      width: auto;
      opacity: 0.85;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cover-logo-mask {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 160px;
      height: 40px;
      background: var(--rebel);
      z-index: 9999;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cover-url {
      font-size: 7.5px;
      color: rgba(255,255,255,.7);
      letter-spacing: .04em;
      line-height: 1.7;
      display: none;
    }
    .cover-body { position: relative; }
    .cover-label {
      font-size: 9px;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(255,255,255,.75);
      margin-bottom: 6px;
    }
    .cover-title {
      font-size: 62px;
      font-weight: 900;
      line-height: .92;
      text-transform: uppercase;
      color: #fff;
      margin-bottom: 14px;
    }
    .cover-name-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-top: 1px solid rgba(255,255,255,.25);
      border-bottom: 1px solid rgba(255,255,255,.25);
      margin-bottom: 16px;
    }
    .cover-name {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
    .cover-meta-pills {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .cover-pill {
      font-size: 7.5px;
      color: rgba(255,255,255,.7);
    }
    .cover-pill strong { color: #fff; margin-right: 3px; }
    .cover-kpis {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      padding-top: 14px;
      border-top: 1px solid rgba(255,255,255,.2);
    }
    .cover-kpi { padding-right: 16px; }
    .cover-kpi-label {
      font-size: 6.5px;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: rgba(255,255,255,.55);
      margin-bottom: 3px;
    }
    .cover-kpi-value {
      font-size: 22px;
      font-weight: 900;
      color: #fff;
      line-height: 1;
    }
    .cover-kpi-value small { font-size: 13px; font-weight: 400; }
    .cover-kpi-sub { font-size: 7px; color: rgba(255,255,255,.45); margin-top: 2px; }

    /* ══ PAGE HEADER (elke sectie) ══════════════════════════════════ */
    .page-hdr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 2px solid var(--rebel);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-hdr-brand {
      font-size: 7px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .12em;
      color: var(--rebel);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-hdr-name { font-size: 7px; color: #888; }

    /* ══ SECTION HEADERS ══════════════════════════════════════════════ */
    .report-shell { padding: 0; }
    .section { break-inside: avoid; margin-bottom: 12px; }
    .section-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 10px;
    }
    .section-num {
      font-size: 46px;
      font-weight: 900;
      color: var(--rebel);
      line-height: 1;
      letter-spacing: -.03em;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .section-title-group { border-left: 3px solid var(--rebel); padding-left: 8px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .05em;
      color: var(--dark);
      line-height: 1.2;
    }
    .section-sub {
      font-size: 7.5px;
      color: #888;
      margin-top: 2px;
    }
    .section-content { }

    /* ══ GRID & CARDS ════════════════════════════════════════════════ */
    .report-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      align-items: start;
    }
    .report-card {
      background: #fff;
      border-left: 3px solid var(--rebel);
      padding: 8px 8px 8px 10px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .report-card h3 {
      font-size: 7.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: var(--rebel);
      margin-bottom: 6px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .report-card img { width: 100%; display: block; }

    /* ══ TABLES ══════════════════════════════════════════════════════ */
    .report-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8px;
    }
    .report-table th, .report-table td {
      border: 1px solid #ececec;
      padding: 3px 5px;
      text-align: center;
      vertical-align: top;
    }
    .report-table thead th {
      background: var(--soft);
      color: var(--dark);
      font-weight: 700;
      border-bottom: 2px solid var(--rebel);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .report-table tbody th {
      text-align: left;
      background: #fafafa;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .report-table .total-row th, .report-table .total-row td {
      font-weight: 700;
      background: #f0f0f0;
      border-top: 2px solid var(--rebel);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .report-table-wide { font-size: 7px; }
    .report-table.compact th, .report-table.compact td { padding: 2px 4px; }

    /* ══ WEEK GRID ═══════════════════════════════════════════════════ */
    .week-grid td { font-size: 8px; font-weight: 700; color: var(--dark); padding: 3px 2px; text-align: center; }
    .week-grid td.is-good { background: var(--green); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .week-grid td.is-low  { background: var(--red-bg); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .week-grid td.is-empty { background: #f5f5f5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

    /* ══ PLANNING TABLE ══════════════════════════════════════════════ */
    .planning-table-report td:first-child, .planning-table-report td:nth-child(2),
    .planning-table-report th:first-child, .planning-table-report th:nth-child(2) { text-align: left; }

    /* ══ MISC ════════════════════════════════════════════════════════ */
    .report-empty { padding: 20px; border: 1px dashed #ddd; color: #888; }
    .page-break { page-break-before: always; break-before: page; display: block; height: 0; }

    @page { size: A4 landscape; margin: 8mm 10mm; }
    @media print {
      body { background: #fff; }
      .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; height: 100vh; page-break-after: always; }
    }
  </style>
</head>
<body>

  <!-- ══ COVER ════════════════════════════════════════════════════════ -->
  <div class="cover">
    <div class="cover-logo">
      <img src="${ROUND_LOGO}" alt="Rebel Group" />
    </div>
    <div class="cover-url">WWW.REBELGROUP.COM</div>
    <div class="cover-body">
      <div class="cover-title" style="font-size:72px;margin-bottom:14px;">${escapeHtml(report.consultant.name).toUpperCase()}</div>
      <div class="cover-name-bar">
        <div class="cover-name">Consultant Rapport</div>
        <div class="cover-meta-pills">
          <span class="cover-pill"><strong>Entiteit</strong>${escapeHtml(report.consultant.entity || "RPL BE")}</span>
          <span class="cover-pill"><strong>Functie</strong>${escapeHtml(currentRole)}</span>
          <span class="cover-pill"><strong>Regime</strong>${currentRegime}%</span>
          <span class="cover-pill"><strong>Gegenereerd</strong>${escapeHtml(generatedAt)}</span>
        </div>
      </div>
      <div class="cover-kpis">
        <div class="cover-kpi">
          <div class="cover-kpi-label">Bezetting</div>
          <div class="cover-kpi-value">${report.avgBezetting !== null ? report.avgBezetting : "—"}<small>%</small></div>
          <div class="cover-kpi-sub">komende ${report.bezettingWeeks} weken</div>
        </div>
        <div class="cover-kpi">
          <div class="cover-kpi-label">Gepresteerde omzet</div>
          <div class="cover-kpi-value">${formatBudget(report.totalRevenue)}</div>
          <div class="cover-kpi-sub">huidig jaar</div>
        </div>
        <div class="cover-kpi">
          <div class="cover-kpi-label">Overschrijding</div>
          <div class="cover-kpi-value">${formatBudget(report.totalOverrun)}</div>
          <div class="cover-kpi-sub">niet-gewaardeerd</div>
        </div>
        <div class="cover-kpi">
          <div class="cover-kpi-label">Billable mix</div>
          <div class="cover-kpi-value">${billablePct}<small>%</small></div>
          <div class="cover-kpi-sub">${report.mix.billable.toFixed(1)}u billable</div>
        </div>
      </div>
    </div>
    <div class="cover-logo-mask"></div>
  </div>

  <!-- ══ CONTENT ══════════════════════════════════════════════════════ -->
  <div class="report-shell">

    <div class="page-break"></div>
    <section class="section">
      <div class="page-hdr">
        <span class="page-hdr-brand">Rebel Group &mdash; Consultantrapport</span>
        <span class="page-hdr-name">${escapeHtml(report.consultant.name)}</span>
      </div>
      <div class="section-header">
        <div class="section-num">01</div>
        <div class="section-title-group">
          <div class="section-title">Weekoverzicht geschreven uren</div>
          <div class="section-sub">Werkelijke uren per week vs. verwachte uren op basis van actief regime</div>
        </div>
      </div>
      <div class="section-content">
        ${buildConsultantWeeklyOverviewHtml(report.consultant, report.weeklyRows)}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div class="section-num">02</div>
        <div class="section-title-group">
          <div class="section-title">Overzicht uren</div>
          <div class="section-sub">Verdeling billable, acquisitie en administratie</div>
        </div>
      </div>
      <div class="section-content">
        <div class="report-grid-2">
          <div class="report-card">
            <h3>Urenmix consultant</h3>
            <img src="${report.images.mix}" alt="Urenmix" style="max-height:280px;width:auto;display:block;margin:0 auto;" />
          </div>
          <div class="report-card">
            <h3>Mix per maand</h3>
            <img src="${report.images.monthlyMix}" alt="Mix per maand" style="max-height:280px;width:100%;object-fit:contain;" />
          </div>
        </div>
      </div>
    </section>

    <div class="page-break"></div>
    <section class="section">
      <div class="page-hdr">
        <span class="page-hdr-brand">Rebel Group &mdash; Consultantrapport</span>
        <span class="page-hdr-name">${escapeHtml(report.consultant.name)}</span>
      </div>
      <div class="section-header">
        <div class="section-num">03</div>
        <div class="section-title-group">
          <div class="section-title">Overzicht omzet</div>
          <div class="section-sub">Maandelijkse samenvatting en topprojecten op uren</div>
        </div>
      </div>
      <div class="section-content">
        <div class="report-grid-2">
          <div class="report-card">
            <h3>Maandoverzicht</h3>
            ${buildConsultantMonthlySummaryHtml(report.monthlyRows)}
          </div>
          <div class="report-card">
            <h3>Topprojecten op uren</h3>
            <img src="${report.images.hoursByProject}" alt="Topprojecten op uren" />
          </div>
        </div>
      </div>
    </section>

    <div class="page-break"></div>
    <section class="section">
      <div class="page-hdr">
        <span class="page-hdr-brand">Rebel Group &mdash; Consultantrapport</span>
        <span class="page-hdr-name">${escapeHtml(report.consultant.name)}</span>
      </div>
      <div class="section-header">
        <div class="section-num">04</div>
        <div class="section-title-group">
          <div class="section-title">Detail uren, omzet en overschrijding per project</div>
          <div class="section-sub">Uren, omzet en overschrijding per project per maand</div>
        </div>
      </div>
      <div class="section-content">
        ${buildConsultantProjectDetailHtml(report.detailRows)}
      </div>
    </section>

    <div class="page-break"></div>
    <section class="section">
      <div class="page-hdr">
        <span class="page-hdr-brand">Rebel Group &mdash; Consultantrapport</span>
        <span class="page-hdr-name">${escapeHtml(report.consultant.name)}</span>
      </div>
      <div class="section-header">
        <div class="section-num">05</div>
        <div class="section-title-group">
          <div class="section-title">Capaciteit</div>
          <div class="section-sub">Capaciteit vs bezetting / projecttijdslijn (grijs = max 2 weken verleden, rood = 12 weken vooruit)</div>
        </div>
      </div>
      <div class="section-content">
        <div class="report-card" style="margin-bottom:10px;">
          <h3>Capaciteit vs bezetting</h3>
          <img src="${report.images.capacity}" alt="Capaciteit versus bezetting" style="width:100%;max-height:240px;object-fit:contain;" />
        </div>
        <div class="report-card">
          <h3>Projecttijdslijn</h3>
          <img src="${report.images.timeline}" alt="Projecttijdslijn" style="width:100%;max-height:240px;object-fit:contain;" />
        </div>
      </div>
    </section>

    <div class="page-break"></div>
    <section class="section">
      <div class="page-hdr">
        <span class="page-hdr-brand">Rebel Group &mdash; Consultantrapport</span>
        <span class="page-hdr-name">${escapeHtml(report.consultant.name)}</span>
      </div>
      <div class="section-header">
        <div class="section-num">06</div>
        <div class="section-title-group">
          <div class="section-title">Detailplanning</div>
          <div class="section-sub">Geplande uren per project &mdash; komende 12 weken</div>
        </div>
      </div>
      <div class="section-content">
        ${buildConsultantDetailPlanningHtml(report.planningWeeks, report.assignmentRows, report.consultant)}
      </div>
    </section>

    <div class="page-break"></div>
    <section class="section">
      <div class="page-hdr">
        <span class="page-hdr-brand">Rebel Group &mdash; Consultantrapport</span>
        <span class="page-hdr-name">${escapeHtml(report.consultant.name)}</span>
      </div>
      <div class="section-header">
        <div class="section-num">07</div>
        <div class="section-title-group">
          <div class="section-title">Actieve projecten als projectleider</div>
          <div class="section-sub">Budget, gepresteerde omzet en realisatiegraad per project</div>
        </div>
      </div>
      <div class="section-content">
        ${buildConsultantLeadProjectsHtml(report.consultant, report.leadProjects, report.ohwProjects)}
      </div>
    </section>

  </div>
  <img class="page-logo" src="${STD_LOGO}" alt="Rebel Group" />
</body>
</html>
  `;
}

async function downloadReportAsPdf(html, filename) {
  setStatus("PDF wordt gegenereerd…");
  try {
    const resp = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "text/html; charset=utf-8", "X-Filename": filename },
      body: html,
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ error: resp.statusText }));
      setStatus(`PDF mislukt: ${err.error}`, true);
      return;
    }
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    setStatus("PDF gedownload.");
  } catch (err) {
    setStatus(`PDF mislukt: ${err.message}`, true);
  }
}

function buildConsultantLeadProjectsHtml(consultant, projects, ohwProjects) {
  const leadProjects = (projects || []).filter(
    (p) => String(p.leadConsultantId) === String(consultant.id) && getProjectStatus(p) === "actief"
  );
  if (!leadProjects.length) {
    return "<p style='color:#888;font-size:8px;padding:12px 0;'>Geen actieve projecten als projectleider.</p>";
  }
  const ohwMap = {};
  (ohwProjects || []).forEach((o) => {
    if (o.projectNumber) ohwMap[String(o.projectNumber)] = o;
  });

  let totalBudget = 0, totalCurrentYearBudget = 0, totalGepresteerd = 0, totalNog = 0, totalVerwacht = 0;

  const rows = leadProjects.map((p, i) => {
    const ohw = ohwMap[String(p.projectNumber)] || null;
    const gepresteerd = ohw ? Number(ohw.performedRevenue || 0) : 0;
    const verwachtTotaal = Number(p.expectedRevenueCurrentYear || 0);
    const nogTePresteren = Math.max(0, verwachtTotaal - gepresteerd);
    const budget = Number(p.budget || 0);
    const currentYearBudget = Number(p.currentYearBudget || 0);
    // Realisatiegraad = (gepresteerd + nog te presteren) / budget huidig jaar
    const realisatiegraad = currentYearBudget > 0 ? (gepresteerd + nogTePresteren) / currentYearBudget : 0;

    totalBudget += budget;
    totalCurrentYearBudget += currentYearBudget;
    totalGepresteerd += gepresteerd;
    totalNog += nogTePresteren;
    totalVerwacht += verwachtTotaal;

    // Voortgang: gepresteerd vs budget huidig jaar (capped visually at 100%)
    const pct = currentYearBudget > 0 ? Math.min(100, (gepresteerd / currentYearBudget) * 100) : 0;

    // Color: green ≤1.0, amber 1.0–1.2, red >1.2
    const isOver = realisatiegraad > 1;
    const rateTextColor = !isOver ? "#1a6b38" : realisatiegraad <= 1.2 ? "#7a5200" : "#9b1c1c";
    const rateBg       = !isOver ? "#d8f0df" : realisatiegraad <= 1.2 ? "#fff0c8" : "#fde0df";

    const rowBg = i % 2 === 0 ? "#ffffff" : "#f9f9f9";
    const typeBadge = `<span style="display:inline-block;padding:1px 5px;border-radius:2px;font-size:7px;font-weight:700;background:#252525;color:#fff;text-transform:uppercase;letter-spacing:.06em;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${getBillingTypeLabel(p.billingType)}</span>`;
    const pctLabel = currentYearBudget > 0 ? `${pct.toFixed(0)}%` : "";
    const progressBar = `<div style="display:flex;align-items:center;gap:5px;">
      <div style="flex:1;height:6px;background:#ebebeb;border-radius:3px;overflow:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
        <div style="height:100%;width:${pct.toFixed(1)}%;background:#f4524d;border-radius:3px;-webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>
      </div>
      <span style="font-size:7px;color:#444;white-space:nowrap;min-width:24px;">${pctLabel}</span>
    </div>`;

    return `<tr style="background:${rowBg};-webkit-print-color-adjust:exact;print-color-adjust:exact;">
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;font-weight:700;font-size:8px;min-width:120px;">
        ${escapeHtml(p.projectNumber || "")}
        <span style="display:block;font-weight:400;color:#666;font-size:7.5px;margin-top:1px;">${escapeHtml(p.name || "")}</span>
      </td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:center;vertical-align:middle;">${typeBadge}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;vertical-align:middle;min-width:80px;">${progressBar}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:right;font-variant-numeric:tabular-nums;">${formatBudget(budget)}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:right;font-variant-numeric:tabular-nums;">${formatBudget(currentYearBudget)}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:right;font-variant-numeric:tabular-nums;">${formatBudget(gepresteerd)}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:right;font-variant-numeric:tabular-nums;">${formatBudget(nogTePresteren)}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:right;font-variant-numeric:tabular-nums;">${formatBudget(verwachtTotaal)}</td>
      <td style="padding:5px 8px;border-bottom:1px solid #ebebeb;text-align:center;vertical-align:middle;">
        <span style="display:inline-block;padding:2px 7px;border-radius:3px;font-weight:700;font-size:8px;background:${rateBg};color:${rateTextColor};-webkit-print-color-adjust:exact;print-color-adjust:exact;">${formatPercent(realisatiegraad)}</span>
      </td>
    </tr>`;
  }).join("");

  const totalRealisatiegraad = totalCurrentYearBudget > 0
    ? (totalGepresteerd + totalNog) / totalCurrentYearBudget : 0;

  return `
    <table style="width:100%;border-collapse:collapse;font-size:8px;font-family:inherit;">
      <colgroup>
        <col style="width:22%;">
        <col style="width:8%;">
        <col style="width:9%;">
        <col style="width:9%;">
        <col style="width:9%;">
        <col style="width:9%;">
        <col style="width:9%;">
        <col style="width:11%;">
        <col style="width:7%;">
      </colgroup>
      <thead>
        <tr style="background:#252525;color:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          <th style="text-align:left;padding:5px 8px;font-size:8px;font-weight:700;">Project</th>
          <th style="text-align:center;padding:5px 8px;font-size:8px;font-weight:700;">Type</th>
          <th style="text-align:left;padding:5px 8px;font-size:8px;font-weight:700;">Voortgang</th>
          <th style="text-align:right;padding:5px 8px;font-size:8px;font-weight:700;">Budget totaal</th>
          <th style="text-align:right;padding:5px 8px;font-size:8px;font-weight:700;">Budget huidig jaar</th>
          <th style="text-align:right;padding:5px 8px;font-size:8px;font-weight:700;">Gepresteerde omzet</th>
          <th style="text-align:right;padding:5px 8px;font-size:8px;font-weight:700;">Nog te presteren</th>
          <th style="text-align:right;padding:5px 8px;font-size:8px;font-weight:700;">Verwachte totale omzet</th>
          <th style="text-align:center;padding:5px 8px;font-size:8px;font-weight:700;">Realisatiegraad</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr style="background:#f2f2f2;font-weight:700;border-top:2px solid #f4524d;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          <td style="padding:5px 8px;font-size:8px;" colspan="3">Totaal (${leadProjects.length} project${leadProjects.length !== 1 ? "en" : ""})</td>
          <td style="padding:5px 8px;text-align:right;font-size:8px;">${formatBudget(totalBudget)}</td>
          <td style="padding:5px 8px;text-align:right;font-size:8px;">${formatBudget(totalCurrentYearBudget)}</td>
          <td style="padding:5px 8px;text-align:right;font-size:8px;">${formatBudget(totalGepresteerd)}</td>
          <td style="padding:5px 8px;text-align:right;font-size:8px;">${formatBudget(totalNog)}</td>
          <td style="padding:5px 8px;text-align:right;font-size:8px;">${formatBudget(totalVerwacht)}</td>
          <td style="padding:5px 8px;text-align:center;font-size:8px;">${formatPercent(totalRealisatiegraad)}</td>
        </tr>
      </tfoot>
    </table>`;
}

let _pdfGenerating = false;
async function openConsultantPrintReport() {
  if (_pdfGenerating) { setStatus("PDF wordt al gegenereerd, even wachten…", true); return; }
  _pdfGenerating = true;
  if (analysisPrintReportBtn) analysisPrintReportBtn.disabled = true;
  try {
    const consultantName = state.analysis.selectedConsultant || "";
    if (!consultantName) {
      setStatus("Selecteer eerst een consultant in Analyse.", true);
      return;
    }
    const consultant = (state.consultants || []).find((item) => item.name === consultantName);
    if (!consultant) {
      setStatus("Consultant niet gevonden voor rapport.", true);
      return;
    }

    const prevPlanningId = state.selectedPlanningConsultantId;
    const prevPlanningExpanded = { ...state.planningExpandedConsultants };

    state.selectedPlanningConsultantId = Number(consultant.id);
    state.planningExpandedConsultants[consultant.id] = true;
    renderPlanningTable();

    const planningData = aggregateMandaysByWeek("ALL");
    const assignmentRows = (buildConsultantAssignmentDetails(planningData.weeks)[consultant.id] || [])
      .slice()
      .sort((a, b) => {
        const order = { project: 0, offer: 1, vacation: 2 };
        const ao = order[a.kind] ?? 99;
        const bo = order[b.kind] ?? 99;
        if (ao !== bo) return ao - bo;
        return `${a.code || ""}${a.name || ""}`.localeCompare(`${b.code || ""}${b.name || ""}`);
      });

    const weeklyRows = (state.analysis.weeklyRows || [])
      .filter((row) => row.consultant === consultantName)
      .sort((a, b) => (a.weekStart || "").localeCompare(b.weekStart || ""));
    const monthlyRows = (state.analysis.rows || [])
      .filter((row) => row.consultant === consultantName)
      .sort((a, b) => (a.month || "").localeCompare(b.month || ""));
    const detailRows = (state.analysis.detailRows || [])
      .filter((row) => row.consultant === consultantName)
      .sort((a, b) => (a.project || "").localeCompare(b.project || "") || (a.month || "").localeCompare(b.month || ""));
    const mix = (state.analysis.mixConsultant || []).find((row) => row.consultant === consultantName)
      || { billable: 0, acquisitie: 0, administratie: 0 };

    // Bezetting: gemiddelde bezetting over de komende 12 weken
    const todayIso = toIsoFromDate(new Date());
    const next12Weeks = planningData.weeks.filter((w) => w >= todayIso).slice(0, 12);
    const consultantRow = planningData.rows.find((r) => String(r.consultantId) === String(consultant.id));
    let avgBezetting = null;
    if (next12Weeks.length > 0 && consultantRow) {
      let totalPlanned = 0, totalCapacity = 0;
      next12Weeks.forEach((w) => {
        const regime = Number(getRegimeForDate(consultant, w) || 100);
        const cap = 5 * (regime / 100);
        totalPlanned += Number(consultantRow.totals[w] || 0);
        totalCapacity += cap;
      });
      avgBezetting = totalCapacity > 0 ? Math.round((totalPlanned / totalCapacity) * 100) : 0;
    }

    const report = {
      consultant,
      weeklyRows,
      monthlyRows,
      detailRows,
      planningWeeks: planningData.weeks,
      assignmentRows,
      mix,
      leadProjects: (state.projects || []).filter(
        (p) => String(p.leadConsultantId) === String(consultant.id) && getProjectStatus(p) === "actief"
      ),
      ohwProjects: (state.ohw?.projects) || [],
      totalHours: monthlyRows.reduce((sum, row) => sum + Number(row.hours || 0), 0),
      totalRevenue: monthlyRows.reduce((sum, row) => sum + Number(row.revenue || 0), 0),
      totalOverrun: monthlyRows.reduce((sum, row) => sum + Number(row.overrun || 0), 0),
      avgBezetting,
      bezettingWeeks: next12Weeks.length,
      images: {
        mix: analysisConsultantMixChart?.toDataURL("image/png") || "",
        monthlyMix: analysisConsultantMonthlyMixChart?.toDataURL("image/png") || "",
        hoursByProject: analysisHoursProjectChart?.toDataURL("image/png") || "",
        capacity: planningPersonChart?.toDataURL("image/png") || "",
        timeline: renderConsultantTimelineForReport(consultant)
      }
    };

    state.selectedPlanningConsultantId = prevPlanningId;
    state.planningExpandedConsultants = prevPlanningExpanded;
    renderPlanningTable();

    const html = buildConsultantReportHtml(report);
    const safeName = (report.consultant.name || "consultant").replace(/\s+/g, "_");
    const dateStr = new Date().toISOString().slice(0, 10);
    await downloadReportAsPdf(html, `Consultantrapport_${safeName}_${dateStr}.pdf`);
  } catch (err) {
    console.error("openConsultantPrintReport error:", err);
    setStatus(`Fout bij opbouwen rapport: ${err.message}`, true);
  } finally {
    _pdfGenerating = false;
    if (analysisPrintReportBtn) analysisPrintReportBtn.disabled = false;
  }
}

window.openConsultantPrintReport = openConsultantPrintReport;

function renderAnalysisRevenueChart(months, monthlyTotals, targetSeries = []) {
  if (!analysisRevenueChart) return;
  const ctx = analysisRevenueChart.getContext("2d");
  const width = Math.max(320, analysisRevenueChart.clientWidth || 320);
  const height = 280;
  const dpr = window.devicePixelRatio || 1;
  analysisRevenueChart.width = Math.floor(width * dpr);
  analysisRevenueChart.height = Math.floor(height * dpr);
  analysisRevenueChart.style.width = `${width}px`;
  analysisRevenueChart.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

    const pad = { left: 60, right: 16, top: 18, bottom: 84 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const revenues = months.map((m) => Number((monthlyTotals.find((x) => x.month === m) || { revenue: 0 }).revenue || 0));
  const overruns = months.map((m) => Number((monthlyTotals.find((x) => x.month === m) || { overrun: 0 }).overrun || 0));
  const gross = months.map((_, idx) => revenues[idx] + overruns[idx]);
  const targets = months.map((_, idx) => Number(targetSeries[idx] || 0));
  const maxRev = Math.max(1, ...gross);
  const maxY = Math.max(maxRev, ...targets);
  const yMax = Math.ceil(maxY / 1000) * 1000;

  ctx.strokeStyle = "#e5eaf2";
  for (let i = 0; i <= 5; i++) {
    const y = pad.top + (chartH * i) / 5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    const val = yMax * (1 - i / 5);
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "12px Segoe UI";
    ctx.fillText(`EUR ${Math.round(val).toLocaleString("nl-BE")}`, 6, y + 4);
  }

  const barW = Math.max(12, Math.min(40, chartW / Math.max(4, months.length * 1.8)));
  const xInset = Math.max(18, barW);
  const xSpan = Math.max(1, chartW - (2 * xInset));
  const xFor = (idx) => pad.left + xInset + (xSpan * idx) / Math.max(1, months.length - 1);
  const yFor = (v) => pad.top + chartH - ((v / yMax) * chartH);
  revenues.forEach((v, idx) => {
    const o = overruns[idx];
    const x = xFor(idx) - (barW / 2);
    const yRevenue = yFor(v);
    const yTotal = yFor(v + o);
    ctx.fillStyle = "rgba(232,57,42,0.75)";
    ctx.fillRect(x, yRevenue, barW, pad.top + chartH - yRevenue);
    if (o > 0) {
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, yTotal, barW, Math.max(1, yRevenue - yTotal));
      ctx.restore();
    }
    const label = formatMonthLabel(months[idx]);
    const lw = ctx.measureText(label).width;
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "12px Segoe UI";
      ctx.fillText(label, xFor(idx) - (lw / 2), height - 34);
  });

  if (targets.some((v) => v > 0)) {
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    targets.forEach((v, idx) => {
      const x = xFor(idx);
      const y = yFor(v);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    targets.forEach((v, idx) => {
      const x = xFor(idx);
      const y = yFor(v);
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  ctx.font = "12px Segoe UI";
    const legendItemGap = 18;
    const sw = 12;
    const omzetLabel = "Omzet";
    const overLabel = "Overschrijding";
    const targetLabel = "Target kost";
    const omzetW = sw + 8 + ctx.measureText(omzetLabel).width;
    const overW = sw + 8 + ctx.measureText(overLabel).width;
    const targetW = sw + 8 + ctx.measureText(targetLabel).width;
    const legendW = omzetW + legendItemGap + overW + legendItemGap + targetW;
    const legendY = height - 10;
  let lx = Math.max(8, (width - legendW) / 2);
  ctx.fillStyle = "rgba(232,57,42,0.75)";
  ctx.fillRect(lx, legendY - 10, sw, sw);
  ctx.fillStyle = "#5e6a7c";
  ctx.fillText(omzetLabel, lx + sw + 8, legendY);
  lx += omzetW + legendItemGap;
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(lx, legendY - 10, sw, sw);
    ctx.restore();
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(overLabel, lx + sw + 8, legendY);
    lx += overW + legendItemGap;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx, legendY - 4);
    ctx.lineTo(lx + sw, legendY - 4);
    ctx.stroke();
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(targetLabel, lx + sw + 8, legendY);
}

function renderMixDonutChart(canvasEl, mix, title) {
  if (!canvasEl) return;
  const ctx = canvasEl.getContext("2d");
  const width = Math.max(420, canvasEl.clientWidth || 420);
  const height = 300;
  const dpr = window.devicePixelRatio || 1;
  canvasEl.width = Math.floor(width * dpr);
  canvasEl.height = Math.floor(height * dpr);
  canvasEl.style.width = `${width}px`;
  canvasEl.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const values = [
    { key: "billable", label: "Billable", color: "#f4524d", value: Number(mix?.billable || 0) },
    { key: "acquisitie", label: "Acquisitie", color: "#f4a39c", value: Number(mix?.acquisitie || 0) },
    { key: "administratie", label: "Administratie", color: "#c8cdd6", value: Number(mix?.administratie || 0) }
  ];
  const total = values.reduce((s, v) => s + v.value, 0);

  ctx.fillStyle = "#1c2431";
  ctx.font = "600 14px Segoe UI";
  ctx.fillText(title || "Verdeling", 14, 20);

  if (total <= 0) {
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen data", 14, 44);
    return;
  }

  const cx = Math.min(width * 0.30, 155);
  const cy = 158;
  const radius = 78;
  const inner = 46;
  let start = -Math.PI / 2;

  values.forEach((v) => {
    const angle = (v.value / total) * Math.PI * 2;
    const mid = start + (angle / 2);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = v.color;
    ctx.fill();
    const pct = (v.value / total) * 100;
    if (pct >= 6) {
      const labelRadius = (radius + inner) / 2;
      const lx = cx + Math.cos(mid) * labelRadius;
      const ly = cy + Math.sin(mid) * labelRadius;
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 11px Segoe UI";
      const pctText = `${Math.round(pct)}%`;
      const tw = ctx.measureText(pctText).width;
      ctx.fillText(pctText, lx - (tw / 2), ly + 3);
    }
    start += angle;
  });

  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1c2431";
  ctx.font = "600 14px Segoe UI";
  ctx.fillText(`${total.toFixed(1)}u`, cx - 22, cy + 4);

  ctx.font = "12px Segoe UI";
  const legendRows = values.map((v) => {
    const pct = total > 0 ? (v.value / total) * 100 : 0;
    return `${v.label}: ${v.value.toFixed(1)}u (${pct.toFixed(0)}%)`;
  });
  const sw = 10;
  const gap = 8;
  const textWidths = legendRows.map((t) => ctx.measureText(t).width);
  const legendWidth = Math.max(...textWidths) + sw + gap;
  const legendRowH = 24;
  const legendHeight = legendRowH * legendRows.length;
  const rightPaneX = cx + radius + 20;
  const rightPaneW = Math.max(0, width - rightPaneX - 12);

  let legendX;
  let legendY;
  if (rightPaneW >= legendWidth) {
    legendX = rightPaneX + ((rightPaneW - legendWidth) / 2);
    legendY = cy - (legendHeight / 2) + 10;
  } else {
    legendX = Math.max(12, (width - legendWidth) / 2);
    legendY = cy + radius + 22;
  }

  legendRows.forEach((label, idx) => {
    const y = legendY + (idx * legendRowH);
    ctx.fillStyle = values[idx].color;
    ctx.fillRect(legendX, y - 9, sw, sw);
    ctx.fillStyle = "#1c2431";
    ctx.font = "12px Segoe UI";
    ctx.fillText(label, legendX + sw + gap, y);
  });
}

function renderConsultantMonthlyMixChart(monthlyRows, months) {
  if (!analysisConsultantMonthlyMixChart) return;
  const ctx = analysisConsultantMonthlyMixChart.getContext("2d");
  const width = Math.max(360, analysisConsultantMonthlyMixChart.clientWidth || 360);
  const height = 260;
  const dpr = window.devicePixelRatio || 1;
  analysisConsultantMonthlyMixChart.width = Math.floor(width * dpr);
  analysisConsultantMonthlyMixChart.height = Math.floor(height * dpr);
  analysisConsultantMonthlyMixChart.style.width = `${width}px`;
  analysisConsultantMonthlyMixChart.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const monthList = Array.isArray(months) ? months : [];
  if (!monthList.length || !monthlyRows.length) {
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen maandverdeling beschikbaar.", 14, 28);
    return;
  }

  const byMonth = new Map();
  monthlyRows.forEach((r) => byMonth.set(r.month, r));
  const pad = { left: 36, right: 12, top: 16, bottom: 42 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const barW = Math.max(10, Math.min(30, chartW / Math.max(3, monthList.length * 1.6)));
  const xInset = Math.max(14, barW);
  const xSpan = Math.max(1, chartW - (2 * xInset));
  const xFor = (idx) => pad.left + xInset + (xSpan * idx) / Math.max(1, monthList.length - 1);

  ctx.strokeStyle = "#e5eaf2";
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#5e6a7c";
  ctx.font = "11px Segoe UI";
  ctx.fillText("100%", 2, pad.top + 4);
  ctx.fillText("0%", 10, pad.top + chartH + 4);

  monthList.forEach((m, idx) => {
    const row = byMonth.get(m) || { billable: 0, acquisitie: 0, administratie: 0 };
    const b = Number(row.billable || 0);
    const a = Number(row.acquisitie || 0);
    const ad = Number(row.administratie || 0);
    const total = Math.max(0.0001, b + a + ad);
    const x = xFor(idx) - (barW / 2);
    let y = pad.top + chartH;
    const parts = [
      { v: b / total, c: "#f4524d" },
      { v: a / total, c: "#f4a39c" },
      { v: ad / total, c: "#c8cdd6" }
    ];
    parts.forEach((p) => {
      const h = p.v * chartH;
      y -= h;
      ctx.fillStyle = p.c;
      ctx.fillRect(x, y, barW, h);
      if (h >= 18 && p.v >= 0.08) {
        const pctText = `${Math.round(p.v * 100)}%`;
        ctx.fillStyle = "#ffffff";
        ctx.font = "700 11px Segoe UI";
        const tw = ctx.measureText(pctText).width;
        ctx.fillText(pctText, x + (barW / 2) - (tw / 2), y + (h / 2) + 4);
      }
    });
    const lbl = formatMonthLabel(m);
    const lw = ctx.measureText(lbl).width;
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(lbl, xFor(idx) - (lw / 2), height - 12);
  });
}

function renderAnalysisHoursProjectChart(projectTotals) {
  if (!analysisHoursProjectChart) return;
  const ctx = analysisHoursProjectChart.getContext("2d");
  const width = Math.max(760, analysisHoursProjectChart.clientWidth || 760);
  const items = (projectTotals || []).slice(0, 12);
  const rowH = 20;
  const rowGap = 8;
  const height = Math.max(180, 40 + (items.length * (rowH + rowGap)));
  const dpr = window.devicePixelRatio || 1;
  analysisHoursProjectChart.width = Math.floor(width * dpr);
  analysisHoursProjectChart.height = Math.floor(height * dpr);
  analysisHoursProjectChart.style.width = `${width}px`;
  analysisHoursProjectChart.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (!items.length) {
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen urenverdeling per project beschikbaar.", 20, 30);
    return;
  }

  const pad = { left: 270, right: 16, top: 14, bottom: 16 };
  const chartW = width - pad.left - pad.right;
  const maxHours = Math.max(1, ...items.map((x) => Number(x.hours || 0)));

  items.forEach((item, idx) => {
    const y = pad.top + idx * (rowH + rowGap);
    const hours = Number(item.hours || 0);
    const w = (hours / maxHours) * chartW;
    const label = `${item.project}`;
    ctx.fillStyle = "#1c2431";
    ctx.font = "12px Segoe UI";
    const shortLabel = label.length > 38 ? `${label.slice(0, 38)}...` : label;
    ctx.fillText(shortLabel, 8, y + 14);
    ctx.fillStyle = "rgba(232,57,42,0.70)";
    ctx.fillRect(pad.left, y + 2, Math.max(2, w), rowH - 4);
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(`${hours.toFixed(1)}u`, Math.min(width - 50, pad.left + w + 6), y + 14);
  });
}

function monthIso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function monthRangeForYear(year) {
  const months = [];
  const safeYear = Number.isFinite(Number(year)) ? Number(year) : new Date().getFullYear();
  for (let i = 0; i < 12; i += 1) {
    months.push(monthIso(new Date(safeYear, i, 1)));
  }
  return months;
}

function projectColor(projectId) {
  const key = String(projectId ?? "");
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = ((hash * 31) + key.charCodeAt(i)) >>> 0;
  }
  const hue = Math.round((Math.abs(hash) * 137.508) % 360);
  return `hsl(${hue}, 68%, 46%)`;
}

function getPipelineFilteredConsultants() {
  const entityFilter = pipelineEntityFilter ? pipelineEntityFilter.value : "ALL";
  const consultantFilter = pipelineConsultantFilter ? pipelineConsultantFilter.value : "ALL";
  const consultantFilterId = consultantFilter === "ALL" ? null : Number(consultantFilter);
  return state.consultants.filter((c) => {
    if (entityFilter !== "ALL" && (c.entity || "RPL BE") !== entityFilter) return false;
    if (consultantFilterId !== null && Number(c.id) !== consultantFilterId) return false;
    return true;
  });
}

function isConsultantActiveInMonth(consultant, monthIsoValue) {
  const monthStartIso = `${monthIsoValue}-01`;
  const nextMonth = addMonths(parseIsoDate(monthStartIso), 1);
  nextMonth.setDate(nextMonth.getDate() - 1);
  const monthEndIso = toIsoFromDate(nextMonth);
  if (!consultant.startDate || consultant.startDate > monthEndIso) return false;
  if (consultant.exitDate && consultant.exitDate < monthStartIso) return false;
  return true;
}

function getConsultantCostForYear(consultant, year) {
  const row = (consultant.costHistory || []).find((x) => Number(x.year) === Number(year));
  return row ? Number(row.cost || 0) : 0;
}

function getOverheadAnnualCostForEntity(year, entity) {
  const row = (state.overheadCosts || []).find(
    (x) => Number(x.year) === Number(year) && String(x.entity || "") === String(entity || "")
  );
  return row ? Number(row.cost || 0) : 0;
}

function renderPipelineConsultantOptions() {
  if (!pipelineConsultantFilter) return;
  const prev = pipelineConsultantFilter.value || "ALL";
  const entity = pipelineEntityFilter ? pipelineEntityFilter.value : "ALL";
  const consultants = state.consultants
    .filter((c) => entity === "ALL" || c.entity === entity)
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  pipelineConsultantFilter.innerHTML = "<option value=\"ALL\">Alle consultants</option>";
  consultants.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = String(c.id);
    opt.textContent = `${c.name} (${c.entity || "RPL BE"})`;
    pipelineConsultantFilter.appendChild(opt);
  });
  const hasPrev = consultants.some((c) => String(c.id) === prev);
  pipelineConsultantFilter.value = hasPrev ? prev : "ALL";
}

function computePipelineData(monthCount = 12) {
  const pipelineYear = new Date().getFullYear();
  const filteredConsultants = getPipelineFilteredConsultants();
  const consultantIds = new Set(filteredConsultants.map((c) => Number(c.id)));
  const consultantsById = new Map(state.consultants.map((c) => [Number(c.id), c]));
  const months = monthRangeForYear(pipelineYear);
  const monthSet = new Set(months);
  const projectRows = [];
  const targetByMonth = Object.fromEntries(months.map((m) => [m, 0]));
  const overrunByMonth = Object.fromEntries(months.map((m) => [m, 0]));

  months.forEach((m) => {
    const year = Number(m.slice(0, 4));
    const monthMidIso = `${m}-15`;
    filteredConsultants.forEach((c) => {
      if (!isConsultantActiveInMonth(c, m)) return;
      const yearlyMonthlyCost = getConsultantCostForYear(c, year);
      const overheadAnnualCost = getOverheadAnnualCostForEntity(year, c.entity || "RPL BE");
      const overheadMonthlyCost = overheadAnnualCost / 12;
      const regimePct = Number(getRegimeForDate(c, monthMidIso) || 100);
      const scale = regimePct / 100;
      if (!yearlyMonthlyCost && !overheadMonthlyCost) return;
      targetByMonth[m] += (yearlyMonthlyCost * scale) + (overheadMonthlyCost * scale);
    });
  });

  state.projects.forEach((project) => {
    const status = getProjectStatus(project);
    if (status === "geannuleerd" || status === "afgerond") return;
    const rateByConsultant = new Map((project.staff || []).map((s) => [Number(s.consultantId), Number(s.hourlyRate || 0)]));
    const perMonth = {};
    let total = 0;
    (project.allocations || []).forEach((a) => {
      const weekStart = String(a.weekStart || "");
      const m = weekStart.slice(0, 7);
      if (!monthSet.has(m)) return;
      const consultantId = Number(a.consultantId);
      if (!consultantIds.has(consultantId)) return;
      const consultant = consultantsById.get(consultantId);
      if (!consultant) return;
      const rate = Number(rateByConsultant.get(Number(a.consultantId)) || 0);
      const rawRevenue = Number(a.mandays || 0) * 8 * rate;
      let revenue = rawRevenue;
      const valuationFactor = Number(project.timesheetValuationFactor || 1);
      if (Number.isFinite(valuationFactor) && valuationFactor > 0 && valuationFactor < 1) {
        revenue *= valuationFactor;
        overrunByMonth[m] += Math.max(0, rawRevenue - revenue);
      }
      perMonth[m] = (perMonth[m] || 0) + revenue;
      total += revenue;
    });
    if (total <= 0) return;
    projectRows.push({
      id: project.id,
      name: project.name || "",
      projectNumber: project.projectNumber || "",
      perMonth,
      total
    });
  });

  projectRows.sort((a, b) => b.total - a.total);
  const monthlyTotals = months.map((m) => projectRows.reduce((sum, p) => sum + Number(p.perMonth[m] || 0), 0));
  const targetSeries = months.map((m) => Number(targetByMonth[m] || 0));
  const overrunSeries = months.map((m) => Number(overrunByMonth[m] || 0));
  return { months, projectRows, monthlyTotals, targetSeries, overrunSeries, pipelineYear };
}

function renderPipelineChart(data) {
  if (!pipelineChart) return;
  const ctx = pipelineChart.getContext("2d");
  const width = Math.max(820, pipelineChart.clientWidth || 820);
  const height = 320;
  const dpr = window.devicePixelRatio || 1;
  pipelineChart.width = Math.floor(width * dpr);
  pipelineChart.height = Math.floor(height * dpr);
  pipelineChart.style.width = `${width}px`;
  pipelineChart.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const { months, projectRows, monthlyTotals, targetSeries, overrunSeries } = data;
  if (!months.length || !projectRows.length) {
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen geplande projectomzet in de komende maanden.", 20, 34);
    return;
  }

  const pad = { left: 60, right: 20, top: 18, bottom: 42 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const potentialTotals = months.map((_, idx) => Number(monthlyTotals[idx] || 0) + Number(overrunSeries[idx] || 0));
  const yMax = Math.max(1, Math.ceil((Math.max(...monthlyTotals, ...targetSeries, ...potentialTotals) || 0) / 1000) * 1000);

  ctx.strokeStyle = "#e5eaf2";
  for (let i = 0; i <= 5; i += 1) {
    const y = pad.top + (chartH * i) / 5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    const val = yMax * (1 - i / 5);
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "12px Segoe UI";
    ctx.fillText(`€ ${Math.round(val).toLocaleString("nl-BE")}`, 6, y + 4);
  }

  const barW = Math.max(14, Math.min(44, chartW / Math.max(5, months.length * 1.6)));
  const xInset = Math.max(18, barW);
  const xSpan = Math.max(1, chartW - (2 * xInset));
  const xFor = (idx) => pad.left + xInset + (xSpan * idx) / Math.max(1, months.length - 1);
  const yFor = (v) => pad.top + chartH - ((v / yMax) * chartH);

  const stackedByMonth = [];
  months.forEach((m, idx) => {
    let stacked = 0;
    projectRows.forEach((p) => {
      const val = Number(p.perMonth[m] || 0);
      if (val <= 0) return;
      const yTop = yFor(stacked + val);
      const yBottom = yFor(stacked);
      ctx.fillStyle = projectColor(p.id);
      ctx.fillRect(xFor(idx) - (barW / 2), yTop, barW, Math.max(1, yBottom - yTop));
      stacked += val;
    });
    const lbl = formatMonthLabel(m);
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "12px Segoe UI";
    const lw = ctx.measureText(lbl).width;
    ctx.fillText(lbl, xFor(idx) - (lw / 2), height - 12);
    stackedByMonth[idx] = stacked;
  });

  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 1.5;
  months.forEach((m, idx) => {
    const over = Number(overrunSeries[idx] || 0);
    if (over <= 0) return;
    const base = Number(stackedByMonth[idx] || 0);
    const yTop = yFor(base + over);
    const yBottom = yFor(base);
    const x = xFor(idx) - (barW / 2);
    const h = Math.max(1, yBottom - yTop);
    ctx.strokeRect(x, yTop, barW, h);
  });
  ctx.restore();

  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  targetSeries.forEach((v, idx) => {
    const x = xFor(idx);
    const y = yFor(v);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  targetSeries.forEach((v, idx) => {
    const x = xFor(idx);
    const y = yFor(v);
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function renderPipeline() {
  if (!pipelineTableWrap || !pipelineChart) return;
  renderPipelineConsultantOptions();
  const data = computePipelineData(12);
  const { months, projectRows, monthlyTotals, targetSeries, overrunSeries, pipelineYear } = data;
  const totalUpcoming = monthlyTotals.reduce((sum, val) => sum + val, 0);
  const totalOverrun = overrunSeries.reduce((sum, val) => sum + val, 0);
  const entityLabel = pipelineEntityFilter ? pipelineEntityFilter.value : "ALL";
  const consultantLabel = pipelineConsultantFilter && pipelineConsultantFilter.value !== "ALL"
    ? (pipelineConsultantFilter.options[pipelineConsultantFilter.selectedIndex]?.textContent || "Consultant")
    : "Alle consultants";

  if (pipelineMeta) {
    pipelineMeta.textContent = `Omzet ${pipelineYear}: ${formatBudget(totalUpcoming)} | Overschrijdingen: ${formatBudget(totalOverrun)} | Filter entiteit: ${entityLabel === "ALL" ? "RPL" : entityLabel} | Filter consultant: ${consultantLabel}`;
  }

  if (pipelineLegend) {
    const items = projectRows.slice(0, 10).map((p) => {
      const color = projectColor(p.id);
      return `<span><span class="dot" style="background:${color};"></span>${p.projectNumber} - ${p.name}</span>`;
    }).join("");
    const overflow = projectRows.length > 10 ? `<span>+ ${projectRows.length - 10} extra projecten</span>` : "";
    pipelineLegend.innerHTML = items || `<span>Geen projecten met geplande omzet in de komende maanden.</span>`;
    if (overflow) {
      pipelineLegend.innerHTML += overflow;
    }
    pipelineLegend.innerHTML += `<span><span class="dot" style="background:#0f172a;"></span>Target kost (consultant + overhead, geschaald op tewerkstelling)</span>`;
    pipelineLegend.innerHTML += `<span><span class="dot" style="background:transparent;border:1.5px dashed #475569;"></span>Overschrijdingen (niet-gewaardeerde omzet)</span>`;
  }

  renderPipelineChart(data);

  if (!projectRows.length) {
    pipelineTableWrap.innerHTML = "<p>Geen projectomzet voor de komende maanden.</p>";
    return;
  }

  const headerCols = months.map((m) => `<th>${formatMonthLabel(m)}</th>`).join("");
  const bodyRows = projectRows.map((p) => {
    const monthCols = months.map((m) => `<td>${formatBudget(p.perMonth[m] || 0)}</td>`).join("");
    return `<tr><th>${p.projectNumber} - ${p.name}</th>${monthCols}<td><strong>${formatBudget(p.total)}</strong></td></tr>`;
  }).join("");
  const totalCols = months.map((m, idx) => `<td><strong>${formatBudget(monthlyTotals[idx] || 0)}</strong></td>`).join("");
  const overrunCols = overrunSeries.map((v) => `<td>${formatBudget(v)}</td>`).join("");
  const targetCols = targetSeries.map((v) => `<td>${formatBudget(v)}</td>`).join("");
  const targetTotal = targetSeries.reduce((s, v) => s + Number(v || 0), 0);
  const profitLossSeries = months.map((_, idx) => Number(monthlyTotals[idx] || 0) - Number(targetSeries[idx] || 0));
  const profitLossCols = profitLossSeries.map((v) => `<td><strong>${formatBudget(v)}</strong></td>`).join("");
  const profitLossTotal = totalUpcoming - targetTotal;
  const spacerRow = `<tr class="pipeline-spacer"><td colspan="${months.length + 2}"></td></tr>`;

  pipelineTableWrap.innerHTML = `
    <div style="overflow:auto;">
      <table class="planning-table">
        <thead>
          <tr>
            <th>Project</th>
            ${headerCols}
            <th>Totaal</th>
          </tr>
        </thead>
        <tbody>
          ${bodyRows}
          <tr>
            <th>Totaal</th>
            ${totalCols}
            <td><strong>${formatBudget(totalUpcoming)}</strong></td>
          </tr>
          ${spacerRow}
          <tr>
            <th>Overschrijdingen</th>
            ${overrunCols}
            <td><strong>${formatBudget(totalOverrun)}</strong></td>
          </tr>
          ${spacerRow}
          <tr>
            <th>Target kost</th>
            ${targetCols}
            <td><strong>${formatBudget(targetTotal)}</strong></td>
          </tr>
          <tr>
            <th>Winst / verlies</th>
            ${profitLossCols}
            <td><strong>${formatBudget(profitLossTotal)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function sortOhwProjects(rows) {
  const sortKey = state.ohwSort?.key || "currentOHW";
  const sortDir = state.ohwSort?.dir === "asc" ? 1 : -1;
  const arr = rows.slice();
  arr.sort((a, b) => {
    let av;
    let bv;
    if (sortKey === "project") {
      av = `${a.projectNumber || ""} - ${a.projectName || ""}`.toLowerCase();
      bv = `${b.projectNumber || ""} - ${b.projectName || ""}`.toLowerCase();
    } else if (sortKey === "projectLead") {
      av = String(a.projectLead || "").toLowerCase();
      bv = String(b.projectLead || "").toLowerCase();
    } else if (sortKey === "openingOHW") {
      av = Number(a.openingOHW || 0);
      bv = Number(b.openingOHW || 0);
    } else if (sortKey === "performedRevenue") {
      av = Number(a.performedRevenue || 0);
      bv = Number(b.performedRevenue || 0);
    } else if (sortKey === "invoiced") {
      av = Number(a.invoiced || 0);
      bv = Number(b.invoiced || 0);
    } else if (sortKey === "vendorInvoiced") {
      av = Number(a.vendorInvoiced || 0);
      bv = Number(b.vendorInvoiced || 0);
    } else {
      av = Number(a.currentOHW || 0);
      bv = Number(b.currentOHW || 0);
    }
    if (av < bv) return -1 * sortDir;
    if (av > bv) return 1 * sortDir;
    return 0;
  });
  return arr;
}

function ohwSortArrow(key) {
  if (!state.ohwSort || state.ohwSort.key !== key) return "";
  return state.ohwSort.dir === "asc" ? " &uarr;" : " &darr;";
}

function getFilteredOhwProjects() {
  const data = state.ohw || {};
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const filter = state.ohwEntityFilter || "ALL";
  const nonZeroProjects = projects.filter((p) => Math.abs(Number(p.currentOHW || 0)) > 0.000001);
  const filteredProjects = nonZeroProjects.filter((p) => {
    if (filter === "ALL") return true;
    const projectNumber = String(p.projectNumber || "");
    const consultants = Array.isArray(p.consultants) ? p.consultants : [];
    const hasBe = consultants.some((c) => String(c.entity || "").toUpperCase() === "RPL BE");
    const hasNl = consultants.some((c) => String(c.entity || "").toUpperCase() === "RPL NL");
    if (filter === "RPL BE") return projectNumber.startsWith("351") || hasBe;
    if (filter === "RPL NL") return projectNumber.startsWith("352") || hasNl;
    return true;
  });
  return sortOhwProjects(filteredProjects);
}

async function exportOhwTable() {
  const rows = getFilteredOhwProjects();
  if (!rows.length) {
    alert("Geen OHW-data om te exporteren voor deze filter.");
    return;
  }
  const entityLabel = state.ohwEntityFilter === "ALL" ? "RPL" : state.ohwEntityFilter.replace(/\s+/g, "_");
  try {
    const response = await apiRequest("/api/export-ohw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows, entityLabel })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${response.status}`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ohw_export_${entityLabel}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert(`Export mislukt: ${err.message}`);
  }
}

function renderOhw() {
  if (!ohwTableWrap) return;
  if (ohwEntityFilter && ohwEntityFilter.value !== state.ohwEntityFilter) {
    ohwEntityFilter.value = state.ohwEntityFilter || "ALL";
  }
  const data = state.ohw || {};
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const source = data.source || {};
  const error = data.error || "";

  if (ohwMeta) {
    const sourceParts = [];
    if (source.ohwFile) sourceParts.push(`Start-OHW: ${source.ohwFile}`);
    if (source.invoiceFile) sourceParts.push(`Facturen: ${source.invoiceFile}`);
    if (Array.isArray(source.timesheets) && source.timesheets.length) {
      sourceParts.push(`Timesheets: ${source.timesheets.join(" + ")}`);
    }
    const base = "OHW = OHW vorig jaar + gepresteerde omzet - verstuurde facturen + ontvangen facturen.";
    ohwMeta.textContent = sourceParts.length ? `${base} Bronnen: ${sourceParts.join(" | ")}` : base;
    ohwMeta.style.color = error ? "#b42318" : "#5e6a7c";
  }
  const sortedProjects = getFilteredOhwProjects();
  const visibleTotals = sortedProjects.reduce(
    (acc, p) => {
      acc.openingOHW += Number(p.openingOHW || 0);
      acc.performedRevenue += Number(p.performedRevenue || 0);
      acc.invoiced += Number(p.invoiced || 0);
      acc.vendorInvoiced += Number(p.vendorInvoiced || 0);
      acc.currentOHW += Number(p.currentOHW || 0);
      return acc;
    },
    { openingOHW: 0, performedRevenue: 0, invoiced: 0, vendorInvoiced: 0, currentOHW: 0 }
  );
  if (ohwSummary) {
    ohwSummary.textContent = `Filter: ${state.ohwEntityFilter === "ALL" ? "RPL" : state.ohwEntityFilter} | Totaal OHW vorig jaar: ${formatBudget(visibleTotals.openingOHW || 0)} | Gepresteerde omzet: ${formatBudget(visibleTotals.performedRevenue || 0)} | Verstuurde facturen: ${formatBudget(visibleTotals.invoiced || 0)} | Ontvangen facturen: ${formatBudget(visibleTotals.vendorInvoiced || 0)} | Huidig OHW: ${formatBudget(visibleTotals.currentOHW || 0)}`;
    ohwSummary.style.color = error ? "#b42318" : "#5e6a7c";
  }
  if (error) {
    ohwTableWrap.innerHTML = `<p>${escapeHtml(error)}</p>`;
    return;
  }
  if (!projects.length) {
    ohwTableWrap.innerHTML = "<p>Geen OHW-data beschikbaar.</p>";
    return;
  }
  if (!sortedProjects.length) {
    ohwTableWrap.innerHTML = "<p>Geen projecten voor deze filter met OHW verschillend van nul.</p>";
    return;
  }
  const rows = sortedProjects.map((p) => {
    const title = p.projectName ? `${p.projectNumber} - ${p.projectName}` : p.projectNumber;
    const projectKey = String(p.projectNumber || "");
    const isExpanded = !!state.ohwExpandedProjects[projectKey];
    const consultants = Array.isArray(p.consultants) ? p.consultants : [];
    const consultantRows = isExpanded
      ? (consultants.length
        ? consultants.map((c) => `
      <tr class="ohw-subrow">
        <td class="ohw-indent">↳ ${escapeHtml(c.name || "-")}</td>
        <td>-</td>
        <td>-</td>
        <td>${formatBudget(c.performedRevenue || 0)}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>`).join("")
        : `
      <tr class="ohw-subrow">
        <td class="ohw-indent">↳ Geen consultant-omzet gevonden</td>
        <td>-</td>
        <td>-</td>
        <td>${formatBudget(0)}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>`)
      : "";
    return `
      <tr class="ohw-project-row" data-ohw-project="${escapeHtml(projectKey)}">
        <th>${isExpanded ? "▾" : "▸"} ${escapeHtml(title)}</th>
        <td>${escapeHtml(p.projectLead || "-")}</td>
        <td>${formatBudget(p.openingOHW || 0)}</td>
        <td>${formatBudget(p.performedRevenue || 0)}</td>
        <td>${formatBudget(p.invoiced || 0)}</td>
        <td>${formatBudget(p.vendorInvoiced || 0)}</td>
        <td><strong>${formatBudget(p.currentOHW || 0)}</strong></td>
      </tr>${consultantRows}
    `;
  }).join("");

  ohwTableWrap.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th data-sort-key="project">Project${ohwSortArrow("project")}</th>
            <th data-sort-key="projectLead">Projectleider${ohwSortArrow("projectLead")}</th>
            <th data-sort-key="openingOHW">OHW vorig jaar${ohwSortArrow("openingOHW")}</th>
            <th data-sort-key="performedRevenue">Gepresteerde omzet${ohwSortArrow("performedRevenue")}</th>
            <th data-sort-key="invoiced">Verstuurde facturen${ohwSortArrow("invoiced")}</th>
            <th data-sort-key="vendorInvoiced">Ontvangen facturen${ohwSortArrow("vendorInvoiced")}</th>
            <th data-sort-key="currentOHW">Huidig OHW${ohwSortArrow("currentOHW")}</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr>
            <th>Totaal</th>
            <td>-</td>
            <td><strong>${formatBudget(visibleTotals.openingOHW || 0)}</strong></td>
            <td><strong>${formatBudget(visibleTotals.performedRevenue || 0)}</strong></td>
            <td><strong>${formatBudget(visibleTotals.invoiced || 0)}</strong></td>
            <td><strong>${formatBudget(visibleTotals.vendorInvoiced || 0)}</strong></td>
            <td><strong>${formatBudget(visibleTotals.currentOHW || 0)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function switchTab(tabName) {
  Object.entries(tabPanels).forEach(([name, panel]) => {
    if (!panel) return;
    panel.classList.toggle("hidden", name !== tabName);
  });
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  if (tabName === "consultants") {
    renderFteChart();
  }
  if (tabName === "projecten") {
    if (renderProjectTimelineChart._state) {
      renderProjectTimelineChart._state.anchored = false;
    }
    renderProjectTimelineChart();
  }
  if (tabName === "planning") {
    renderPlanningTable();
  }
  if (tabName === "analyse") {
    renderAnalysis();
  }
  if (tabName === "pipeline") {
    renderPipeline();
  }
  if (tabName === "ohw") {
    loadOhw().then(() => {
      renderOhw();
    }).catch((err) => {
      setStatus(`OHW laden faalt: ${err.message}`, true);
    });
    renderOhw();
  }
  if (tabName === "facturatie") {
    loadInvoices().then(() => {
      renderInvoices();
    }).catch((err) => {
      setStatus(`Facturatie laden faalt: ${err.message}`, true);
    });
    renderInvoices();
  }
}

function setupSectionToggles(tabId, defaultCollapsed = false) {
  const tab = document.getElementById(tabId);
  if (!tab) return;
  const sections = tab.querySelectorAll(".offer-section.offer-subcard");
  sections.forEach((section) => {
    if (section.dataset.collapsibleReady === "1") return;
    const title = section.querySelector("h3");
    if (!title) return;
    const body = document.createElement("div");
    body.className = "section-body";
    let node = title.nextElementSibling;
    while (node) {
      const next = node.nextElementSibling;
      body.appendChild(node);
      node = next;
    }
    section.appendChild(body);
    title.classList.add("section-toggle-title");
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    if (defaultCollapsed) {
      body.classList.add("hidden");
      title.setAttribute("aria-expanded", "false");
    } else {
      title.setAttribute("aria-expanded", "true");
    }
    title.insertAdjacentHTML("beforeend", ' <span class="section-toggle-icon">▸</span>');
    const icon = title.querySelector(".section-toggle-icon");
    if (icon) icon.textContent = defaultCollapsed ? "▸" : "▾";
    const toggle = () => {
      const isHidden = body.classList.toggle("hidden");
      title.setAttribute("aria-expanded", String(!isHidden));
      if (icon) icon.textContent = isHidden ? "▸" : "▾";
    };
    title.addEventListener("click", toggle);
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
    section.dataset.collapsibleReady = "1";
  });
}

function renderOffersList() {
  offersTableWrap.innerHTML = "";
  const filter = offerStatusFilter ? offerStatusFilter.value : "open";
  const rows = state.offers.filter((o) => {
    const status = getOfferStatus(o);
    return filter === "ALL" ? true : status === filter;
  });
  if (!rows.length) {
    offersTableWrap.innerHTML = "<p>Geen offertes voor deze filter.</p>";
    return;
  }
  const tableRows = rows.map((o) => {
    const active = o.id === state.selectedOfferId ? "active" : "";
    return `<tr class="${active}" data-offer-id="${o.id}">
      <td>${o.name}</td>
      <td>${fmtDate(o.submissionDate)}</td>
      <td>${getOfferStatus(o)}</td>
    </tr>`;
  }).join("");
  offersTableWrap.innerHTML = `
    <table class="offer-table">
      <thead><tr><th>Titel</th><th>Indieningsdatum</th><th>Status</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;
}

function getOfferStatus(offer) {
  if (offer.status === "open") return "open";
  return (offer.closeReason || "open").toLowerCase();
}

function renderOfferConsultantOptions() {
  offerConsultant.innerHTML = "";
  const activeConsultants = getActiveConsultantsToday();
  if (!activeConsultants.length) {
    offerConsultant.innerHTML = "<option value=\"\">Geen actieve consultants</option>";
    return;
  }
  activeConsultants.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = String(c.id);
    opt.textContent = `${c.name} (${c.entity || "RPL BE"})`;
    offerConsultant.appendChild(opt);
  });
}

function toMonday(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function weekLabel(iso) {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  const weekNo = getIsoWeek(d);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" }).toLowerCase();
  return `W${weekNo} (${day} ${month})`;
}

function isWeekFullyPassed(weekStartIso) {
  const start = parseIsoDate(weekStartIso);
  if (!start) return false;
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  end.setDate(end.getDate() + 6);
  return startOfDay(end) < startOfDay(new Date());
}

function getIsoWeek(date) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  return Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
}

function buildOfferWeeks(offer) {
  const created = parseIsoDate(offer.createdDate);
  const submit = parseIsoDate(offer.submissionDate);
  if (!created || !submit) return [];
  let cur = toMonday(created);
  const end = toMonday(submit);
  const weeks = [];
  while (cur <= end) {
    weeks.push(toIsoFromDate(cur));
    cur.setDate(cur.getDate() + 7);
  }
  if (!weeks.includes(toIsoFromDate(end))) {
    weeks.push(toIsoFromDate(end));
  }
  return weeks;
}

function buildProjectWeeks(project) {
  const created = parseIsoDate(project.startDate || project.createdDate);
  const delivery = parseIsoDate(project.deliveryDate);
  if (!created || !delivery) return [];
  let cur = toMonday(created);
  const end = toMonday(delivery);
  const weeks = [];
  while (cur <= end) {
    weeks.push(toIsoFromDate(cur));
    cur.setDate(cur.getDate() + 7);
  }
  if (!weeks.includes(toIsoFromDate(end))) {
    weeks.push(toIsoFromDate(end));
  }
  return weeks;
}

function renderOfferAllocations(offer) {
  const staff = offer.staff || [];
  const weeks = buildOfferWeeks(offer);
  if (!staff.length) {
    offerAllocationsMatrix.innerHTML = "<p>Nog geen consultants toegevoegd aan deze offerte.</p>";
    return;
  }
  if (!weeks.length) {
    offerAllocationsMatrix.innerHTML = "<p>Geen geldige weekrange voor deze offerte.</p>";
    return;
  }

  const allocMap = new Map();
  (offer.allocations || []).forEach((a) => {
    allocMap.set(`${a.consultantId}|${a.weekStart}`, Number(a.mandays || 0));
  });

  const headCols = weeks.map((w) => `<th>${weekLabel(w)}</th>`).join("");
  const bodyRows = staff.map((s) => {
    const cells = weeks.map((w) => {
      const key = `${s.consultantId}|${w}`;
      const value = allocMap.has(key) ? allocMap.get(key).toFixed(1) : "";
      return `<td><input class="matrix-input" data-consultant-id="${s.consultantId}" data-week-start="${w}" value="${value}" placeholder="0.0" /></td>`;
    }).join("");
    return `<tr><th>${s.consultantName}</th>${cells}</tr>`;
  }).join("");

  offerAllocationsMatrix.innerHTML = `
    <div style="overflow:auto;">
      <table>
        <thead><tr><th>Consultant</th>${headCols}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;
}

function renderProjectConsultantOptions() {
  if (!projectConsultant) return;
  projectConsultant.innerHTML = "";
  const activeConsultants = getActiveConsultantsToday();
  if (!activeConsultants.length) {
    projectConsultant.innerHTML = "<option value=\"\">Geen actieve consultants</option>";
  } else {
    activeConsultants.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = String(c.id);
      opt.textContent = `${c.name} (${c.entity || "RPL BE"})`;
      projectConsultant.appendChild(opt);
    });
  }

  const leadConsultants = activeConsultants.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  const fillLeadSelect = (selectEl) => {
    if (!selectEl) return;
    const current = selectEl.value;
    selectEl.innerHTML = "<option value=\"\">Selecteer projectleider</option>";
    leadConsultants.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = String(c.id);
      opt.textContent = `${c.name} (${c.entity || "RPL BE"})`;
      selectEl.appendChild(opt);
    });
    if (current && [...selectEl.options].some((o) => o.value === current)) {
      selectEl.value = current;
    }
  };
  fillLeadSelect(projectLeadConsultant);
  fillLeadSelect(projectEditLeadConsultant);
}

function renderProjectAllocations(project) {
  if (!projectAllocationsMatrix) return;
  const existingScrollWrap = projectAllocationsMatrix.querySelector("div");
  if (existingScrollWrap && project?.id) {
    state.projectAllocationsScrollLeft[project.id] = existingScrollWrap.scrollLeft;
  }
  const staff = project.staff || [];
  const weeks = buildProjectWeeks(project);
  if (!staff.length) {
    projectAllocationsMatrix.innerHTML = "<p>Nog geen consultants toegevoegd aan dit project.</p>";
    return;
  }
  if (!weeks.length) {
    projectAllocationsMatrix.innerHTML = "<p>Geen geldige weekrange voor dit project.</p>";
    return;
  }

  const allocMap = new Map();
  (project.allocations || []).forEach((a) => {
    allocMap.set(`${a.consultantId}|${a.weekStart}`, Number(a.mandays || 0));
  });

  const headCols = weeks.map((w) => `<th>${weekLabel(w)}</th>`).join("");
  const bodyRows = staff.map((s) => {
    const hourlyRate = Number(s.hourlyRate || 0);
    const totalMandays = weeks.reduce((sum, w) => {
      const key = `${s.consultantId}|${w}`;
      return sum + Number(allocMap.get(key) || 0);
    }, 0);
    const totalBudget = totalMandays * 8 * hourlyRate;
    const cells = weeks.map((w) => {
      const key = `${s.consultantId}|${w}`;
      const value = allocMap.has(key) ? allocMap.get(key).toFixed(1) : "";
      const locked = isWeekFullyPassed(w);
      const disabledAttr = locked ? " disabled" : "";
      const lockedClass = locked ? " matrix-locked" : "";
      return `<td><input class="project-matrix-input${lockedClass}" data-consultant-id="${s.consultantId}" data-week-start="${w}" value="${value}" placeholder="0.0"${disabledAttr} /></td>`;
    }).join("");
    return `<tr>
      <th class="project-matrix-name-clickable" data-consultant-id="${s.consultantId}" data-consultant-name="${escapeHtml(s.consultantName)}" title="Klik om snel in te vullen" style="cursor:pointer;text-decoration:underline dotted var(--accent);white-space:nowrap;">${s.consultantName}</th>
      <td class="project-total-hours">${totalMandays.toFixed(1)}d</td>
      <td>${formatBudget(totalBudget)}</td>
      <td><input class="project-rate-input" data-consultant-id="${s.consultantId}" value="${hourlyRate.toFixed(2)}" type="number" min="0" step="0.01" /></td>
      <td><button type="button" class="row-action delete-action project-staff-delete-btn" data-consultant-id="${s.consultantId}" title="Verwijder consultant van project">Verwijder</button></td>
      ${cells}
    </tr>`;
  }).join("");

  const totalAllDays = staff.reduce((sum, s) => {
    return sum + weeks.reduce((wsum, w) => wsum + Number(allocMap.get(`${s.consultantId}|${w}`) || 0), 0);
  }, 0);
  const totalAllBudget = staff.reduce((sum, s) => {
    const mandays = weeks.reduce((wsum, w) => wsum + Number(allocMap.get(`${s.consultantId}|${w}`) || 0), 0);
    return sum + mandays * 8 * Number(s.hourlyRate || 0);
  }, 0);
  const totalWeekCells = weeks.map((w) => {
    const weekTotal = staff.reduce((sum, s) => sum + Number(allocMap.get(`${s.consultantId}|${w}`) || 0), 0);
    return `<td style="font-weight:600;background:#f0f4fb;">${weekTotal > 0 ? weekTotal.toFixed(1) : ""}</td>`;
  }).join("");
  const totalRow = `<tr style="border-top:2px solid var(--line);">
    <th style="font-weight:700;">Totaal</th>
    <td style="font-weight:700;background:#f0f4fb;">${totalAllDays.toFixed(1)}d</td>
    <td style="font-weight:700;background:#f0f4fb;">${formatBudget(totalAllBudget)}</td>
    <td></td><td></td>
    ${totalWeekCells}
  </tr>`;

  projectAllocationsMatrix.innerHTML = `
    <div style="overflow:auto;">
      <table>
        <thead><tr><th>Consultant</th><th>Totaal dagen</th><th>Totaal budget</th><th>Tarief/uur (EUR)</th><th>Acties</th>${headCols}</tr></thead>
        <tbody>${bodyRows}${totalRow}</tbody>
      </table>
    </div>
  `;
  const scrollWrap = projectAllocationsMatrix.querySelector("div");
  if (scrollWrap && project?.id) {
    const remembered = Number(state.projectAllocationsScrollLeft[project.id] || 0);
    scrollWrap.scrollLeft = remembered;
    scrollWrap.addEventListener("scroll", () => {
      state.projectAllocationsScrollLeft[project.id] = scrollWrap.scrollLeft;
    });
  }
}

function renderOffers() {
  renderOffersList();
  renderOfferConsultantOptions();
  const offer = getSelectedOffer();
  if (!offer) {
    noOfferSelection.classList.remove("hidden");
    offerDetails.classList.add("hidden");
    return;
  }
  noOfferSelection.classList.add("hidden");
  offerDetails.classList.remove("hidden");
  const exitLabel = offer.exitDate ? ` | Uit dienst: ${fmtDate(offer.exitDate)}` : "";
  offerEditName.value = offer.name || "";
  offerEditSubmissionDate.value = fmtDate(offer.submissionDate);
  offerEditStatus.value = getOfferStatus(offer);
  offerMeta.textContent = `Offerte: ${offer.name} | Aangemaakt: ${fmtDate(offer.createdDate)} | Indiening: ${fmtDate(offer.submissionDate)} | Status: ${getOfferStatus(offer)}${exitLabel}`;
  renderOfferAllocations(offer);
  const isOpen = offer.status === "open";
  offerStaffForm.querySelectorAll("input,select,button").forEach((el) => { el.disabled = !isOpen; });
  offerEditForm.querySelectorAll("input,select,button").forEach((el) => { el.disabled = false; });
  offerAllocationsMatrix.querySelectorAll("input").forEach((el) => { el.disabled = !isOpen; });
  offerDeleteBtn.disabled = false;
}

function formatBudget(value) {
  const num = Number(value || 0);
  return `€ ${num.toLocaleString("nl-BE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatPercent(value) {
  const num = Number(value || 0);
  return `${(num * 100).toLocaleString("nl-BE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

function parseOptionalNumberInput(raw) {
  const txt = String(raw || "").trim();
  if (!txt) return 0;
  const val = parseLocalizedNumber(txt);
  if (!Number.isFinite(val) || val < 0) return null;
  return val;
}

function parseLocalizedNumber(raw) {
  const txt = String(raw || "").trim();
  if (!txt) return NaN;
  const normalized = txt
    .replace(/\s/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  return Number(normalized);
}

function formatNumberInputBE(value) {
  const num = Number(value || 0);
  return num.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function syncProjectBudgetInputs(mode, isEdit = false) {
  const billing = (mode || "regie").toLowerCase();
  const isRegie = billing === "regie";
  const isRegieCap = billing === "regie_cap";
  const budgetInput = isEdit ? projectEditBudget : document.getElementById("project-budget");
  const prevInput = isEdit ? projectEditPrevBudgetTotal : projectPrevBudgetTotal;
  const nextInput = isEdit ? projectEditNextBudgetTotal : projectNextBudgetTotal;
  const capInput = isEdit ? projectEditCapAmount : projectCapAmount;
  const capRow = isEdit ? projectEditCapRow : projectCapRow;
  if (budgetInput) budgetInput.disabled = isRegie || isRegieCap;
  if (prevInput) prevInput.disabled = isRegie;
  if (nextInput) nextInput.disabled = isRegie;
  if (capRow) {
    capRow.classList.toggle("hidden", !isRegieCap);
  }
  if (capInput) {
    capInput.disabled = !isRegieCap;
    capInput.required = isRegieCap;
  }
}

function getBillingTypeLabel(billingType) {
  const type = (billingType || "regie").toLowerCase();
  if (type === "fixed") return "fixed budget";
  if (type === "regie_cap") return "regie met cap";
  return "regie";
}

function getProjectStatus(project) {
  return (project.status || "actief").toLowerCase();
}

function sortProjects(rows) {
  const sortKey = state.projectSort?.key || "deliveryDate";
  const sortDir = state.projectSort?.dir === "asc" ? 1 : -1;
  const arr = rows.slice();
  arr.sort((a, b) => {
    let av;
    let bv;
    if (sortKey === "deliveryDate") {
      av = parseIsoDate(a.deliveryDate)?.getTime() || 0;
      bv = parseIsoDate(b.deliveryDate)?.getTime() || 0;
    } else if (sortKey === "budget") {
      av = Number(a.budget || 0);
      bv = Number(b.budget || 0);
    } else if (sortKey === "status") {
      av = getProjectStatus(a);
      bv = getProjectStatus(b);
    } else if (sortKey === "projectNumber") {
      av = (a.projectNumber || "").toLowerCase();
      bv = (b.projectNumber || "").toLowerCase();
    } else if (sortKey === "expectedRealizationRate") {
      av = Number(a.expectedRealizationRate || 0);
      bv = Number(b.expectedRealizationRate || 0);
    } else {
      av = (a.name || "").toLowerCase();
      bv = (b.name || "").toLowerCase();
    }
    if (av < bv) return -1 * sortDir;
    if (av > bv) return 1 * sortDir;
    return 0;
  });
  return arr;
}

function projectSortArrow(key) {
  if (!state.projectSort || state.projectSort.key !== key) return "";
  return state.projectSort.dir === "asc" ? " ▲" : " ▼";
}

function renderProjectsList() {
  if (!projectsTableWrap) return;
  projectsTableWrap.innerHTML = "";
  const filter = projectStatusFilter ? projectStatusFilter.value : "actief";
  const consultantFilterRaw = projectConsultantFilter ? projectConsultantFilter.value : "ALL";
  const consultantFilter = consultantFilterRaw === "ALL" ? null : Number(consultantFilterRaw);
  const rows = state.projects.filter((p) => {
    const status = getProjectStatus(p);
    if (filter !== "ALL" && status !== filter) return false;
    if (consultantFilter === null || !Number.isFinite(consultantFilter)) return true;
    const inStaff = Array.isArray(p.staff) && p.staff.some((s) => Number(s.consultantId) === consultantFilter);
    const isLead = Number(p.leadConsultantId) === consultantFilter;
    return inStaff || isLead;
  });
  const sortedRows = sortProjects(rows);
  if (!rows.length) {
    projectsTableWrap.innerHTML = "<p>Geen projecten voor deze filter.</p>";
    return;
  }
  const totals = sortedRows.reduce(
    (acc, p) => {
      acc.budget += Number(p.budget || 0);
      acc.currentYearBudget += Number(p.currentYearBudget || 0);
      acc.expectedRevenue += Number(p.expectedRevenueCurrentYear || 0);
      return acc;
    },
    { budget: 0, currentYearBudget: 0, expectedRevenue: 0 }
  );
  const totalsRow = `
    <tr class="totals-row">
      <td></td>
      <td><strong>Totaal</strong></td>
      <td>-</td>
      <td><strong>${formatBudget(totals.budget)}</strong></td>
      <td><strong>${formatBudget(totals.currentYearBudget)}</strong></td>
      <td><strong>${formatBudget(totals.expectedRevenue)}</strong></td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  `;
  const tableRows = sortedRows
      .map((p) => {
        const active = p.id === state.selectedProjectId ? "active" : "";
        return `<tr class="${active}" data-project-id="${p.id}">
        <td>${p.projectNumber || ""}</td>
        <td>${p.name}</td>
        <td>${fmtDate(p.deliveryDate)}</td>
        <td>${formatBudget(p.budget)}</td>
        <td>${formatBudget(p.currentYearBudget || 0)}</td>
        <td>${formatBudget(p.expectedRevenueCurrentYear || 0)}</td>
        <td>${formatPercent(p.expectedRealizationRate || 0)}</td>
        <td>${p.leadConsultantName || "-"}</td>
        <td>${getBillingTypeLabel(p.billingType)}</td>
        <td>${getProjectStatus(p)}</td>
      </tr>`;
    })
    .join("");
  projectsTableWrap.innerHTML = `
    <table class="offer-table">
      <thead><tr>
        <th data-sort-key="projectNumber">Projectnummer${projectSortArrow("projectNumber")}</th>
        <th data-sort-key="name">Titel${projectSortArrow("name")}</th>
        <th data-sort-key="deliveryDate">Opleveringsdatum${projectSortArrow("deliveryDate")}</th>
        <th data-sort-key="budget">Budget${projectSortArrow("budget")}</th>
        <th>Budget huidig jaar</th>
        <th>Verwachte omzet huidig jaar</th>
        <th data-sort-key="expectedRealizationRate">Verwachte realisatiegraad${projectSortArrow("expectedRealizationRate")}</th>
        <th>Projectleider</th>
        <th>Type</th>
          <th data-sort-key="status">Status${projectSortArrow("status")}</th>
        </tr></thead>
        <tbody>${totalsRow}${tableRows}</tbody>
      </table>
    `;
}

function renderProjectFilterOptions() {
  if (!projectConsultantFilter) return;
  const previous = projectConsultantFilter.value || "ALL";
  const consultants = state.consultants.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  projectConsultantFilter.innerHTML = "<option value=\"ALL\">Alle consultants</option>";
  consultants.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = String(c.id);
    opt.textContent = `${c.name} (${c.entity || "RPL BE"})`;
    projectConsultantFilter.appendChild(opt);
  });
  if ([...projectConsultantFilter.options].some((o) => o.value === previous)) {
    projectConsultantFilter.value = previous;
  }
}

function renderProjects() {
  if (!projectDetails || !noProjectSelection) return;
  renderProjectFilterOptions();
  renderProjectsList();
  renderProjectConsultantOptions();
  renderProjectTimelineChart();
  const project = getSelectedProject();
  if (!project) {
    noProjectSelection.classList.remove("hidden");
    projectDetails.classList.add("hidden");
    renderPipeline();
    return;
  }
  noProjectSelection.classList.add("hidden");
  projectDetails.classList.remove("hidden");
  projectEditNumber.value = project.projectNumber || "";
  projectEditName.value = project.name || "";
  if (projectEditStartDate) projectEditStartDate.value = project.startDate ? fmtDate(project.startDate) : "";
  projectEditDeliveryDate.value = fmtDate(project.deliveryDate);
  projectEditBudget.value = formatNumberInputBE(project.budget || 0);
  if (projectEditLeadConsultant) {
    projectEditLeadConsultant.value = project.leadConsultantId ? String(project.leadConsultantId) : "";
  }
  if (projectEditBillingType) {
    projectEditBillingType.value = project.billingType || "regie";
    syncProjectBudgetInputs(projectEditBillingType.value, true);
  }
  if (projectEditCapAmount) {
    projectEditCapAmount.value = formatNumberInputBE(project.capAmount || 0);
  }
  if (projectEditPrevBudgetTotal) {
    projectEditPrevBudgetTotal.value = formatNumberInputBE(project.previousBudgetTotal || 0);
  }
  if (projectEditNextBudgetTotal) {
    projectEditNextBudgetTotal.value = formatNumberInputBE(project.nextBudgetTotal || 0);
  }
  projectEditStatus.value = getProjectStatus(project);
  const lead = project.leadConsultantName || "Geen";
  const typeLabel = getBillingTypeLabel(project.billingType);
  const capInfo = (project.billingType || "regie") === "regie_cap"
    ? ` | Cap: ${formatBudget(project.capAmount || 0)}`
    : "";
  projectMeta.textContent = `Project: ${project.projectNumber || ""} - ${project.name} | Start: ${fmtDate(project.startDate || project.createdDate)} | Oplevering: ${fmtDate(project.deliveryDate)} | Budget: ${formatBudget(project.budget)} | Budget huidig jaar: ${formatBudget(project.currentYearBudget || 0)} | Verwachte omzet huidig jaar: ${formatBudget(project.expectedRevenueCurrentYear || 0)} | Verwachte realisatiegraad: ${formatPercent(project.expectedRealizationRate || 0)} | Projectleider: ${lead} | Type: ${typeLabel}${capInfo} | Voorgaande jaren totaal: ${formatBudget(project.previousBudgetTotal || 0)} | Komende jaren totaal: ${formatBudget(project.nextBudgetTotal || 0)} | Status: ${getProjectStatus(project)}`;
  renderProjectAllocations(project);
  const isActive = getProjectStatus(project) === "actief";
  if (projectStaffForm) projectStaffForm.querySelectorAll("input,select,button").forEach((el) => { el.disabled = !isActive; });
  if (projectAllocationsMatrix) projectAllocationsMatrix.querySelectorAll("input,button").forEach((el) => { el.disabled = !isActive; });
  projectDeleteBtn.disabled = false;
  renderPipeline();
}

function renderProjectTimelineChart() {
  if (!projectTimelineChart) return;
  const ctx = projectTimelineChart.getContext("2d");
  const width = Math.max(800, projectTimelineChart.clientWidth || 800);
  const dpr = window.devicePixelRatio || 1;
  const today = startOfDay(new Date());
  const monthFmt = new Intl.DateTimeFormat("nl-BE", { month: "short", year: "numeric" });
  const dateFmt = new Intl.DateTimeFormat("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" });
  const stateRef = renderProjectTimelineChart.state || {
    bound: false,
    hoverId: null,
    zones: []
  };
  renderProjectTimelineChart.state = stateRef;

  function roundedRect(x, y, w, h, r) {
    const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    ctx.lineTo(x + rr, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
    ctx.closePath();
  }

  const activeProjects = state.projects
    .filter((p) => getProjectStatus(p) === "actief")
    .map((p) => ({
      ...p,
      created: parseIsoDate(p.startDate || p.createdDate),
      delivery: parseIsoDate(p.deliveryDate)
    }))
    .filter((p) => p.delivery && p.delivery >= today)
    .sort((a, b) => a.delivery - b.delivery);

  if (projectTimelineSummary) {
    projectTimelineSummary.textContent = `Lopende projecten: ${activeProjects.length}`;
  }

  const pad = { left: 20, right: 20, top: 22, bottom: 44 };
  const rowHeight = 28;
  const rowGap = 12;
  const rowsHeight = activeProjects.length
    ? (activeProjects.length * rowHeight) + ((activeProjects.length - 1) * rowGap)
    : 40;
  const height = Math.max(180, pad.top + pad.bottom + rowsHeight);
  const chartW = width - pad.left - pad.right;

  projectTimelineChart.width = Math.floor(width * dpr);
  projectTimelineChart.height = Math.floor(height * dpr);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);
  ctx.textBaseline = "middle";
  ctx.imageSmoothingEnabled = true;
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#fbfcff");
  bg.addColorStop(1, "#f4f7fb");
  ctx.fillStyle = bg;
  roundedRect(0, 0, width, height, 10);
  ctx.fill();

  if (!activeProjects.length) {
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "400 14px 'Segoe UI', Tahoma, Arial, sans-serif";
    ctx.fillText("Geen actieve projecten met toekomstige opleveringsdatum.", 16, 34);
    return;
  }

  if (!stateRef.bound) {
    projectTimelineChart.addEventListener("mousemove", (event) => {
      const rect = projectTimelineChart.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hovered = stateRef.zones.find((z) => x >= z.x && x <= (z.x + z.w) && y >= z.y && y <= (z.y + z.h));
      const nextHoverId = hovered ? hovered.project.id : null;
      if (nextHoverId !== stateRef.hoverId) {
        stateRef.hoverId = nextHoverId;
        renderProjectTimelineChart();
      }
    });
    projectTimelineChart.addEventListener("mouseleave", () => {
      if (stateRef.hoverId !== null) {
        stateRef.hoverId = null;
        renderProjectTimelineChart();
      }
    });
    stateRef.bound = true;
  }
  stateRef.zones = [];

  const rangeStart = today;
  const rangeEnd = activeProjects.reduce((max, p) => (p.delivery > max ? p.delivery : max), today);
  const totalMs = Math.max(86400000, rangeEnd.getTime() - rangeStart.getTime());
  const xFor = (date) => {
    const ratio = (date.getTime() - rangeStart.getTime()) / totalMs;
    return pad.left + (Math.max(0, Math.min(1, ratio)) * chartW);
  };

  const axisY = height - pad.bottom + 0.5;
  const todayX = xFor(today);

  let tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
  if (tick < rangeStart) {
    tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth() + 1, 1);
  }
  ctx.font = "500 12px 'Segoe UI', Tahoma, Arial, sans-serif";
  while (tick <= rangeEnd) {
    const x = xFor(tick);
    ctx.strokeStyle = "#e6ebf3";
    ctx.beginPath();
    ctx.moveTo(x, pad.top - 4);
    ctx.lineTo(x, axisY);
    ctx.stroke();
    const label = monthFmt.format(tick);
    const w = ctx.measureText(label).width;
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(label, x - (w / 2), height - 14);
    tick = new Date(tick.getFullYear(), tick.getMonth() + 1, 1);
  }

  ctx.strokeStyle = "#cfd8e7";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, axisY);
  ctx.lineTo(width - pad.right, axisY);
  ctx.stroke();

  ctx.strokeStyle = "#f4524d";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(todayX, pad.top - 6);
  ctx.lineTo(todayX, axisY);
  ctx.stroke();
  ctx.setLineDash([]);
  const todayTag = `Vandaag (${dateFmt.format(today)})`;
  ctx.font = "600 12px 'Segoe UI', Tahoma, Arial, sans-serif";
  const todayW = ctx.measureText(todayTag).width + 10;
  ctx.fillStyle = "rgba(232,57,42,0.08)";
  roundedRect(Math.max(pad.left, todayX - (todayW / 2)), pad.top - 16, todayW, 16, 6);
  ctx.fill();
  ctx.fillStyle = "#f4524d";
  ctx.fillText(todayTag, Math.max(pad.left + 5, todayX - (todayW / 2) + 5), pad.top - 4);

  const barFuture = ctx.createLinearGradient(0, 0, width, 0);
  barFuture.addColorStop(0, "#f4524d");
  barFuture.addColorStop(1, "#c73e39");
  const barPast = "#d4dce8";

  activeProjects.forEach((project, idx) => {
    const y = pad.top + (idx * (rowHeight + rowGap));
    const projectStart = project.created && project.created > today ? project.created : today;
    const xStart = xFor(projectStart);
    const xEnd = xFor(project.delivery);
    const barWidth = Math.max(4, xEnd - xStart);
    const trackY = y + 2;
    const trackH = rowHeight - 4;
    const isHovered = stateRef.hoverId === project.id;
    const drawTrackY = isHovered ? trackY - 1 : trackY;
    const drawTrackH = isHovered ? trackH + 2 : trackH;
    const endDateLabel = dateFmt.format(project.delivery);

    const label = `${project.projectNumber ? `${project.projectNumber} - ` : ""}${project.name}`;
    ctx.font = "500 13px 'Segoe UI', Tahoma, Arial, sans-serif";

    ctx.fillStyle = "#edf2f9";
    roundedRect(pad.left, drawTrackY, chartW, drawTrackH, 7);
    ctx.fill();

    if (xStart > pad.left) {
      ctx.fillStyle = barPast;
      roundedRect(pad.left, drawTrackY, xStart - pad.left, drawTrackH, 7);
      ctx.fill();
    }

    ctx.fillStyle = barFuture;
    roundedRect(xStart, drawTrackY, barWidth, drawTrackH, 7);
    ctx.fill();
    if (isHovered) {
      ctx.strokeStyle = "#a01f15";
      ctx.lineWidth = 1;
      roundedRect(xStart, drawTrackY, barWidth, drawTrackH, 7);
      ctx.stroke();
    }

    const labelWidth = ctx.measureText(label).width;
    const barInnerWidth = barWidth - 14;
    if (barInnerWidth >= labelWidth) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, xStart + 7, y + 18);
    } else {
      ctx.fillStyle = "#1c2431";
      const outsideX = Math.min(width - pad.right - labelWidth, xEnd + 6);
      ctx.fillText(label, outsideX, y + 18);
    }

    ctx.fillStyle = isHovered ? "#0b5ea5" : "#5e6a7c";
    ctx.font = "400 12px 'Segoe UI', Tahoma, Arial, sans-serif";
    const dateX = Math.min(width - pad.right - ctx.measureText(endDateLabel).width, xEnd + 6);
    ctx.fillText(endDateLabel, dateX, y + 31);

    stateRef.zones.push({
      x: xStart,
      y: drawTrackY,
      w: barWidth,
      h: drawTrackH,
      project
    });
  });

  if (stateRef.hoverId !== null) {
    const hovered = activeProjects.find((p) => p.id === stateRef.hoverId);
    if (hovered) {
      const daysLeft = Math.max(0, Math.ceil((hovered.delivery.getTime() - today.getTime()) / 86400000));
      const tipText = `${hovered.projectNumber ? `${hovered.projectNumber} - ` : ""}${hovered.name} | Oplevering: ${dateFmt.format(hovered.delivery)} | ${daysLeft} dagen resterend`;
      ctx.font = "500 12px 'Segoe UI', Tahoma, Arial, sans-serif";
      const tipW = Math.min(width - 24, ctx.measureText(tipText).width + 16);
      const tipX = width - pad.right - tipW;
      const tipY = 10;
      ctx.fillStyle = "rgba(232,57,42,0.08)";
      roundedRect(tipX, tipY, tipW, 24, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(232,57,42,0.22)";
      ctx.lineWidth = 1;
      roundedRect(tipX, tipY, tipW, 24, 8);
      ctx.stroke();
      ctx.fillStyle = "#0b4b8f";
      ctx.fillText(tipText, tipX + 8, tipY + 12);
    }
  }
}

function renderProjectTimelineChart() {
  if (!projectTimelineChart) return;
  const ctx = projectTimelineChart.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const today = startOfDay(new Date());
  const dayMs = 86400000;
  const viewDays = 92;
  const pad = { left: 24, right: 24, top: 18, bottom: 44 };
  const rowHeight = 24;
  const rowGap = 10;
  const viewportWidth = Math.max(760, projectTimelineScroll ? projectTimelineScroll.clientWidth : (projectTimelineChart.clientWidth || 760));
  const pxPerDay = (viewportWidth - pad.left - pad.right) / viewDays;

  const activeProjects = state.projects
    .filter((p) => getProjectStatus(p) === "actief")
    .map((p) => ({
      ...p,
      created: parseIsoDate(p.startDate || p.createdDate),
      delivery: parseIsoDate(p.deliveryDate)
    }))
    .filter((p) => p.delivery && p.delivery >= today)
    .sort((a, b) => a.delivery - b.delivery);

  if (projectTimelineSummary) {
    projectTimelineSummary.textContent = `Lopende projecten: ${activeProjects.length}`;
  }

  const rowsHeight = activeProjects.length
    ? (activeProjects.length * rowHeight) + ((activeProjects.length - 1) * rowGap)
    : 40;
  const height = Math.max(180, pad.top + pad.bottom + rowsHeight);
  const stateRef = renderProjectTimelineChart._state || { bound: false, anchored: false };
  renderProjectTimelineChart._state = stateRef;

  if (!activeProjects.length) {
    const width = viewportWidth;
    projectTimelineChart.width = Math.floor(width * dpr);
    projectTimelineChart.height = Math.floor(height * dpr);
    projectTimelineChart.style.width = `${width}px`;
    projectTimelineChart.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen actieve projecten met toekomstige opleveringsdatum.", 16, 34);
    return;
  }

  let minDate = today;
  let maxDate = today;
  activeProjects.forEach((p) => {
    const start = p.created || today;
    if (start < minDate) minDate = start;
    if (p.delivery > maxDate) maxDate = p.delivery;
  });

  const totalDays = Math.max(viewDays, Math.ceil((maxDate.getTime() - minDate.getTime()) / dayMs) + 1);
  const chartW = Math.max(viewportWidth - pad.left - pad.right, totalDays * pxPerDay);
  const width = Math.ceil(chartW + pad.left + pad.right);
  const prevScroll = projectTimelineScroll ? projectTimelineScroll.scrollLeft : 0;

  projectTimelineChart.width = Math.floor(width * dpr);
  projectTimelineChart.height = Math.floor(height * dpr);
  projectTimelineChart.style.height = `${height}px`;
  projectTimelineChart.style.width = `${width}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (projectTimelineScroll && !stateRef.bound) {
    projectTimelineScroll.addEventListener("scroll", () => {
      stateRef.anchored = true;
    });
    stateRef.bound = true;
  }

  const rangeStart = minDate;
  const rangeEnd = maxDate;
  const totalMs = Math.max(dayMs, rangeEnd.getTime() - rangeStart.getTime());
  const xFor = (date) => {
    const ratio = (date.getTime() - rangeStart.getTime()) / totalMs;
    return pad.left + (Math.max(0, Math.min(1, ratio)) * chartW);
  };

  const axisY = height - pad.bottom + 0.5;
  const todayX = xFor(today);
  ctx.strokeStyle = "#d7dce5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, axisY);
  ctx.lineTo(width - pad.right, axisY);
  ctx.stroke();

  let tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
  if (tick < rangeStart) {
    tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth() + 1, 1);
  }
  ctx.font = "12px Segoe UI";
  while (tick <= rangeEnd) {
    const x = xFor(tick);
    ctx.strokeStyle = "#e8ecf3";
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, axisY);
    ctx.stroke();
    const label = `${String(tick.getMonth() + 1).padStart(2, "0")}/${tick.getFullYear()}`;
    const w = ctx.measureText(label).width;
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(label, x - (w / 2), height - 14);
    tick = new Date(tick.getFullYear(), tick.getMonth() + 1, 1);
  }

  ctx.strokeStyle = "#d33b3b";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(todayX, pad.top);
  ctx.lineTo(todayX, axisY);
  ctx.stroke();
  ctx.setLineDash([]);

  const barColor = "#f4524d";
  const barDoneColor = "#90a4b8";
  activeProjects.forEach((project, idx) => {
    const y = pad.top + (idx * (rowHeight + rowGap));
    const projectStart = project.created || today;
    const xStart = xFor(projectStart);
    const xEnd = xFor(project.delivery);
    const xDoneEnd = xFor(today > project.delivery ? project.delivery : today);
    const doneWidth = Math.max(0, xDoneEnd - xStart);
    const futureStart = Math.max(xStart, xDoneEnd);
    const futureWidth = Math.max(2, xEnd - futureStart);
    const trackY = y + 3;
    const trackH = rowHeight - 6;

    const label = `${project.projectNumber ? `${project.projectNumber} - ` : ""}${project.name}`;
    ctx.font = "12px Segoe UI";

    if (doneWidth > 0) {
      ctx.fillStyle = barDoneColor;
      ctx.fillRect(xStart, trackY, doneWidth, trackH);
    }
    ctx.fillStyle = barColor;
    ctx.fillRect(futureStart, trackY, futureWidth, trackH);

    const labelWidth = ctx.measureText(label).width;
    const barInnerWidth = futureWidth - 14;
    if (barInnerWidth >= labelWidth) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, futureStart + 7, y + 15);
    } else {
      ctx.fillStyle = "#1c2431";
      const outsideX = Math.min(width - pad.right - labelWidth, xEnd + 6);
      ctx.fillText(label, outsideX, y + 15);
    }
  });

  if (projectTimelineScroll) {
    if (!stateRef.anchored) {
      const monthStartToday = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthStartX = xFor(monthStartToday);
      const target = Math.max(0, monthStartX - pad.left);
      projectTimelineScroll.scrollLeft = target;
      stateRef.anchored = true;
    } else {
      projectTimelineScroll.scrollLeft = Math.min(prevScroll, projectTimelineScroll.scrollWidth);
    }
  }
}

function getPlanningWeeks() {
  const today = new Date();
  const start = toMonday(today);
  const startIso = toIsoFromDate(start);

  // Collect all allocation weeks from active offers and projects
  const allWeekIsos = new Set();
  state.offers.filter((o) => o.status === "open").forEach((offer) => {
    (offer.allocations || []).forEach((alloc) => { if (alloc.weekStart) allWeekIsos.add(alloc.weekStart); });
  });
  state.projects.filter((p) => getProjectStatus(p) === "actief").forEach((project) => {
    (project.allocations || []).forEach((alloc) => { if (alloc.weekStart) allWeekIsos.add(alloc.weekStart); });
  });

  // Only consider future weeks (>= current week)
  const futureWeeks = [...allWeekIsos].filter((w) => w >= startIso).sort();
  const maxIso = futureWeeks.length ? futureWeeks[futureWeeks.length - 1] : null;

  // Fallback: 13 weeks from today if no data
  if (!maxIso) {
    const weeks = [];
    let current = new Date(start);
    for (let i = 0; i < 13; i++) {
      weeks.push(toIsoFromDate(current));
      current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
    }
    return weeks;
  }

  // Generate every Monday from current week to the last allocation week
  const weeks = [];
  let current = new Date(start);
  const maxDate = parseIsoDate(maxIso);
  while (toIsoFromDate(current) <= toIsoFromDate(maxDate)) {
    weeks.push(toIsoFromDate(current));
    current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
  }
  return weeks;
}

function countVacationMandaysInWeek(weekStartIso, startIso, endIso) {
  const weekStart = parseIsoDate(weekStartIso);
  const startDate = parseIsoDate(startIso);
  const endDate = parseIsoDate(endIso);
  if (!weekStart || !startDate || !endDate) return 0;
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
  const from = startDate > weekStart ? startDate : weekStart;
  const to = endDate < weekEnd ? endDate : weekEnd;
  if (from > to) return 0;
  let days = 0;
  for (
    let d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    d <= to;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
  ) {
    const day = d.getDay();
    if (day >= 1 && day <= 5) days += 1;
  }
  return days;
}

function aggregateMandaysByWeek(entityFilter) {
  const targetOffers = state.offers.filter((offer) => offer.status === "open");
  const targetProjects = state.projects.filter((project) => getProjectStatus(project) === "actief");
  const todayIso = toIsoFromDate(new Date());
  const consultants = state.consultants.filter((c) => {
    if (entityFilter !== "ALL" && c.entity !== entityFilter) return false;
    return isConsultantActiveOnDate(c, todayIso);
  });
  const weeks = getPlanningWeeks();
  const data = {};

  consultants.forEach((c) => {
    data[c.id] = {
      consultantId: c.id,
      consultantName: c.name,
      consultant: c,
      totals: weeks.reduce((acc, w) => ({ ...acc, [w]: 0 }), {}),
      vacationTotals: weeks.reduce((acc, w) => ({ ...acc, [w]: 0 }), {})
    };
  });

  targetOffers.forEach((offer) => {
    (offer.allocations || []).forEach((alloc) => {
      if (!data[alloc.consultantId]) return;
      if (!weeks.includes(alloc.weekStart)) return;
      data[alloc.consultantId].totals[alloc.weekStart] += Number(alloc.mandays || 0);
    });
  });

  targetProjects.forEach((project) => {
    (project.allocations || []).forEach((alloc) => {
      if (!data[alloc.consultantId]) return;
      if (!weeks.includes(alloc.weekStart)) return;
      data[alloc.consultantId].totals[alloc.weekStart] += Number(alloc.mandays || 0);
    });
  });

  consultants.forEach((consultant) => {
    (consultant.vacationHistory || []).forEach((vacation) => {
      weeks.forEach((weekStart) => {
        const vacationDays = countVacationMandaysInWeek(weekStart, vacation.startDate, vacation.endDate);
        if (vacationDays > 0) {
          data[consultant.id].totals[weekStart] += vacationDays;
          data[consultant.id].vacationTotals[weekStart] += vacationDays;
        }
      });
    });
  });

  return { weeks, rows: Object.values(data) };
}

function getWeeklyCapacityDays(consultant, weekStartIso) {
  if (!consultant || !consultant.startDate) return 0;
  if (consultant.startDate > weekStartIso) return 0;
  if (consultant.endDate && consultant.endDate < weekStartIso) return 0;
  const regime = Math.max(0, Math.min(100, Number(getRegimeForDate(consultant, weekStartIso) || 0)));
  return (regime / 100) * 5;
}

function getPlanningCellVisual(mandays, capacityDays) {
  if (capacityDays <= 0) {
    if (mandays > 0) {
      return { color: "#d32f2f", className: "planning-load-high", ratio: 1, label: "Geen capaciteit in deze week" };
    }
    return { color: "#f1f5f9", className: "", ratio: 0, label: "Geen capaciteit in deze week" };
  }

  const ratio = mandays / capacityDays;
  if (ratio >= 1) {
    return { color: "#d32f2f", className: "planning-load-high", ratio, label: "100% of meer bezet" };
  }
  if (ratio >= 0.9) {
    return { color: "#f08c00", className: "planning-load-high", ratio, label: "90% tot 99% bezet" };
  }

  const t = Math.max(0, Math.min(1, ratio / 0.9));
  const lightness = 95 - (t * 42);
  const saturation = 45 + (t * 18);
  const className = ratio >= 0.75 ? "planning-load-mid" : "";
  return {
    color: `hsl(125 ${saturation}% ${lightness}%)`,
    className,
    ratio,
    label: `${Math.round(ratio * 100)}% bezet`
  };
}

function renderPlanningTable() {
  if (!planningTableWrap) return;
  const filter = planningEntityFilter ? planningEntityFilter.value : "ALL";
  const { weeks, rows } = aggregateMandaysByWeek(filter);
  const visibleIds = new Set(rows.map((r) => String(r.consultantId)));
  Object.keys(state.planningExpandedConsultants).forEach((id) => {
    if (!visibleIds.has(String(id))) delete state.planningExpandedConsultants[id];
  });
  if (!rows.some((r) => r.consultantId === state.selectedPlanningConsultantId)) {
    state.selectedPlanningConsultantId = null;
  }
  if (!rows.length) {
    planningTableWrap.innerHTML = "<p>Geen consultants voor deze filter.</p>";
    renderPlanningPersonChart([], [], null);
    renderPlanningProjectTimelineChart(null);
    return;
  }

  const consultantDetails = buildConsultantAssignmentDetails(weeks);
  const head = weeks.map((w) => `<th class="planning-week-header"><span>${weekLabel(w)}</span></th>`).join("");
  const tableMinWidth = 420 + (weeks.length * 92);
  let body = "";
  rows.forEach((row) => {
    const selectedClass = row.consultantId === state.selectedPlanningConsultantId ? " planning-row-selected" : "";
    const cells = weeks.map((w) => {
      const mandays = Number(row.totals[w] || 0);
      const capacityDays = getWeeklyCapacityDays(row.consultant, w);
      const visual = getPlanningCellVisual(mandays, capacityDays);
      const pct = capacityDays > 0 ? `${(visual.ratio * 100).toFixed(0)}%` : "n.v.t.";
      const tooltip = `Bezetting: ${mandays.toFixed(1)}d / ${capacityDays.toFixed(1)}d (${pct})`;
      let displayValue = "";
      if (mandays > 0) {
        displayValue = capacityDays > 0
          ? `${Math.round((mandays / capacityDays) * 100)}%`
          : "n.v.t.";
      }
      return `<td class="planning-load-cell ${visual.className}" style="background:${visual.color}" title="${tooltip}">${displayValue}</td>`;
    }).join("");
    body += `<tr class="planning-row${selectedClass}" data-consultant-id="${row.consultantId}"><th class="planning-name-col"><div class="planning-name-inner"><span class="planning-consultant-name">${row.consultantName}</span><button class="planning-export-btn" data-export-id="${row.consultantId}" title="Exporteer planning naar Excel">&#x2B07;</button></div></th><td class="planning-ratio-col">-</td>${cells}</tr>`;
    const assignmentRows = consultantDetails[row.consultantId] || [];
    const isExpanded = !!state.planningExpandedConsultants[row.consultantId];
    if (assignmentRows.length) {
      assignmentRows.forEach((assignmentRow) => {
        const offerCells = weeks.map((w) => {
          const numericValue = Number(assignmentRow.totals[w] || 0);
          const value = numericValue === 0 ? "" : numericValue.toFixed(1);
          if (assignmentRow.kind === "offer" || assignmentRow.kind === "project") {
            const canEditCell = canEditPlanningAssignmentCell(assignmentRow, w);
            const disabledAttr = canEditCell ? "" : " disabled";
            return `<td><input class="planning-detail-input" data-kind="${assignmentRow.kind}" data-id="${assignmentRow.id}" data-consultant-id="${assignmentRow.consultantId}" data-week-start="${w}" value="${value}" placeholder="0.0"${disabledAttr} /></td>`;
          }
          return `<td>${value}</td>`;
        }).join("");
        const kindClass = assignmentRow.kind === "project"
          ? "planning-project-name"
          : assignmentRow.kind === "vacation"
            ? "planning-project-name"
            : "planning-offer-name";
        let nameLabel;
        let realizationCell = "-";
        if (assignmentRow.kind === "project") {
          nameLabel = `${assignmentRow.code ? `${assignmentRow.code} - ` : ""}${assignmentRow.name}`;
          realizationCell = formatPercent(Number(assignmentRow.realizationRate || 0));
        } else {
          nameLabel = assignmentRow.name;
        }
        body += `<tr class="planning-detail-row${isExpanded ? " show" : ""}" data-detail-for="${row.consultantId}">
          <th class="${kindClass} planning-name-col">${nameLabel}</th>
          <td class="planning-ratio-col">${realizationCell}</td>
          ${offerCells}
        </tr>`;
      });
    } else {
      const emptyCells = weeks.map(() => "<td></td>").join("");
      body += `<tr class="planning-detail-row${isExpanded ? " show" : ""}" data-detail-for="${row.consultantId}">
        <th class="planning-offer-empty planning-name-col">Geen offerte/project allocaties</th>
        <td class="planning-ratio-col">-</td>
        ${emptyCells}
      </tr>`;
    }
  });

  planningTableWrap.innerHTML = `
    <div class="planning-main-scroll">
      <table class="planning-table planning-main-table" style="min-width:${tableMinWidth}px;">
        <thead><tr><th class="planning-name-col">Consultant</th><th class="planning-ratio-col">RG</th>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
  bindPlanningRowToggles();
  const selectedRow = rows.find((r) => r.consultantId === state.selectedPlanningConsultantId) || null;
  renderPlanningPersonChart(weeks, rows, selectedRow);
  renderPlanningProjectTimelineChart(selectedRow ? selectedRow.consultant : null);
}

function isWeekFullyPast(weekStartIso) {
  const dt = parseIsoDate(weekStartIso);
  if (!dt) return false;
  const weekEnd = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 6);
  return startOfDay(weekEnd) < startOfDay(new Date());
}

function canEditPlanningAssignmentCell(assignmentRow, weekStartIso) {
  if (!assignmentRow || !assignmentRow.isEditable) return false;
  if (!weekStartIso) return false;
  if (assignmentRow.kind === "offer") {
    if (assignmentRow.submissionDate && weekStartIso > assignmentRow.submissionDate) return false;
    return true;
  }
  if (assignmentRow.kind === "project") {
    if (assignmentRow.startDate && weekStartIso < assignmentRow.startDate) return false;
    if (assignmentRow.deliveryDate && weekStartIso > assignmentRow.deliveryDate) return false;
    if (isWeekFullyPast(weekStartIso)) return false;
    return true;
  }
  return false;
}

function buildConsultantAssignmentDetails(weeks) {
  const details = {};
  state.offers.forEach((offer) => {
    (offer.allocations || []).forEach((alloc) => {
      if (!weeks.includes(alloc.weekStart)) return;
      if (!details[alloc.consultantId]) details[alloc.consultantId] = [];
      let row = details[alloc.consultantId].find((r) => r.kind === "offer" && r.id === offer.id);
      if (!row) {
        row = {
          kind: "offer",
          id: offer.id,
          consultantId: alloc.consultantId,
          name: offer.name,
          code: "",
          isEditable: String(offer.status || "open").toLowerCase() === "open",
          submissionDate: offer.submissionDate || "",
          totals: {}
        };
        details[alloc.consultantId].push(row);
      }
      row.totals[alloc.weekStart] = Number(alloc.mandays || 0);
    });
  });

  state.projects.forEach((project) => {
    if (getProjectStatus(project) !== "actief") return;
    (project.allocations || []).forEach((alloc) => {
      if (!weeks.includes(alloc.weekStart)) return;
      if (!details[alloc.consultantId]) details[alloc.consultantId] = [];
      let row = details[alloc.consultantId].find((r) => r.kind === "project" && r.id === project.id);
      if (!row) {
        row = {
          kind: "project",
          id: project.id,
          consultantId: alloc.consultantId,
          name: project.name,
          code: project.projectNumber || "",
          realizationRate: Number(project.expectedRealizationRate || 0),
          isEditable: getProjectStatus(project) === "actief",
          startDate: project.startDate || project.createdDate || "",
          deliveryDate: project.deliveryDate || "",
          totals: {}
        };
        details[alloc.consultantId].push(row);
      }
      row.totals[alloc.weekStart] = Number(alloc.mandays || 0);
    });
  });

  state.consultants.forEach((consultant) => {
    if (!details[consultant.id]) details[consultant.id] = [];
    (consultant.vacationHistory || []).forEach((vacation) => {
      const row = {
        kind: "vacation",
        id: vacation.id,
        consultantId: consultant.id,
        name: "Vakantie",
        code: "",
        isEditable: false,
        totals: {}
      };
      weeks.forEach((weekStart) => {
        const days = countVacationMandaysInWeek(weekStart, vacation.startDate, vacation.endDate);
        if (days > 0) {
          row.totals[weekStart] = days;
        }
      });
      if (Object.keys(row.totals).length) {
        details[consultant.id].push(row);
      }
    });
  });

  return details;
}

function bindPlanningRowToggles() {
  planningTableWrap.querySelectorAll(".planning-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest(".planning-export-btn")) return;
      const consultantId = Number(row.dataset.consultantId);
      if (!Number.isFinite(consultantId)) return;
      state.selectedPlanningConsultantId = consultantId;
      state.planningExpandedConsultants[consultantId] = !state.planningExpandedConsultants[consultantId];
      renderPlanningTable();
    });
  });
  planningTableWrap.querySelectorAll(".planning-export-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const consultantId = Number(btn.dataset.exportId);
      if (Number.isFinite(consultantId)) exportConsultantPlanning(consultantId);
    });
  });
}

function renderPlanningPersonChart(weeks, rows, selectedRow) {
  if (!planningPersonChart) return;
  const ctx = planningPersonChart.getContext("2d");
  const width = Math.max(700, planningPersonChart.clientWidth || 700);
  const height = 260;
  const dpr = window.devicePixelRatio || 1;
  planningPersonChart.width = Math.floor(width * dpr);
  planningPersonChart.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (!selectedRow) {
    if (planningPersonMeta) planningPersonMeta.textContent = "Klik op een consultant in de planningtabel.";
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Selecteer een consultant om capaciteit vs bezetting te zien.", 20, 36);
    return;
  }

  if (planningPersonMeta) {
    planningPersonMeta.textContent = `${selectedRow.consultantName} - mandagen per week (balk) vs capaciteit (lijn)`;
  }

  const pad = { left: 48, right: 16, top: 18, bottom: 44 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const usedValues = weeks.map((w) => Number(selectedRow.totals[w] || 0));
  const vacationValues = weeks.map((w) => Number((selectedRow.vacationTotals || {})[w] || 0));
  const plannedValues = weeks.map((_, idx) => Math.max(0, usedValues[idx] - vacationValues[idx]));
  const capValues = weeks.map((w) => Number(getWeeklyCapacityDays(selectedRow.consultant, w) || 0));
  const maxY = Math.max(1, Math.ceil(Math.max(...usedValues, ...capValues)));

  ctx.strokeStyle = "#e5eaf2";
  ctx.lineWidth = 1;
  for (let yv = 0; yv <= maxY; yv++) {
    const y = pad.top + chartH - ((yv / maxY) * chartH);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    if (yv % 1 === 0) {
      ctx.fillStyle = "#5e6a7c";
      ctx.font = "12px Segoe UI";
      ctx.fillText(String(yv), 8, y + 4);
    }
  }

  const xFor = (idx) => pad.left + (chartW * idx) / Math.max(1, weeks.length - 1);
  const yFor = (v) => pad.top + chartH - ((v / maxY) * chartH);
  const barW = Math.max(8, Math.min(26, chartW / Math.max(weeks.length * 1.8, 10)));

  usedValues.forEach((v, idx) => {
    const x = xFor(idx) - (barW / 2);
    const planned = plannedValues[idx];
    const vacation = vacationValues[idx];
    const yPlanned = yFor(planned);
    const yTotal = yFor(v);
    const hPlanned = pad.top + chartH - yPlanned;
    const hVacation = Math.max(0, yPlanned - yTotal);
    ctx.fillStyle = "rgba(232,57,42,0.60)";
    ctx.fillRect(x, yPlanned, barW, hPlanned);
    if (vacation > 0) {
      ctx.fillStyle = "rgba(120, 128, 140, 0.75)";
      ctx.fillRect(x, yTotal, barW, hVacation);
    }
  });

  ctx.strokeStyle = "#d32f2f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  capValues.forEach((v, idx) => {
    const x = xFor(idx);
    const y = yFor(v);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  capValues.forEach((v, idx) => {
    const x = xFor(idx);
    const y = yFor(v);
    ctx.fillStyle = "#d32f2f";
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Monthly tick lines + labels across full x-axis
  ctx.font = "11px Segoe UI";
  let lastMonthSeen = -1;
  weeks.forEach((week, idx) => {
    const d = parseIsoDate(week);
    if (!d) return;
    const month = d.getMonth();
    if (month !== lastMonthSeen) {
      lastMonthSeen = month;
      const x = xFor(idx);
      // Subtle vertical guide line at month boundary
      ctx.strokeStyle = "#dde2ea";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + chartH);
      ctx.stroke();
      ctx.setLineDash([]);
      // Month label — include year when it's January or the first label
      const monthName = d.toLocaleString("nl-BE", { month: "short" });
      const yearSuffix = month === 0 ? ` '${String(d.getFullYear()).slice(2)}` : "";
      const label = `${monthName}${yearSuffix}`;
      const lw = ctx.measureText(label).width;
      const labelX = Math.max(pad.left, Math.min(x - lw / 2, width - pad.right - lw));
      ctx.fillStyle = "#5e6a7c";
      ctx.fillText(label, labelX, height - 12);
    }
  });

  ctx.fillStyle = "#f4524d";
  ctx.fillRect(pad.left, 4, 12, 8);
  ctx.fillStyle = "#5e6a7c";
  ctx.font = "12px Segoe UI";
  ctx.fillText("Bezetting excl. vakantie", pad.left + 18, 11);
  ctx.fillStyle = "#7b8491";
  ctx.fillRect(pad.left + 155, 4, 12, 8);
  ctx.fillStyle = "#5e6a7c";
  ctx.fillText("Vakantie", pad.left + 173, 11);
  ctx.strokeStyle = "#d32f2f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad.left + 255, 8);
  ctx.lineTo(pad.left + 267, 8);
  ctx.stroke();
  ctx.fillStyle = "#5e6a7c";
  ctx.fillText("Capaciteit (max)", pad.left + 273, 11);
}

function renderPlanningProjectTimelineChart(selectedConsultant) {
  if (!planningProjectTimelineChart) return;
  const ctx = planningProjectTimelineChart.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const today = startOfDay(new Date());
  const dayMs = 86400000;
  const viewDays = 92;
  const pad = { left: 24, right: 24, top: 18, bottom: 44 };
  const rowHeight = 24;
  const rowGap = 10;
  const viewportWidth = Math.max(
    760,
    planningProjectTimelineScroll
      ? planningProjectTimelineScroll.clientWidth
      : (planningProjectTimelineChart.clientWidth || 760)
  );
  const pxPerDay = (viewportWidth - pad.left - pad.right) / viewDays;
  const stateRef = renderPlanningProjectTimelineChart._state || { bound: false, anchored: false };
  renderPlanningProjectTimelineChart._state = stateRef;

  if (!selectedConsultant) {
    const width = viewportWidth;
    const height = 180;
    planningProjectTimelineChart.width = Math.floor(width * dpr);
    planningProjectTimelineChart.height = Math.floor(height * dpr);
    planningProjectTimelineChart.style.width = `${width}px`;
    planningProjectTimelineChart.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    if (planningProjectTimelineMeta) {
      planningProjectTimelineMeta.textContent = "Klik op een consultant in de planningtabel.";
    }
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen consultant geselecteerd.", 16, 34);
    return;
  }

  const consultantProjects = state.projects
    .filter((p) => getProjectStatus(p) === "actief")
    .filter((p) => {
      const inStaff = (p.staff || []).some((s) => Number(s.consultantId) === Number(selectedConsultant.id));
      const inAlloc = (p.allocations || []).some((a) => Number(a.consultantId) === Number(selectedConsultant.id));
      return inStaff || inAlloc;
    })
    .map((p) => ({
      ...p,
      created: parseIsoDate(p.startDate || p.createdDate),
      delivery: parseIsoDate(p.deliveryDate)
    }))
    .filter((p) => p.delivery && p.delivery >= today)
    .sort((a, b) => a.delivery - b.delivery);

  const consultantVacations = (selectedConsultant.vacationHistory || [])
    .map((v) => ({
      id: v.id,
      name: "Vakantie",
      projectNumber: "",
      kind: "vacation",
      created: parseIsoDate(v.startDate),
      delivery: parseIsoDate(v.endDate)
    }))
    .filter((v) => v.created && v.delivery && v.delivery >= today)
    .sort((a, b) => a.delivery - b.delivery);

  const consultantItems = consultantProjects
    .map((p) => ({ ...p, kind: "project" }))
    .sort((a, b) => a.delivery - b.delivery);

  if (planningProjectTimelineMeta) {
    planningProjectTimelineMeta.textContent = `${selectedConsultant.name} - actieve projecten: ${consultantProjects.length} | vakanties: ${consultantVacations.length}`;
  }

  const totalRows = consultantItems.length + (consultantVacations.length ? 1 : 0);
  const rowsHeight = totalRows
    ? (totalRows * rowHeight) + ((totalRows - 1) * rowGap)
    : 40;
  const height = Math.max(180, pad.top + pad.bottom + rowsHeight);

  if (!consultantItems.length && !consultantVacations.length) {
    const width = viewportWidth;
    planningProjectTimelineChart.width = Math.floor(width * dpr);
    planningProjectTimelineChart.height = Math.floor(height * dpr);
    planningProjectTimelineChart.style.width = `${width}px`;
    planningProjectTimelineChart.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Geen actieve projecten of vakanties voor deze consultant.", 16, 34);
    return;
  }

  let minDate = today;
  let maxDate = today;
  consultantItems.forEach((p) => {
    const start = p.created || today;
    if (start < minDate) minDate = start;
    if (p.delivery > maxDate) maxDate = p.delivery;
  });
  consultantVacations.forEach((v) => {
    const start = v.created || today;
    if (start < minDate) minDate = start;
    if (v.delivery > maxDate) maxDate = v.delivery;
  });

  const totalDays = Math.max(viewDays, Math.ceil((maxDate.getTime() - minDate.getTime()) / dayMs) + 1);
  const chartW = Math.max(viewportWidth - pad.left - pad.right, totalDays * pxPerDay);
  const width = Math.ceil(chartW + pad.left + pad.right);
  const prevScroll = planningProjectTimelineScroll ? planningProjectTimelineScroll.scrollLeft : 0;

  planningProjectTimelineChart.width = Math.floor(width * dpr);
  planningProjectTimelineChart.height = Math.floor(height * dpr);
  planningProjectTimelineChart.style.width = `${width}px`;
  planningProjectTimelineChart.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (planningProjectTimelineScroll && !stateRef.bound) {
    planningProjectTimelineScroll.addEventListener("scroll", () => {
      stateRef.anchored = true;
    });
    stateRef.bound = true;
  }

  const rangeStart = minDate;
  const rangeEnd = maxDate;
  const totalMs = Math.max(dayMs, rangeEnd.getTime() - rangeStart.getTime());
  const xFor = (date) => {
    const ratio = (date.getTime() - rangeStart.getTime()) / totalMs;
    return pad.left + (Math.max(0, Math.min(1, ratio)) * chartW);
  };

  const axisY = height - pad.bottom + 0.5;
  const todayX = xFor(today);
  ctx.strokeStyle = "#d7dce5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, axisY);
  ctx.lineTo(width - pad.right, axisY);
  ctx.stroke();

  let tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
  if (tick < rangeStart) tick = new Date(rangeStart.getFullYear(), rangeStart.getMonth() + 1, 1);
  ctx.font = "12px Segoe UI";
  while (tick <= rangeEnd) {
    const x = xFor(tick);
    ctx.strokeStyle = "#e8ecf3";
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, axisY);
    ctx.stroke();
    const label = `${String(tick.getMonth() + 1).padStart(2, "0")}/${tick.getFullYear()}`;
    const w = ctx.measureText(label).width;
    ctx.fillStyle = "#5e6a7c";
    ctx.fillText(label, x - (w / 2), height - 14);
    tick = new Date(tick.getFullYear(), tick.getMonth() + 1, 1);
  }

  ctx.strokeStyle = "#d33b3b";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(todayX, pad.top);
  ctx.lineTo(todayX, axisY);
  ctx.stroke();
  ctx.setLineDash([]);

  const barColor = "#f4524d";
  const barDoneColor = "#90a4b8";
  consultantItems.forEach((project, idx) => {
    const y = pad.top + (idx * (rowHeight + rowGap));
    const projectStart = project.created || today;
    const xStart = xFor(projectStart);
    const xEnd = xFor(project.delivery);
    const xDoneEnd = xFor(today > project.delivery ? project.delivery : today);
    const doneWidth = Math.max(0, xDoneEnd - xStart);
    const futureStart = Math.max(xStart, xDoneEnd);
    const futureWidth = Math.max(2, xEnd - futureStart);
    const trackY = y + 3;
    const trackH = rowHeight - 6;
    const label = `${project.projectNumber ? `${project.projectNumber} - ` : ""}${project.name}`;
    const doneColor = barDoneColor;
    const futureColor = barColor;

    if (doneWidth > 0) {
      ctx.fillStyle = doneColor;
      ctx.fillRect(xStart, trackY, doneWidth, trackH);
    }
    ctx.fillStyle = futureColor;
    ctx.fillRect(futureStart, trackY, futureWidth, trackH);

    ctx.font = "12px Segoe UI";
    const labelWidth = ctx.measureText(label).width;
    const barInnerWidth = futureWidth - 14;
    if (barInnerWidth >= labelWidth) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, futureStart + 7, y + 15);
    } else {
      ctx.fillStyle = "#1c2431";
      const outsideX = Math.min(width - pad.right - labelWidth, xEnd + 6);
      ctx.fillText(label, outsideX, y + 15);
    }
  });

  if (consultantVacations.length) {
    const vacationRowIndex = consultantItems.length;
    const y = pad.top + (vacationRowIndex * (rowHeight + rowGap));
    const trackY = y + 3;
    const trackH = rowHeight - 6;
    consultantVacations.forEach((vacation, idx) => {
      const vacationStart = vacation.created || today;
      const xStart = xFor(vacationStart);
      const xEnd = xFor(vacation.delivery);
      const xDoneEnd = xFor(today > vacation.delivery ? vacation.delivery : today);
      const doneWidth = Math.max(0, xDoneEnd - xStart);
      const futureStart = Math.max(xStart, xDoneEnd);
      const futureWidth = Math.max(2, xEnd - futureStart);
      if (doneWidth > 0) {
        ctx.fillStyle = "#c4cbd4";
        ctx.fillRect(xStart, trackY, doneWidth, trackH);
      }
      ctx.fillStyle = "#8b949f";
      ctx.fillRect(futureStart, trackY, futureWidth, trackH);

      if (idx === 0) {
        const label = "Vakantie";
        ctx.font = "12px Segoe UI";
        const labelWidth = ctx.measureText(label).width;
        const barInnerWidth = futureWidth - 14;
        if (barInnerWidth >= labelWidth) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(label, futureStart + 7, y + 15);
        } else {
          ctx.fillStyle = "#1c2431";
          const outsideX = Math.min(width - pad.right - labelWidth, xEnd + 6);
          ctx.fillText(label, outsideX, y + 15);
        }
      }
    });
  }

  if (planningProjectTimelineScroll) {
    if (!stateRef.anchored) {
      const target = Math.max(0, todayX - (planningProjectTimelineScroll.clientWidth / 2));
      planningProjectTimelineScroll.scrollLeft = target;
      stateRef.anchored = true;
    } else {
      planningProjectTimelineScroll.scrollLeft = Math.min(prevScroll, planningProjectTimelineScroll.scrollWidth);
    }
  }
}

function getRegimeForDate(consultant, isoDate) {
  const regimes = (consultant.regimeHistory || [])
    .slice()
    .sort((a, b) => (a.from || "").localeCompare(b.from || ""));

  let activeRegime = null;
  for (const r of regimes) {
    if (!r.from || r.from > isoDate) continue;
    if (r.to && isoDate > r.to) continue;
    activeRegime = r;
  }
  return activeRegime ? Number(activeRegime.regime) : 100;
}

function getRoleForDate(consultant, isoDate) {
  const roles = (consultant.roleHistory || [])
    .slice()
    .sort((a, b) => (a.from || "").localeCompare(b.from || ""));

  let activeRole = null;
  for (const r of roles) {
    if (!r.from || r.from > isoDate) continue;
    if (r.to && isoDate > r.to) continue;
    activeRole = r;
  }
  return activeRole ? String(activeRole.role || "").toLowerCase() : null;
}

function computeFteSeriesByRole(entityFilter) {
  if (!state.consultants.length) return [];

  let minDate = null;
  let maxDate = new Date();

  const consultants = state.consultants.filter((c) => entityFilter === "ALL" || c.entity === entityFilter);
  if (!consultants.length) return [];

  for (const c of consultants) {
    const start = parseIsoDate(c.startDate);
    if (start && (!minDate || start < minDate)) minDate = start;
    const exit = parseIsoDate(c.exitDate);
    if (exit && exit > maxDate) maxDate = exit;

    for (const r of c.regimeHistory || []) {
      const rFrom = parseIsoDate(r.from);
      const rTo = parseIsoDate(r.to);
      if (rFrom && (!minDate || rFrom < minDate)) minDate = rFrom;
      if (rTo && rTo > maxDate) maxDate = rTo;
    }
  }

  if (!minDate) return [];

  const start = monthStart(minDate);
  const end = monthStart(maxDate);
  const series = [];

  for (let current = new Date(start); current <= end; current = addMonths(current, 1)) {
    const iso = toIsoFromDate(current);
    const levels = { junior: 0, medior: 0, senior: 0, expert: 0, director: 0 };
    for (const c of consultants) {
      if (!c.startDate || c.startDate > iso) continue;
      if (c.exitDate && c.exitDate < iso) continue;
      const regime = getRegimeForDate(c, iso);
      const fte = regime / 100;
      const role = getRoleForDate(c, iso);
      if (role && ROLE_ORDER.includes(role)) {
        levels[role] += fte;
      } else {
        levels.junior += fte;
      }
    }
    const total = ROLE_ORDER.reduce((sum, role) => sum + levels[role], 0);
    series.push({ date: new Date(current), total, levels });
  }

  return series;
}

function renderFteChart() {
  if (!fteChart) return;
  const selectedEntity = fteEntityFilter ? fteEntityFilter.value : "ALL";
  const stackRoles = [...ROLE_ORDER].reverse();
  const series = computeFteSeriesByRole(selectedEntity);
  const current = series.length ? series[series.length - 1].total : 0;
  if (fteSummary) fteSummary.textContent = `Huidige FTE: ${current.toFixed(2)}`;

  const ctx = fteChart.getContext("2d");
  const width = Math.max(400, fteChart.clientWidth || 400);
  const height = 260;
  const dpr = window.devicePixelRatio || 1;
  fteChart.width = Math.floor(width * dpr);
  fteChart.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const pad = { left: 48, right: 16, top: 20, bottom: 38 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (!series.length) {
    if (fteLegend) fteLegend.innerHTML = "";
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "14px Segoe UI";
    ctx.fillText("Nog geen data voor FTE-grafiek.", pad.left, pad.top + 20);
    return;
  }

  if (fteLegend) {
    const legendRows = stackRoles.map((role) => {
      const label = role.charAt(0).toUpperCase() + role.slice(1);
      return `<span class="legend-item"><span class="legend-swatch" style="background:${ROLE_COLORS[role]}"></span>${label}</span>`;
    }).join("");
    fteLegend.innerHTML = legendRows;
  }

  const maxFte = Math.max(1, ...series.map((p) => p.total));
  const yMax = Math.max(1, Math.ceil(maxFte * 1.1));
  const yTickStep = Math.max(1, Math.ceil(yMax / 8));

  ctx.strokeStyle = "#e5eaf2";
  ctx.lineWidth = 1;
  for (let value = 0; value <= yMax; value += yTickStep) {
    const y = pad.top + chartH - (value / yMax) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();

    ctx.fillStyle = "#5e6a7c";
    ctx.font = "12px Segoe UI";
    ctx.fillText(String(value), 8, y + 4);
  }
  if (yMax % yTickStep !== 0) {
    const y = pad.top;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillStyle = "#5e6a7c";
    ctx.font = "12px Segoe UI";
    ctx.fillText(String(yMax), 8, y + 4);
  }

  const xFor = (idx) => pad.left + (chartW * idx) / Math.max(1, series.length - 1);
  const yFor = (value) => pad.top + chartH - (value / yMax) * chartH;

  const cumulativeByRole = {};
  let running = Array.from({ length: series.length }, () => 0);
  for (const role of stackRoles) {
    const current = series.map((p, idx) => running[idx] + p.levels[role]);
    cumulativeByRole[role] = current;
    running = current;
  }

  for (const role of stackRoles) {
    const top = cumulativeByRole[role];
    const base = stackRoles.indexOf(role) === 0
      ? Array.from({ length: series.length }, () => 0)
      : cumulativeByRole[stackRoles[stackRoles.indexOf(role) - 1]];

    ctx.fillStyle = ROLE_FILL_COLORS[role];
    ctx.beginPath();
    series.forEach((_, idx) => {
      const x = xFor(idx);
      const y = yFor(top[idx]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    for (let idx = series.length - 1; idx >= 0; idx--) {
      const x = xFor(idx);
      const y = yFor(base[idx]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = ROLE_COLORS[role];
    ctx.lineWidth = 2;
    ctx.beginPath();
    series.forEach((_, idx) => {
      const x = xFor(idx);
      const y = yFor(top[idx]);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  ctx.fillStyle = "#5e6a7c";
  ctx.font = "12px Segoe UI";
  const yearStartIndex = new Map();
  series.forEach((point, idx) => {
    const year = point.date.getFullYear();
    if (!yearStartIndex.has(year)) yearStartIndex.set(year, idx);
  });
  const years = Array.from(yearStartIndex.keys());
  years.forEach((year, pos) => {
    const idx = yearStartIndex.get(year);
    let x = xFor(idx);
    const label = String(year);
    const labelW = ctx.measureText(label).width;
    if (pos === 0) {
      x = Math.max(pad.left, x);
    } else if (pos === years.length - 1) {
      x = Math.min(width - pad.right - labelW, x);
    } else {
      x -= labelW / 2;
    }
    ctx.fillText(label, x, height - 12);
  });
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}


async function exportConsultantPlanning(consultantId) {
  const btn = planningTableWrap
    ? planningTableWrap.querySelector(`.planning-export-btn[data-export-id="${consultantId}"]`)
    : null;
  if (btn) {
    btn.disabled = true;
    btn.textContent = "…";
  }

  // Temporarily select this consultant so both charts are rendered
  const prevSelected = state.selectedPlanningConsultantId;
  state.selectedPlanningConsultantId = consultantId;
  renderPlanningTable();

  // Wait two animation frames so canvas drawing completes
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  const capacityCanvas = document.getElementById("planning-person-chart");
  const timelineCanvas = document.getElementById("planning-project-timeline-chart");
  const capacityChartBase64 = capacityCanvas ? capacityCanvas.toDataURL("image/png") : "";
  const timelineChartBase64 = timelineCanvas ? timelineCanvas.toDataURL("image/png") : "";

  try {
    const response = await fetch("/api/export/consultant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consultantId, capacityChartBase64, timelineChartBase64 }),
    });
    if (!response.ok) {
      let msg = `HTTP ${response.status}`;
      try { const err = await response.json(); msg = err.error || msg; } catch (_) {}
      alert("Export mislukt: " + msg);
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const disposition = response.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="([^"]+)"/);
    a.download = match ? match[1] : `planning_consultant.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Export mislukt: " + err.message);
  } finally {
    // Restore original selection
    state.selectedPlanningConsultantId = prevSelected;
    renderPlanningTable();
  }
}

async function loadConsultants() {
  const payload = await apiGet("/api/consultants");
  applyConsultants(payload.consultants, payload.overheadCosts);
}

async function loadOffers() {
  const payload = await apiGet("/api/offers");
  applyOffers(payload.offers);
}

async function loadProjects() {
  const payload = await apiGet("/api/projects");
  applyProjects(payload.projects);
}

async function loadAnalysis() {
  const payload = await apiGet("/api/analysis/timesheets");
  applyAnalysis(payload);
}

async function loadOhw() {
  const payload = await apiGet("/api/ohw");
  applyOhw(payload);
}

async function loadInvoices() {
  const payload = await apiGet("/api/invoices");
  state.invoices = {
    rows: Array.isArray(payload.rows) ? payload.rows : [],
    columns: Array.isArray(payload.columns) ? payload.columns : [],
    error: payload.error || ""
  };
}

function renderInvoices() {
  if (!facturatieTableWrap) return;
  const { rows, columns, error } = state.invoices;
  if (error) {
    facturatieTableWrap.innerHTML = `<p style="color:var(--danger)">${escapeHtml(error)}</p>`;
    return;
  }
  if (!rows.length) {
    facturatieTableWrap.innerHTML = "<p>Geen factuurdata beschikbaar.</p>";
    return;
  }

  const search = (state.invoiceSearch || "").toLowerCase();
  let filtered = rows;
  if (search) {
    filtered = rows.filter((row) =>
      columns.some((col) => {
        const v = row[col];
        return v != null && String(v).toLowerCase().includes(search);
      })
    );
  }

  const sortKey = state.invoiceSort.key;
  const sortDir = state.invoiceSort.dir === "asc" ? 1 : -1;
  if (sortKey && columns.includes(sortKey)) {
    filtered = filtered.slice().sort((a, b) => {
      let av = a[sortKey] ?? "";
      let bv = b[sortKey] ?? "";
      const an = parseFloat(av);
      const bn = parseFloat(bv);
      if (!isNaN(an) && !isNaN(bn)) {
        return (an - bn) * sortDir;
      }
      return String(av).localeCompare(String(bv)) * sortDir;
    });
  }

  if (facturatieMeta) {
    facturatieMeta.textContent = `Bron: List of Invoices.xlsx | ${filtered.length} van ${rows.length} facturen`;
  }

  const sortArrow = (col) => {
    if (state.invoiceSort.key !== col) return "";
    return state.invoiceSort.dir === "asc" ? " ▲" : " ▼";
  };

  const thead = columns.map((col) =>
    `<th data-inv-sort="${escapeHtml(col)}" style="cursor:pointer;white-space:nowrap">${escapeHtml(col)}${sortArrow(col)}</th>`
  ).join("");

  const tbody = filtered.map((row) =>
    `<tr>${columns.map((col) => {
      const val = row[col];
      return `<td>${val != null ? escapeHtml(String(val)) : ""}</td>`;
    }).join("")}</tr>`
  ).join("");

  facturatieTableWrap.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr>${thead}</tr></thead>
        <tbody>${tbody || "<tr><td colspan='${columns.length}'>Geen resultaten.</td></tr>"}</tbody>
      </table>
    </div>
  `;
}

async function deleteTimelineEntry(type, entryId) {
  const selected = getSelected();
  if (!selected) return;
  const ok = confirm("Deze historiekregel verwijderen?");
  if (!ok) return;
  const payload = await apiPost(`/api/consultants/${selected.id}/${type}/${entryId}/delete`, {});
  applyConsultants(payload.consultants);
  render();
}

async function editTimelineEntry(type, entryId) {
  const selected = getSelected();
  if (!selected) return;

  const entries = type === "role"
    ? (selected.roleHistory || [])
    : type === "regime"
      ? (selected.regimeHistory || [])
      : (selected.costHistory || []);
  const entry = entries.find((e) => String(e.id) === String(entryId));
  if (!entry) return;

  let value;
  if (type === "role") {
    const current = entry.role || "junior";
    value = prompt("Functie (junior, medior, senior, expert, director):", current);
    if (value === null) return;
    value = value.trim().toLowerCase();
  } else if (type === "regime") {
    const current = String(entry.regime ?? 100);
    value = prompt("Werkregime (1-100):", current);
    if (value === null) return;
    value = Number(value);
    if (!Number.isFinite(value)) {
      alert("Werkregime moet een getal zijn.");
      return;
    }
  } else {
    const currentYear = String(entry.year || "");
    const yearRaw = prompt("Jaar (yyyy):", currentYear);
    if (yearRaw === null) return;
    const year = Number((yearRaw || "").trim());
    if (!Number.isFinite(year) || year < 1900 || year > 3000) {
      alert("Jaar is ongeldig.");
      return;
    }
    const currentCost = formatNumberInputBE(entry.cost || 0);
    const costRaw = prompt("Kostprijs (EUR):", currentCost);
    if (costRaw === null) return;
    const cost = parseLocalizedNumber((costRaw || "").trim());
    if (!Number.isFinite(cost) || cost < 0) {
      alert("Kostprijs moet een positief getal zijn.");
      return;
    }
    const payload = await apiPost(`/api/consultants/${selected.id}/cost/${entryId}/update`, {
      year: Number(year),
      cost
    });
    applyConsultants(payload.consultants);
    render();
    return;
  }

  const from = prompt("Van (dd/mm/jjjj):", apiDateToInput(entry.from));
  if (from === null) return;
  const to = prompt("Tot (dd/mm/jjjj of leeg):", apiDateToInput(entry.to || ""));
  if (to === null) return;

  const fromIso = toIsoDate(from.trim());
  if (!fromIso) {
    alert("Van-datum moet in formaat dd/mm/jjjj zijn.");
    return;
  }

  const toTrim = to.trim();
  const toIso = toTrim ? toIsoDate(toTrim) : "";
  if (toTrim && !toIso) {
    alert("Tot-datum moet in formaat dd/mm/jjjj zijn.");
    return;
  }

  const body = {
    from: fromIso,
    to: toIso
  };
  if (type === "role") body.role = value;
  if (type === "regime") body.regime = Number(value);

  const payload = await apiPost(`/api/consultants/${selected.id}/${type}/${entryId}/update`, body);
  applyConsultants(payload.consultants);
  render();
}

consultantForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(consultantForm);

  const name = document.getElementById("name").value.trim();
  const startDateInput = document.getElementById("start-date").value.trim();
  const exitDateInput = document.getElementById("exit-date").value.trim();
  const startDate = toIsoDate(startDateInput);
  const exitDate = exitDateInput ? toIsoDate(exitDateInput) : "";
  const entity = entityInput ? entityInput.value : "RPL BE";
  if (!name || !startDateInput) {
    addError(consultantForm, "Naam en indiensttreding zijn verplicht.");
    return;
  }
  if (!startDate) {
    addError(consultantForm, "Indiensttreding moet in formaat dd/mm/jjjj zijn.");
    return;
  }
  if (exitDateInput && !exitDate) {
    addError(consultantForm, "Uit dienst datum moet dd/mm/jjjj zijn.");
    return;
  }

  try {
    const payload = await apiPost("/api/consultants", { name, startDate, exitDate, entity });
    applyConsultants(payload.consultants);
    await loadAnalysis();
    state.selectedId = state.consultants.find((c) => c.name === name && c.startDate === startDate)?.id || state.selectedId;
    consultantForm.reset();
    render();
  } catch (err) {
    addError(consultantForm, err.message);
  }
});

if (consultantEditForm) {
  consultantEditForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(consultantEditForm);
    const selected = getSelected();
    if (!selected) {
      addError(consultantEditForm, "Selecteer eerst een consultant.");
      return;
    }
    const startInput = (consultantEditStartDate.value || "").trim();
    const exitInput = (consultantEditExitDate.value || "").trim();
    const startDate = toIsoDate(startInput);
    const exitDate = exitInput ? toIsoDate(exitInput) : "";
    const entity = consultantEditEntity.value;
    if (!startDate) {
      addError(consultantEditForm, "Indienst moet in formaat dd/mm/jjjj zijn.");
      return;
    }
    if (exitInput && !exitDate) {
      addError(consultantEditForm, "Uit dienst moet in formaat dd/mm/jjjj zijn.");
      return;
    }
    if (exitDate && parseIsoDate(exitDate) < parseIsoDate(startDate)) {
      addError(consultantEditForm, "Uit dienst kan niet voor indienst liggen.");
      return;
    }
    try {
      const payload = await apiPost(`/api/consultants/${selected.id}/update`, {
        name: selected.name,
        startDate,
        exitDate,
        entity
      });
      applyConsultants(payload.consultants);
      await loadOffers();
      await loadProjects();
      await loadAnalysis();
      render();
    } catch (err) {
      addError(consultantEditForm, err.message);
    }
  });
}

offerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(offerForm);
  const name = (document.getElementById("offer-name").value || "").trim();
  const submissionInput = (document.getElementById("offer-submission-date").value || "").trim();
  const submissionDate = toIsoDate(submissionInput);
  if (!name || !submissionInput) {
    addError(offerForm, "Offertenaam en indieningsdatum zijn verplicht.");
    return;
  }
  if (!submissionDate) {
    addError(offerForm, "Indieningsdatum moet in formaat dd/mm/jjjj zijn.");
    return;
  }
  try {
    const payload = await apiPost("/api/offers", { name, submissionDate });
    applyOffers(payload.offers);
    state.selectedOfferId = state.offers.find((o) => o.name === name && o.submissionDate === submissionDate)?.id || state.selectedOfferId;
    offerForm.reset();
    renderOffers();
  } catch (err) {
    addError(offerForm, err.message);
  }
});

offerStaffForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(offerStaffForm);
  const offer = getSelectedOffer();
  if (!offer) {
    addError(offerStaffForm, "Selecteer eerst een offerte.");
    return;
  }
  const consultantId = Number(offerConsultant.value);
  if (!consultantId) {
    addError(offerStaffForm, "Consultant is verplicht.");
    return;
  }
  const selectedConsultant = state.consultants.find((c) => c.id === consultantId);
  if (!selectedConsultant || !isConsultantActiveOnDate(selectedConsultant, toIsoFromDate(new Date()))) {
    addError(offerStaffForm, "Je kan enkel actieve consultants toevoegen.");
    renderOfferConsultantOptions();
    return;
  }
  try {
    const payload = await apiPost(`/api/offers/${offer.id}/staff`, { consultantId });
    applyOffers(payload.offers);
    renderOffers();
  } catch (err) {
    addError(offerStaffForm, err.message);
  }
});

offerAllocationsMatrix.addEventListener("change", async (e) => {
  const input = e.target.closest("input.matrix-input");
  if (!input) return;
  const offer = getSelectedOffer();
  if (!offer) return;
  if (offer.status !== "open") return;

  const consultantId = Number(input.dataset.consultantId);
  const weekStart = input.dataset.weekStart;
  const raw = (input.value || "").trim();
  const mandays = raw === "" ? 0 : Number(raw);
  if (!Number.isFinite(mandays) || mandays < 0) {
    input.value = "";
    return;
  }
  try {
    const payload = await apiPost(`/api/offers/${offer.id}/allocations`, {
      consultantId,
      weekStart,
      mandays
    });
    applyOffers(payload.offers);
    renderOffers();
  } catch (err) {
    setStatus(`Fout bij opslaan matrix: ${err.message}`, true);
  }
});

offerEditForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(offerEditForm);
  const offer = getSelectedOffer();
  if (!offer) {
    addError(offerEditForm, "Selecteer eerst een offerte.");
    return;
  }
  const name = (offerEditName.value || "").trim();
  const submissionInput = (offerEditSubmissionDate.value || "").trim();
  const submissionDate = toIsoDate(submissionInput);
  const status = offerEditStatus.value;
  if (!name || !submissionDate) {
    addError(offerEditForm, "Titel en geldige indieningsdatum zijn verplicht.");
    return;
  }
  try {
    const payload = await apiPost(`/api/offers/${offer.id}/update`, {
      name,
      submissionDate,
      status
    });
    applyOffers(payload.offers);
    renderOffers();
  } catch (err) {
    addError(offerEditForm, err.message);
  }
});

offerDeleteBtn.addEventListener("click", async () => {
  const offer = getSelectedOffer();
  if (!offer) return;
  if (!confirm("Deze offerte verwijderen?")) return;
  try {
    const payload = await apiPost(`/api/offers/${offer.id}/delete`, {});
    applyOffers(payload.offers);
    renderOffers();
  } catch (err) {
    setStatus(`Fout bij verwijderen offerte: ${err.message}`, true);
  }
});

if (projectForm) {
  projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(projectForm);
    const projectNumber = (document.getElementById("project-number").value || "").trim();
    const name = (document.getElementById("project-name").value || "").trim();
    const startInput = (document.getElementById("project-start-date").value || "").trim();
    const deliveryInput = (document.getElementById("project-delivery-date").value || "").trim();
    const budgetRaw = (document.getElementById("project-budget").value || "").trim();
    const leadConsultantIdRaw = projectLeadConsultant ? projectLeadConsultant.value : "";
    const billingType = projectBillingType ? projectBillingType.value : "regie";
    const prevBudgetTotalRaw = projectPrevBudgetTotal ? projectPrevBudgetTotal.value : "";
    const nextBudgetTotalRaw = projectNextBudgetTotal ? projectNextBudgetTotal.value : "";
    const capAmountRaw = projectCapAmount ? projectCapAmount.value : "";
    const startDate = startInput ? toIsoDate(startInput) : "";
    const deliveryDate = toIsoDate(deliveryInput);
    let budget = parseLocalizedNumber(budgetRaw);
    const leadConsultantId = leadConsultantIdRaw ? Number(leadConsultantIdRaw) : null;
    const previousBudgetTotal = parseOptionalNumberInput(prevBudgetTotalRaw);
    const nextBudgetTotal = parseOptionalNumberInput(nextBudgetTotalRaw);
    const capAmountParsed = parseOptionalNumberInput(capAmountRaw);
    let capAmount = capAmountParsed === null ? null : capAmountParsed;
    if (!projectNumber || !name || !deliveryInput) {
      addError(projectForm, "Projectnummer, projectnaam en opleveringsdatum zijn verplicht.");
      return;
    }
    if (startInput && !startDate) {
      addError(projectForm, "Startdatum moet in formaat dd/mm/jjjj zijn.");
      return;
    }
    if (!deliveryDate) {
      addError(projectForm, "Opleveringsdatum moet in formaat dd/mm/jjjj zijn.");
      return;
    }
    if (startDate && parseIsoDate(startDate) > parseIsoDate(deliveryDate)) {
      addError(projectForm, "Startdatum kan niet na opleveringsdatum liggen.");
      return;
    }
    if (!["regie", "regie_cap", "fixed"].includes(billingType)) {
      addError(projectForm, "Type project moet regie, regie met cap of fixed budget zijn.");
      return;
    }
    if (billingType === "fixed") {
      if (!Number.isFinite(budget) || budget < 0) {
        addError(projectForm, "Budget moet een positief getal zijn.");
        return;
      }
      capAmount = 0;
    } else if (billingType === "regie_cap") {
      budget = 0;
      if (capAmount === null || capAmount <= 0) {
        addError(projectForm, "Cap moet groter dan 0 zijn voor regie met cap.");
        return;
      }
    } else {
      budget = 0;
      capAmount = 0;
    }
    if (leadConsultantIdRaw && !Number.isFinite(leadConsultantId)) {
      addError(projectForm, "Projectleider is ongeldig.");
      return;
    }
    if (!leadConsultantIdRaw) {
      addError(projectForm, "Projectleider is verplicht.");
      return;
    }
    if (previousBudgetTotal === null) {
      addError(projectForm, "Budget voorgaande jaren totaal moet een positief getal zijn.");
      return;
    }
    if (nextBudgetTotal === null) {
      addError(projectForm, "Budget komende jaren totaal moet een positief getal zijn.");
      return;
    }
    const prevTotal = billingType === "regie" ? 0 : previousBudgetTotal;
    const nextTotal = billingType === "regie" ? 0 : nextBudgetTotal;
    try {
      const payload = await apiPost("/api/projects", {
        projectNumber,
        name,
        startDate,
        deliveryDate,
        budget,
        leadConsultantId,
        billingType,
        previousBudgetTotal: prevTotal,
        nextBudgetTotal: nextTotal,
        capAmount,
        status: "actief"
      });
      applyProjects(payload.projects);
      state.selectedProjectId =
        state.projects.find((p) => p.projectNumber === projectNumber && p.deliveryDate === deliveryDate)?.id || state.selectedProjectId;
      projectForm.reset();
      if (projectCapAmount) projectCapAmount.value = "";
      if (projectBillingType) syncProjectBudgetInputs(projectBillingType.value, false);
      renderProjects();
    } catch (err) {
      addError(projectForm, err.message);
    }
  });
}

if (projectEditForm) {
  projectEditForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(projectEditForm);
    const project = getSelectedProject();
    if (!project) {
      addError(projectEditForm, "Selecteer eerst een project.");
      return;
    }
    const projectNumber = (projectEditNumber.value || "").trim();
    const name = (projectEditName.value || "").trim();
    const startInput = (projectEditStartDate ? projectEditStartDate.value : "").trim();
    const deliveryInput = (projectEditDeliveryDate.value || "").trim();
    const startDate = startInput ? toIsoDate(startInput) : "";
    const deliveryDate = toIsoDate(deliveryInput);
    let budget = parseLocalizedNumber(projectEditBudget.value);
    const leadConsultantIdRaw = projectEditLeadConsultant ? projectEditLeadConsultant.value : "";
    const leadConsultantId = leadConsultantIdRaw ? Number(leadConsultantIdRaw) : null;
    const billingType = projectEditBillingType ? projectEditBillingType.value : "regie";
    const previousBudgetTotal = parseOptionalNumberInput(projectEditPrevBudgetTotal ? projectEditPrevBudgetTotal.value : "");
    const nextBudgetTotal = parseOptionalNumberInput(projectEditNextBudgetTotal ? projectEditNextBudgetTotal.value : "");
    const capAmountParsed = parseOptionalNumberInput(projectEditCapAmount ? projectEditCapAmount.value : "");
    let capAmount = capAmountParsed === null ? null : capAmountParsed;
    const status = projectEditStatus.value;
    if (!projectNumber || !name || !deliveryDate) {
      addError(projectEditForm, "Projectnummer, titel en geldige opleveringsdatum zijn verplicht.");
      return;
    }
    if (startInput && !startDate) {
      addError(projectEditForm, "Startdatum moet in formaat dd/mm/jjjj zijn.");
      return;
    }
    if (startDate && parseIsoDate(startDate) > parseIsoDate(deliveryDate)) {
      addError(projectEditForm, "Startdatum kan niet na opleveringsdatum liggen.");
      return;
    }
    if (!["regie", "regie_cap", "fixed"].includes(billingType)) {
      addError(projectEditForm, "Type project moet regie, regie met cap of fixed budget zijn.");
      return;
    }
    if (billingType === "fixed") {
      if (!Number.isFinite(budget) || budget < 0) {
        addError(projectEditForm, "Budget moet een positief getal zijn.");
        return;
      }
      capAmount = 0;
    } else if (billingType === "regie_cap") {
      budget = 0;
      if (capAmount === null || capAmount <= 0) {
        addError(projectEditForm, "Cap moet groter dan 0 zijn voor regie met cap.");
        return;
      }
    } else {
      budget = 0;
      capAmount = 0;
    }
    if (leadConsultantIdRaw && !Number.isFinite(leadConsultantId)) {
      addError(projectEditForm, "Projectleider is ongeldig.");
      return;
    }
    if (!leadConsultantIdRaw) {
      addError(projectEditForm, "Projectleider is verplicht.");
      return;
    }
    if (previousBudgetTotal === null) {
      addError(projectEditForm, "Budget voorgaande jaren totaal moet een positief getal zijn.");
      return;
    }
    if (nextBudgetTotal === null) {
      addError(projectEditForm, "Budget komende jaren totaal moet een positief getal zijn.");
      return;
    }
    const prevTotal = billingType === "regie" ? 0 : previousBudgetTotal;
    const nextTotal = billingType === "regie" ? 0 : nextBudgetTotal;
    try {
      const payload = await apiPost(`/api/projects/${project.id}/update`, {
        projectNumber,
        name,
        startDate,
        deliveryDate,
        budget,
        leadConsultantId,
        billingType,
        previousBudgetTotal: prevTotal,
        nextBudgetTotal: nextTotal,
        capAmount,
        status
      });
      applyProjects(payload.projects);
      renderProjects();
    } catch (err) {
      addError(projectEditForm, err.message);
    }
  });
}

if (projectDeleteBtn) {
  projectDeleteBtn.addEventListener("click", async () => {
    const project = getSelectedProject();
    if (!project) return;
    if (!confirm("Dit project verwijderen?")) return;
    try {
      const payload = await apiPost(`/api/projects/${project.id}/delete`, {});
      applyProjects(payload.projects);
      renderProjects();
    } catch (err) {
      setStatus(`Fout bij verwijderen project: ${err.message}`, true);
    }
  });
}

if (projectStaffForm) {
  projectStaffForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(projectStaffForm);
    const project = getSelectedProject();
    if (!project) {
      addError(projectStaffForm, "Selecteer eerst een project.");
      return;
    }
    const consultantId = Number(projectConsultant.value);
    if (!consultantId) {
      addError(projectStaffForm, "Consultant is verplicht.");
      return;
    }
    const hourlyRate = 0;
    const selectedConsultant = state.consultants.find((c) => c.id === consultantId);
    if (!selectedConsultant || !isConsultantActiveOnDate(selectedConsultant, toIsoFromDate(new Date()))) {
      addError(projectStaffForm, "Je kan enkel actieve consultants toevoegen.");
      renderProjectConsultantOptions();
      return;
    }
    try {
      const payload = await apiPost(`/api/projects/${project.id}/staff`, { consultantId, hourlyRate });
      applyProjects(payload.projects);
      renderProjects();
    } catch (err) {
      addError(projectStaffForm, err.message);
    }
  });
}

// ── Quick-fill modal ─────────────────────────────────────────────────────────
function ensureFillModal() {
  let overlay = document.getElementById("fill-modal-overlay");
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.id = "fill-modal-overlay";
  overlay.style.cssText = "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9999;align-items:center;justify-content:center;";
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:12px;padding:24px;width:340px;box-shadow:0 8px 32px rgba(0,0,0,0.2);">
      <h3 id="fill-modal-title" style="margin:0 0 16px;font-size:15px;color:#1c2431;"></h3>
      <div style="display:grid;gap:10px;">
        <label style="display:grid;gap:4px;font-size:14px;color:#5e6a7c;">
          Mandagen per week
          <input id="fill-modal-days" type="number" min="0" max="5" step="0.5" placeholder="bijv. 2.5"
            style="padding:8px 10px;border-radius:8px;border:1px solid #d7dce5;font:inherit;" />
        </label>
        <label style="display:grid;gap:4px;font-size:14px;color:#5e6a7c;">
          Startdatum (optioneel)
          <input id="fill-modal-start" type="text" placeholder="dd/mm/jjjj" inputmode="numeric"
            style="padding:8px 10px;border-radius:8px;border:1px solid #d7dce5;font:inherit;" />
        </label>
        <label style="display:grid;gap:4px;font-size:14px;color:#5e6a7c;">
          Einddatum (optioneel)
          <input id="fill-modal-end" type="text" placeholder="dd/mm/jjjj" inputmode="numeric"
            style="padding:8px 10px;border-radius:8px;border:1px solid #d7dce5;font:inherit;" />
        </label>
        <p id="fill-modal-error" style="color:#b42318;font-size:13px;margin:0;display:none;"></p>
      </div>
      <div style="display:flex;gap:8px;margin-top:20px;justify-content:flex-end;">
        <button id="fill-modal-cancel" style="background:#f0f4fb;border:1px solid #d7dce5;color:#1c2431;padding:8px 16px;border-radius:8px;cursor:pointer;font:inherit;">Annuleren</button>
        <button id="fill-modal-apply" style="background:#0f6cbd;border-color:#0f6cbd;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font:inherit;">Toepassen</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.style.display = "none"; });
  document.getElementById("fill-modal-cancel").addEventListener("click", () => { overlay.style.display = "none"; });
  return overlay;
}

function openFillModal(consultantId, consultantName, project) {
  const overlay = ensureFillModal();
  document.getElementById("fill-modal-title").textContent = `Snel invullen – ${consultantName}`;
  document.getElementById("fill-modal-days").value = "";
  document.getElementById("fill-modal-start").value = "";
  document.getElementById("fill-modal-end").value = "";
  const errEl = document.getElementById("fill-modal-error");
  errEl.style.display = "none";
  overlay.style.display = "flex";
  document.getElementById("fill-modal-days").focus();

  // Replace button to remove previous listener
  const oldBtn = document.getElementById("fill-modal-apply");
  const applyBtn = oldBtn.cloneNode(true);
  oldBtn.parentNode.replaceChild(applyBtn, oldBtn);

  applyBtn.addEventListener("click", async () => {
    const rawDays = document.getElementById("fill-modal-days").value.trim().replace(",", ".");
    const mandays = Number(rawDays);
    if (!rawDays || !Number.isFinite(mandays) || mandays < 0) {
      errEl.textContent = "Voer een geldig aantal mandagen in (bijv. 2.5).";
      errEl.style.display = "block";
      return;
    }
    const rawStart = document.getElementById("fill-modal-start").value.trim();
    const rawEnd = document.getElementById("fill-modal-end").value.trim();
    let startIso = null, endIso = null;
    if (rawStart) {
      startIso = toIsoDate(rawStart);
      if (!startIso) { errEl.textContent = "Ongeldige startdatum (gebruik dd/mm/jjjj)."; errEl.style.display = "block"; return; }
    }
    if (rawEnd) {
      endIso = toIsoDate(rawEnd);
      if (!endIso) { errEl.textContent = "Ongeldige einddatum (gebruik dd/mm/jjjj)."; errEl.style.display = "block"; return; }
    }
    if (startIso && endIso && startIso > endIso) {
      errEl.textContent = "Startdatum moet vóór de einddatum liggen.";
      errEl.style.display = "block";
      return;
    }

    overlay.style.display = "none";

    // Align start/end to the Monday of their week
    const startWeekIso = startIso ? toIsoFromDate(toMonday(parseIsoDate(startIso))) : null;
    const endWeekIso = endIso ? toIsoFromDate(toMonday(parseIsoDate(endIso))) : null;

    const weeks = buildProjectWeeks(project);
    for (const w of weeks) {
      if (isWeekFullyPassed(w)) continue;
      if (startWeekIso && w < startWeekIso) continue;
      if (endWeekIso && w > endWeekIso) continue;
      const input = projectAllocationsMatrix.querySelector(
        `input.project-matrix-input[data-consultant-id="${consultantId}"][data-week-start="${w}"]`
      );
      if (input && !input.disabled) {
        input.value = mandays > 0 ? mandays.toFixed(1) : "";
        input.dispatchEvent(new Event("change", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 25));
      }
    }
  });
}

if (projectAllocationsMatrix) {
  projectAllocationsMatrix.addEventListener("click", async (e) => {
    const nameCell = e.target.closest("th.project-matrix-name-clickable");
    if (nameCell) {
      const project = getSelectedProject();
      if (!project || getProjectStatus(project) !== "actief") return;
      const consultantId = Number(nameCell.dataset.consultantId);
      const consultantName = nameCell.dataset.consultantName;
      if (Number.isFinite(consultantId)) openFillModal(consultantId, consultantName, project);
      return;
    }
    const deleteBtn = e.target.closest("button.project-staff-delete-btn");
    if (!deleteBtn) return;
    const project = getSelectedProject();
    if (!project) return;
    if (getProjectStatus(project) !== "actief") return;
    const consultantId = Number(deleteBtn.dataset.consultantId);
    if (!Number.isFinite(consultantId)) return;
    if (!confirm("Consultant verwijderen van dit project? Alle projectmandagen voor deze consultant worden ook verwijderd.")) {
      return;
    }
    try {
      const payload = await apiPost(`/api/projects/${project.id}/staff-delete`, { consultantId });
      applyProjects(payload.projects);
      renderProjects();
    } catch (err) {
      setStatus(`Fout bij verwijderen consultant uit project: ${err.message}`, true);
    }
  });

  projectAllocationsMatrix.addEventListener("change", async (e) => {
    const rateInput = e.target.closest("input.project-rate-input");
    if (rateInput) {
      const project = getSelectedProject();
      if (!project) return;
      const consultantId = Number(rateInput.dataset.consultantId);
      const hourlyRate = Number((rateInput.value || "").trim());
      if (!Number.isFinite(hourlyRate) || hourlyRate < 0) {
        rateInput.value = "0.00";
        return;
      }
      try {
        const payload = await apiPost(`/api/projects/${project.id}/staff-rate`, {
          consultantId,
          hourlyRate
        });
        applyProjects(payload.projects);
        // Bewaar de huidige positie in de matrix tijdens inline bewerken.
        const selectedProject = getSelectedProject();
        if (selectedProject) {
          const updatedStaff = (selectedProject.staff || []).find((s) => Number(s.consultantId) === consultantId);
          if (updatedStaff) updatedStaff.hourlyRate = hourlyRate;
        }
      } catch (err) {
        setStatus(`Fout bij opslaan tarief: ${err.message}`, true);
      }
      return;
    }

    const input = e.target.closest("input.project-matrix-input");
    if (!input) return;
    const project = getSelectedProject();
    if (!project) return;
    if (getProjectStatus(project) !== "actief") return;

    const consultantId = Number(input.dataset.consultantId);
    const weekStart = input.dataset.weekStart;
    const raw = (input.value || "").trim();
    const mandays = raw === "" ? 0 : Number(raw);
    if (!Number.isFinite(mandays) || mandays < 0) {
      input.value = "";
      return;
    }
    try {
      const payload = await apiPost(`/api/projects/${project.id}/allocations`, {
        consultantId,
        weekStart,
        mandays
      });
      applyProjects(payload.projects);
      // Geen volledige rerender tijdens cel-naar-cel invoer om scrollpositie te behouden.
    } catch (err) {
      setStatus(`Fout bij opslaan projectmatrix: ${err.message}`, true);
    }
  });
}

offersTableWrap.addEventListener("click", (e) => {
  const row = e.target.closest("tr[data-offer-id]");
  if (!row) return;
  const offerId = Number(row.dataset.offerId);
  if (!Number.isFinite(offerId)) return;
  state.selectedOfferId = offerId;
  renderOffers();
});

if (projectsTableWrap) {
  projectsTableWrap.addEventListener("click", (e) => {
    const th = e.target.closest("th[data-sort-key]");
    if (th) {
      const key = th.dataset.sortKey;
      if (!key) return;
      if (state.projectSort.key === key) {
        state.projectSort.dir = state.projectSort.dir === "asc" ? "desc" : "asc";
      } else {
        state.projectSort.key = key;
        state.projectSort.dir = "asc";
      }
      renderProjectsList();
      return;
    }
    const row = e.target.closest("tr[data-project-id]");
    if (!row) return;
    const projectId = Number(row.dataset.projectId);
    if (!Number.isFinite(projectId)) return;
    state.selectedProjectId = projectId;
    renderProjects();
  });
}

if (ohwTableWrap) {
  ohwTableWrap.addEventListener("click", (e) => {
    const th = e.target.closest("th[data-sort-key]");
    if (!th) return;
    const key = th.dataset.sortKey;
    if (!key) return;
    if (state.ohwSort.key === key) {
      state.ohwSort.dir = state.ohwSort.dir === "asc" ? "desc" : "asc";
    } else {
      state.ohwSort.key = key;
      state.ohwSort.dir = "asc";
    }
    renderOhw();
  });
  ohwTableWrap.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-ohw-project]");
    if (!row) return;
    const projectNumber = row.dataset.ohwProject || "";
    if (!projectNumber) return;
    state.ohwExpandedProjects[projectNumber] = !state.ohwExpandedProjects[projectNumber];
    renderOhw();
  });
}

if (offerStatusFilter) {
  offerStatusFilter.addEventListener("change", () => {
    renderOffersList();
  });
}

if (projectStatusFilter) {
  projectStatusFilter.addEventListener("change", () => {
    renderProjectsList();
  });
}

if (projectConsultantFilter) {
  projectConsultantFilter.addEventListener("change", () => {
    renderProjectsList();
  });
}

if (projectBillingType) {
  projectBillingType.addEventListener("change", () => {
    syncProjectBudgetInputs(projectBillingType.value, false);
  });
  syncProjectBudgetInputs(projectBillingType.value, false);
}

if (projectEditBillingType) {
  projectEditBillingType.addEventListener("change", () => {
    syncProjectBudgetInputs(projectEditBillingType.value, true);
  });
}

roleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(roleForm);

  const selected = getSelected();
  if (!selected) {
    addError(roleForm, "Selecteer eerst een consultant.");
    return;
  }

  const payloadBody = {
    role: document.getElementById("role").value,
    from: toIsoDate(document.getElementById("role-from").value.trim()),
    to: toIsoDate(document.getElementById("role-to").value.trim()) || ""
  };
  if (!payloadBody.from) {
    addError(roleForm, "Van moet in formaat dd/mm/jjjj zijn.");
    return;
  }
  if (document.getElementById("role-to").value.trim() && !toIsoDate(document.getElementById("role-to").value.trim())) {
    addError(roleForm, "Tot moet in formaat dd/mm/jjjj zijn.");
    return;
  }

  try {
    const payload = await apiPost(`/api/consultants/${selected.id}/role`, payloadBody);
    applyConsultants(payload.consultants);
    roleForm.reset();
    render();
  } catch (err) {
    addError(roleForm, err.message);
  }
});

regimeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(regimeForm);

  const selected = getSelected();
  if (!selected) {
    addError(regimeForm, "Selecteer eerst een consultant.");
    return;
  }

  const regime = Number(document.getElementById("regime").value);
  const regimeFromRaw = document.getElementById("regime-from").value.trim();
  const regimeToRaw = document.getElementById("regime-to").value.trim();
  const payloadBody = {
    regime,
    from: toIsoDate(regimeFromRaw),
    to: toIsoDate(regimeToRaw) || ""
  };
  if (!payloadBody.from) {
    addError(regimeForm, "Van moet in formaat dd/mm/jjjj zijn.");
    return;
  }
  if (regimeToRaw && !toIsoDate(regimeToRaw)) {
    addError(regimeForm, "Tot moet in formaat dd/mm/jjjj zijn.");
    return;
  }

  try {
    const payload = await apiPost(`/api/consultants/${selected.id}/regime`, payloadBody);
    applyConsultants(payload.consultants);
    regimeForm.reset();
    render();
  } catch (err) {
    addError(regimeForm, err.message);
  }
});

if (costForm) {
  costForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(costForm);
    const selected = getSelected();
    if (!selected) {
      addError(costForm, "Selecteer eerst een consultant.");
      return;
    }
    const year = Number((costYearInput?.value || "").trim());
    const cost = parseLocalizedNumber((costAmountInput?.value || "").trim());
    if (!Number.isFinite(year) || year < 1900 || year > 3000) {
      addError(costForm, "Jaar is ongeldig.");
      return;
    }
    if (!Number.isFinite(cost) || cost < 0) {
      addError(costForm, "Kostprijs moet een positief getal zijn.");
      return;
    }
    try {
      const payload = await apiPost(`/api/consultants/${selected.id}/cost`, {
        year: Number(year),
        cost
      });
      applyConsultants(payload.consultants);
      costForm.reset();
      render();
    } catch (err) {
      addError(costForm, err.message);
    }
  });
}

if (vacationForm) {
  vacationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(vacationForm);
    const consultantId = Number(vacationConsultantInput?.value || "");
    const startDate = toIsoDate((vacationStartDateInput?.value || "").trim());
    const endDate = toIsoDate((vacationEndDateInput?.value || "").trim());
    if (!Number.isFinite(consultantId) || consultantId <= 0) {
      addError(vacationForm, "Selecteer een actieve consultant.");
      return;
    }
    if (!startDate || !endDate) {
      addError(vacationForm, "Start- en einddatum zijn verplicht in dd/mm/jjjj.");
      return;
    }
    if (endDate < startDate) {
      addError(vacationForm, "Einddatum kan niet voor startdatum liggen.");
      return;
    }
    try {
      const payload = await apiPost("/api/vacations", {
        consultantId,
        startDate,
        endDate
      });
      applyConsultants(payload.consultants);
      vacationForm.reset();
      render();
    } catch (err) {
      addError(vacationForm, err.message);
    }
  });
}

if (overheadForm) {
  overheadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError(overheadForm);
    const year = Number((overheadYearInput?.value || "").trim());
    const entity = overheadEntityInput ? overheadEntityInput.value : "RPL BE";
    const cost = parseLocalizedNumber((overheadCostInput?.value || "").trim());
    if (!Number.isFinite(year) || year < 1900 || year > 3000) {
      addError(overheadForm, "Jaar is ongeldig.");
      return;
    }
    if (!["RPL BE", "RPL NL"].includes(entity)) {
      addError(overheadForm, "Entiteit moet RPL BE of RPL NL zijn.");
      return;
    }
    if (!Number.isFinite(cost) || cost < 0) {
      addError(overheadForm, "Overheadkost moet een positief getal zijn.");
      return;
    }
    try {
      const payload = await apiPost("/api/overhead-costs", {
        year: Number(year),
        entity,
        cost
      });
      state.overheadCosts = Array.isArray(payload?.overheadCosts) ? payload.overheadCosts : [];
      overheadForm.reset();
      renderOverheadTable();
      renderPipeline();
    } catch (err) {
      addError(overheadForm, err.message);
    }
  });
}


roleTable.addEventListener("click", async (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  const id = button.dataset.id;
  const type = button.dataset.type;
  if (!id || !type) return;
  try {
    if (button.classList.contains("delete-action")) {
      await deleteTimelineEntry(type, id);
      return;
    }
    if (button.classList.contains("edit-action")) {
      await editTimelineEntry(type, id);
    }
  } catch (err) {
    addError(roleForm, err.message);
  }
});

regimeTable.addEventListener("click", async (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  const id = button.dataset.id;
  const type = button.dataset.type;
  if (!id || !type) return;
  try {
    if (button.classList.contains("delete-action")) {
      await deleteTimelineEntry(type, id);
      return;
    }
    if (button.classList.contains("edit-action")) {
      await editTimelineEntry(type, id);
    }
  } catch (err) {
    addError(regimeForm, err.message);
  }
});

if (costTable) {
  costTable.addEventListener("click", async (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    const type = button.dataset.type;
    if (!id || !type) return;
    try {
      if (button.classList.contains("delete-action")) {
        await deleteTimelineEntry(type, id);
        return;
      }
      if (button.classList.contains("edit-action")) {
        await editTimelineEntry(type, id);
      }
    } catch (err) {
      addError(costForm || consultantForm, err.message);
    }
  });
}

if (vacationTable) {
  vacationTable.addEventListener("click", async (e) => {
    const btn = e.target.closest("button.vacation-delete-btn");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (!Number.isFinite(id)) return;
    if (!confirm("Deze vakantie verwijderen?")) return;
    try {
      const payload = await apiPost(`/api/vacations/${id}/delete`, {});
      applyConsultants(payload.consultants);
      render();
    } catch (err) {
      addError(vacationForm || consultantForm, err.message);
    }
  });
}

if (overheadTable) {
  overheadTable.addEventListener("click", async (e) => {
    const btn = e.target.closest("button.overhead-delete-btn");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (!Number.isFinite(id)) return;
    if (!confirm("Deze overheadkost verwijderen?")) return;
    try {
      const payload = await apiPost(`/api/overhead-costs/${id}/delete`, {});
      state.overheadCosts = Array.isArray(payload?.overheadCosts) ? payload.overheadCosts : [];
      renderOverheadTable();
      renderPipeline();
    } catch (err) {
      addError(overheadForm || consultantForm, err.message);
    }
  });
}

if (consultantDeleteBtn) {
  consultantDeleteBtn.addEventListener("click", async () => {
    const selected = getSelected();
    if (!selected) return;
    if (!confirm(`Consultant "${selected.name}" verwijderen?`)) return;
    try {
      const payload = await apiPost(`/api/consultants/${selected.id}/delete`, {});
      applyConsultants(payload.consultants);
      await loadOffers();
      await loadProjects();
      await loadAnalysis();
      render();
    } catch (err) {
      setStatus(`Fout bij verwijderen consultant: ${err.message}`, true);
    }
  });
}

async function init() {
  try {
    await loadConsultants();
    await loadOffers();
    await loadProjects();
    await loadAnalysis();
    await loadOhw();
  } catch (err) {
    console.error("API init error:", err);
    const hint = location.protocol === "https:" ? " Mogelijk mixed-content blokkering: open via http://127.0.0.1:8000." : "";
    setStatus(`API fout: ${err.message}.${hint}`, true);
    return;
  }

  try {
    render();
  } catch (err) {
    console.error("Render init error:", err);
    setStatus(`Frontend fout: ${err.message}`, true);
    return;
  }

  setStatus("Opslag: SQLite (planning.db) - autosave actief");
  switchTab("consultants");
}

async function refreshPlanningData() {
  try {
    await loadConsultants();
    await loadOffers();
    await loadProjects();
    await loadAnalysis();
    await loadOhw();
    renderPlanningTable();
    setStatus("Planning bijgewerkt");
  } catch (err) {
    setStatus(`Planning refresh faalt: ${err.message}`, true);
  }
}

window.addEventListener("resize", () => {
  renderFteChart();
  renderProjectTimelineChart();
  const selected = state.consultants.find((c) => c.id === state.selectedPlanningConsultantId) || null;
  renderPlanningProjectTimelineChart(selected);
  renderAnalysis();
  renderPipeline();
});

if (fteEntityFilter) {
  fteEntityFilter.addEventListener("change", () => {
    renderFteChart();
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    switchTab(tab);
  });
});

if (planningEntityFilter) {
  planningEntityFilter.addEventListener("change", () => {
    renderPlanningTable();
  });
}

if (planningRefreshBtn) {
  planningRefreshBtn.addEventListener("click", refreshPlanningData);
}

if (planningTableWrap) {
  planningTableWrap.addEventListener("change", async (e) => {
    const input = e.target.closest("input.planning-detail-input");
    if (!input) return;
    const kind = input.dataset.kind;
    const id = Number(input.dataset.id);
    const consultantId = Number(input.dataset.consultantId);
    const weekStart = input.dataset.weekStart;
    const raw = (input.value || "").trim();
    const mandays = raw === "" ? 0 : Number(raw);
    if (!Number.isFinite(id) || !Number.isFinite(consultantId) || !weekStart) return;
    if (!Number.isFinite(mandays) || mandays < 0) {
      input.value = "0.0";
      return;
    }
    try {
      if (kind === "offer") {
        const payload = await apiPost(`/api/offers/${id}/allocations`, {
          consultantId,
          weekStart,
          mandays
        });
        applyOffers(payload.offers);
      } else if (kind === "project") {
        const payload = await apiPost(`/api/projects/${id}/allocations`, {
          consultantId,
          weekStart,
          mandays
        });
        applyProjects(payload.projects);
      } else {
        return;
      }
      renderPlanningTable();
      renderProjectsList();
    } catch (err) {
      setStatus(`Fout bij opslaan planningcel: ${err.message}`, true);
    }
  });
}

if (analysisEntityFilter) {
  analysisEntityFilter.addEventListener("change", () => {
    renderAnalysis();
  });
}

if (analysisPrintReportBtn) {
  analysisPrintReportBtn.addEventListener("click", openConsultantPrintReport);
}

if (pipelineEntityFilter) {
  pipelineEntityFilter.addEventListener("change", () => {
    renderPipelineConsultantOptions();
    renderPipeline();
  });
}

if (pipelineConsultantFilter) {
  pipelineConsultantFilter.addEventListener("change", () => {
    renderPipeline();
  });
}

if (ohwEntityFilter) {
  ohwEntityFilter.addEventListener("change", () => {
    state.ohwEntityFilter = ohwEntityFilter.value || "ALL";
    renderOhw();
  });
}

if (ohwExportBtn) {
  ohwExportBtn.addEventListener("click", exportOhwTable);
}

if (facturatieSearch) {
  facturatieSearch.addEventListener("input", () => {
    state.invoiceSearch = facturatieSearch.value;
    renderInvoices();
  });
}

if (facturatieTableWrap) {
  facturatieTableWrap.addEventListener("click", (e) => {
    const th = e.target.closest("th[data-inv-sort]");
    if (!th) return;
    const key = th.dataset.invSort;
    if (!key) return;
    if (state.invoiceSort.key === key) {
      state.invoiceSort.dir = state.invoiceSort.dir === "asc" ? "desc" : "asc";
    } else {
      state.invoiceSort.key = key;
      state.invoiceSort.dir = "asc";
    }
    renderInvoices();
  });
}

if (consultantStatusFilter) {
  consultantStatusFilter.addEventListener("change", () => {
    renderConsultants();
  });
}

if (consultantEntityFilter) {
  consultantEntityFilter.addEventListener("change", () => {
    renderConsultants();
  });
}

setupSectionToggles("tab-projecten", true);

// ── Upload tab (Bestanden) ─────────────────────────────────────────────────

function initUploadTab() {
  const blocks = document.querySelectorAll(".upload-block");
  blocks.forEach(block => {
    const target = block.dataset.target;
    const previewBtn = block.querySelector(".upload-preview-btn");
    const fileInput = block.querySelector(".upload-input");
    const previewArea = block.querySelector(".upload-preview-area");

    if (!previewBtn || !fileInput || !previewArea) return;

    previewBtn.addEventListener("click", async () => {
      const file = fileInput.files[0];
      if (!file) { alert("Selecteer eerst een bestand."); return; }

      previewBtn.disabled = true;
      previewBtn.textContent = "Laden…";
      previewArea.classList.remove("hidden");
      previewArea.innerHTML = "<em>Bezig met verwerken…</em>";

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("confirm", "false");

        const base = (typeof window.PLANNING_BASE_PATH !== "undefined" ? window.PLANNING_BASE_PATH : "");
        const resp = await fetch(`${base}/api/upload/${target}`, { method: "POST", body: formData });
        const rawText = await resp.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch(e) {
          previewArea.innerHTML = `<p class="error">Server antwoord (${resp.status}): <pre style="white-space:pre-wrap;font-size:0.75rem">${rawText.substring(0, 500)}</pre></p>`;
          return;
        }

        if (!resp.ok || data.error) {
          previewArea.innerHTML = `<p class="error">Fout: ${data.error || resp.status}</p>`;
          return;
        }

        const added = data.added || [];
        const removed = data.removed || [];
        const totalNew = data.total_new ?? added.length;
        const totalRemoved = data.total_removed ?? removed.length;

        let html = `<p><strong>${data.label}</strong>: <span class="badge badge-green">+${totalNew} nieuw</span> <span class="badge badge-red">-${totalRemoved} verwijderd</span> <span class="badge">${data.unchanged ?? 0} ongewijzigd</span></p>`;

        if (added.length > 0) {
          html += `<details open><summary><strong>Nieuwe rijen (${totalNew})</strong></summary><div style="overflow-x:auto"><table class="data-table"><thead><tr>${(data.headers||[]).map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${added.slice(0,50).map(row=>`<tr>${(data.headers||[]).map(h=>`<td>${row[h]??""}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
        }
        if (removed.length > 0) {
          html += `<details><summary><strong>Verwijderde rijen (${totalRemoved})</strong></summary><div style="overflow-x:auto"><table class="data-table"><thead><tr>${(data.headers||[]).map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${removed.slice(0,50).map(row=>`<tr>${(data.headers||[]).map(h=>`<td>${row[h]??""}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
        }

        html += `<button class="btn-primary upload-confirm-btn" style="margin-top:0.75rem">Bevestigen & Opslaan</button>`;
        previewArea.innerHTML = html;

        previewArea.querySelector(".upload-confirm-btn").addEventListener("click", () => confirmUpload(target, file, previewArea));
      } catch (err) {
        previewArea.innerHTML = `<p class="error">Netwerkfout: ${err.message}</p>`;
      } finally {
        previewBtn.disabled = false;
        previewBtn.textContent = "Preview";
      }
    });
  });
}

async function confirmUpload(target, file, previewArea) {
  const confirmBtn = previewArea.querySelector(".upload-confirm-btn");
  if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.textContent = "Opslaan…"; }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("confirm", "true");

    const base = (typeof window.PLANNING_BASE_PATH !== "undefined" ? window.PLANNING_BASE_PATH : "");
    const resp = await fetch(`${base}/api/upload/${target}`, { method: "POST", body: formData });
    const data = await resp.json();

    if (!resp.ok || data.error) {
      previewArea.innerHTML += `<p class="error">Fout bij opslaan: ${data.error || resp.status}</p>`;
      return;
    }

    previewArea.innerHTML = `<p style="color:green">✓ ${data.message || "Bestand opgeslagen."}</p>`;
    await loadAll();
  } catch (err) {
    previewArea.innerHTML += `<p class="error">Netwerkfout: ${err.message}</p>`;
  }
}

initUploadTab();
setupSectionToggles("tab-analyse", false);
init();

// ── Upload / Bestanden tab ────────────────────────────────────────────────────

function initUploadTab() {
  document.querySelectorAll(".upload-block").forEach((block) => {
    const target = block.dataset.target;
    const fileInput = block.querySelector(".upload-input");
    const previewBtn = block.querySelector(".upload-preview-btn");
    const previewArea = block.querySelector(".upload-preview-area");

    previewBtn.addEventListener("click", async () => {
      const file = fileInput.files[0];
      if (!file) {
        alert("Selecteer eerst een Excel bestand.");
        return;
      }

      previewBtn.disabled = true;
      previewBtn.textContent = "Bezig…";
      previewArea.classList.remove("hidden");
      previewArea.innerHTML = '<p class="meta">Bestand wordt verwerkt…</p>';

      const formData = new FormData();
      formData.append("file", file);
      formData.append("confirm", "false");

      try {
        const res = await fetch(`/api/upload/${target}`, { method: "POST", body: formData });
        const data = await res.json();

        if (!data.ok) {
          previewArea.innerHTML = `<p style="color:var(--danger,#c0392b)">Fout: ${data.error}</p>`;
          return;
        }

        // Build preview HTML
        const added = data.added || [];
        const removed = data.removed || [];
        const unchanged = data.unchanged ?? 0;

        let html = `<div class="upload-summary">
          <span class="badge badge-green">+${data.total_new} nieuwe rijen</span>
          <span class="badge badge-red">-${data.total_removed} verwijderd</span>
          <span class="badge badge-grey">${unchanged} ongewijzigd</span>
        </div>`;

        if (added.length > 0) {
          const cols = Object.keys(added[0]).slice(0, 6); // max 6 cols in preview
          html += `<p class="meta" style="margin-top:.75rem"><strong>Nieuwe rijen (preview ${Math.min(added.length, 200)} van ${data.total_new}):</strong></p>
          <div style="overflow-x:auto">
          <table class="data-table" style="font-size:.78rem">
            <thead><tr>${cols.map(c => `<th>${c}</th>`).join("")}</tr></thead>
            <tbody>${added.slice(0, 50).map(row =>
              `<tr>${cols.map(c => `<td>${row[c] ?? ""}</td>`).join("")}</tr>`
            ).join("")}</tbody>
          </table></div>`;
          if (added.length > 50) html += `<p class="meta">… en nog ${added.length - 50} meer rijen.</p>`;
        } else {
          html += `<p class="meta" style="margin-top:.75rem">Geen nieuwe rijen gevonden.</p>`;
        }

        html += `<div style="margin-top:1rem;display:flex;gap:.75rem">
          <button class="upload-confirm-btn" style="background:var(--accent,#1565c0);color:#fff;border:none;padding:.5rem 1.25rem;border-radius:6px;cursor:pointer;font-weight:600">
            Bevestigen &amp; opslaan
          </button>
          <button class="upload-cancel-btn" style="background:transparent;border:1px solid #ccc;padding:.5rem 1.25rem;border-radius:6px;cursor:pointer">
            Annuleren
          </button>
        </div>`;

        previewArea.innerHTML = html;

        // Store file reference for confirm
        previewArea._pendingFile = file;
        previewArea._pendingTarget = target;

        previewArea.querySelector(".upload-confirm-btn").addEventListener("click", () => confirmUpload(previewArea, target, file, previewBtn));
        previewArea.querySelector(".upload-cancel-btn").addEventListener("click", () => {
          previewArea.innerHTML = "";
          previewArea.classList.add("hidden");
          fileInput.value = "";
          previewBtn.disabled = false;
          previewBtn.textContent = "Preview";
        });

      } catch (err) {
        previewArea.innerHTML = `<p style="color:var(--danger,#c0392b)">Netwerkfout: ${err.message}</p>`;
      } finally {
        previewBtn.disabled = false;
        previewBtn.textContent = "Preview";
      }
    });
  });
}

async function confirmUpload(previewArea, target, file, previewBtn) {
  const confirmBtn = previewArea.querySelector(".upload-confirm-btn");
  if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.textContent = "Opslaan…"; }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("confirm", "true");

  try {
    const res = await fetch(`/api/upload/${target}`, { method: "POST", body: formData });
    const data = await res.json();
    if (data.ok) {
      previewArea.innerHTML = `<p style="color:var(--success,#27ae60);font-weight:600">✓ ${data.message}</p>`;
      // Reload relevant data
      if (target.startsWith("timesheets")) { if (typeof loadAnalysis === "function") loadAnalysis(); }
      if (target === "invoices") { if (typeof loadInvoices === "function") loadInvoices(); }
      if (target === "projects" || target === "invoices") { if (typeof loadOHW === "function") loadOHW(); }
      if (target === "vendor-invoices") { if (typeof loadOHW === "function") loadOHW(); }
    } else {
      previewArea.innerHTML = `<p style="color:var(--danger,#c0392b)">Fout: ${data.error}</p>`;
    }
  } catch (err) {
    previewArea.innerHTML = `<p style="color:var(--danger,#c0392b)">Netwerkfout: ${err.message}</p>`;
  }
}

initUploadTab();






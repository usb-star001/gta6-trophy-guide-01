// Leonida Platinum — boot, routing and shared state.
// Views switch on the hash (#/checklist, #/roadmap, #/missables, #/settings);
// the checklist keeps its own state (filters, spoiler setting, selected trophy).
import { loadTrophies } from './data.js';
import {
  loadEarned,
  saveEarned,
  loadSpoilersHidden,
  saveSpoilersHidden,
  exportProgress,
  importProgressFile,
  progressPercent,
} from './store.js';
import { renderChecklist } from './views/checklist.js';
import { renderDetail } from './views/detail.js';
import { renderRoadmap } from './views/roadmap.js';
import { renderMissables } from './views/missables.js';

const VIEWS = ['checklist', 'roadmap', 'missables', 'settings'];

const state = {
  trophies: [],
  earned: loadEarned(),
  spoilersHidden: loadSpoilersHidden(),
  selectedId: 40,
  filters: { kind: 'all', grade: 'all', query: '' },
  onToggleEarned,
};

function currentView() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return VIEWS.includes(hash) ? hash : 'checklist';
}

function showView(view) {
  for (const name of VIEWS) {
    document.getElementById(`view-${name}`).hidden = name !== view;
    document.querySelector(`[data-view="${name}"]`).classList.toggle('active', name === view);
  }
  if (view === 'roadmap') renderRoadmap(document.getElementById('roadmapStages'), state.trophies, state.earned);
  if (view === 'missables') renderMissables(document.getElementById('missableList'), state.trophies, state, selectTrophy);
  if (view === 'settings') updateSettingsView();
}

function renderAll() {
  renderChecklist(document.getElementById('trophyList'), state.trophies, state, selectTrophy);
  const selected = state.trophies.find((t) => t.id === state.selectedId) || state.trophies[0];
  renderDetail(document.getElementById('detailPane'), selected, state);
  updateProgress();
  showView(currentView());
}

function updateProgress() {
  const total = state.trophies.length;
  const pct = progressPercent(state.earned, total);
  document.getElementById('earnedCount').textContent = state.earned.size;
  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progressSub').textContent =
    state.earned.size === total
      ? '100% — platinum earned. Leonida Legend.'
      : `${pct}% — ${total - state.earned.size} to go before the platinum`;
  document.getElementById('missableCount').textContent = state.trophies.filter((t) => t.missable).length;
  updateSettingsView();
}

function updateSettingsView() {
  const el = document.getElementById('settingsProgress');
  if (el) el.textContent = `${state.earned.size} of ${state.trophies.length} trophies earned (${progressPercent(state.earned, state.trophies.length)}%).`;
}

function selectTrophy(trophy) {
  state.selectedId = trophy.id;
  renderAll();
  if (currentView() !== 'checklist') window.location.hash = '#/checklist';
}

function onToggleEarned(trophy) {
  if (state.earned.has(trophy.name)) state.earned.delete(trophy.name);
  else state.earned.add(trophy.name);
  saveEarned(state.earned);
  renderAll();
}

function bindControls() {
  const kind = document.getElementById('kindFilter');
  const grade = document.getElementById('gradeFilter');
  const search = document.getElementById('searchBox');
  kind.addEventListener('change', () => {
    state.filters.kind = kind.value;
    renderAll();
  });
  grade.addEventListener('change', () => {
    state.filters.grade = grade.value;
    renderAll();
  });
  search.addEventListener('input', () => {
    state.filters.query = search.value;
    renderAll();
  });
  const spoiler1 = document.getElementById('spoilerToggle');
  const spoiler2 = document.getElementById('spoilerToggle2');
  const setSpoilers = (hidden) => {
    state.spoilersHidden = hidden;
    saveSpoilersHidden(hidden);
    spoiler1.checked = hidden;
    spoiler2.checked = hidden;
    renderAll();
  };
  spoiler1.checked = state.spoilersHidden;
  spoiler2.checked = state.spoilersHidden;
  spoiler1.addEventListener('change', () => setSpoilers(spoiler1.checked));
  spoiler2.addEventListener('change', () => setSpoilers(spoiler2.checked));
  const doExport = () => exportProgress(state.earned);
  document.getElementById('exportBtn').addEventListener('click', doExport);
  document.getElementById('exportBtn2').addEventListener('click', doExport);
  const doImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      state.earned = await importProgressFile(file);
      saveEarned(state.earned);
      renderAll();
    } catch (error) {
      window.alert(error.message);
    }
    event.target.value = '';
  };
  document.getElementById('importFile').addEventListener('change', doImport);
  document.getElementById('importFile2').addEventListener('change', doImport);
  window.addEventListener('hashchange', () => showView(currentView()));
}

async function bootLeonidaPlatinum() {
  state.trophies = await loadTrophies();
  bindControls();
  renderAll();
}

bootLeonidaPlatinum();

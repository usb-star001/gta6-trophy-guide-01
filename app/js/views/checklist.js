// Checklist view: the trophy rows on the left, and the selected trophy's guide on the right.
import { displayName, displayDescription, filterTrophies, isSpoilerHidden } from '../filters.js';

const KIND_LABELS = {
  story: 'Story',
  collectibles: 'Collectibles',
  activities: 'Activities',
  online: 'Online',
  meta: 'Meta',
};

export function kindLabel(kind) {
  return KIND_LABELS[kind] || kind;
}

export function gradeChip(grade) {
  const span = document.createElement('span');
  span.className = `chip grade-${grade}`;
  span.textContent = grade[0].toUpperCase() + grade.slice(1);
  return span;
}

export function renderChecklist(listEl, trophies, state, onSelect) {
  const visible = filterTrophies(trophies, state.filters);
  listEl.replaceChildren();
  document.getElementById('listNote').textContent =
    visible.length === trophies.length
      ? `Showing all ${trophies.length} trophies. Tick one when you earn it — progress saves in this browser.`
      : `Showing ${visible.length} of ${trophies.length} trophies.`;
  for (const trophy of visible) {
    const li = document.createElement('li');
    li.className = 'trophy-row' + (state.earned.has(trophy.name) ? ' earned' : '') + (state.selectedId === trophy.id ? ' selected' : '');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(trophy.name);
    box.setAttribute('aria-label', `Earned: ${trophy.name}`);
    box.addEventListener('click', (event) => event.stopPropagation());
    box.addEventListener('change', () => state.onToggleEarned(trophy));
    const body = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'trophy-name';
    name.textContent = displayName(trophy, state.spoilersHidden, state.earned);
    const desc = document.createElement('div');
    desc.className = 'trophy-desc';
    desc.textContent = displayDescription(trophy, state.spoilersHidden, state.earned);
    const meta = document.createElement('div');
    meta.className = 'trophy-meta';
    meta.append(gradeChip(trophy.grade));
    const kindChip = document.createElement('span');
    kindChip.className = 'chip kind';
    kindChip.textContent = kindLabel(trophy.kind);
    meta.append(kindChip);
    if (trophy.missable) {
      const flag = document.createElement('span');
      flag.className = 'chip missable';
      flag.textContent = '⚠ Missable';
      meta.append(flag);
    }
    if (isSpoilerHidden(trophy, state.spoilersHidden, state.earned)) {
      const hiddenChip = document.createElement('span');
      hiddenChip.className = 'chip';
      hiddenChip.textContent = 'Spoiler hidden';
      meta.append(hiddenChip);
    }
    body.append(name, desc, meta);
    const right = document.createElement('div');
    right.textContent = state.earned.has(trophy.name) ? '✓' : '';
    right.style.cssText = 'font-weight:700;color:var(--accent);font-size:18px;';
    li.append(box, body, right);
    li.addEventListener('click', () => onSelect(trophy));
    listEl.append(li);
  }
  if (visible.length === 0) {
    const li = document.createElement('li');
    li.className = 'trophy-row';
    li.textContent = 'No trophies match these filters — clear the search or pick another kind.';
    listEl.append(li);
  }
}

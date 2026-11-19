// Missables view: the trophies whose official descriptions describe a one-off
// moment, choice or single-run feat — and why each one is flagged, in the
// description's own terms. Chapter and mission trophies are NOT here: story
// missions can be replayed, so they cannot be missed.
import { gradeChip, kindLabel } from './checklist.js';

export function renderMissables(listEl, trophies, state, onSelect) {
  const missables = trophies.filter((t) => t.missable);
  listEl.replaceChildren();
  for (const trophy of missables) {
    const li = document.createElement('li');
    li.className = 'trophy-row' + (state.earned.has(trophy.name) ? ' earned' : '');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(trophy.name);
    box.setAttribute('aria-label', `Earned: ${trophy.name}`);
    box.addEventListener('click', (event) => event.stopPropagation());
    box.addEventListener('change', () => state.onToggleEarned(trophy));
    const body = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'trophy-name';
    name.textContent = trophy.name;
    const desc = document.createElement('div');
    desc.className = 'trophy-desc';
    desc.textContent = trophy.description;
    const warn = document.createElement('div');
    warn.className = 'missable-warning';
    warn.textContent = `Missable — why: ${trophy.missableWhy}`;
    const meta = document.createElement('div');
    meta.className = 'trophy-meta';
    meta.append(gradeChip(trophy.grade));
    const kindChip = document.createElement('span');
    kindChip.className = 'chip kind';
    kindChip.textContent = kindLabel(trophy.kind);
    meta.append(kindChip);
    body.append(name, desc, warn, meta);
    const right = document.createElement('div');
    right.textContent = state.earned.has(trophy.name) ? '✓' : '';
    right.style.cssText = 'font-weight:700;color:var(--accent);font-size:18px;';
    li.append(box, body, right);
    li.addEventListener('click', () => onSelect(trophy));
    listEl.append(li);
  }
}

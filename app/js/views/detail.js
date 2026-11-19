// Detail pane: the selected trophy's official text, its guide in our own words,
// the steps, and the sources every fact in the guide rests on.
import { displayName, displayDescription, isSpoilerHidden } from '../filters.js';
import { gradeChip, kindLabel } from './checklist.js';

const SOURCE_LINE =
  'Sources: official name, description and grade — the official PS5 list as Exophase and PSNProfiles listed it (the two agree on every name, description and grade); PSN count where one is shown — PSNProfiles; guidance — our own advice drawn from the official description, not yet checked in the game.';

export function renderDetail(pane, trophy, state) {
  pane.replaceChildren();
  if (!trophy) {
    const empty = document.createElement('p');
    empty.className = 'detail-empty';
    empty.textContent = 'Select a trophy on the left to read its guide, its sources and when it can be missed.';
    pane.append(empty);
    return;
  }
  const hidden = isSpoilerHidden(trophy, state.spoilersHidden, state.earned);
  const title = document.createElement('h2');
  title.textContent = displayName(trophy, state.spoilersHidden, state.earned);
  const gradeRow = document.createElement('div');
  gradeRow.className = 'detail-grade';
  gradeRow.append(gradeChip(trophy.grade));
  const kindChip = document.createElement('span');
  kindChip.className = 'chip kind';
  kindChip.textContent = kindLabel(trophy.kind);
  gradeRow.append(kindChip);
  if (trophy.missable) {
    const flag = document.createElement('span');
    flag.className = 'chip missable';
    flag.textContent = '⚠ Missable — see why below';
    gradeRow.append(flag);
  }
  const official = document.createElement('p');
  official.className = 'detail-official';
  official.textContent = `Official description: “${displayDescription(trophy, state.spoilersHidden, state.earned)}”`;
  pane.append(title, gradeRow, official);
  if (hidden) {
    const note = document.createElement('p');
    note.className = 'detail-guide';
    note.textContent = 'This is a story trophy and spoilers are hidden. Tick it earned on the left to reveal its guide, or turn spoilers off in Spoilers & Save.';
    pane.append(note);
    return;
  }
  const guide = document.createElement('div');
  guide.className = 'detail-guide';
  for (const paragraph of trophy.guide.split('\n\n')) {
    const p = document.createElement('p');
    p.textContent = paragraph;
    guide.append(p);
  }
  pane.append(guide);
  if (Array.isArray(trophy.steps) && trophy.steps.length > 0) {
    const stepsTitle = document.createElement('p');
    stepsTitle.innerHTML = '<strong>Steps</strong>';
    const steps = document.createElement('ol');
    steps.className = 'detail-steps';
    for (const step of trophy.steps) {
      const li = document.createElement('li');
      li.textContent = step;
      steps.append(li);
    }
    pane.append(stepsTitle, steps);
  }
  if (trophy.missable && trophy.missableWhy) {
    const warn = document.createElement('p');
    warn.className = 'missable-warning';
    warn.textContent = `Missable — why: ${trophy.missableWhy}`;
    pane.append(warn);
  }
  if (trophy.stage) {
    const stage = document.createElement('p');
    stage.className = 'fineprint';
    stage.textContent = `Roadmap stage: ${trophy.stage}`;
    pane.append(stage);
  }
  const sources = document.createElement('p');
  sources.className = 'detail-sources';
  sources.textContent = SOURCE_LINE;
  pane.append(sources);
  const actions = document.createElement('div');
  actions.className = 'detail-actions';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'btn';
  toggle.textContent = state.earned.has(trophy.name) ? 'Mark as not earned' : 'Mark as earned';
  toggle.addEventListener('click', () => state.onToggleEarned(trophy));
  actions.append(toggle);
  pane.append(actions);
}

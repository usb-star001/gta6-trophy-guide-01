// Progress store: which trophies are earned, saved in localStorage, with export/import.
// Keys are trophy names, so an export file stays readable across versions of this guide.
export const PROGRESS_KEY = 'leonida-platinum-progress-v1';
export const SPOILER_KEY = 'leonida-platinum-spoilers-v1';

export function loadEarned() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : []);
  } catch {
    return new Set();
  }
}

export function saveEarned(earned) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...earned].sort()));
}

export function loadSpoilersHidden() {
  return localStorage.getItem(SPOILER_KEY) === '1';
}

export function saveSpoilersHidden(hidden) {
  localStorage.setItem(SPOILER_KEY, hidden ? '1' : '0');
}

export function earnedCount(earned) {
  return earned.size;
}

export function progressPercent(earned, total) {
  return total === 0 ? 0 : Math.round((earned.size / total) * 100);
}

// Downloads the earned names as a JSON file the reader can keep or import back.
export function exportProgress(earned) {
  const payload = {
    app: 'Leonida Platinum — GTA VI trophy guide',
    exportedAt: new Date().toISOString(),
    earned: [...earned].sort(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gta6-trophy-progress.json';
  link.click();
  URL.revokeObjectURL(url);
}

// Reads an exported file (or a plain JSON array of names) and returns the earned set.
// Throws a readable error when the file is not a progress export.
export async function importProgressFile(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const names = Array.isArray(parsed) ? parsed : parsed.earned;
  if (!Array.isArray(names) || names.some((n) => typeof n !== 'string')) {
    throw new Error('That file is not a Leonida Platinum progress export.');
  }
  return new Set(names);
}

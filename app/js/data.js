// Loads the official trophy list (app/data/trophies.json) once, then hands it to the views.
let cachedTrophies = null;

export async function loadTrophies() {
  if (cachedTrophies) return cachedTrophies;
  const response = await fetch('data/trophies.json');
  if (!response.ok) throw new Error('Could not load data/trophies.json');
  const doc = await response.json();
  cachedTrophies = doc.trophies;
  return cachedTrophies;
}

export function trophyById(trophies, id) {
  return trophies.find((t) => t.id === id);
}

export function trophyByName(trophies, name) {
  return trophies.find((t) => t.name === name);
}

export function gradeRank(grade) {
  return { platinum: 0, gold: 1, silver: 2, bronze: 3 }[grade] ?? 4;
}

export function sortTrophies(trophies) {
  return [...trophies].sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade) || a.id - b.id);
}

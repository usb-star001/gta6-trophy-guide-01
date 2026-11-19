// Filtering rules: by kind, grade and search text, plus the spoiler rule that hides
// unearned story trophies' names and descriptions until they are earned.
export function trophyMatchesKind(trophy, kind) {
  if (kind === 'all') return true;
  if (kind === 'missable') return trophy.missable === true;
  if (kind === 'online') return trophy.kind === 'online';
  return trophy.kind === kind;
}

export function trophyMatchesGrade(trophy, grade) {
  return grade === 'all' || trophy.grade === grade;
}

export function trophyMatchesSearch(trophy, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [trophy.name, trophy.description, trophy.guide, trophy.kind, trophy.stage || '']
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

export function filterTrophies(trophies, { kind, grade, query }) {
  return trophies.filter(
    (t) => trophyMatchesKind(t, kind) && trophyMatchesGrade(t, grade) && trophyMatchesSearch(t, query),
  );
}

// A story trophy is spoiled when the spoiler setting is on and it is not earned yet.
// The platinum, collectibles and activities are never hidden.
export function isSpoilerHidden(trophy, spoilersHidden, earned) {
  return spoilersHidden && trophy.kind === 'story' && !earned.has(trophy.name);
}

export function displayName(trophy, spoilersHidden, earned) {
  return isSpoilerHidden(trophy, spoilersHidden, earned) ? 'Hidden story trophy' : trophy.name;
}

export function displayDescription(trophy, spoilersHidden, earned) {
  return isSpoilerHidden(trophy, spoilersHidden, earned)
    ? 'Earn this trophy to reveal its name and description.'
    : trophy.description;
}

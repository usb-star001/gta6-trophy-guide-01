// Roadmap view: five stages in the order to earn the trophies, built from the
// official descriptions — story first, then stranger strands, collectibles,
// activities, and the 100% clean-up that ends in the platinum.
export const ROADMAP_STAGES = [
  {
    num: 1,
    title: 'Play the story — Chapters 1 to 4 and the final mission',
    text: 'Play through in order. The chapter trophies (Paradise Lost, T**s Ass Drug Money, Vice City, Baby!, Top Of The World, Ma) and the mission trophies (Gone Fishing, Breakfast Run, The Cartel Heist, Child\u2019s Play, Headliners, VCIA Takedown, Operation Savage Glory) all come from finishing story content, and the gold for the final mission ends the story. Do the missable one-off moments in this stage (see the Missables view) while you are here.',
    ids: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    num: 2,
    title: 'Strangers, friends and one-off moments',
    text: 'Finish the stranger strands and the character finales: 8 stranger mission strands, plus the final mission each for Andy, Kenton, Billy, Randy and Tyrone, and Bret\u2019s unique-animal hunt. These are the story-adjacent trophies the official list groups by named characters.',
    ids: [22, 23, 24, 25, 26, 27, 29],
  },
  {
    num: 3,
    title: 'See all of Leonida — collectibles and exploration',
    text: 'Cover the map and the counted collectibles: all 52 areas, 100 vehicles discovered, 100 WAiNK spots, 18 meditation spots, 3 collectible card sets, the Ocean Beach cocktail, and the vehicle showroom, bowling alley and other location moments. Exploration trophies are never missable, so they can wait — but starting them early means you pass the spots naturally.',
    ids: [28, 30, 31, 35, 42, 44, 45, 46],
  },
  {
    num: 4,
    title: 'Activities, races and combat grinds',
    text: 'The counted grinds: 250 stunts, gold in all 42 Shooting Range challenges, a Top Fun drone race win at every one of the 14 locations, 20 different race wins, beating Cal at fishing, one arcade game, 50 challenges, 5 enemies in one Combat Focus, the tank moment, the undetected jewelry robbery, 5 bank vaults, an armored truck, one illegal operation per gang, and the melee drive-by. Save the long counts for after the story, when you have the map and the gear.',
    ids: [15, 16, 17, 18, 19, 20, 21, 32, 36, 38, 39, 40, 41, 43, 51],
  },
  {
    num: 5,
    title: 'Money, property and 100% — then the platinum',
    text: 'Finish the economy trophies (launder $250,000 of Marked Bills, spend $100,000 across shops, buy all 8 garage properties, register 10 vehicles to the Scooter Bros app), the partner and choice moments, and the 100% completion gold. The platinum, Vice Got a Price!, unlocks the moment the other 54 are earned.',
    ids: [14, 33, 34, 37, 47, 48, 49, 50, 52, 53, 54, 55, 1],
  },
];

export function renderRoadmap(listEl, trophies, earned) {
  listEl.replaceChildren();
  const byId = new Map(trophies.map((t) => [t.id, t]));
  for (const stage of ROADMAP_STAGES) {
    const li = document.createElement('li');
    li.className = 'roadmap-stage';
    const h3 = document.createElement('h3');
    const num = document.createElement('span');
    num.className = 'stage-num';
    num.textContent = stage.num;
    h3.append(num, document.createTextNode(stage.title));
    const done = stage.ids.filter((id) => byId.get(id) && earned.has(byId.get(id).name)).length;
    const count = document.createElement('span');
    count.className = 'stage-count';
    count.textContent = ` — ${done} of ${stage.ids.length} earned`;
    h3.append(count);
    const p = document.createElement('p');
    p.textContent = stage.text;
    const ul = document.createElement('ul');
    ul.className = 'roadmap-trophies';
    for (const id of stage.ids) {
      const trophy = byId.get(id);
      if (!trophy) continue;
      const item = document.createElement('li');
      const mark = document.createElement('span');
      mark.className = 'earned-mark';
      mark.textContent = earned.has(trophy.name) ? '✓ ' : '○ ';
      item.append(mark, document.createTextNode(`${trophy.name} — ${trophy.grade}`));
      ul.append(item);
    }
    li.append(h3, p, ul);
    listEl.append(li);
  }
}

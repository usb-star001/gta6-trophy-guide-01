[![GTA 6 Trophy Guide](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![Rank](https://make.fun/badge/gta6-trophy-guide-01/usb-star001/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![Reward](https://make.fun/badge/gta6-trophy-guide-01/usb-star001/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

# Leonida Platinum — GTA VI Trophy Guide & Tracker

An offline, open-source guide and tracker for all **55 PlayStation 5 trophies** of Grand Theft Auto VI (1 platinum, 2 gold, 6 silver, 46 bronze; 28 hidden on PlayStation until earned). Built for the [make.fun gta6-trophy-guide-01 bounty](https://make.fun/bounty/gta6-trophy-guide-01).

## What it is

- **Checklist tracker** — every trophy with its official name, description and grade, tickable, with progress saved in the browser (`localStorage`), export to a `.json` file and import back.
- **Guides in our own words** — each trophy has a guide that says what to do, where and how, and when it can be missed, with its sources named beside it (official list via Exophase / PSNProfiles; PSN counts via PSNProfiles). Where a place or step is not pinned down by a source we have checked, the guide says so plainly instead of inventing one.
- **Roadmap to the platinum** — five stages in the order to earn them, built from the official descriptions: story, stranger strands, collectibles, activities, then money and 100% clean-up.
- **Missables flagged** — 6 trophies whose descriptions describe a one-off moment, choice or single-run feat, each with the reason it is flagged. Chapter and mission trophies are *not* flagged: story missions can be replayed.
- **Filters & spoilers** — filter by kind (story, missable, collectibles, activities, online) and grade, plus search; a spoiler setting hides the names and descriptions of unearned story trophies until they are earned. The official list has no online trophy, so the Online filter is empty by design.
- **Fully offline** — static files under `app/`, no build step, no network request at run time, no Rockstar logo or official artwork. Serve `app/` with any static server and open `index.html`.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Or any static server with `app/` at its root, e.g. `python3 -m http.server --directory app 8080`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored `vendor/makefun-frontend.ts` library. It only creates and copies — it never deletes the output directory.

## Files

- `app/index.html` — the guide's page (views: Checklist, Roadmap, Missables, Spoilers & Save)
- `app/js/main.js` — boot, hash routing and shared state
- `app/js/data.js` — loads `app/data/trophies.json`
- `app/js/store.js` — `localStorage` progress, export and import
- `app/js/filters.js` — kind/grade/search filters and the spoiler rule
- `app/js/views/checklist.js`, `detail.js`, `roadmap.js`, `missables.js` — the four views
- `app/css/base.css` — the paper look (warm off-white, one coral accent)
- `app/data/trophies.json` — the 55 official trophies with our own guides
- `screenshots/` — 4 renders of the app running in a browser (cover first)
- `main.ts`, `vendor/makefun-frontend.ts` (kit library, unchanged), `serve.ts`

## License

MIT — see [LICENSE](LICENSE).

# design-handoff: the bridge between the design canvas and this repo

The design lives on a Claude Design canvas (private, behind Ruben's claude.ai login; link in `docs/IMPLEMENTATION-PLAN.md` §9). Claude Code can't open it, so **this folder is how design changes reach the code**, and how code changes are reported back.

## Rules

1. **The code is the source of truth.** If the code and the canvas disagree, the code wins, and the canvas is updated to match.
2. **Each design round is a numbered delta folder.** Never edit an older one: a new round gets a new folder.
3. **Each delta's `CHANGES.md` says what changed, where it landed in code, and its status** (`proposed` or `implemented`).

## Folders

| Folder | What it is | Status |
|---|---|---|
| `v1/` | The full original handoff: every page and component (`*.dc.html`), `site.css`, the README, reference screenshots | Implemented |
| `v2/` | Delta: Home + About nav, `/about`, `/sitemap`, the default content page, CSS v9–v14 | Implemented (plan §10) |
| `v3/` | Delta: the inked scrollbar and the voyage band (reading progress), CSS v15–v17 | Implemented |

A delta folder holds:

- **`CHANGES.md`:** the summary, the behaviour, what was rejected, and deviations.
- **`design/source/`:** new canvas files.
- **`design/diffs/`:** unified diffs of changed canvas files, against the previous round.
- **`design/styles/`:** the stylesheet layers added that round, verbatim from the canvas.

## The loop

**Design → code**

1. Ruben and Claude iterate on the canvas.
2. Claude writes `design-handoff/vN/`, marked either `proposed` or `implemented`. When Claude implements it directly in `src/`, Claude also updates `docs/IMPLEMENTATION-PLAN.md` and `CLAUDE.md`.
3. For a `proposed` delta, tell Claude Code to *"apply design-handoff/vN"*. It follows `CLAUDE.md`'s standards (atomic design, BEM, tokens only, composables), then marks the delta `implemented` and notes where each change landed.
4. Run `npm run lint`, `npm run typecheck` and `npm run dev` to check.

**Code → design**

When something changes in code first, note it in the plan, or ask Claude in the design session to "sync the canvas from the repo". It reads `src/` and updates the canvas boards.

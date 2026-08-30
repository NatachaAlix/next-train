# Hookhub — Tech Spec (MVP v0.1)

## 1. Overview

Hookhub is a directory site for discovering open source **Claude Code hooks** —
event-driven scripts (`PreToolUse`, `PostToolUse`, `Notification`, `Stop`,
`SubagentStop`, and 25+ other lifecycle events; see the
[official hooks reference](https://code.claude.com/docs/en/hooks)) that
developers publish in public GitHub repositories, often as part of
"awesome-claude-code"–style lists.

Today, hooks are scattered across individual repos and community-curated
READMEs with no dedicated, browsable UI. Hookhub's MVP goal is a single page
that displays a curated set of these hooks in a scannable grid, so a visitor
can quickly see what's out there and jump to the source repo.

**MVP scope is display only.** No search, filtering, submission flow, or
backend — see [Non-goals](#3-non-goals-explicitly-deferred).

## 2. Goals (MVP v0.1)

- The home page (`/`) renders a responsive **grid of hook cards**.
- Each card shows exactly four fields, sourced from a curated dataset:
  - **Name** — the hook's display name.
  - **Category** — one of a small fixed set of use-case categories (see
    [Data model](#4-data-model)).
  - **Description** — a one- or two-sentence summary of what the hook does.
  - **Link to repo** — an outbound link to the GitHub repository, opening in
    a new tab.
- The dataset is static and manually curated (checked into source control),
  not fetched live from GitHub or any external API.
- No authentication, no database, no server-side API routes.

## 3. Non-goals (explicitly deferred)

Listed explicitly so they're easy to reject if raised during MVP review:

- Search, filtering, or sorting of hooks (including by category).
- Live fetching from the GitHub API (stars, last-updated, README preview,
  etc.).
- A hook detail page (`/hooks/[id]`) — MVP is grid-only.
- A community submission workflow (form or PR template) for adding new
  hooks.
- Pagination or infinite scroll.
- Analytics / telemetry.
- User accounts, favorites, or any personalization.

## 4. Data model

Data lives in a single static TypeScript file, manually curated and checked
into source control — no runtime fetching for MVP.

```ts
// src/data/hooks.ts

export type HookCategory =
  | "Notifications"
  | "Git & Version Control"
  | "Formatting & Linting"
  | "Security & Validation"
  | "Logging & Observability"
  | "Testing"
  | "Productivity"
  | "Other";

export interface Hook {
  /** Stable slug, used as the React list key (kebab-case of the name). */
  id: string;
  name: string;
  category: HookCategory;
  /** One or two sentences describing what the hook does. */
  description: string;
  /** Link to the GitHub repository containing the hook. */
  repoUrl: string;
}

export const hooks: Hook[] = [
  // curated entries — see §7 for illustrative seed examples
];
```

The `HookCategory` union is a fixed, small set of use-case categories rather
than raw Claude Code event names (`PreToolUse`, `PostToolUse`, …) — this
groups hooks by *what they're for* (notifications, formatting, security…)
rather than by technical trigger, which is more useful for browsing. The
union being a TypeScript type means any new curated entry must conform to
one of these categories, giving a lightweight guardrail without a runtime
schema.

## 5. Proposed architecture

Not built as part of this spec — implementation follows once the spec is
agreed.

- `../../src/app/page.tsx` — Server Component. Imports `hooks` from
  `src/data/hooks.ts` and renders `<HookGrid hooks={hooks} />`. Replaces the
  current `create-next-app` boilerplate homepage entirely.
- `src/components/HookGrid.tsx` — responsive grid container
  (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`).
- `src/components/HookCard.tsx` — renders one `Hook`: name, a small category
  badge, description, and an outbound link
  (`<a href={repoUrl} target="_blank" rel="noopener noreferrer">`).
- `../../src/app/layout.tsx` — update `metadata` (`title`/`description`), which
  currently still hold the default `create-next-app` placeholder text.
- Styling uses Tailwind v4 utilities, following the existing
  `@theme inline` CSS-variable token pattern already defined in
  `globals.css`. Dark mode stays OS-preference-driven
  (`prefers-color-scheme`, no manual toggle), consistent with the current
  scaffold.

## 6. Acceptance criteria

- Visiting `/` renders every entry in the curated dataset as a card in a
  responsive grid (single column on narrow viewports, multi-column on
  wider ones).
- Each card displays name, category, description, and a working outbound
  link to the hook's GitHub repo, opening in a new tab.
- `npm run lint` passes with the existing ESLint config (no new rules
  needed for MVP).
- The page renders correctly under both light and dark OS color-scheme
  preference.

## 7. Illustrative seed data (non-binding examples)

A handful of real, publicly documented hooks to illustrate the shape and
tone of curated entries — final content to be assembled separately, not
part of this spec's implementation:

| Name | Category | Description | Repo |
|---|---|---|---|
| Sound Notification Hook | Notifications | Plays a system sound when Claude Code needs user attention (`Notification` event). | [pascalporedda/awesome-claude-code](https://github.com/pascalporedda/awesome-claude-code) |
| Task Complete Chime | Notifications | Plays a sound when Claude finishes responding, so you know a task wrapped up without watching the terminal (`Stop` event). | [pascalporedda/awesome-claude-code](https://github.com/pascalporedda/awesome-claude-code) |
| Subagent Complete Chime | Notifications | Plays a sound when a spawned subagent finishes its work (`SubagentStop` event). | [pascalporedda/awesome-claude-code](https://github.com/pascalporedda/awesome-claude-code) |

## 8. Open questions / future iterations

Explicitly deferred past MVP, to revisit once the display-only grid ships:

- Category-based filtering or a search box.
- A hook detail page with a README preview, star count, and last-updated
  date pulled live from the GitHub API.
- A community submission workflow (form or documented PR process) for
  adding new hooks to the curated dataset.
- Sorting (alphabetical, most recently added, most starred).
- Pagination, if the curated list grows large enough to need it.

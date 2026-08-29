# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This repo's root is a wrapper around a single Next.js application:

- The actual app lives in `hookhub/` — all commands below must be run from that directory.
- The repo root contains only `README.md`, `LICENSE`, and editor metadata (`.idea/`); there is no root-level `package.json`.

## Commands

Run from `hookhub/`:

```bash
npm run dev     # start the dev server (http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint (flat config, eslint-config-next)
```

There is no test setup yet — no test runner is configured in `package.json`.

## Architecture

- Next.js 16 App Router with React 19, TypeScript (strict), and Tailwind CSS v4.
- Source lives under `hookhub/src/app`, using the `@/*` path alias mapped to `hookhub/src/*` (see `tsconfig.json`).
- Tailwind v4 is configured via CSS (`src/app/globals.css`) using `@import "tailwindcss"` and an `@theme inline` block, not a `tailwind.config.js` file. Design tokens (`--background`, `--foreground`, fonts) are defined as CSS custom properties there, including a dark-mode override via `prefers-color-scheme`.
- `src/app/layout.tsx` is the root layout: it loads the Geist Sans/Mono fonts via `next/font/google` and exposes them as CSS variables consumed by `globals.css`.
- The app is currently at the freshly-scaffolded `create-next-app` state (default `page.tsx`, no custom routes/components/API routes yet).
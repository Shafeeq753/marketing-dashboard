# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Marketing analytics dashboard for mypromovideos.com (MPV). Tracks quarterly/monthly content production, website traffic, campaigns, and provides AI-powered insights via Google Gemini. Originally scaffolded from Google AI Studio.

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build via Vite
- `npm run preview` — Preview production build
- `npm run lint` — TypeScript type-checking only (`tsc --noEmit`); no ESLint configured

## Architecture

**Single-page React app** — no router. Everything renders through `App.tsx`.

### Data flow

`constants.ts` (hardcoded `MONTHLY_DATA` array) → `App.tsx` aggregates/filters by selected period (month or quarter via `useMemo`) → props passed to child components. There is no backend or database; all data is static.

### Key files

- **App.tsx** — Main orchestrator (~600 lines). Owns period selection state, data aggregation logic, and renders all dashboard sections (StatCards, Charts, ActivityFeed, Modals).
- **constants.ts** — All monthly marketing data lives here. To add new months, append to the `MONTHLY_DATA` array following the `MonthlyData` interface.
- **types.ts** — TypeScript interfaces (`MonthlyData`, `CampaignMetrics`, `TrafficChannel`, etc.).
- **services/geminiService.ts** — Gemini API integration for AI insights. Uses `process.env.GEMINI_API_KEY` (mapped via Vite's `define` in `vite.config.ts`).

### Components (`/components`)

- **StatCard** — Reusable metric card with trend indicator
- **Charts** — Recharts-based visualizations (traffic, videos, newsletters, blogs, campaigns)
- **ActivityFeed** — Timeline of monthly activities; items are clickable to open modals
- **AiInsights** — Generates quarterly summaries via Gemini API
- **Modals** — CrawlStats, TrafficBreakdown, WebsiteEdits, Chatbot, Security

### Styling

- Tailwind CSS loaded via CDN (not installed as dependency)
- Custom Tailwind config is inline in `index.html` with theme colors: primary (#f97316 orange), accent (#8b5cf6 purple)
- Dark mode enforced by default
- Glass-morphism UI with animated mesh background
- Font: Plus Jakarta Sans

### Environment

- `GEMINI_API_KEY` — Set in `.env.local`. Vite maps it to both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via the `define` config.
- Path alias: `@` resolves to project root.

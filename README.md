# Pulse-Ops AI

AI-native lifecycle operations and orchestration platform — a portfolio demo showing how operational intelligence unifies Snowflake, Hightouch, Braze, and AI-driven signals into one command center.

**Live demo:** [https://kentkong.github.io/pulse-ops-ai/](https://kentkong.github.io/pulse-ops-ai/)

## Overview

Pulse-Ops AI demonstrates how lifecycle ops teams monitor account health, surface AI-driven risks, and orchestrate next actions across a modern martech stack. All data is mock — built for storytelling and portfolio walkthroughs.

### Stack Architecture

| Layer | Tool | Role |
|-------|------|------|
| Data | Snowflake | Customer & event data warehouse |
| Activation | Hightouch | Reverse ETL & audience sync |
| Engagement | Braze | Lifecycle messaging & journeys |
| Intelligence | Pulse-Ops AI | Health monitoring, AI signals, workflow orchestration |

## Workspace Pages

| Tab | Route | Purpose |
|-----|-------|---------|
| Command | `/` | Operations dashboard, kanban, AI rail, demo path |
| Lifecycle | `/lifecycle` | Journey map, stage cards, health heatmap |
| Workflows | `/workflows` | Orchestration pipeline & workflow cards |
| Signals | `/insights` | AI operational signals & recommendations |
| Events | `/events` | Real-time event stream |
| Stack | `/architecture` | Warehouse-native architecture diagram |

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **UI:** Custom component system, Lucide icons, Recharts
- **Deployment:** GitHub Pages (static export)

## Getting Started

```bash
npm install
npm run dev -- -p 3000
```

Open [http://localhost:3000/pulse-ops-ai/](http://localhost:3000/pulse-ops-ai/) (basePath is `/pulse-ops-ai`).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── dashboard/        # Command center widgets
│   ├── layout/           # Workspace shell, nav, orchestration strip
│   ├── lifecycle/        # Journey map, customer table
│   ├── insights/         # AI signal cards
│   ├── workflows/        # Orchestration diagrams
│   └── architecture/     # Stack flow diagrams
├── lib/
│   ├── mock-data.ts      # Demo customers, events, workflows
│   └── demo-now.ts       # Fixed clock for stable static export
└── types/
```

## Design Direction

Light operational workspace — charcoal texture, yellow accent, hue-coded nav tabs, sticky hero with scroll-away stack strip. Inspired by enterprise command centers and modern SaaS dashboards.

## License

Portfolio/demo project — not intended for production use.

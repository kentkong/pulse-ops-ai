# PulseOps AI

AI-native lifecycle operations and orchestration platform designed to unify customer intelligence, operational visibility, and adaptive engagement workflows into a centralized operational command center.

## Overview

PulseOps AI is a conceptual portfolio/demo application that demonstrates how AI, customer data platforms, orchestration layers, and engagement systems work together to create adaptive, scalable customer lifecycle operations.

### Stack Architecture

| Layer | Tool | Role |
|-------|------|------|
| Data | Snowflake | Customer & event data warehouse |
| Orchestration | Hightouch | Reverse ETL & audience activation |
| Engagement | Braze | Omnichannel lifecycle messaging |
| Intelligence | PulseOps AI | Operational visibility & AI insights |

## Phase 1 MVP Features

- **Executive Operations Dashboard** — KPIs, SLA monitoring, engagement trends
- **Customer Lifecycle Intelligence** — Stage tracking, health scoring, onboarding funnel
- **AI Insights Engine** — Generated operational summaries and recommendations
- **Workflow Orchestration Center** — Lifecycle automation flow management
- **Real-Time Event Stream** — Simulated customer activity feed
- **Next-Best-Action Engine** — AI-prioritized operational recommendations

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **UI:** shadcn/ui-inspired components, Lucide icons
- **Charts:** Recharts
- **Backend (future):** Supabase
- **AI (future):** OpenAI API
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Operations Dashboard
│   ├── lifecycle/        # Customer Lifecycle Intelligence
│   ├── insights/         # AI Insights Engine
│   ├── workflows/        # Workflow Orchestration
│   └── events/           # Real-Time Event Stream
├── components/
│   ├── ui/               # Base UI components
│   ├── dashboard/        # Dashboard widgets & charts
│   ├── insights/         # AI insight components
│   ├── lifecycle/        # Customer lifecycle views
│   ├── workflows/        # Workflow management
│   ├── events/           # Event stream components
│   └── actions/          # Next-best-action panel
├── lib/
│   ├── mock-data.ts      # Generated customer & operational data
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript type definitions
```

## Design Direction

Modern SaaS aesthetic inspired by Linear, Vercel, Retool, and Stripe Dashboard — dark theme, clean typography, operational intelligence focus.

## License

Portfolio/demo project — not intended for production use.

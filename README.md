# KiteAgent Credit Bureau

[![CI](https://github.com/gnanam1990/kiteagent-credit-bureau/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kiteagent-credit-bureau/actions/workflows/ci.yml)

Reputation, reliability, and credit-style profiles for autonomous Kite agents.

This repository is built from the staged prompt pack in [`prompts/`](prompts/).

## Product promise

Build transparent reputation, reliability, counterparty, and payment-history profiles for Kite agents.

## Live

- App: https://kiteagent-credit-bureau.vercel.app
- API: https://kiteagent-credit-bureau.vercel.app/api/health
- Live chain read: https://kiteagent-credit-bureau.vercel.app/api/chain/stats
- Proof report: [docs/PROOF_OF_WORK.md](docs/PROOF_OF_WORK.md) · screenshot: [docs/screenshot.jpg](docs/screenshot.jpg)

## Core modules

- **Agent Identity Profile** — Profile page for an agent address with labels, activity, and linked products.
- **Score Calculation Engine** — Transparent reliability score with factor breakdown.
- **Counterparty Graph** — Map relationships and recurring counterparties.
- **Payment Reliability History** — Track payment success behavior over time.
- **Public Trust API** — API endpoints for other apps to query agent reputation.

## What is real

- Vite + React 19 + TypeScript frontend with the required product routes.
- Hono API **deployed live** as a Vercel Serverless Function at `/api` (not just local dev).
- **Real Kite Mainnet read** at `GET /api/chain/stats` — live block height over JSON-RPC (`viem`) plus
  gas/network stats from the KiteScan explorer, surfaced in the app's live-network strip.
- Pure TypeScript core package for Kite-safe address/tx validation, risk policies, activity logs, and approval rules.
- Worker runtime (`@kiteagent-credit-bureau/worker`) wired into the live API at `POST /api/runs/simulate`.
- Tests for core validation, API routes (incl. chain + worker), and worker execution.

## What is PREVIEW

- The app degrades gracefully: if the live API is unreachable, the frontend renders from bundled preview data.
- Agentic decisions, payment verification, fund movement, trading, security, and scoring behavior are preview-safe
  unless explicitly verified by backend code.
- Client-submitted payment claims are not trusted. Fund-moving or risky actions require explicit approval.
- No official mainnet contract address is invented in this repo.

## API endpoints

Base path in production is `/api` (same-origin); base path in local dev is `http://localhost:8787`.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product + module metadata (single source). |
| GET | `/modules` | Product modules. |
| GET | `/scores` | List items. |
| POST | `/scores` | Create an item (`name`, `description`, `owner` required; `owner` must be a valid EVM address). |
| GET | `/scores/:id` | Fetch one item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve` · `/deny` | Resolve an approval. |
| GET | `/chain/stats` | **Live** Kite Mainnet block height + gas (degrades to preview if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake. |

## Structure

```txt
server/index.ts        Hono entry mounted at /api (bundled into a Vercel function)
packages/web/          Vite + React 19 frontend
packages/api/          Hono API server (app + routes + live chain read)
packages/worker/       background jobs and runtime simulation
packages/core/         pure TypeScript domain logic
packages/connectors/   Kite constants, KiteScan helper, cached fetch, RPC client
```

## Run locally

```bash
pnpm install
pnpm dev
```

Frontend: `http://localhost:5173` · API: `http://localhost:8787`

```bash
curl http://localhost:8787/health         # { "ok": true, "service": "kiteagent-credit-bureau" }
curl http://localhost:8787/chain/stats     # live Kite Mainnet block height + gas
```

## Verification

```bash
pnpm -r typecheck
pnpm -r test
pnpm --filter @kiteagent-credit-bureau/web build
```

## Deployment

Vercel is connected to this repo and auto-deploys `main` via the Build Output API
(`scripts/vercel-build.mjs`):

- **Static frontend** — the built Vite SPA.
- **Serverless API** — `server/index.ts` is esbuild-bundled into a self-contained function mounted at `/api`.
- The frontend calls same-origin `/api` in production and falls back to bundled preview data on any error.

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)

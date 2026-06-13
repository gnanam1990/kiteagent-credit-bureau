# KiteAgent Credit Bureau

> Reputation, reliability, and credit-style profiles for autonomous Kite agents.

[![CI](https://github.com/gnanam1990/kiteagent-credit-bureau/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kiteagent-credit-bureau/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

KiteAgent Credit Bureau builds transparent reputation, reliability, counterparty, and
payment-history profiles for agents operating on the Kite network. It is a pnpm/TypeScript
monorepo: a Hono API, a worker runtime, a pure-TypeScript domain core, on-chain connectors,
and a Vite + React frontend. The API performs a real Kite Mainnet read (current block height
plus explorer gas stats); most product modules — including the credit-score calculation — are
preview-stage and clearly labeled as such.

## Features

- **Agent Identity Profile** — profile view for an agent address with labels, activity, and linked items.
- **Hono Public Trust API** — health, metadata, item CRUD, activity log, approvals, and a live chain-stats endpoint.
- **Live Kite Mainnet read** — `GET /chain/stats` fetches the current block height over JSON-RPC (`viem`) and gas/network stats from the KiteScan explorer, surfaced in the app's live-network strip; it degrades to a preview-safe payload if chain infrastructure is unreachable.
- **Approval-first execution** — high-risk or fund-moving actions are gated behind an explicit approval queue (`requiresApproval` policy in `core`).
- **Worker runtime** — an in-process preview runtime (`PreviewRuntime`) wired into the API at `POST /runs/simulate`.
- **Pure-TypeScript core** — EVM/Kite address and tx-hash validation, risk weighting, and approval rules.
- **Graceful degradation** — if the API is unreachable, the frontend renders from bundled preview data.

> Preview: the Score Calculation Engine, Counterparty Graph, Payment Reliability History, and the
> credit-score UI are preview-stage. The trust score and factor breakdown shown in the app are
> illustrative, hard-coded preview values — they are **not** computed from on-chain history.
> See [Status](#status).

## Tech stack

- **Language:** TypeScript (ESM), Node.js 22
- **Package manager:** pnpm 9 (workspace monorepo)
- **API:** Hono + `@hono/node-server`
- **Chain:** viem (Kite Mainnet, chain id 2366)
- **Frontend:** Vite, React 19, Tailwind CSS v4, lucide-react
- **Testing:** Vitest
- **Build/bundle:** esbuild (serverless function), Vite (SPA)

## Architecture

```
server/index.ts        Hono root mounted at /api, bundled into a serverless function
packages/api/          Hono app, routes, in-memory data, live chain read
packages/core/         pure-TypeScript domain types, validation, risk + approval policy
packages/worker/       PreviewRuntime — enqueue/tick preview jobs
packages/connectors/   Kite chain definitions, viem public client, KiteScan helper, cached fetch
packages/web/          Vite + React 19 single-page frontend
```

## Getting started

### Prerequisites

- Node.js 22+
- pnpm 9 (`corepack enable` or install `pnpm@9.15.9`)

### Installation

```bash
pnpm install
```

### Configuration

Copy `.env.example` and adjust as needed. All variables are read by the backend or the dev frontend;
no secret values are committed.

| Variable | Purpose |
| --- | --- |
| `KITE_NETWORK` | Active Kite network (`mainnet` / `testnet`). |
| `KITE_MAINNET_RPC` | Kite Mainnet JSON-RPC endpoint. |
| `KITE_MAINNET_API` | KiteScan Mainnet explorer API base. |
| `KITE_TESTNET_RPC` | Kite Testnet JSON-RPC endpoint. |
| `KITE_TESTNET_API` | KiteScan Testnet explorer API base. |
| `API_PORT` | Local API server port (default `8787`). |
| `WEB_ORIGIN` | Allowed CORS origin for the API (default `http://localhost:5173`). |
| `VITE_API_URL` | Frontend API base for local dev. Ignored in production, where the SPA calls same-origin `/api`. |
| `WEBHOOK_SECRET_DEMO` | Local-only placeholder secret for the preview webhook intake. |
| `LLM_PROVIDER` | LLM provider selector; ships as `preview` (no live model calls). |

### Running

```bash
pnpm dev    # runs the API and web app together
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:8787`

```bash
curl http://localhost:8787/health        # { "ok": true, "service": "kiteagent-credit-bureau" }
curl http://localhost:8787/chain/stats   # live Kite Mainnet block height + gas
```

## Usage

API base path is `/api` in production (same-origin) and `http://localhost:8787` in local dev.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product + module metadata. |
| GET | `/modules` | Product modules. |
| GET | `/scores` | List items. |
| POST | `/scores` | Create an item (`name`, `description`, `owner` required; `owner` must be a valid EVM address). |
| GET | `/scores/:id` | Fetch one item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve` · `/deny` | Resolve an approval. |
| GET | `/chain/stats` | Live Kite Mainnet block height + gas (degrades to a preview payload if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake. |

## Testing

```bash
pnpm -r typecheck                                   # type-check every package
pnpm -r test                                        # Vitest across packages (core, api, worker)
pnpm --filter @kiteagent-credit-bureau/web build    # production SPA build
```

Tests cover core validation/policy, API routes (including the chain and worker endpoints), and the
worker runtime. The connectors and web packages currently pass with no tests.

## Project structure

```
.
├── server/index.ts          serverless function entry (Hono root at /api)
├── scripts/vercel-build.mjs  Build Output API bundler (SPA + esbuild function)
├── packages/
│   ├── api/                 Hono API
│   ├── core/                domain logic
│   ├── worker/              preview runtime
│   ├── connectors/          Kite/viem connectors
│   └── web/                 React frontend
├── docs/                    proof-of-work notes + screenshot
└── .env.example
```

## Status

Preview / MVP.

- **Real:** the Hono API and its routes; the live Kite Mainnet read at `/chain/stats` (block height via viem + KiteScan gas stats); core address/tx validation, risk weighting, and approval policy; the worker preview runtime; the Vite/React frontend with working item create/list, activity, and approval flows. The app is deployed at <https://kiteagent-credit-bureau.vercel.app> (API health at `/api/health`).
- **Preview / not computed:** the credit-score UI (`CreditHome`) shows a hard-coded trust score and factor-breakdown percentages — these are illustrative placeholders, not derived from on-chain data. The Score Calculation Engine, Counterparty Graph, and Payment Reliability History modules are preview-stage. API state is in-memory (created items are not persisted server-side; the frontend mirrors them in `localStorage`). The webhook endpoint accepts and echoes payloads but performs no production processing.
- **Safety:** client-submitted payment claims are not trusted; fund-moving or risky actions require explicit approval. No mainnet contract address is invented in this repo.

## Deployment

Deployed via the Build Output API (`scripts/vercel-build.mjs`):

- **Static frontend** — the built Vite SPA.
- **Serverless API** — `server/index.ts` is esbuild-bundled into a self-contained function mounted at `/api`.
- The frontend calls same-origin `/api` in production and falls back to bundled preview data on any error.

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)

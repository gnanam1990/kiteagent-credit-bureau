# KiteAgent Credit Bureau

Reputation, reliability, and credit-style profiles for autonomous Kite agents.

This repository is built from the staged OpenCode prompt pack in `prompts/`.

## Product promise

Build transparent reputation, reliability, counterparty, and payment-history profiles for Kite agents.

## Core modules

- **Agent Identity Profile** — Profile page for an agent address with labels, activity, and linked products.
- **Score Calculation Engine** — Transparent reliability score with factor breakdown.
- **Counterparty Graph** — Map relationships and recurring counterparties.
- **Payment Reliability History** — Track payment success behavior over time.
- **Public Trust API** — API endpoints for other apps to query agent reputation.

## What is real

- Vite + React + TypeScript frontend with the required product routes.
- Hono API with health, scores, runs, approvals, webhook, and route metadata endpoints.
- Pure TypeScript core package for Kite-safe validation, risk policies, activity logs, and approval rules.
- Worker runtime simulation for queued score activity.
- Kite constants, KiteScan helper, cached fetch, and RPC helper in `packages/connectors`.
- Tests for core validation, API routes, and worker execution.

## What is PREVIEW

- Agentic decisions, payment verification, fund movement, trading, security, and scoring behavior are preview-safe unless explicitly verified by backend code.
- Client-submitted payment claims are not trusted.
- Fund-moving or risky actions require explicit approval.
- No official mainnet contract address is invented in this repo.

## Structure

```txt
packages/web/          Vite + React 19 frontend
packages/api/          Hono API server
packages/worker/       background jobs and runtime simulation
packages/core/         pure TypeScript domain logic
packages/connectors/   KiteScan, RPC, webhook, LLM, wallet/API connectors
```

## Run locally

```bash
pnpm install
pnpm dev
```

Frontend: `http://localhost:5173`

API: `http://localhost:8787`

Health check:

```bash
curl http://localhost:8787/health
```

Expected:

```json
{ "ok": true, "service": "kiteagent-credit-bureau" }
```

## Verification

```bash
pnpm -r typecheck
pnpm -r lint
pnpm -r test
pnpm --filter @kiteagent-credit-bureau/web build
grep -rn "Instrument\|font-instrument\|font-serif" packages/web/src packages/web/index.html
grep -rn "violet\|indigo\|cyan\|#7C3AED\|#4F46E5\|#06B6D4" packages/web/src
```

The two grep commands should return zero hits.

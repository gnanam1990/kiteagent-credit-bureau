# KiteAgent Credit Bureau — Project Prompt Pack

## One-line summary
Reputation, reliability, and credit-style profiles for autonomous Kite agents.

## Product positioning
A transparent credit bureau for agents: identity, payment reliability, counterparty graph, scoring factors, history, and public API.

## Why this exists
Agents that receive funds, subscribe, borrow, or sell services need trust surfaces. This product turns agent history into readable reliability data.

## Repository name
`kiteagent-credit-bureau`

## Header subtitle
`CREDIT`

## Core routes
- `/`
- `/agents/:address`
- `/compare`
- `/scores`
- `/counterparties`
- `/api-docs`
- `/leaderboard`


## Core modules
1. **Agent Identity Profile** — Profile page for an agent address with labels, activity, and linked products.
2. **Score Calculation Engine** — Transparent reliability score with factor breakdown.
3. **Counterparty Graph** — Map relationships and recurring counterparties.
4. **Payment Reliability History** — Track payment success behavior over time.
5. **Public Trust API** — API endpoints for other apps to query agent reputation.

## API surface
- `GET /agents/:address`
- `GET /score/:address`
- `POST /scores/batch`
- `GET /counterparties/:address`
- `GET /trust-api/docs`
- `POST /api-keys`


## Safety requirements
- Do not claim official creditworthiness
- Scores are heuristics
- No lending decisions without human review
- Avoid defamatory language about addresses


## Build philosophy
This is not a small demo. Build it as a serious productivity platform for Kite AI agents. Every UI screen must move the user toward a real workflow, decision, payment, approval, or operational outcome.

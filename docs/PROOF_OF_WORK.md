# KiteAgent Credit Bureau Proof of Work

This repository is a public Kite AI project build with source prompts, runnable code, verification commands, a Vercel deployment, and a rendered screenshot.

## Public Links

- GitHub repo: https://github.com/gnanam1990/kiteagent-credit-bureau
- Live Vercel URL: https://kiteagent-credit-bureau.vercel.app
- Deployment URL: https://kiteagent-credit-bureau-j84z0jsyn-gnanam1990s-projects.vercel.app
- Vercel inspect URL: https://vercel.com/gnanam1990s-projects/kiteagent-credit-bureau/D8q4qF6b7HpqDzn3zkJ9H1uwjV8A
- Vercel deployment ID: `dpl_D8q4qF6b7HpqDzn3zkJ9H1uwjV8A`

## Commit Trail

The visible public history is intentionally split into meaningful work units:

1. `feat: build KiteAgent Credit Bureau MVP`
2. `chore: add Vercel deployment config`
3. `docs: add deployment proof of work`

## Verification Evidence

Local verification completed before deployment:

```bash
pnpm install --frozen-lockfile=false
pnpm -r typecheck
pnpm -r lint
pnpm -r test
pnpm --filter @kiteagent-credit-bureau/web build
```

Vercel verification completed during deployment:

- Install command: `pnpm install --frozen-lockfile=false`
- Build command: `pnpm --filter @kiteagent-credit-bureau/web build`
- Output directory: `packages/web/dist`
- Ready state: `READY`

## Rendered Screenshot

![KiteAgent Credit Bureau rendered app](./screenshot.jpg)

## Safety Notes

- This is a preview-safe Kite AI application.
- Risky, fund-moving, or wallet actions are clearly approval-first in the product copy and code.
- No official mainnet contract address is invented by this project.

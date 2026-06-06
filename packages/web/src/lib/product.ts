export const product = {
  name: "KiteAgent Credit Bureau",
  repo: "kiteagent-credit-bureau",
  subtitle: "CREDIT",
  hero: "Build transparent reputation, reliability, counterparty, and payment-history profiles for Kite agents.",
  positioning: "Reputation, reliability, and credit-style profiles for autonomous Kite agents.",
  entity: "scores",
  entitySingular: "score",
  entityRoute: "/scores",
  routes: [
  "/",
  "/agents/:address",
  "/compare",
  "/scores",
  "/counterparties",
  "/api-docs",
  "/leaderboard"
],
  modules: [
  {
    "id": "module_1",
    "name": "Agent Identity Profile",
    "description": "Profile page for an agent address with labels, activity, and linked products.",
    "preview": "live"
  },
  {
    "id": "module_2",
    "name": "Score Calculation Engine",
    "description": "Transparent reliability score with factor breakdown.",
    "preview": "preview"
  },
  {
    "id": "module_3",
    "name": "Counterparty Graph",
    "description": "Map relationships and recurring counterparties.",
    "preview": "preview"
  },
  {
    "id": "module_4",
    "name": "Payment Reliability History",
    "description": "Track payment success behavior over time.",
    "preview": "preview"
  },
  {
    "id": "module_5",
    "name": "Public Trust API",
    "description": "API endpoints for other apps to query agent reputation.",
    "preview": "preview"
  }
],
};

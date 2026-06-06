import { buildActivity, demoAddress, type ActivityEvent, type ApprovalRequest, type ProductItem, type ProductModule } from "@kiteagent-credit-bureau/core";

export const modules: ProductModule[] = [
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
];

export const items: ProductItem[] = [
  {
    "id": "score_1",
    "name": "Agent Identity Profile",
    "description": "Profile page for an agent address with labels, activity, and linked products.",
    "owner": demoAddress,
    "status": "active",
    "risk": "medium",
    "moduleId": "module_1",
    "budgetKite": "5",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "score_2",
    "name": "Score Calculation Engine",
    "description": "Transparent reliability score with factor breakdown.",
    "owner": demoAddress,
    "status": "active",
    "risk": "high",
    "moduleId": "module_2",
    "budgetKite": "50",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "score_3",
    "name": "Counterparty Graph",
    "description": "Map relationships and recurring counterparties.",
    "owner": demoAddress,
    "status": "draft",
    "risk": "low",
    "moduleId": "module_3",
    "budgetKite": "0",
    "createdAt": "2026-06-06T02:00:00.000Z"
  }
];

export const activity: ActivityEvent[] = [
  buildActivity(items[0], "KiteAgent Credit Bureau preview event accepted", new Date("2026-06-06T02:10:00.000Z")),
  buildActivity(items[1], "Risky Kite action queued for explicit approval", new Date("2026-06-06T02:20:00.000Z")),
];

export const approvals: ApprovalRequest[] = [
  {
    id: "approval_1",
    itemId: items[1].id,
    status: "pending",
    reason: "High-risk or fund-moving Kite action requires explicit approval.",
    risk: "high",
    requestedAt: "2026-06-06T02:20:00.000Z",
  },
];

export function createItem(input: Pick<ProductItem, "name" | "description" | "owner">) {
  const item: ProductItem = {
    id: `score_${Date.now()}`,
    name: input.name,
    description: input.description,
    owner: input.owner,
    status: "draft",
    risk: "low",
    moduleId: modules[0].id,
    budgetKite: "0",
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  return item;
}

---
mode: "agent"
description: "Drive local UI checks with Playwright CLI"
---
Use Playwright CLI to validate the requested UI behavior in this workspace.

Requirements:
- Start (or reuse) the Vite dev server with `npm run dev`.
- Open Playwright CLI session and navigate to `http://127.0.0.1:5173`.
- Perform the requested actions with `playwright-cli` commands.
- Capture at least one snapshot before and after major interactions.
- Report findings as:
  1. Repro steps
  2. Observed result
  3. Expected result
  4. Suggested fix (if bug found)

Prefer npm scripts if they exist: `pw:open`, `pw:goto`, `pw:snapshot`, `pw:close`.

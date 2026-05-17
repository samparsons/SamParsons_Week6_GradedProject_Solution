# Copilot Workspace Instructions

This repository includes Playwright CLI automation support installed by `playwright-cli install --skills`.

## Browser automation defaults

- Prefer `playwright-cli` for browser interactions when validating UI behavior.
- Start the app before browser automation:
  - `npm run dev`
  - Vite URL is usually `http://127.0.0.1:5173`.
- Use the helper scripts when possible:
  - `npm run pw:open`
  - `npm run pw:goto`
  - `npm run pw:snapshot`
  - `npm run pw:close`

## Recommended workflow

1. Start dev server with `npm run dev`.
2. Open browser session with `npm run pw:open`.
3. Navigate with `npm run pw:goto` or `playwright-cli goto <url>`.
4. Interact via `playwright-cli click`, `playwright-cli type`, `playwright-cli fill`, and `playwright-cli snapshot`.
5. Close with `npm run pw:close`.

## Notes

- The upstream skill was generated in `.claude/skills/playwright-cli/` for Claude-style agents.
- GitHub Copilot does not read Claude skill files directly, so this file provides equivalent Copilot-native instructions.
- If `playwright-cli` is unavailable in a shell, use the installed binary path:
  - `/home/linuxbrew/.linuxbrew/bin/playwright-cli`

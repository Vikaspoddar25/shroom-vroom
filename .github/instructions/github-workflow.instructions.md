---
description: "Use when writing or editing any file in the Shroom Vroom project. Copilot must automatically commit and push after every change."
applyTo: "src/**"
---

# Auto Commit & Deploy

After completing ANY change (code edits, new files, fixes, updates), Copilot MUST automatically:
1. Run `npm run build` to verify the build passes
2. Run `git add -A && git commit -m "<area>: <short description>" && git push origin main`

Do NOT ask the user whether to commit — just do it. Vercel auto-deploys on every push to `main`.

If the build fails, fix the error first, then commit and push.

## Git Conventions
- Remote: `origin` → `https://github.com/Vikaspoddar25/shroom-vroom`
- Default branch: `main`
- Author: `Vikaspoddar25` with noreply email `55732681+Vikaspoddar25@users.noreply.github.com`
- Commit message format: `<area>: <short description>` (e.g. `products: add Shiitake mushroom`, `hero: update tagline copy`)
- Never commit `.env*` files, `node_modules/`, or `.next/` build artifacts
- The `.vercel/` directory is gitignored — do not commit it

## Pre-push Checklist
Before every push, confirm:
1. `npm run build` passes without errors
2. `npm run lint` returns no errors
3. No hardcoded `₹` symbols — use `formatPrice()` from `@/lib/content`
4. No `console.log` left in production code

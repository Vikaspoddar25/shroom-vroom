---
description: "Use when writing or editing any file in the Shroom Vroom project. Reminds Copilot to always offer to commit and push changes to GitHub after they are accepted."
applyTo: "src/**"
---

# GitHub Commit Reminder

After making any change to files under `src/`, remind the user:

> "Changes saved. Run the **Push Changes to GitHub** prompt (`/github-commit`) to commit and push to `Vikaspoddar25/shroom-vroom` — Vercel will auto-deploy on push."

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

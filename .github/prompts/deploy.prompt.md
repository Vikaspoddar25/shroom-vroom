---
description: "Deploy Shroom Vroom to Vercel production — run build check, push latest code to GitHub, then trigger Vercel deploy"
name: "Deploy to Production"
agent: "agent"
tools: [run_in_terminal]
---

Deploy Shroom Vroom to Vercel production.

Steps:
1. Run `npm run build` in the project root — stop if it fails and report errors
2. If build passes, stage and commit any uncommitted changes:
   ```bash
   git add .
   git status
   git commit -m "Deploy: <brief description of changes>"
   ```
3. Push to GitHub main branch: `git push origin main`
4. Vercel auto-deploys on push (if connected via GitHub integration)
5. Confirm the push succeeded and tell the user to check vercel.com/dashboard for deploy status

Note: If Vercel is not yet connected to GitHub, instruct the user to:
- Go to vercel.com → New Project → Import from GitHub → select Vikaspoddar25/shroom-vroom
- Leave all settings as default (Next.js auto-detected)
- Click Deploy

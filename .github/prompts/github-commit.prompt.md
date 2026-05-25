---
description: "Commit and push all accepted/saved changes to GitHub (Vikaspoddar25/shroom-vroom). Run this after any code change is finalised."
name: "Push Changes to GitHub"
agent: "agent"
tools: [run_in_terminal]
---

Commit and push all saved changes in the Shroom Vroom workspace to GitHub.

Steps:
1. Check what has changed:
   ```bash
   git -C "/Users/apple/Personal Projects/Shroom Vroom" status
   git -C "/Users/apple/Personal Projects/Shroom Vroom" diff --stat
   ```
2. If there are no changes, tell the user everything is already up to date.
3. If there are changes, stage all modified and new files:
   ```bash
   git -C "/Users/apple/Personal Projects/Shroom Vroom" add .
   ```
4. Write a concise, descriptive commit message that summarises what was changed (e.g. "Update hero copy and add testimonials section"). Commit:
   ```bash
   git -C "/Users/apple/Personal Projects/Shroom Vroom" commit -m "<message>"
   ```
5. Push to the main branch:
   ```bash
   git -C "/Users/apple/Personal Projects/Shroom Vroom" push origin main
   ```
6. Confirm success and remind the user that Vercel will automatically redeploy from this push.

Rules:
- Never force-push (`--force`) unless the user explicitly requests it.
- Never amend a commit that has already been pushed.
- If the push is rejected (non-fast-forward), run `git pull --rebase origin main` first, then push again.
- If the build has not been run recently, suggest running `npm run build` before pushing to catch errors early.
- Always author commits as the currently configured git user (Vikaspoddar25).

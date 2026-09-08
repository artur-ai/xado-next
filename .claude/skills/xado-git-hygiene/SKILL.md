---
name: xado-git-hygiene
description: Use this skill after finishing any working feature or fix in xado-next, before ending a session, or when the user mentions switching computers, closing the laptop, or being "done for now". Reminds to commit and push immediately rather than leaving work only in the local working directory.
---

# Commit and push often

This project has already lost work twice from switching computers with uncommitted changes sitting only in the local working directory — once the entire catalog page + `lib/products.ts`, once a set of `CLAUDE.md` updates.

## Rule

Commit and push as soon as something works — not "at the end of the session." Never leave a working feature uncommitted overnight or before switching machines.

## When this skill should trigger a reminder

- A feature or bugfix just got confirmed working (e.g. after running `npm run dev` and checking the result in the browser)
- The user says something like "готово", "працює", "закінчую на сьогодні", "перекидаю на інший комп'ютер"
- A meaningful chunk of `lib/products.ts`, a page under `app/`, or `CLAUDE.md` itself was just edited

In these cases, suggest concretely:
```
git add -A
git commit -m "<short description of what changed>"
git push
```

## Auth note

GitHub no longer accepts a plain password for `git push` over HTTPS. Use a Personal Access Token instead: github.com/settings/tokens → "Generate new token (classic)" → check the `repo` scope → use the token as the password when prompted for one. Save it in the OS credential manager (`git config --global credential.helper osxkeychain` on macOS) so it isn't needed on every push.

## What this skill is not

This isn't about commit message style or PR hygiene for a team — it's specifically about the failure mode this solo project has already hit twice: real, working code existing only on one machine's disk.

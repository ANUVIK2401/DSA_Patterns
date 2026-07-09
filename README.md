# DSA Patterns — Interview Prep Tracker

A single-page, offline-friendly tracker for the **250 highest-frequency FAANG DSA problems**, grouped into **25 patterns** (10 problems each). Dark theme, fast, no build step. Works great on desktop and iPad Safari.

Live: **https://anuvik2401.github.io/DSA_Patterns/**

## What it is

- 25 patterns (Sliding Window → Recursion & Divide and Conquer), each with a "when to use", trigger signals, core idea, and a Python template.
- Every problem links to LeetCode and shows difficulty, priority (P1/P2/P3), likely companies, a one-line hint, and a key insight.
- Check off problems as you solve them. Progress is saved automatically.

## How to use

- **Check the box** next to a problem to mark it solved — progress bars and stats update live.
- **Search** (`/` to focus, `Esc` to clear) filters by name, hint, or insight.
- **Filter chips**: All / Solved / Unsolved / Easy / Medium / Hard / P1 / P2 / P3.
- **Expand all** opens every pattern; click a pattern header to toggle it.
- **Sidebar** shows per-pattern progress and overall stats; on narrow screens tap the ☰ button.

## Cross-device progress (IMPORTANT)

Progress is stored in your browser's **localStorage**, which is **per-device and per-browser**. Your MacBook and iPad do **not** sync automatically.

To move progress between devices:

1. On the source device, click **Export** — downloads a `dsa-progress-YYYY-MM-DD.json` file.
2. Move that file to the other device (AirDrop, iCloud Drive, email…).
3. On the target device, click **Import** and pick the file. You'll be asked whether to **merge** (combine both) or **replace**.

## Enable GitHub Pages

1. Push this repo to `https://github.com/ANUVIK2401/DSA_Patterns.git` (commands below).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**.
4. Set **Branch = `main`** and folder = **`/ (root)`**, then **Save**.
5. Wait ~1 minute. Your site is live at **https://anuvik2401.github.io/DSA_Patterns/**.

The `.nojekyll` file is included so GitHub Pages serves the files as-is.

## Syncing changes

After editing anything, run:

```bash
./deploy.sh
```

It stages, commits, and pushes — so you can update from either machine with one command.

## First push

```bash
git remote add origin https://github.com/ANUVIK2401/DSA_Patterns.git
git branch -M main
git push -u origin main
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole app — inline CSS + JS, loads `data.js`. |
| `data.js` | The 25 patterns and 250 problems. Edit here to tweak content. |
| `deploy.sh` | One-command commit + push. |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll. |

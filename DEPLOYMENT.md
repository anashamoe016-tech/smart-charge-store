# Reform Smart Charge Store — Deployment

## GitHub Pages
1. Upload the contents of this folder to the repository root.
2. GitHub Pages can use `index.html` as the public entry point.
3. Keep `.nojekyll` in the repository root.

## Custom domain
Add your real domain later in GitHub Pages settings and configure the DNS records at your domain provider.
No domain value was invented or hard-coded into this package.

## Project structure
- `index.html` — original Smart Charge Store UI
- `_admin_/` — admin panel from the repaired project
- `_backend_/` — backend from the repaired project
- `assets/` — project assets
- `_backup_/claude_index.html` — Claude's generated replacement index kept as a backup

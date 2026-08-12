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


## Backend configuration required before real account/wallet/order use

1. Deploy `_backend_` to a Node.js-capable host.
2. Copy `_backend_/.env.example` to `_backend_/.env`.
3. Fill `MONGO_URI` and `JWT_SECRET`.
4. Add provider tokens only to `.env`.
5. Set the deployed backend URL in `_settings_/Smart Charge Store.Settings.js`:
   `api.baseUrl`.
6. Set `google.clientId` after configuring Google Identity Services.
7. In Admin → Settings, set exchange rates and enable/disable automatic order execution.
8. Automatic order execution requires a provider to be online, `autoOrders=true`, and a valid `apiUrl` + `orderEndpoint`.

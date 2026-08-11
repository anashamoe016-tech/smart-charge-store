# Reform Smart Charge Store

متجر الشحن الذكي — a storefront for game top-ups, chat-app charging, digital
cards, and crypto, with an admin dashboard and a Node.js/Express + MongoDB
backend.

## Structure

- `index.html` — the storefront (static, connects directly to Supabase).
- `assets/` — logo and other static images used by the storefront.
- `_admin_/` — the admin dashboard (static, connects to the `_backend_` API).
- `_backend_/` — Node.js/Express API (orders, wallet, providers, auth, admin).

## Deployment

### Storefront + admin panel (GitHub Pages / any static host)
The root `index.html` and `_admin_/` are plain static files — upload the repo
to GitHub, enable GitHub Pages on the `main` branch, and point your custom
domain at it (add a `CNAME` file with your domain, or configure it from the
Pages settings). The included `.nojekyll` file is required so GitHub Pages
serves the `_admin_/` and `_backend_/` folders instead of ignoring them.

### Backend (`_backend_/`)
GitHub Pages only serves static files, so the Node backend must be deployed
separately (Render, Railway, a VPS, etc.):

```
cd _backend_
cp .env.example .env   # fill in your real values — never commit .env
npm install
npm start
```

Then set `window.API_BASE_URL` in `_admin_/config.js` to your deployed
backend's URL.

## SyriaMarket API

A placeholder service lives at `_backend_/services/providers/syriamarket.service.js`.
Add `SYRIAMARKET_BASE_URL` and `SYRIAMARKET_API_TOKEN` to your `.env` when
you have the credentials — no code changes needed.


## Central Settings
Edit `_settings_/Smart Charge Store.Settings.js` to control store-level configuration. Keep secrets in `_backend_/.env`.

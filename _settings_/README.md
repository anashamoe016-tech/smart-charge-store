# Central Settings

Edit `Smart Charge Store.Settings.js` for store-level settings: branding, currency rates, payments, support, providers, servers and feature flags.

Secrets stay only in `_backend_/.env` (Mongo URI, JWT secret, provider tokens). Provider entries reference secrets with `secretEnv`; the secret value is never stored in this file.

To add a provider: add an object to `providers`. To disable one: set `enabled: false`. Providers omitted from the registry are disabled in the database rather than deleted.

# Smart Charge Store — Central Settings

Edit only `Smart Charge Store.Settings.js` for public/store configuration:
- exchange rates
- enabled currencies
- branding
- payment methods
- support contacts
- automatic order/deposit switches
- duplicate receipt protection
- provider registry
- public backend URL
- Google client ID

NEVER put secrets in this file.

Secrets stay in `_backend_/.env`:
- `MONGO_URI`
- `JWT_SECRET`
- `SYRIAMARKET_API_TOKEN`
- provider tokens/passwords
- `GOOGLE_CLIENT_SECRET` (if a future server-side OAuth flow needs it)

Automatic order execution never claims success without a real provider response.

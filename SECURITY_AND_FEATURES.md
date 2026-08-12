# Smart Charge Store — Implemented System

## User accounts
- Real backend register/login using username or email.
- JWT authentication.
- Google Identity Services endpoint prepared.
- Dynamic greeting uses the real `username`.

## Wallet
- Server-side atomic balance check.
- A purchase is rejected before provider execution when balance is insufficient.
- Example: 0.56 USD balance cannot buy a 0.99 USD package.
- Failed provider execution refunds the wallet once.

## Automatic order execution
- Central switch: `autoOrderExecution`.
- Manual admin execution endpoint.
- Worker polls pending orders when enabled.
- A provider must be online, enabled for auto orders, and have a configured API URL + order endpoint.
- The system never reports success without provider confirmation.

## Receipt anti-fraud
- Receipt image SHA-256 hash.
- Unique operation key from payment method + transaction number + amount + transaction date.
- Duplicate transaction number protection.
- Receipt metadata and image data are stored in MongoDB.
- Duplicate submissions are rejected with HTTP 409.
- Upload limit: 5 MB.

## Exchange rates
- Currency rates can be edited from Admin → Settings.
- Rates are stored in MongoDB and also have central defaults in `_settings_/Smart Charge Store.Settings.js`.

## Important deployment note
GitHub Pages can serve the storefront, but the real backend must be deployed on a Node.js-capable host and its public URL must be entered in the central settings file.

Do not put database passwords, JWT secrets, or provider tokens in the central settings file or frontend.

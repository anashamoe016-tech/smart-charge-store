// Smart Charge Store — Admin panel configuration
//
// Set this to the URL where the _backend_ API is deployed
// (see /_backend_/README or /DEPLOYMENT.md). Never put API keys
// or secrets in this file — it is public, client-side code.
window.API_BASE_URL =
  (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:5000/api"
    : "https://YOUR-BACKEND-DOMAIN.example.com/api";

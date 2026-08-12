// Smart Charge Store — Admin panel configuration
// Public client-side config only. Never put secrets here.
window.API_BASE_URL =
  window.SCS_SETTINGS?.api?.baseUrl
  || ((location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:5000/api"
    : "https://YOUR-BACKEND-DOMAIN.example.com/api");

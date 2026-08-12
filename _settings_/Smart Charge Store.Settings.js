window.SCS_SETTINGS = {
  "version": "2.0.0",
  "site": {
    "name": "Smart Charge Store",
    "arabicName": "متجر الشحن الذكي",
    "greeting": "أهلاً بك",
    "language": "ar",
    "direction": "rtl",
    "maintenanceMode": false
  },
  "api": {
    "baseUrl": "",
    "timeoutMs": 15000
  },
  "branding": {
    "primary": "#ef1f26",
    "primaryDark": "#b60011",
    "gold": "#ffb61e",
    "background": "#000000",
    "panel": "#0e0e10",
    "text": "#f7f7f7",
    "logo": "assets/logo.png"
  },
  "currency": {
    "default": "USD",
    "rates": {
      "USD": 1,
      "SYP": 15000,
      "EUR": 0.92,
      "SAR": 3.75,
      "EGP": 48.5,
      "TRY": 39.2
    },
    "symbols": {
      "USD": "$",
      "SYP": "ل.س",
      "EUR": "€",
      "SAR": "ر.س",
      "EGP": "ج.م",
      "TRY": "₺"
    },
    "flags": {
      "USD": "🇺🇸",
      "SYP": "🇸🇾",
      "EUR": "🇪🇺",
      "SAR": "🇸🇦",
      "EGP": "🇪🇬",
      "TRY": "🇹🇷"
    },
    "enabled": [
      "USD",
      "SYP",
      "EUR",
      "SAR",
      "EGP",
      "TRY"
    ]
  },
  "features": {
    "autoOrderExecution": false,
    "autoDepositProcessing": false,
    "duplicateReceiptProtection": true,
    "walletBalanceProtection": true
  },
  "security": {
    "maxReceiptBytes": 5242880,
    "receiptHashAlgorithm": "sha256",
    "duplicateWindowDays": 3650
  },
  "payments": {
    "methods": [
      {
        "code": "SHAMCASH",
        "name": "Sham Cash",
        "enabled": true
      },
      {
        "code": "SYRIATEL_CASH",
        "name": "Syriatel Cash",
        "enabled": true
      },
      {
        "code": "USDT_TRC20",
        "name": "USDT TRC20",
        "enabled": true
      },
      {
        "code": "BEMO",
        "name": "Bemo",
        "enabled": true
      }
    ]
  },
  "support": {
    "whatsapp": "",
    "telegram": "",
    "email": ""
  },
  "google": {
    "clientId": ""
  },
  "servers": [
    {
      "code": "BACKEND",
      "name": "Main Backend",
      "url": "",
      "enabled": true
    },
    {
      "code": "ADMIN",
      "name": "Admin API",
      "url": "",
      "enabled": true
    }
  ],
  "providers": [
    {
      "code": "SYRIAMARKET",
      "name": "SyriaMarket",
      "apiUrl": "",
      "orderEndpoint": "",
      "secretEnv": "SYRIAMARKET_API_TOKEN",
      "priority": 1,
      "autoOrders": false,
      "autoSync": false,
      "enabled": true,
      "timeout": 30000
    },
    {
      "code": "SYRIASTORE",
      "name": "SyriaStore",
      "apiUrl": "",
      "orderEndpoint": "",
      "secretEnv": "SYRIASTORE_API_TOKEN",
      "priority": 2,
      "autoOrders": false,
      "autoSync": false,
      "enabled": false,
      "timeout": 30000
    },
    {
      "code": "WOLFSTORE",
      "name": "Wolfstore",
      "apiUrl": "",
      "orderEndpoint": "",
      "secretEnv": "WOLFSTORE_API_TOKEN",
      "priority": 3,
      "autoOrders": false,
      "autoSync": false,
      "enabled": false,
      "timeout": 30000
    }
  ]
};

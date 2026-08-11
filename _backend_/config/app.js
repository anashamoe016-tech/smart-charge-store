const appConfig = {

    port: process.env.PORT || 5000,

    apiPrefix: "/api",

    appName: process.env.STORE_NAME || "Smart Charge Store",

    jwtSecret: process.env.JWT_SECRET,

    autoOrders: process.env.AUTO_ORDERS === "true",

    autoDeposit: process.env.AUTO_DEPOSIT === "true"

};

export default appConfig;
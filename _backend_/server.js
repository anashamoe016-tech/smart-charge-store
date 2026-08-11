import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDatabase from "./config/database.js";
import { securityHeaders, apiLimiter, errorHandler } from "./middleware/security.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import providersRoutes from "./routes/providers.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import configRoutes from "./routes/config.routes.js";
import { loadCentralSettings, syncProviders } from "./services/central-settings.service.js";

dotenv.config();

connectDatabase();
await loadCentralSettings();

const app = express();

// Security & performance middleware (must come before routes)
app.use(securityHeaders);
app.use(
  cors({
    // Set CORS_ORIGIN in .env to your storefront's domain(s), comma separated.
    // Defaults to "*" for local development only.
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*"
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", apiLimiter);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    name: process.env.STORE_NAME || "Smart Charge Store",
    version: "1.0.0",
    status: "Running"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/config", configRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

// Central error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await syncProviders();
    console.log(`${process.env.STORE_NAME || "Smart Charge Store"} running on port ${PORT}`);
  } catch (error) {
    console.error("Central settings provider sync failed:", error);
    console.log(`${process.env.STORE_NAME || "Smart Charge Store"} running on port ${PORT} with provider sync warnings`);
  }
});

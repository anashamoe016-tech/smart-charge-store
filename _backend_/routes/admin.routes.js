import express from "express";

import {
    dashboard,
    getSettings,
    updateSettings,
    statistics,

    createGame,
    getGames,
    deleteGame,

    createPackage,
    getPackages,
    deletePackage,

    getAllOrders,
    updateOrderStatus,

    getAllDeposits,
    approveDeposit,
    rejectDeposit

} from "../controllers/admin.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// router.use(authMiddleware);
// router.use(adminMiddleware);

// Dashboard
router.get("/dashboard", dashboard);

// Settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// Statistics
router.get("/statistics", statistics);

// Games
router.post("/games", createGame);
router.get("/games", getGames);
router.delete("/games/:id", deleteGame);

// Packages
router.post("/packages", createPackage);
router.get("/packages", getPackages);
router.delete("/packages/:id", deletePackage);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

// Deposits
router.get("/deposits", getAllDeposits);
router.put("/deposits/:id/approve", approveDeposit);
router.put("/deposits/:id/reject", rejectDeposit);

export default router;

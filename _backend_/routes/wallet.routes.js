import express from "express";
import {
    getBalance,
    getHistory,
    deposit,
    receiptUpload
} from "../controllers/wallet.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.get("/history", authMiddleware, getHistory);
router.post("/deposit", authMiddleware, receiptUpload, deposit);

export default router;

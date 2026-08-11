import express from "express";

import {
    getBalance,
    getHistory,
    deposit
} from "../controllers/wallet.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// رصيد المحفظة
router.get(
    "/balance",
    authMiddleware,
    getBalance
);


// سجل العمليات
router.get(
    "/history",
    authMiddleware,
    getHistory
);


// طلب إيداع
router.post(
    "/deposit",
    authMiddleware,
    deposit
);


export default router;
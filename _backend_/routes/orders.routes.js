import express from "express";

import {
    createOrder,
    getOrders,
    getOrder,
    cancelOrder
} from "../controllers/orders.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// إنشاء طلب
router.post(
    "/create",
    authMiddleware,
    createOrder
);


// جميع طلبات المستخدم
router.get(
    "/",
    authMiddleware,
    getOrders
);


// تفاصيل طلب
router.get(
    "/:id",
    authMiddleware,
    getOrder
);


// إلغاء طلب
router.delete(
    "/:id",
    authMiddleware,
    cancelOrder
);


export default router;

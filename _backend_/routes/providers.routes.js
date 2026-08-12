import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
    getProviders,
    addProvider,
    updateProvider,
    deleteProvider,
    testProvider
} from "../controllers/providers.controller.js";

const router = express.Router();

// جميع المزودين
router.get("/", getProviders);

// إضافة مزود
router.post("/add", authMiddleware, adminMiddleware, addProvider);

// تعديل مزود
router.put("/:id", authMiddleware, adminMiddleware, updateProvider);

// حذف مزود
router.delete("/:id", authMiddleware, adminMiddleware, deleteProvider);

// اختبار الاتصال
router.get("/:id/test", authMiddleware, adminMiddleware, testProvider);

export default router;
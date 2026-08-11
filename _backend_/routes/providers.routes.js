import express from "express";

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
router.post("/add", addProvider);

// تعديل مزود
router.put("/:id", updateProvider);

// حذف مزود
router.delete("/:id", deleteProvider);

// اختبار الاتصال
router.get("/:id/test", testProvider);

export default router;
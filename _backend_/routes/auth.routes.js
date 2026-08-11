import express from "express";

import {
    login,
    register,
    logout,
    me
} from "../controllers/auth.controller.js";

const router = express.Router();

// تسجيل الدخول
router.post("/login", login);

// إنشاء حساب
router.post("/register", register);

// تسجيل الخروج
router.post("/logout", logout);

// معلومات المستخدم
router.get("/me", me);

export default router;
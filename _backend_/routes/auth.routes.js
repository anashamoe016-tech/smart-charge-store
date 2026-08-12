import express from "express";
import {
    login,
    register,
    logout,
    me,
    googleLogin
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google", googleLogin);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);

export default router;

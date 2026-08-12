import express from "express";
import { ensureDbSettings, publicSettings } from "../services/central-settings.service.js";

const router = express.Router();

router.get("/public", async (req, res) => {
    try {
        const settings = await ensureDbSettings();
        res.json({ success: true, settings: publicSettings(settings) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;

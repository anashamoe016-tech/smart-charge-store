import express from "express";

import {
    getGames,
    getGame,
    getPackages,
    searchGames
} from "../controllers/games.controller.js";

const router = express.Router();

// جميع الألعاب
router.get("/", getGames);

// لعبة واحدة
router.get("/:id", getGame);

// باقات اللعبة
router.get("/:id/packages", getPackages);

// البحث
router.get("/search/:keyword", searchGames);

export default router;
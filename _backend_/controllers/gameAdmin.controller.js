import Game from "../models/game.model.js";
import Package from "../models/package.model.js";


// إضافة لعبة
export const createGame = async (req, res) => {

    try {

        const game = await Game.create(req.body);

        res.json({
            success: true,
            game
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// إضافة باقة
export const createPackage = async (req, res) => {

    try {

        const pkg = await Package.create(req.body);

        res.json({
            success: true,
            package: pkg
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
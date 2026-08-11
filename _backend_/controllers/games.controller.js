import Game from "../models/game.model.js";
import Package from "../models/package.model.js";

// جميع الألعاب
export const getGames = async (req, res) => {

    try {

        const games = await Game.find({
            active: true
        }).sort({
            sortOrder: 1,
            name: 1
        });

        res.json({
            success: true,
            games
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// لعبة واحدة
export const getGame = async (req, res) => {

    try {

        const game = await Game.findById(req.params.id);

        if (!game) {

            return res.status(404).json({
                success: false,
                message: "Game not found."
            });

        }

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

// باقات اللعبة
export const getPackages = async (req, res) => {

    try {

        const packages = await Package.find({

            game: req.params.id,

            active: true

        }).sort({

            sortOrder: 1,

            price: 1

        });

        res.json({

            success: true,

            packages

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// البحث
export const searchGames = async (req, res) => {

    try {

        const games = await Game.find({

            name: {

                $regex: req.params.keyword,

                $options: "i"

            }

        });

        res.json({

            success: true,

            games

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
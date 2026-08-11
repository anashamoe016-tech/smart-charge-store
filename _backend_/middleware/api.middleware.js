const apiMiddleware = (req, res, next) => {

    try {

        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {

            return res.status(401).json({

                success: false,

                message: "API Key is required."

            });

        }

        if (apiKey !== process.env.PRIVATE_API_KEY) {

            return res.status(403).json({

                success: false,

                message: "Invalid API Key."

            });

        }

        next();

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export default apiMiddleware;
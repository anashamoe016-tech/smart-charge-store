import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.replace(
            "Bearer ",
            ""
        );

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Access denied."

            });

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        const user = await User.findById(decoded.id);

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found."

            });

        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid token."

        });

    }

};

export default authMiddleware;

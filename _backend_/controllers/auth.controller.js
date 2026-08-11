import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// تسجيل حساب
export const register = async (req, res) => {

    try {

        const {
            username,
            fullName,
            email,
            phone,
            password
        } = req.body;


        const exists = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });


        if (exists) {

            return res.status(400).json({

                success: false,

                message: "User already exists."

            });

        }


        const user = await User.create({

            username,

            fullName,

            email,

            phone,

            password

        });


        await Wallet.create({

            user: user._id

        });


        res.json({

            success: true,

            message: "Account created successfully."

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};



// تسجيل الدخول
export const login = async (req, res) => {

    try {


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({ email });



        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }



        const match = await bcrypt.compare(

            password,

            user.password

        );



        if (!match) {

            return res.status(401).json({

                success: false,

                message: "Invalid password."

            });

        }



        const token = jwt.sign(

            {

                id: user._id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "30d"

            }

        );



        res.json({

            success: true,

            token,

            user: {

                id: user._id,

                username: user.username,

                fullName: user.fullName,

                email: user.email,

                role: user.role,

                balance: user.balance

            }

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};




// تسجيل الخروج
export const logout = async (req, res) => {

    res.json({

        success: true,

        message: "Logged out successfully."

    });

};




// معلومات المستخدم
export const me = async (req, res) => {

    try {


        const user = await User.findById(req.user.id);



        res.json({

            success: true,

            user

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};

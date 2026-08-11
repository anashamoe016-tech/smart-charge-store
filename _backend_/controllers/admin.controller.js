import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Deposit from "../models/deposit.model.js";
import Settings from "../models/settings.model.js";
import Game from "../models/game.model.js";
import Package from "../models/package.model.js";


// لوحة التحكم
export const dashboard = async (req, res) => {

    try {

        const users = await User.countDocuments();

        const orders = await Order.countDocuments();

        const deposits = await Deposit.countDocuments();

        res.json({

            success: true,

            dashboard: {

                users,

                orders,

                deposits

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// إعدادات الموقع
export const getSettings = async (req, res) => {

    try {

        let settings = await Settings.findOne();

        if (!settings) {

            settings = await Settings.create({});

        }

        res.json({

            success: true,

            settings

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// تحديث الإعدادات
export const updateSettings = async (req, res) => {

    try {

        let settings = await Settings.findOne();

        if (!settings) {

            settings = await Settings.create(req.body);

        } else {

            Object.assign(settings, req.body);

            await settings.save();

        }

        res.json({

            success: true,

            settings

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// الإحصائيات
export const statistics = async (req, res) => {

    try {

        const users = await User.countDocuments();

        const orders = await Order.countDocuments();

        const completedOrders = await Order.countDocuments({
            status: "completed"
        });

        const pendingDeposits = await Deposit.countDocuments({
            status: "pending"
        });

        res.json({

            success: true,

            statistics: {

                users,

                orders,

                completedOrders,

                pendingDeposits

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


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


// جميع الألعاب
export const getGames = async (req, res) => {

    try {

        const games = await Game.find().sort({

            createdAt: -1

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


// جميع الباقات
export const getPackages = async (req, res) => {

    try {

        const packages = await Package.find()

            .populate("game")

            .populate("provider")

            .sort({

                createdAt: -1

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

};// حذف لعبة
export const deleteGame = async (req, res) => {

    try {

        await Game.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Game deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// حذف باقة
export const deletePackage = async (req, res) => {

    try {

        await Package.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Package deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// جميع الطلبات
export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user")
            .populate("game")
            .populate("package")
            .populate("provider")
            .sort({
                createdAt: -1
            });

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// تحديث حالة الطلب
export const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found."
            });

        }

        order.status = req.body.status;

        await order.save();

        res.json({
            success: true,
            message: "Order updated successfully.",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

import Wallet from "../models/wallet.model.js";


// جميع الإيداعات
export const getAllDeposits = async (req, res) => {

    try {

        const deposits = await Deposit.find()
            .populate("user")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            deposits
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// قبول الإيداع
export const approveDeposit = async (req, res) => {

    try {

        const deposit = await Deposit.findById(req.params.id);

        if (!deposit) {

            return res.status(404).json({
                success: false,
                message: "Deposit not found."
            });

        }

        if (deposit.status === "approved") {

            return res.json({
                success: true,
                message: "Deposit already approved."
            });

        }

        deposit.status = "approved";
        deposit.reviewedBy = req.user.id;
        deposit.reviewedAt = new Date();

        await deposit.save();

        let wallet = await Wallet.findOne({
            user: deposit.user
        });

        if (!wallet) {

            wallet = await Wallet.create({
                user: deposit.user
            });

        }

        wallet.balance += deposit.amount;
        wallet.totalDeposits += deposit.amount;

        await wallet.save();

        res.json({
            success: true,
            message: "Deposit approved successfully.",
            wallet
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// رفض الإيداع
export const rejectDeposit = async (req, res) => {

    try {

        const deposit = await Deposit.findById(req.params.id);

        if (!deposit) {

            return res.status(404).json({
                success: false,
                message: "Deposit not found."
            });

        }

        deposit.status = "rejected";
        deposit.reviewedBy = req.user.id;
        deposit.reviewedAt = new Date();

        await deposit.save();

        res.json({
            success: true,
            message: "Deposit rejected successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

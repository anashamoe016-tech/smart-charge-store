import orderService from "../services/order.service.js";

// إنشاء طلب
export const createOrder = async (req, res) => {

    try {

        const order = await orderService.create(
            req.user.id,
            req.body
        );

        res.json({

            success: true,

            message: "Order created successfully.",

            order

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

// جميع طلبات المستخدم
export const getOrders = async (req, res) => {

    try {

        const orders = await orderService.getByUser(
            req.user.id
        );

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

// تفاصيل طلب
export const getOrder = async (req, res) => {

    try {

        const order = await orderService.getById(
            req.params.id
        );

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found."

            });

        }

        res.json({

            success: true,

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// إلغاء طلب
export const cancelOrder = async (req, res) => {

    try {

        const order = await orderService.updateStatus(

            req.params.id,

            "cancelled"

        );

        res.json({

            success: true,

            message: "Order cancelled successfully.",

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
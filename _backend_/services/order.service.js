import Order from "../models/order.model.js";
import Package from "../models/package.model.js";
import walletService from "./wallet.service.js";

class OrderService {

    async create(userId, data) {

        const selectedPackage = await Package.findById(data.package);

        if (!selectedPackage) {

            throw new Error("Package not found");

        }

        const balance = await walletService.getBalance(userId);

        if (balance < selectedPackage.price) {

            throw new Error("Insufficient balance");

        }

        await walletService.subtractBalance(
            userId,
            selectedPackage.price
        );

        const order = await Order.create({

            user: userId,

            game: selectedPackage.game,

            package: selectedPackage._id,

            provider: selectedPackage.provider,

            playerId: data.playerId,

            playerName: data.playerName || "",

            amount: selectedPackage.price,

            cost: selectedPackage.cost,

            profit: selectedPackage.price - selectedPackage.cost,

            currency: selectedPackage.currency,

            status: "pending"

        });

        return order;

    }

    async getAll() {

        return await Order.find()

            .populate("user")

            .populate("game")

            .populate("package")

            .populate("provider")

            .sort({

                createdAt: -1

            });

    }

    async getByUser(userId) {

        return await Order.find({

            user: userId

        })

        .populate("game")

        .populate("package")

        .sort({

            createdAt: -1

        });

    }

    async getById(orderId) {

        return await Order.findById(orderId)

            .populate("user")

            .populate("game")

            .populate("package")

            .populate("provider");

    }

    async updateStatus(orderId, status) {

        const order = await Order.findById(orderId);

        if (!order) {

            throw new Error("Order not found");

        }

        order.status = status;

        await order.save();

        return order;

    }

}

const orderService = new OrderService();

export default orderService;
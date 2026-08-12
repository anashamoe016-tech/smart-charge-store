import crypto from "crypto";
import Order from "../models/order.model.js";
import Package from "../models/package.model.js";
import walletService from "./wallet.service.js";
import Provider from "../models/provider.model.js";
import Settings from "../models/settings.model.js";
import orderProcessor from "./order.processor.js";

function createIdempotencyKey(userId, packageId, playerId) {
    return crypto
        .createHash("sha256")
        .update(`${userId}|${packageId}|${String(playerId).trim()}|${Date.now()}`)
        .digest("hex");
}

class OrderService {
    async create(userId, data) {
        const selectedPackage = await Package.findOne({
            _id: data.package,
            active: true
        }).populate("game").populate("provider");

        if (!selectedPackage) {
            throw new Error("Package not found or inactive.");
        }

        const price = Number(selectedPackage.price);
        if (!Number.isFinite(price) || price <= 0) {
            throw new Error("Invalid package price.");
        }

        // The server-side package price is the only trusted price.
        const wallet = await walletService.subtractBalance(userId, price);

        let order;
        try {
            order = await Order.create({
                user: userId,
                game: selectedPackage.game?._id || selectedPackage.game,
                package: selectedPackage._id,
                provider: selectedPackage.provider?._id || selectedPackage.provider || null,
                playerId: String(data.playerId || "").trim(),
                playerName: String(data.playerName || "").trim(),
                amount: price,
                cost: Number(selectedPackage.cost || 0),
                profit: Number((price - Number(selectedPackage.cost || 0)).toFixed(2)),
                currency: selectedPackage.currency || "USD",
                status: "pending",
                idempotencyKey: createIdempotencyKey(userId, selectedPackage._id, data.playerId)
            });
        } catch (error) {
            await walletService.addBalance(userId, price);
            throw error;
        }

        let auto = false;
        const settings = await Settings.findOne().lean();
        if (settings?.autoOrderExecution && order.provider) {
            const provider = await Provider.findById(order.provider);
            auto = Boolean(provider?.autoOrders && provider?.status === "online");
        }

        if (auto) {
            await orderProcessor.processOne(order._id);
        }

        return await Order.findById(order._id)
            .populate("game")
            .populate("package")
            .populate("provider");
    }

    async getAll() {
        return Order.find()
            .populate("user")
            .populate("game")
            .populate("package")
            .populate("provider")
            .sort({ createdAt: -1 });
    }

    async getByUser(userId) {
        return Order.find({ user: userId })
            .populate("game")
            .populate("package")
            .populate("provider")
            .sort({ createdAt: -1 });
    }

    async getById(orderId) {
        return Order.findById(orderId)
            .populate("user")
            .populate("game")
            .populate("package")
            .populate("provider");
    }

    async updateStatus(orderId, status) {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");
        order.status = status;
        await order.save();
        return order;
    }
}

export default new OrderService();

import Wallet from "../models/wallet.model.js";
import Deposit from "../models/deposit.model.js";

class WalletService {
    async getWallet(userId) {
        let wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            wallet = await Wallet.create({ user: userId });
        }
        return wallet;
    }

    async getBalance(userId) {
        const wallet = await this.getWallet(userId);
        return Number(wallet.balance || 0);
    }

    async addBalance(userId, amount) {
        const value = Number(amount);
        if (!Number.isFinite(value) || value <= 0) {
            throw new Error("Invalid balance amount.");
        }

        return Wallet.findOneAndUpdate(
            { user: userId, status: "active" },
            {
                $inc: {
                    balance: value,
                    totalDeposits: value
                }
            },
            { new: true, upsert: true }
        );
    }

    async subtractBalance(userId, amount) {
        const value = Number(amount);
        if (!Number.isFinite(value) || value <= 0) {
            throw new Error("Invalid charge amount.");
        }

        const wallet = await Wallet.findOneAndUpdate(
            {
                user: userId,
                status: "active",
                balance: { $gte: value }
            },
            {
                $inc: {
                    balance: -value,
                    totalSpent: value
                }
            },
            { new: true }
        );

        if (!wallet) {
            const current = await this.getBalance(userId);
            throw new Error(`Insufficient balance. Current balance: ${current.toFixed(2)}, required: ${value.toFixed(2)}.`);
        }

        return wallet;
    }

    async refundIfNeeded(userId, amount, orderId) {
        const Order = (await import("../models/order.model.js")).default;
        const order = await Order.findById(orderId);
        if (!order || !["failed"].includes(order.status)) {
            return null;
        }
        if (order.notes?.includes("wallet refunded")) {
            return null;
        }

        const wallet = await this.addBalance(userId, amount);
        order.notes = `${order.notes || ""} wallet refunded`;
        await order.save();
        return wallet;
    }

    async createDeposit(data) {
        return Deposit.create(data);
    }

    async getDeposits(userId) {
        return Deposit.find({ user: userId }).sort({ createdAt: -1 });
    }
}

export default new WalletService();

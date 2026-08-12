import Order from "../models/order.model.js";
import Provider from "../models/provider.model.js";
import walletService from "./wallet.service.js";
import providerExecutor from "./provider.executor.js";

class OrderProcessor {
    async processOne(orderId) {
        const claimed = await Order.findOneAndUpdate(
            { _id: orderId, status: "pending" },
            {
                $set: { status: "processing", lastExecutionAt: new Date() },
                $inc: { executionAttempts: 1 }
            },
            { new: true }
        ).populate("provider");

        if (!claimed) {
            return { skipped: true, reason: "Order is not pending or does not exist." };
        }

        const provider = claimed.provider || await Provider.findOne({
            _id: claimed.provider,
            autoOrders: true,
            status: "online"
        });

        if (!provider || !provider.autoOrders || provider.status !== "online") {
            await Order.findByIdAndUpdate(claimed._id, {
                $set: { status: "pending", notes: "Waiting for an online automatic provider." }
            });
            return { skipped: true, reason: "No eligible provider." };
        }

        try {
            const result = await providerExecutor.executeOrder(provider, claimed);

            await Order.findByIdAndUpdate(claimed._id, {
                $set: {
                    status: "completed",
                    providerOrderId: result.providerOrderId,
                    notes: "Automatically executed and confirmed by provider."
                }
            });

            return { completed: true, providerOrderId: result.providerOrderId };
        } catch (error) {
            // Refund exactly once when an order fails after the wallet was charged.
            await Order.findByIdAndUpdate(claimed._id, {
                $set: {
                    status: "failed",
                    notes: `Automatic execution failed: ${error.message}`
                }
            });

            await walletService.refundIfNeeded(claimed.user, claimed.amount, claimed._id);

            return { completed: false, error: error.message };
        }
    }

    async processPending(limit = 20) {
        const orders = await Order.find({ status: "pending" })
            .sort({ createdAt: 1 })
            .limit(limit)
            .select("_id");

        const results = [];
        for (const item of orders) {
            results.push(await this.processOne(item._id));
        }
        return results;
    }
}

export default new OrderProcessor();

import Deposit from "../models/deposit.model.js";
import Wallet from "../models/wallet.model.js";

class DepositService {

    async create(data) {

        return await Deposit.create(data);

    }

    async getAll() {

        return await Deposit.find()
            .populate("user")
            .sort({ createdAt: -1 });

    }

    async getByUser(userId) {

        return await Deposit.find({
            user: userId
        }).sort({
            createdAt: -1
        });

    }

    async approve(depositId, adminId) {

        const deposit = await Deposit.findById(depositId);

        if (!deposit) {

            throw new Error("Deposit not found");

        }

        if (deposit.status !== "pending") {

            throw new Error("Deposit already processed");

        }

        deposit.status = "approved";
        deposit.reviewedBy = adminId;
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

        return deposit;

    }

    async reject(depositId, adminId, notes = "") {

        const deposit = await Deposit.findById(depositId);

        if (!deposit) {

            throw new Error("Deposit not found");

        }

        deposit.status = "rejected";
        deposit.reviewedBy = adminId;
        deposit.reviewedAt = new Date();
        deposit.notes = notes;

        await deposit.save();

        return deposit;

    }

}

const depositService = new DepositService();

export default depositService;
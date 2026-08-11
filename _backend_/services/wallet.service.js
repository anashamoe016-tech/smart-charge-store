import Wallet from "../models/wallet.model.js";
import Deposit from "../models/deposit.model.js";

class WalletService {

    async getWallet(userId) {

        let wallet = await Wallet.findOne({ user: userId });

        if (!wallet) {

            wallet = await Wallet.create({
                user: userId
            });

        }

        return wallet;

    }

    async getBalance(userId) {

        const wallet = await this.getWallet(userId);

        return wallet.balance;

    }

    async addBalance(userId, amount) {

        const wallet = await this.getWallet(userId);

        wallet.balance += Number(amount);

        wallet.totalDeposits += Number(amount);

        await wallet.save();

        return wallet;

    }

    async subtractBalance(userId, amount) {

        const wallet = await this.getWallet(userId);

        if (wallet.balance < amount) {

            throw new Error("Insufficient balance");

        }

        wallet.balance -= Number(amount);

        wallet.totalSpent += Number(amount);

        await wallet.save();

        return wallet;

    }

    async createDeposit(data) {

        return await Deposit.create(data);

    }

    async getDeposits(userId) {

        return await Deposit.find({
            user: userId
        }).sort({
            createdAt: -1
        });

    }

}

const walletService = new WalletService();

export default walletService;
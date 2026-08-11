import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    balance: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "USD"
    },

    totalDeposits: {
        type: Number,
        default: 0
    },

    totalSpent: {
        type: Number,
        default: 0
    },

    totalRefunds: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["active", "locked"],
        default: "active"
    }
},
{
    timestamps: true
}
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
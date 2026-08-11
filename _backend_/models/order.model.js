import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },

    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },

    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        default: null
    },

    playerId: {
        type: String,
        required: true
    },

    playerName: {
        type: String,
        default: ""
    },

    amount: {
        type: Number,
        required: true
    },

    cost: {
        type: Number,
        default: 0
    },

    profit: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "USD"
    },

    providerOrderId: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "completed",
            "failed",
            "cancelled"
        ],
        default: "pending"
    },

    notes: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
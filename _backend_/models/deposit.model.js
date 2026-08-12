import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "USD"
    },

    paymentMethod: {
        type: String,
        required: true
    },

    transactionNumber: {
        type: String,
        required: true,
        unique: true
    },

    receiptImage: {
        type: String,
        default: ""
    },

    receiptHash: {
        type: String,
        default: "",
        index: true
    },

    receipt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receipt",
        default: null
    },

    senderName: {
        type: String,
        default: "",
        trim: true
    },

    transactionDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "rejected"
        ],
        default: "pending"
    },

    notes: {
        type: String,
        default: ""
    },

    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    reviewedAt: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
}
);

const Deposit = mongoose.model("Deposit", depositSchema);

export default Deposit;
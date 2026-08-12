import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    senderName: {
        type: String,
        default: "",
        trim: true
    },
    transactionNumber: {
        type: String,
        required: true,
        trim: true
    },
    transactionDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    currency: {
        type: String,
        default: "USD",
        uppercase: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    imageHash: {
        type: String,
        default: "",
        index: true
    },
    imageData: {
        type: String,
        default: ""
    },
    operationKey: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        index: true
    }
},
{ timestamps: true }
);

receiptSchema.index({ imageHash: 1 }, { unique: true, sparse: true });
receiptSchema.index({ transactionNumber: 1, paymentMethod: 1 });

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;

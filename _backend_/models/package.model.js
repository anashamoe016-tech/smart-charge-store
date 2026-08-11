import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
{
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },

    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        default: null
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    providerPackageId: {
        type: String,
        default: ""
    },

    amount: {
        type: Number,
        required: true
    },

    cost: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    profit: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "USD"
    },

    active: {
        type: Boolean,
        default: true
    },

    sortOrder: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },

    apiUrl: {
        type: String,
        required: true
    },

    apiKey: {
        type: String,
        default: ""
    },

    apiSecret: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: [
            "online",
            "offline",
            "maintenance"
        ],
        default: "offline"
    },

    priority: {
        type: Number,
        default: 1
    },

    autoOrders: {
        type: Boolean,
        default: true
    },

    autoSync: {
        type: Boolean,
        default: true
    },

    timeout: {
        type: Number,
        default: 30000
    },

    lastCheck: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
}
);

const Provider = mongoose.model("Provider", providerSchema);

export default Provider;
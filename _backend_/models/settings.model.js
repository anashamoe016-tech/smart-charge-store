import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
{
    siteName: {
        type: String,
        default: "Smart Charge Store"
    },

    siteLogo: {
        type: String,
        default: ""
    },

    defaultCurrency: {
        type: String,
        default: "USD"
    },

    supportedCurrencies: {
        type: [String],
        default: ["USD", "EUR", "TRY", "SYP"]
    },

    maintenanceMode: {
        type: Boolean,
        default: false
    },

    autoOrders: {
        type: Boolean,
        default: true
    },

    autoDeposits: {
        type: Boolean,
        default: true
    },

    defaultProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        default: null
    },

    telegram: {
        type: String,
        default: ""
    },

    whatsapp: {
        type: String,
        default: ""
    },

    supportEmail: {
        type: String,
        default: ""
    },

    minimumDeposit: {
        type: Number,
        default: 1
    },

    maximumDeposit: {
        type: Number,
        default: 100000
    },

    orderProfitPercentage: {
        type: Number,
        default: 10
    }
},
{
    timestamps: true
}
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
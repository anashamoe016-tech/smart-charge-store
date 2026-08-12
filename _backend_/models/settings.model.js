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
    },

    currencyRates: {
        type: Map,
        of: Number,
        default: {
            USD: 1,
            SYP: 15000,
            EUR: 0.92,
            SAR: 3.75,
            EGP: 48.5,
            TRY: 39.2
        }
    },

    autoOrderExecution: {
        type: Boolean,
        default: false
    },

    autoDepositProcessing: {
        type: Boolean,
        default: false
    },

    duplicateReceiptProtection: {
        type: Boolean,
        default: true
    },

    servers: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    },

    providerRegistry: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
},
{
    timestamps: true
}
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
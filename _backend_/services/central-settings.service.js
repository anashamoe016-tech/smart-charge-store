import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Settings from "../models/settings.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "../..");
const settingsFile = path.join(root, "_settings_", "Smart Charge Store.Settings.js");

export function readFileSettings() {
    const source = fs.readFileSync(settingsFile, "utf8");
    const match = source.match(/window\.SCS_SETTINGS\s*=\s*(\{[\s\S]*\});?\s*$/);
    if (!match) throw new Error("Invalid central settings file.");
    return JSON.parse(match[1].replace(/;\s*$/, ""));
}

export async function ensureDbSettings() {
    const fileSettings = readFileSettings();
    let settings = await Settings.findOne();
    if (!settings) {
        settings = await Settings.create({
            siteName: fileSettings.site?.name || "Smart Charge Store",
            defaultCurrency: fileSettings.currency?.default || "USD",
            supportedCurrencies: fileSettings.currency?.enabled || ["USD"],
            maintenanceMode: Boolean(fileSettings.site?.maintenanceMode),
            autoOrders: Boolean(fileSettings.features?.autoOrderExecution),
            autoDeposits: Boolean(fileSettings.features?.autoDepositProcessing),
            autoOrderExecution: Boolean(fileSettings.features?.autoOrderExecution),
            autoDepositProcessing: Boolean(fileSettings.features?.autoDepositProcessing),
            duplicateReceiptProtection: fileSettings.features?.duplicateReceiptProtection !== false,
            currencyRates: fileSettings.currency?.rates || {},
            servers: fileSettings.servers || [],
            providerRegistry: fileSettings.providers || [],
            telegram: fileSettings.support?.telegram || "",
            whatsapp: fileSettings.support?.whatsapp || "",
            supportEmail: fileSettings.support?.email || ""
        });
    }
    return settings;
}

export function publicSettings(settings) {
    const fileSettings = readFileSettings();
    return {
        site: fileSettings.site,
        branding: fileSettings.branding,
        api: fileSettings.api,
        currency: {
            ...fileSettings.currency,
            rates: Object.fromEntries(settings?.currencyRates || Object.entries(fileSettings.currency?.rates || {}))
        },
        payments: fileSettings.payments,
        support: fileSettings.support,
        google: { clientId: fileSettings.google?.clientId || "" },
        servers: fileSettings.servers || [],
        features: {
            autoOrderExecution: Boolean(settings?.autoOrderExecution ?? fileSettings.features?.autoOrderExecution),
            duplicateReceiptProtection: settings?.duplicateReceiptProtection !== false,
            walletBalanceProtection: true
        }
    };
}

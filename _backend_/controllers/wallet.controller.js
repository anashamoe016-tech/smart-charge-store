import multer from "multer";
import walletService from "../services/wallet.service.js";
import { createReceiptRecord } from "../services/receipt.service.js";
import Settings from "../models/settings.model.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});

export const receiptUpload = upload.single("receipt");

export const getBalance = async (req, res) => {
    try {
        const balance = await walletService.getBalance(req.user.id);
        const wallet = await walletService.getWallet(req.user.id);
        res.json({ success: true, balance, wallet });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const deposits = await walletService.getDeposits(req.user.id);
        res.json({ success: true, deposits });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deposit = async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        const transactionDate = new Date(req.body.transactionDate);
        const paymentMethod = String(req.body.paymentMethod || "").trim();
        const transactionNumber = String(req.body.transactionNumber || "").trim();
        const senderName = String(req.body.senderName || "").trim();
        const currency = String(req.body.currency || "USD").toUpperCase();

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid deposit amount." });
        }
        if (!paymentMethod || !transactionNumber || !senderName || Number.isNaN(transactionDate.getTime())) {
            return res.status(400).json({ success: false, message: "Sender name, transaction number, payment method and transaction date are required." });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Receipt image is required." });
        }

        let settings = await Settings.findOne();
        if (!settings) settings = await Settings.create({});

        const duplicateProtection =
            settings.duplicateReceiptProtection !== false;

        let receipt = null;
        if (duplicateProtection) {
            receipt = await createReceiptRecord({
                userId: req.user.id,
                senderName,
                transactionNumber,
                transactionDate,
                amount,
                currency,
                paymentMethod,
                imageBuffer: req.file.buffer,
                imageMimeType: req.file.mimetype
            });
        }

        const depositDoc = await walletService.createDeposit({
            user: req.user.id,
            amount,
            currency,
            paymentMethod,
            transactionNumber,
            receiptImage: receipt?.imageData || "",
            receiptHash: receipt?.imageHash || "",
            receipt: receipt?._id || null,
            senderName,
            transactionDate,
            status: "pending"
        });

        if (receipt) {
            receipt.status = "pending";
            await receipt.save();
        }

        return res.status(201).json({
            success: true,
            message: "Deposit request submitted for review.",
            deposit: depositDoc
        });
    } catch (error) {
        const duplicate = /Duplicate receipt|Duplicate transaction number/i.test(error.message);
        res.status(duplicate ? 409 : 400).json({
            success: false,
            message: error.message
        });
    }
};

export { upload };

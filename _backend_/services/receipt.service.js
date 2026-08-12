import crypto from "crypto";
import Receipt from "../models/receipt.model.js";
import Deposit from "../models/deposit.model.js";

function normalizeText(value = "") {
    return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}

function buildOperationKey({ paymentMethod, transactionNumber, amount, transactionDate }) {
    const raw = [
        normalizeText(paymentMethod),
        normalizeText(transactionNumber),
        Number(amount).toFixed(2),
        new Date(transactionDate).toISOString()
    ].join("|");

    return crypto.createHash("sha256").update(raw).digest("hex");
}

function hashBuffer(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function assertReceiptIsUnique({ paymentMethod, transactionNumber, amount, transactionDate, imageHash }) {
    const operationKey = buildOperationKey({
        paymentMethod,
        transactionNumber,
        amount,
        transactionDate
    });

    const operationExists = await Receipt.findOne({ operationKey }).lean();
    if (operationExists) {
        throw new Error("Duplicate receipt: this transaction has already been submitted.");
    }

    if (imageHash) {
        const imageExists = await Receipt.findOne({ imageHash }).lean();
        if (imageExists) {
            throw new Error("Duplicate receipt: this receipt image has already been submitted.");
        }
    }

    const depositExists = await Deposit.findOne({
        transactionNumber: String(transactionNumber).trim()
    }).lean();

    if (depositExists) {
        throw new Error("Duplicate transaction number: this payment reference was already used.");
    }

    return operationKey;
}

async function createReceiptRecord({
    userId,
    senderName,
    transactionNumber,
    transactionDate,
    amount,
    currency,
    paymentMethod,
    imageBuffer,
    imageMimeType
}) {
    const imageHash = imageBuffer ? hashBuffer(imageBuffer) : "";
    const operationKey = await assertReceiptIsUnique({
        paymentMethod,
        transactionNumber,
        amount,
        transactionDate,
        imageHash
    });

    const imageData = imageBuffer
        ? `data:${imageMimeType || "application/octet-stream"};base64,${imageBuffer.toString("base64")}`
        : "";

    const receipt = await Receipt.create({
        user: userId,
        senderName,
        transactionNumber,
        transactionDate,
        amount,
        currency,
        paymentMethod,
        imageHash,
        imageData,
        operationKey
    });

    return receipt;
}

export {
    normalizeText,
    buildOperationKey,
    hashBuffer,
    assertReceiptIsUnique,
    createReceiptRecord
};

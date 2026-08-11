import { v4 as uuid } from "uuid";

export const generateOrderNumber = () => {

    return "ORD-" + Date.now();

};

export const generateTransactionNumber = () => {

    return "TXN-" + uuid().substring(0, 8).toUpperCase();

};

export const sleep = (ms) => {

    return new Promise(resolve => setTimeout(resolve, ms));

};

export const calculateProfit = (price, cost) => {

    return Number(price) - Number(cost);

};
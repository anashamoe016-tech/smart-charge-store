import axios from "axios";

// SyriaMarket API integration — placeholder only.
// Fill in SYRIAMARKET_BASE_URL and SYRIAMARKET_API_TOKEN in your .env
// when the SyriaMarket API credentials are available. Do not hardcode
// any key/token here or anywhere else in the codebase.

export const SYRIAMARKET = axios.create({
  baseURL: process.env.SYRIAMARKET_BASE_URL || "",
  headers: {
    "api-token": process.env.SYRIAMARKET_API_TOKEN || "",
    "Content-Type": "application/json"
  },
  timeout: 30000
});

export async function getProfile() {
  const { data } = await SYRIAMARKET.get("/client/api/profile");
  return data;
}

export async function getProducts() {
  const { data } = await SYRIAMARKET.get("/client/api/products");
  return data;
}

export async function getContent() {
  const { data } = await SYRIAMARKET.get("/client/api/content/0");
  return data;
}

export default {
  getProfile,
  getProducts,
  getContent,
  SYRIAMARKET
};

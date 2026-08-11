import axios from "axios";

export const SYRISTORE = axios.create({
  baseURL: process.env.SYRISTORE_BASE_URL || "https://api.syristore.com",
  headers: {
    "api-token": process.env.SYRISTORE_API_TOKEN || "",
    "Content-Type": "application/json"
  },
  timeout: 30000
});

export async function getProfile() {
  const { data } = await SYRISTORE.get("/client/api/profile");
  return data;
}

export async function getProducts() {
  const { data } = await SYRISTORE.get("/client/api/products");
  return data;
}

export async function getContent() {
  const { data } = await SYRISTORE.get("/client/api/content/0");
  return data;
}

export default {
  getProfile,
  getProducts,
  getContent,
  SYRISTORE
};

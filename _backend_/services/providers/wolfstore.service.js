import axios from "axios";

export const WOLFSTORE = axios.create({
  baseURL: process.env.WOLFSTORE_BASE_URL || "https://api.wolfstore.com",
  headers: {
    "api-token": process.env.WOLFSTORE_API_TOKEN || "",
    "Content-Type": "application/json"
  },
  timeout: 30000
});

export async function getProfile() {
  const { data } = await WOLFSTORE.get("/client/api/profile");
  return data;
}

export async function getProducts() {
  const { data } = await WOLFSTORE.get("/client/api/products");
  return data;
}

export async function getContent() {
  const { data } = await WOLFSTORE.get("/client/api/content/0");
  return data;
}

export default {
  getProfile,
  getProducts,
  getContent,
  WOLFSTORE
};

import axios from "axios";

function getProviderToken(provider) {
    const envName = provider.secretEnv || "";
    return envName ? (process.env[envName] || "") : (provider.apiKey || "");
}

function buildProviderUrl(provider) {
    const base = String(provider.apiUrl || "").replace(/\/+$/, "");
    const endpoint = String(provider.orderEndpoint || "").replace(/^\/+/, "");
    return endpoint ? `${base}/${endpoint}` : base;
}

async function executeOrder(provider, order) {
    if (!provider) {
        throw new Error("No provider configured for this order.");
    }

    if (!provider.apiUrl || !provider.orderEndpoint) {
        throw new Error(`Provider ${provider.name} is not configured for automatic order execution.`);
    }

    const token = getProviderToken(provider);
    const headers = { "Content-Type": "application/json" };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
        headers["x-api-key"] = token;
        headers["api-token"] = token;
    }

    const url = buildProviderUrl(provider);

    const payload = {
        orderId: String(order._id),
        packageId: String(order.package),
        gameId: String(order.game),
        playerId: order.playerId,
        playerName: order.playerName || "",
        amount: order.amount,
        currency: order.currency
    };

    const { data } = await axios.post(url, payload, {
        headers,
        timeout: Number(provider.timeout || 30000)
    });

    const providerOrderId =
        data?.orderId ||
        data?.id ||
        data?.reference ||
        data?.data?.orderId ||
        "";

    const success =
        data?.success === true ||
        data?.status === "success" ||
        data?.status === "completed" ||
        Boolean(providerOrderId && data?.success !== false);

    if (!success) {
        throw new Error(data?.message || "Provider did not confirm the order.");
    }

    return { data, providerOrderId: String(providerOrderId || "") };
}

export default { executeOrder };

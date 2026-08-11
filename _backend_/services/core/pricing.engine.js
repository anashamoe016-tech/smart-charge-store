class PricingEngine {

    calculate(cost, profit = 0) {

        const price = Number(cost) + (Number(cost) * Number(profit) / 100);

        return Number(price.toFixed(2));

    }

    calculateProfit(cost, sellPrice) {

        return Number((sellPrice - cost).toFixed(2));

    }

    calculateProfitPercent(cost, sellPrice) {

        if (cost <= 0) return 0;

        return Number((((sellPrice - cost) / cost) * 100).toFixed(2));

    }

}

const pricingEngine = new PricingEngine();

export default pricingEngine;

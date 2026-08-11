import fs from "fs";
import path from "path";
import vm from "vm";

const settingsPath = path.resolve(process.cwd(), "_settings_", "Smart Charge Store.Settings.js");
let centralRates = null;
try {
  const source = fs.readFileSync(settingsPath, "utf8");
  const sandbox = { console, module: { exports: {} }, exports: {} };
  vm.runInNewContext(`${source}\n;module.exports = SCS_SETTINGS;`, sandbox, { filename: settingsPath });
  centralRates = sandbox.module.exports?.currency?.rates || null;
} catch (error) {
  console.warn("Central currency settings could not be loaded:", error.message);
}

class CurrencyService {

    constructor() {

        this.currencies = {
            ...(centralRates || { USD: 1, EUR: 0.92, TRY: 39.20, SYP: 15000 })
        };

    }

    getRate(currency) {

        return this.currencies[currency] || 1;

    }

    convert(amount, from, to) {

        const fromRate = this.getRate(from);

        const toRate = this.getRate(to);

        const usd = amount / fromRate;

        return Number((usd * toRate).toFixed(2));

    }

    addCurrency(code, rate) {

        this.currencies[code] = rate;

    }

    updateRate(code, rate) {

        this.currencies[code] = rate;

    }

    getAll() {

        return this.currencies;

    }

}

const currencyService = new CurrencyService();

export default currencyService;
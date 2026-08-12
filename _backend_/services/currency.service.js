class CurrencyService {

    constructor() {

        this.currencies = {
            USD: 1,
            EUR: 0.92,
            TRY: 39.20,
            SYP: 15000
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
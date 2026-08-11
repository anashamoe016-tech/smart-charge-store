import Provider from "../../models/provider.model.js";

class ProviderManager {

    async getAll() {
        return await Provider.find().sort({
            priority: 1
        });
    }

    async getOnline() {
        return await Provider.find({
            status: "online",
            autoSync: true
        }).sort({
            priority: 1
        });
    }

    async getByCode(code) {
        return await Provider.findOne({
            code: code.toUpperCase()
        });
    }

    async getBestProvider() {
        return await Provider.findOne({
            status: "online",
            autoOrders: true
        }).sort({
            priority: 1
        });
    }

    async updateStatus(id, status, error = null) {

        return await Provider.findByIdAndUpdate(
            id,
            {
                status,
                lastCheck: new Date(),
                lastError: error
            },
            {
                new: true
            }
        );

    }

}

const providerManager = new ProviderManager();

export default providerManager;

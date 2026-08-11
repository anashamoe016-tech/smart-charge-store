import Provider from "../models/provider.model.js";

class ProviderService {

    async create(data) {

        return await Provider.create(data);

    }

    async getAll() {

        return await Provider.find().sort({
            priority: 1,
            createdAt: -1
        });

    }

    async getById(id) {

        return await Provider.findById(id);

    }

    async update(id, data) {

        return await Provider.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            }
        );

    }

    async delete(id) {

        return await Provider.findByIdAndDelete(id);

    }

    async updateStatus(id, status) {

        return await Provider.findByIdAndUpdate(
            id,
            {
                status,
                lastCheck: new Date()
            },
            {
                new: true
            }
        );

    }

    async getOnlineProviders() {

        return await Provider.find({
            status: "online"
        }).sort({
            priority: 1
        });

    }

    async getBestProvider() {

        const provider = await Provider.findOne({
            status: "online",
            autoOrders: true
        }).sort({
            priority: 1
        });

        return provider;

    }

}

const providerService = new ProviderService();

export default providerService;
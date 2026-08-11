import providerManager from "./provider.manager.js";

class SyncEngine {

    constructor() {
        this.providers = [];
    }

    async loadProviders() {
        this.providers = await providerManager.getOnline();
        return this.providers;
    }

    async syncAll() {

        const providers = await this.loadProviders();

        console.log("================================");
        console.log("Starting Smart Charge Sync...");
        console.log("Providers:", providers.length);
        console.log("================================");

        for (const provider of providers) {

            console.log(`Syncing ${provider.name}...`);

            switch (provider.code) {

                case "WOLFSTORE":
                    console.log("Wolf Store Sync (Coming Next)");
                    break;

                case "SYRIASTORE":
                    console.log("Syria Store Sync (Coming Next)");
                    break;

                default:
                    console.log(`${provider.code} is not supported yet.`);
                    break;

            }

        }

        console.log("================================");
        console.log("Sync Finished");
        console.log("================================");

    }

}

const syncEngine = new SyncEngine();

export default syncEngine;

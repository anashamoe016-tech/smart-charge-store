class NotificationService {

    async send(userId, title, message) {

        console.log("================================");
        console.log("Notification");
        console.log("User:", userId);
        console.log("Title:", title);
        console.log("Message:", message);
        console.log("================================");

        return {
            success: true
        };

    }

    async orderCreated(userId, orderId) {

        return await this.send(
            userId,
            "Order Created",
            `Your order ${orderId} has been created successfully.`
        );

    }

    async orderCompleted(userId, orderId) {

        return await this.send(
            userId,
            "Order Completed",
            `Your order ${orderId} has been completed successfully.`
        );

    }

    async depositApproved(userId, amount) {

        return await this.send(
            userId,
            "Deposit Approved",
            `Your deposit of ${amount} USD has been approved.`
        );

    }

    async depositRejected(userId) {

        return await this.send(
            userId,
            "Deposit Rejected",
            "Your deposit request has been rejected."
        );

    }

}

const notificationService = new NotificationService();

export default notificationService;
const { createOrder, verifyPayment } = require("../helpers/razor.helper");


exports.createOrder = async (req, res) => {
    try {
        const result = await createOrder(500);
        res.status(200).json({ status: true, message: 'Order Created!', result });
    } catch (error) {
        throw new Error("Not valid Order");
    }
}


exports.verifyOrder = async (req, res) => {
    try {
        const { order_id, payment_id, signature } = req.body;
        const result = await verifyPayment(order_id, payment_id, signature);
        res.status(200).json({ status: true, message: 'Order Verified!', result });
    } catch (error) {
        throw new Error("Not valid Order");
    }
}

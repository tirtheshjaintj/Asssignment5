const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils.js');

// Initialize Razorpay instance
const key_secret = process.env.RAZORPAY_API_SECRET;
const key_id = process.env.RAZORPAY_API_KEY;
const initializeRazorpay = () => {
    if (!key_secret || !key_id) {
        throw new Error('Razorpay credentials not found');
    }
    return new Razorpay({
        key_id,
        key_secret
    });
};

// Create Razorpay order
const createOrder = async (amount) => {
    const options = {
        amount: Math.round(amount * 100),
        currency: 'INR',
    };

    const instance = initializeRazorpay();
    return await instance.orders.create(options);
};

// Verify payment signature
const verifyPayment = (order_id, payment_id, signature) => {
    return validatePaymentVerification(
        { order_id, payment_id },
        signature,
        key_secret
    );
};

module.exports = { createOrder, verifyPayment };

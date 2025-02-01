const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')('sk_test_51QmgKsDOD0bw94hzIw7WBJr6yqArrq3trTT5X6XIroAbhSiWoAPJwpUX0IBZgWTlgZ03TiWqiszZEPQIj8eymj2500L3of84fo');

app.use(cors());
app.use(express.json());

// Function to create a customer and attach a payment method
async function createCustomerAndAttachPayment(paymentMethodId) {
    const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        invoice_settings: {
            default_payment_method: paymentMethodId,
        },
    });
    return customer.id;
}

// Endpoint for one-time payments
app.post('/api/payment', async (req, res) => {
    const { paymentMethodId } = req.body;
    try {
        const customer = await createCustomerAndAttachPayment(paymentMethodId);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1400, // example amount in cents
            currency: 'usd',
            customer: customer,
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: { enabled: true, allow_redirects: "never" }
        });
        res.json({ success: true, paymentIntentId: paymentIntent.id });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
// Helper function to create customer and attach payment method
async function createCustomerWithDefaultPaymentMethod(paymentMethodId) {
    try {
        const customer = await stripe.customers.create({
            payment_method: paymentMethodId,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });
        return customer;
    } catch (error) {
        throw error;
    }
}

// Endpoint for creating monthly subscriptions
app.post('/api/subscribe', async (req, res) => {
    const { paymentMethodId, priceId } = req.body;
    try {
        const customer = await createCustomerWithDefaultPaymentMethod(paymentMethodId);

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
        });

        res.json({ success: true, subscriptionId: subscription.id, customer: customer.id });
    } catch (error) {
        console.error('Error in creating subscription:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
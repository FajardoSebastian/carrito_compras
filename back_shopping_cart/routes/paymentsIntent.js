const express = require('express');
const getOrderAmount = require('../data/getOrderAmount');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SK);

//Crear Intendo Pago
router.post("/", async (req, res) => {
    const  items = req.body;
    console.log('🔥: items', items);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await getOrderAmount(items),
      currency: "usd"
    });
  
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });

module.exports = router;
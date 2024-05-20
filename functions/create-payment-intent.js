require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, total, shipping_fee } = JSON.parse(event.body);
    const calculateOrderAmount = () => total + shipping_fee;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      };
    } catch (error) {
      console.log("mgerror--", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  } else {
    return {
      statusCode: 200,
      body: "Create payment intent",
    };
  }
};

//Import Utils
const stripe = require("../../Utils/stripe");

//Create Payment Intent
const paymentIntent = async (req, res) => {
  try {
    const { profileId } = req.user;
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json({
      success: true,
      message: "Payment intent created",
      data: { clientSecret: paymentIntent.client_secret },
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Export Function
module.exports = { paymentIntent };

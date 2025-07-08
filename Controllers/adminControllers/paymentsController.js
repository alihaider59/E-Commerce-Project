//Import Models
const Payments = require("../../Models/payments");

//View Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payments.find({});
    if (payments.length === 0)
      return res.status(200).json({
        success: true,
        message: "There is no any payment",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All payments",
      data: payments,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

// View Specific User Payments
const getUserPayment = async (req, res) => {
  try {
    const payments = await Payments.find({ userId: req.params.id });
    if (payments.length === 0)
      return res.status(200).json({
        success: true,
        message: "There is no any payment",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "Payments for this user",
      data: payments,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Export Functions
module.exports = {
  getPayments,
  getUserPayment,
};

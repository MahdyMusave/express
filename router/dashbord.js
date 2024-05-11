const axios = require("axios");

const router = require("express").Router();
router.get("", async (req, res) => {
  try {
    return console.log(req.body);
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/pay", async (req, res) => {
  try {
    // return console.log(req.body);
    const params = {
      merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
      amount: req.body.amount,
      callback_url: `https://localhost:3000/paycallback`,
      description: "افزایش اعتبار حساب کاربری",
    };
    const response = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      params
    );
    console.log(response);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = router;

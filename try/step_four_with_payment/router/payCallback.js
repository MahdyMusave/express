const router = require("express").Router();
const { default: axios } = require("axios");
const Payment = require("../model/payment");
const User = require("../model/db");

router.get("/", async (req, res) => {
  // console.log("callback");
  console.log(req.query.Status && req.query.Status !== "Ok");
  if (req.query.Status && req.query.Status !== "Ok") {
    res.send("تراکنش ناموفق");
  }
  let payment = await Payment.findOne({
    resnumber: req.query.Authority,
  });
  // console.log(payment);
  if (!payment) return res.send("همچنین تراکنش وجود ندارد");
  let params = {
    merchant_id: "6cded376-3063-11e9-a98e-005056a205be  ",
    amount: payment.amount,
    Authority: req.query.Authority,
  };

  const response = await axios.post(
    "https://api.zarinpal.com/pg/v4/payment/verify.json"
  );

  if (response.data.data.code === 100) {
    let balance = payment.amount;
    const user = await User.findById(payment.user);
    if (user.blance) {
      balance += user.blance;
    }
    user.balance = balance;
    payment.payment = true;
    await user.save();
    await payment.save();
    res.redirect("/profile");
  } else {
    return res.send("تراکنش ناموفق");
  }
});

module.exports = router;

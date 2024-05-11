const router = require("express").Router();
const profileController = require("../controller/profile_controller");
const axios = require("axios");

const payment = require("../model/payment");
router.use((req, res, next) => {
  // console.log(req.session.email );
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
});

router.get("/", profileController.getProfile);

router.post("/pay", async (req, res) => {
  let params = {
    merchant_id: "6cded376-3063-11e9-a98e-005056a205be  ",
    amount: parseInt(req.body.amount),
    callback_url: "http://localhost:3000/paycallback",
    description: "افزایش اعتبار محصول",
  };
  // console.log(params);

  const response = await axios.post(
    "https://api.zarinpal.com/pg/v4/payment/request.json",
    params
  );
  // console.log(response);
  // console.log(req.body);
  // console.log(response.data.data.code === 100);
  if (response.data.data.code === 100) {
    console.log(req.body.userid);
    let newPayment = await new payment({
      user: req.body.userid,
      // user: req.user.id,
      amount: req.body.amount,
      resnumber: response.data.data.authority,
    });
    await newPayment.save();
    res.redirect(
      `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`
    );
  } else {
    res.redirect("/profile");
  }
});
module.exports = router;

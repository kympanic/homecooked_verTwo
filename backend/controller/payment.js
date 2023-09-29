const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
	"/process",
	catchAsyncErrors(async (req, res, next) => {
		const myPayment = await stripe.paymentIntents.create({
			amount: req.body.amount,
			currency: "USD",
			metadata: {
				company: "Dacapo",
			},
		});
		res.status(200).json({
			success: true,
			client_secret: myPayment.client_secret,
		});
	})
);

router.get(
	"/stripeapikey",
	catchAsyncErrors(async (req, res, next) => {
		res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
	})
);

module.exports = router;

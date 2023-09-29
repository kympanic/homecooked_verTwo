const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");

//create new order
router.post(
	"/create",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { cart, shippingAddress, user, totalPrice, paymentInfo } =
				req.body;
			//group items by shopId
		} catch (error) {
			return next(new ErrorHandler("User already exists", 400));
		}
	})
);

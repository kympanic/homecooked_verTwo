const express = require("express");
const User = require("../model/user");
const Product = require("../model/product");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

router.get(
	"/all-products",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const allProducts = await Product.find().populate(
				"user",
				"name -_id"
			); // This populates the 'user' field in the product with the user's name, excluding the user's _id
			res.status(200).json({
				success: true,
				allProducts,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 400));
		}
	})
);

module.exports = router;

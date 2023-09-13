const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");
const Shop = require("../model/shop");
const Coupon = require("../model/coupon");

//get all coupons of shop
router.get(
	"/all-coupons/:id",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const coupons = await Coupon.find({
				"shop._id": req.params.id,
			});

			res.status(201).json({
				success: true,
				coupons,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 400));
		}
	})
);

//create coupon code
router.post(
	"/create-coupon",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const existingCoupon = await Coupon.find({ name: req.body.name });
			if (existingCoupon.length !== 0) {
				return next(
					new ErrorHandler("Coupon code already exists!", 400)
				);
			}
			const minAmount = req.body.minAmount;
			const maxAmount = req.body.maxAmount;
			if (req.body.value > 100) {
				return next(
					new ErrorHandler("Discount can't be larger than 100%"),
					400
				);
			}

			if (
				minAmount.length > 0 &&
				maxAmount.length > 0 &&
				Number(minAmount) > Number(maxAmount)
			) {
				return next(
					new ErrorHandler(
						"Minimum purchase amount can't be greater than maximum purchase amount!",
						400
					)
				);
			}
			const coupon = await Coupon.create(req.body);

			res.status(201).json({
				success: true,
				coupon,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 400));
		}
	})
);

//delete product
router.delete(
	"/delete-coupon/:id",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const couponId = req.params.id;
			const coupon = await Coupon.findByIdAndDelete(couponId);
			if (!coupon) {
				return next(new ErrorHandler("Coupon not found!", 500));
			}
			res.status(201).json({
				success: true,
				message: "Coupon deleted successfully!",
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

module.exports = router;

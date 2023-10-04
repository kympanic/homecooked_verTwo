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
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { cart, shippingAddress, user, totalPrice, paymentInfo } =
				req.body;
			//group items by shopId
			const shopItemsMap = new Map();

			for (const item of cart) {
				const shopId = item.shopId;
				if (!shopItemsMap.has(shopId)) {
					shopItemsMap.set(shopId, []);
				}
				shopItemsMap.get(shopId).push(item);
			}

			//create order for each shopId
			const orders = [];
			for (const [shopId, items] of shopItemsMap) {
				const order = await Order.create({
					cart: items,
					shippingAddress,
					user,
					totalPrice,
					paymentInfo,
				});
				orders.push(order);
			}
			res.status(201).json({
				success: true,
				orders,
			});
		} catch (error) {
			return next(new ErrorHandler("User already exists", 400));
		}
	})
);

module.exports = router;

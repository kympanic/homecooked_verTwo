const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller } = require("../middleware/auth");
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
			return next(new ErrorHandler(error.message, 400));
		}
	})
);

//get all orders of user

router.get(
	"/get-all/:userId",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const orders = await Order.find({
				"user._id": req.params.userId,
			}).sort({
				createdAt: -1,
			});
			res.status(201).json({
				success: true,
				orders,
			});
		} catch (error) {
			return next(new ErrorHandler(error.messsage, 400));
		}
	})
);

//get all orders of shop
router.get(
	"/get-all-shop/:shopId",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const orders = await Order.find({
				"cart.shopId": req.params.shopId,
			}).sort({
				createdAt: -1,
			});
			res.status(201).json({
				success: true,
				orders,
			});
		} catch (error) {
			return next(new ErrorHandler(error.messsage, 400));
		}
	})
);

//update order status for shop
router.put(
	"/update-order-status/:id",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const order = await Order.findById(req.params.id);
			if (!order) {
				return next(new ErrorHandler("Order not found", 400));
			}
			if (req.body.status === "Shipping") {
				order.cart.forEach(async (o) => {
					await updateProduct(o._id, o.qty);
				});
			}

			order.status = req.body.status;

			if (req.body.status === "Delivered") {
				order.deliveredAt = Date.now();
				order.paymentInfo.status = "Succeeded";
			}

			await order.save({ validateBeforeSave: false });

			async function updateProduct(id, qty) {
				const product = await Product.findById(id);
				product.stock -= qty;
				product.sold_out += qty;

				await product.save({ validateBeforeSave: false });
			}
		} catch (error) {
			return next(new ErrorHandler(error.messsage, 400));
		}
	})
);

module.exports = router;

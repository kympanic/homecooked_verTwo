const express = require("express");
const Shop = require("../model/shop");
const Product = require("../model/product");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const { upload } = require("../multer");
const fs = require("fs");

router.get(
	"/all-products",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const products = await Product.find().sort({ createdAt: -1 });
			res.status(201).json({
				success: true,
				products,
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);
// get products from a specific shop
router.get(
	"/all-products/shop/:id",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const products = await Product.find({ shopId: req.params.id });
			res.status(201).json({
				success: true,
				products,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 400));
		}
	})
);

// Create Product
router.post(
	"/create-product",
	upload.array("images"),
	catchAsyncErrors(async (req, res, next) => {
		try {
			const shopId = req.body.shopId;
			const shop = await Shop.findById(shopId);
			if (!shop) {
				return next(new ErrorHandler("Shop id is invalid!", 400));
			} else {
				const files = req.files;
				const imageUrls = files.map((file) => `${file.filename}`);
				const productData = req.body;
				productData.images = imageUrls;
				productData.shop = shop;

				const product = await Product.create(productData);

				res.status(201).json({
					success: true,
					product,
				});
			}
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

//delete product
router.delete(
	"/delete-product/:id",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const productId = req.params.id;
			const productData = await Product.findById(productId);

			productData.images.forEach((imageUrl) => {
				const filename = imageUrl;
				const filePath = `uploads/${filename}`;

				fs.unlink(filePath, (err) => {
					if (err) {
						console.log(err);
					}
				});
			});
			const product = await Product.findByIdAndDelete(productId);
			if (!product) {
				return next(new ErrorHandler("Product not found!", 500));
			}
			res.status(201).json({
				success: true,
				message: "Product deleted successfully!",
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

module.exports = router;

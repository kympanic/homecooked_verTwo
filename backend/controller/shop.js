const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { sendToken, sendShopToken } = require("../utils/jwtToken");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
	try {
		// Check for the existence of the file
		if (!req.file) {
			return res
				.status(400)
				.json({ message: "Please upload shop image" });
		}

		const { email } = req.body;
		const sellerEmail = await Shop.findOne({ email });

		if (sellerEmail) {
			const filename = req.file.filename;
			const filePath = `uploads/${filename}`;
			fs.unlink(filePath, (err) => {
				if (err) {
					console.log(err);
					res.status(500).json({ message: "Error deleting file" });
				}
			});
			return next(new ErrorHandler("Shop already exists", 400));
		}

		const filename = req.file.filename;
		const fileUrl = path.join(filename);

		const seller = {
			name: req.body.name,
			email: email,
			password: req.body.password,
			avatar: fileUrl,
			address: req.body.address,
			phoneNumber: req.body.phoneNumber,
			zipCode: req.body.zipCode,
		};

		const activationToken = createActivationToken(seller);
		const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

		try {
			await sendMail({
				email: seller.email,
				subject: "Activate your shop",
				message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
			});
			res.status(201).json({
				success: true,
				message: `Please check your email: -${seller.email} to activate your shop.`,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 400));
		}
	} catch (error) {
		return next(new ErrorHandler(error.message, 400));
	}
});

// activation token generation
const createActivationToken = (seller) => {
	return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
		expiresIn: "1000000min",
	});
};

// activate shop

router.post(
	"/activation",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { activation_token } = req.body;
			const newSeller = jwt.verify(
				activation_token,
				process.env.ACTIVATION_SECRET
			);

			if (!newSeller) {
				return next(new ErrorHandler("Invalid token", 400));
			}
			const {
				name,
				email,
				password,
				avatar,
				phoneNumber,
				zipCode,
				address,
			} = newSeller;

			let seller = await Shop.findOne({ email });

			if (seller) {
				return next(new ErrorHandler("Shop already exists", 400));
			}
			seller = await Shop.create({
				name,
				email,
				password,
				avatar,
				phoneNumber,
				address,
				zipCode,
			});

			sendShopToken(seller, 201, res);
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//login shop
router.post(
	"/login-shop",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return next(new ErrorHandler("Fill out all fields", 400));
			}
			const seller = await Shop.findOne({ email }).select("+password");

			if (!seller) {
				return next(new ErrorHandler("Shop does not exist", 400));
			}

			const isPasswordValid = await seller.comparePassword(password);

			if (!isPasswordValid) {
				return next(
					new ErrorHandler("Login information is incorrect"),
					400
				);
			}
			sendShopToken(seller, 201, res);
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//load shop
router.get(
	"/get-shop",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const seller = await Shop.findById(req.seller._id);

			if (!seller) {
				return next(new ErrorHandler("Shop does not exist", 500));
			}

			res.status(200).json({
				success: true,
				seller,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);
//logout shop
router.get(
	"/logout",
	catchAsyncErrors(async (req, res, next) => {
		try {
			res.cookie("seller_token", null, {
				expires: new Date(Date.now()),
				httpOnly: true,
			});
			res.status(201).json({
				success: true,
				message: "Logout successful",
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

// get shop info
router.get(
	"/get-shop-info/:id",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const shop = await Shop.findById(req.params.id);
			console.log(shop, "is it getting here?");
			res.status(201).json({
				success: true,
				shop,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

module.exports = router;

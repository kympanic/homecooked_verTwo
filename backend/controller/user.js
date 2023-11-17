const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { sendToken } = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
	const { name, email, phoneNumber, password } = req.body;
	const userEmail = await User.findOne({ email });
	if (userEmail) {
		const filename = req.file.filename;
		const filepath = `uploads/${filename}`;
		fs.unlink(filepath, (err) => {
			if (err) {
				console.log(err);
				res.status(500).json({ message: "Error deleting file" });
			}
		});
		return next(new ErrorHandler("User already exists", 400));
	}
	const filename = req.file.filename;
	const fileUrl = path.join(filename);

	const user = {
		name,
		email,
		phoneNumber,
		password,
		avatar: fileUrl,
	};

	const activationToken = createActivationToken(user);

	const activationUrl = `http://localhost:3000/activation/${activationToken}`;
	try {
		await sendMail({
			email: user.email,
			subject: "Activate your account",
			message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
		});
		res.status(201).json({
			success: true,
			message: `Please check your email:- ${user.email} to activate your account`,
		});
	} catch (error) {
		return next(new ErrorHandler(error.message, 500));
	}
});

//create activation token

const createActivationToken = (user) => {
	return jwt.sign(user, process.env.ACTIVATION_SECRET, {
		expiresIn: "10min",
	});
};

//activate user

router.post(
	"/activation",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { activation_token } = req.body;
			const newUser = jwt.verify(
				activation_token,
				process.env.ACTIVATION_SECRET
			);

			if (!newUser) {
				return next(new ErrorHandler("Invalid token", 400));
			}
			const { name, email, password, avatar, phoneNumber } = newUser;

			let user = await User.findOne({ email });

			if (user) {
				return next(new ErrorHandler("User already exists", 400));
			}
			user = await User.create({
				name,
				email,
				password,
				avatar,
				phoneNumber,
			});

			sendToken(user, 201, res);
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//login user
router.post(
	"/login-user",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return next(new ErrorHandler("Fill out all fields", 400));
			}
			const user = await User.findOne({ email }).select("+password");

			if (!user) {
				return next(new ErrorHandler("User does not exist", 400));
			}

			const isPasswordValid = await user.comparePassword(password);

			if (!isPasswordValid) {
				return next(
					new ErrorHandler("Login information is incorrect"),
					400
				);
			}

			sendToken(user, 201, res);
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//load user
router.get(
	"/get-user",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const user = await User.findById(req.user.id);
			if (!user) {
				return next(new ErrorHandler("User does not exist", 500));
			}
			res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//logout user
router.get(
	"/logout",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			res.cookie("token", null, {
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

//update info

router.put(
	"/update-user",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { email, password, name, phoneNumber } = req.body;
			const user = await User.findOne({ email }).select("+password");

			if (!user) {
				return next(new ErrorHandler("User not found", 400));
			}
			const isPasswordValid = await user.comparePassword(password);

			if (!isPasswordValid) {
				return next(new ErrorHandler("The password is incorrect", 400));
			}

			user.name = name;
			user.email = email;
			user.phoneNumber = phoneNumber;
			await user.save();

			res.status(201).json({
				success: true,
				user,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//update user avatar
router.put(
	"/update-avatar",
	isAuthenticated,
	upload.single("image"),
	catchAsyncErrors(async (req, res, next) => {
		try {
			const existingUser = await User.findById(req.user.id);

			const existingAvatarPath = `uploads/${existingUser.avatar}`;

			fs.unlinkSync(existingAvatarPath);
			const fileUrl = path.join(req.file.filename);

			const user = await User.findByIdAndUpdate(req.user.id, {
				avatar: fileUrl,
			});

			res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//update user address
router.put(
	"/update-address",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const user = await User.findById(req.user.id);

			const sameTypeAddress = user.addresses.find(
				(address) => address.addressType === req.body.addressType
			);
			if (sameTypeAddress) {
				return next(
					new ErrorHandler(
						`${req.body.addressType} address already exists`
					)
				);
			}

			const existingAddress = user.addresses.find(
				(address) => address._id === req.body._id
			);

			if (existingAddress) {
				Object.assign(existingAddress, req.body);
			}
			//add new address to array

			user.addresses.push(req.body);

			await user.save();

			res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

//delete user address
router.delete(
	"/delete-address/:id",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const userId = req.user._id;
			const addressId = req.params.id;

			await User.updateOne(
				{
					_id: userId,
				},
				{ $pull: { addresses: { _id: addressId } } }
			);
			const user = await User.findById(userId);

			res.status(200).json({ success: true, user });
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

//update password
router.put(
	"/update-password",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const user = await User.findById(req.user.id).select("+password");
			const isPasswordMatching = await user.comparePassword(
				req.body.oldPassword
			);
			if (!isPasswordMatching) {
				return next(
					new ErrorHandler("Current password is incorrect!", 400)
				);
			}
			if (req.body.newPassword !== req.body.confirmPassword) {
				return next(
					new ErrorHandler(
						"Please make sure the new password and confirm password match!",
						400
					)
				);
			}
			user.password = req.body.newPassword;

			await user.save();

			res.status(200).json({
				success: true,
				message: "Password updated successfully!",
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

router.post(
	"/add-favorite",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const user = await User.findById(req.user.id);
			const productId = req.body.id;

			if (!user.favorites.includes(productId)) {
				user.favorites.push(productId);
				await user.save();
			}
			res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

module.exports = router;

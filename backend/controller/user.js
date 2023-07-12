const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendMail = require("../utils/sendMail");
const fs = require("fs");
const jwt = require("jsonwebtoken");


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
			} else {
				res.json({ message: "File successfully deleted" });
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

router.post("/activation", catchAsyncErrors(async(req,res,next)=> {
	try {
		const {activation_token} = req.body;
		const newUser = jwt.verify(activation_token,process.env.ACTIVATION_SECRET)

		if(!newUser){
			return next(new ErrorHandler("Invalid token",400))
		}
		const {name,email,password,avatar,phoneNumber} = newUser;
		User.create({
			name,
			email,
			password,
			avatar,
			phoneNumber,
		})

		sendToken(newUser, 201,res)

	} catch (error) {
		
	}
})

module.exports = router;

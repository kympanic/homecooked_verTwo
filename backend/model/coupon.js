const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your coupon code name!"],
		unique: true,
	},
	value: {
		type: Number,
		required: [true, "Please enter the discount value!"],
	},
	minAmount: {
		type: Number,
	},
	maxAmount: {
		type: Number,
	},
	shop: {
		type: Object,
		required: true,
	},
	selectedProduct: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Coupon", couponSchema);

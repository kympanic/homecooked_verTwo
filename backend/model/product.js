const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, // Reference to user ID
		ref: "User",
		required: true,
	},
	name: {
		type: String,
		required: [true, "Please enter product name!"],
	},
	description: {
		type: String,
		required: [true, "Please enter product description!"],
	},
	image_url: {
		type: String,
		required: [true, "Please enter image URL for the product!"],
	},
	category: {
		type: String,
		required: [true, "Please enter product category!"],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Product", productSchema);

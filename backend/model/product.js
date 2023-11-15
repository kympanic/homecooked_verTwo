const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter product name!"],
	},
	description: {
		type: String,
		required: [true, "Please enter product description!"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price!"],
	},
	stock: {
		type: Number,
		required: [true, "Please enter your product stock"],
	},
	images: {
		type: [
			{
				type: String,
			},
		],
		required: [true, "Please upload product images!"],
	},
	category: {
		type: String,
		required: [true, "Please enter product category!"],
	},
	shopId: {
		type: String,
		required: true,
	},
	shop: {
		type: Object,
		required: true,
	},
	sold_out: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			user: {
				type: Object,
			},
			rating: {
				type: Number,
			},
			comment: {
				type: String,
			},
			productId: {
				type: String,
			},
		},
	],
	avgRating: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Product", productSchema);

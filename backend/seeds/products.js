const mongoose = require("mongoose");
const Product = require("../model/product");
const User = require("../model/user");

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Sample product data
const sampleProducts = [
	{
		name: "Gigantic Steak",
		description: "A big steak",
		image_url:
			"https://www.tastingtable.com/img/gallery/15-ingredients-that-will-seriously-elevate-your-steak/l-intro-1663169111.jpg",
		category: "American",
	},
	{
		name: "Cheese Pizza",
		description: "A cheese pizza",
		image_url:
			"https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
		category: "American",
	},
	// ... add as many sample products as you like
];

const createSampleData = async () => {
	try {
		// Fetch the first user
		const user = await User.findOne({ name: "Amy Leang" });

		if (!user) {
			console.error("No user found.");
			mongoose.disconnect();
			return;
		}

		for (const sampleProduct of sampleProducts) {
			// Create a new product for the user
			const product = new Product({
				...sampleProduct,
				user: user._id, // Associate the product with the user
			});
			await product.save();
		}

		console.log("Sample products created successfully for the first user.");
		mongoose.disconnect();
	} catch (error) {
		console.error("Error creating sample products:", error);
		mongoose.disconnect();
	}
};

createSampleData();

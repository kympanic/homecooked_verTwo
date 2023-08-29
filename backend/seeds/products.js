const mongoose = require("mongoose");
const Product = require("../model/product");
const User = require("../model/user");

// Replace with your actual MongoDB connection string
const MONGO_URI =
	"mongodb+srv://danielyoo:CXBGBOuOLqz4tz43@cluster0.gpp3d7y.mongodb.net/";

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Sample product data
const sampleProducts = [
	{
		name: "Sample Product 1",
		description: "This is a sample product description.",
		image_url: "http://example.com/sample1.jpg",
		category: "Sample Category",
	},
	{
		name: "Sample Product 2",
		description: "This is another sample product description.",
		image_url: "http://example.com/sample2.jpg",
		category: "Sample Category",
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

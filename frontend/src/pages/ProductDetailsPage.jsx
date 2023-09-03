import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import RecommendedProducts from "../components/Products/RecommendedProducts";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import { motion } from "framer-motion";

const ProductDetailsPage = () => {
	const { name } = useParams();
	const [data, setData] = useState(null);
	const productName = name.replace(/-/g, " ");

	console.log(name);

	useEffect(() => {
		const data = productData.find((i) => i.name === productName);
		setData(data);
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Header />
			<ProductDetails data={data} />
			{data && <RecommendedProducts data={data} />}
			<Footer />
		</motion.div>
	);
};

export default ProductDetailsPage;

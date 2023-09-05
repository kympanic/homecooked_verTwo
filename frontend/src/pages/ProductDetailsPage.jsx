import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import RecommendedProducts from "../components/Products/RecommendedProducts";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import Header from "../components/Layout/Header";

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
		<div>
			<Header />
			<ProductDetails data={data} />
			{data && <RecommendedProducts data={data} />}
			<Footer />
		</div>
	);
};

export default ProductDetailsPage;

import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import RecommendedProducts from "../components/Products/RecommendedProducts";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
	const { allProducts } = useSelector((state) => state.products);
	const { name } = useParams();
	const [data, setData] = useState(null);
	const productName = name.replace(/-/g, " ");

	useEffect(() => {
		const product = allProducts?.find((i) => i.name === productName);
		setData(product);
	}, [allProducts, productName]);

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

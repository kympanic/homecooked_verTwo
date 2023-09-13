import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
	const [data, setData] = useState([]);
	const { allProducts } = useSelector((state) => state.products);

	useEffect(() => {
		const allProductsData = allProducts ? [...allProducts] : [];
		const sortedData = allProductsData?.sort(
			(a, b) => b.sold_out - a.sold_out
		);

		setData(sortedData);
	}, [allProducts]);
	return (
		<div>
			<Header activeHeading={2} />
			<br />
			<br />
			<div className={`${styles.section}`}>
				<div className={`${styles.productsList} mb-12`}>
					{data &&
						data.map((i, index) => (
							<ProductCard data={i} key={index} />
						))}
				</div>
			</div>
		</div>
	);
};

export default BestSellingPage;

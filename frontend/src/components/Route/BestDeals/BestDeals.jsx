import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";

//WILL CHANGE DATA WHEN I DO IT DYNAMICALLY. CURRENTLY IT IS STATIC
const BestDeals = () => {
	const [data, setData] = useState([]);
	const { allProducts } = useSelector((state) => state.products);

	useEffect(() => {
		const allProductsData = allProducts ? [...allProducts] : [];
		const sortedData = allProductsData?.sort(
			(a, b) => b.sold_out - a.sold_out
		);

		const firstFive = sortedData && sortedData.slice(0, 5);
		setData(firstFive);
	}, [allProducts]);
	return (
		<div className={`${styles.section}`}>
			<div className={`${styles.heading}`}>
				<h1>Most Sold</h1>
			</div>
			<div className={`${styles.productsList} mb-12 border-0 `}>
				{data &&
					data.map((i, index) => (
						<ProductCard data={i} key={index} />
					))}
			</div>
		</div>
	);
};

export default BestDeals;

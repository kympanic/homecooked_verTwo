import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";

const BestSellingPage = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const d =
			productData &&
			productData.sort((a, b) => b.total_sell - a.total_sell);
		setData(d);
	}, []);
	return (
		<div>
			<Header />
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
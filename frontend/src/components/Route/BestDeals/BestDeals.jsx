import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";

//WILL CHANGE DATA WHEN I DO IT DYNAMICALLY. CURRENTLY IT IS STATIC
const BestDeals = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const d =
			productData &&
			productData.sort((a, b) => b.total_sell - a.total_sell);

		const firstFive = d.slice(0, 5);
		setData(firstFive);
	}, []);
	return (
		<div className={`${styles.section}`}>
			<div className={`${styles.heading}`}>
				<h1>Most Sold</h1>
			</div>
			<div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-4 lg:gap-3 xl:grid-cols-5 xl:gap-3.5 ">
				{data &&
					data.map((i, index) => (
						<ProductCard data={i} key={index} />
					))}
			</div>
		</div>
	);
};

export default BestDeals;

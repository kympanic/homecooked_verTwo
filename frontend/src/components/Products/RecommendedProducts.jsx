import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const RecommendedProducts = ({ data }) => {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const d =
			productData &&
			productData.filter((i) => i.category === data.category);
		setProducts(d);
	}, []);

	return (
		<div>
			{data ? (
				<div className={`p-4 ${styles.heading}`}>
					<h2
						className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
					>
						Recommended Products
					</h2>
					<div className={`${styles.productsList} mb-12`}>
						{products &&
							products.map((product, index) => (
								<ProductCard data={product} key={index} />
							))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default RecommendedProducts;

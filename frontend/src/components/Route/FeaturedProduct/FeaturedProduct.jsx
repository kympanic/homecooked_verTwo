import React from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
	return (
		<div>
			<div className={`${styles.section}`}>
				<div className={`${styles.heading}`}>
					<h1>Featured Products</h1>
				</div>
				<div className={`${styles.productsList} mb-12 border-0 `}>
					{productData &&
						productData.map((i, index) => (
							<ProductCard data={i} key={index} />
						))}
				</div>
			</div>
		</div>
	);
};

export default FeaturedProduct;

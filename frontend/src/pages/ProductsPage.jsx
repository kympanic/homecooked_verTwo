import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";

const ProductsPage = () => {
	const [searchParams] = useSearchParams();
	const categoryData = searchParams.get("category");
	const [data, setData] = useState([]);

	useEffect(() => {
		if (categoryData === null) {
			const d =
				productData &&
				productData.sort((a, b) => a.total_sell - b.total_sell);
			setData(d);
		} else {
			const d =
				productData &&
				productData.filter((i) => i.category === categoryData);
			setData(d);
		}
	});
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
				{data && data.length === 0 ? (
					<h1 className="text-center w-full pb-[110px] text-[20px]">
						No products found!
					</h1>
				) : null}
			</div>
		</div>
	);
};

export default ProductsPage;
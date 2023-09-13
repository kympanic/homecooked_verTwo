import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";

const ProductsPage = () => {
	const [searchParams] = useSearchParams();
	const categoryData = searchParams.get("category");
	const [data, setData] = useState([]);
	const { allProducts, isLoading } = useSelector((state) => state.products);

	useEffect(() => {
		if (categoryData === null) {
			const d = allProducts;
			setData(d);
		} else {
			const d =
				allProducts &&
				allProducts.filter((i) => i.category === categoryData);
			setData(d);
		}
	}, [allProducts, categoryData]);
	return (
		<div>
			<Header activeHeading={3} />
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

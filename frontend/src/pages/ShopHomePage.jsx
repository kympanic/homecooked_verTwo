import React, { useEffect } from "react";
import styles from "../styles/styles";
import ShopInfo from "../components/Shop/ShopInfo";
import ShopProfileData from "../components/Shop/ShopProfileData";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsShop } from "../redux/actions/product";

const ShopHomePage = () => {
	const { seller } = useSelector((state) => state?.shop);
	const dispatch = useDispatch();
	const { id } = useParams();
	let isOwner;

	if (seller?._id === id) {
		isOwner = true;
	} else {
		isOwner = false;
	}

	useEffect(() => {
		dispatch(getAllProductsShop(id));
	}, [dispatch]);
	return (
		<>
			<div className={`${styles.section} bg-[#f5f5f5]`}>
				<div className="w-full flex py-10 justify-between">
					<div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
						<ShopInfo isOwner={isOwner} />
					</div>
					<div className="w-[72%] rounded-[4px]">
						<ShopProfileData isOwner={isOwner} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ShopHomePage;

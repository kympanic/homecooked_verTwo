import React, { useEffect } from "react";
import ShopCreate from "../components/Auth/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
	const { isSeller, seller } = useSelector((state) => state.shop);
	const navigate = useNavigate();
	useEffect(() => {
		if (isSeller === true) {
			navigate(`/shop/${seller._id}`);
		}
	}, []);
	return (
		<div>
			<ShopCreate />
		</div>
	);
};

export default ShopCreatePage;

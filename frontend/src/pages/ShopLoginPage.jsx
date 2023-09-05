import React, { useEffect } from "react";
import ShopLogin from "../components/Auth/ShopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
	const { isSeller, seller } = useSelector((state) => state.shop);
	const navigate = useNavigate();
	useEffect(() => {
		if (isSeller === true) {
			navigate(`/shop/${seller._id}`);
		}
	}, []);
	return (
		<div>
			<ShopLogin />
		</div>
	);
};

export default ShopLoginPage;

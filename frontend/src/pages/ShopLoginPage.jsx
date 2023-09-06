import React, { useEffect } from "react";
import ShopLogin from "../components/Auth/ShopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
	const { isSeller, isLoading } = useSelector((state) => state.shop);
	const navigate = useNavigate();
	useEffect(() => {
		if (isSeller === true) {
			navigate("/dashboard");
		}
	}, [isLoading, isSeller]);
	return (
		<div>
			<ShopLogin />
		</div>
	);
};

export default ShopLoginPage;

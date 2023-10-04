import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Lottie from "lottie-react";
import loaderAnimation from "../../src/assets/animations/success.json";

const OrderSuccessPage = () => {
	return (
		<div>
			<Header />
			<div className="flex items-center justify-center">
				<Lottie
					animationData={loaderAnimation}
					style={{ height: 300, width: 300 }}
				/>
			</div>
			<h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
				Your order has been sent!
			</h5>
			<Footer />
		</div>
	);
};

export default OrderSuccessPage;

import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/animations/animation_lm6xff2k.json";

const Loader = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Lottie animationData={loaderAnimation} loop={true} />
		</div>
	);
};

export default Loader;

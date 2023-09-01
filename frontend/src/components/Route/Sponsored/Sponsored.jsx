import React from "react";
import styles from "../../../styles/styles";
const Sponsored = () => {
	return (
		<div
			className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
		>
			<div className="flex justify-between w-full">
				<div className="flex items-start">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Food_Network_Logo.svg/1200px-Food_Network_Logo.svg.png"
						alt=""
						style={{ width: "150px", objectFit: "contain" }}
					/>
				</div>
				<div className="flex items-start">
					<img
						src="https://marketplace.canva.com/EAFowsrK6x8/1/0/1600w/canva-red-and-yellow-catering-flat-illustrative-food-place-logo-rYbQJ_qtaz8.jpg"
						style={{ width: "150px", objectFit: "contain" }}
						alt=""
					/>
				</div>
				<div className="flex items-start">
					<img
						src="https://www.theartof.com/assets/images/book-images/Whole-Foods-Market-Logo-white-background.png"
						style={{ width: "150px", objectFit: "contain" }}
						alt=""
					/>
				</div>
				<div className="flex items-start">
					<img
						src="https://marketplace.canva.com/EAFXIvlL2Ns/2/0/1600w/canva-brown-and-black-vintage-food-restaurant-logo-YASJJho2Kzw.jpg"
						style={{ width: "150px", objectFit: "contain" }}
						alt=""
					/>
				</div>
				<div className="flex items-start">
					<img
						src="https://cblproperty.blob.core.windows.net/production/assets/blt6d05677a69936525-Trader_Joes_Logo.jpg"
						style={{ width: "150px", objectFit: "contain" }}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Sponsored;

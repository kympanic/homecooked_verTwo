import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div
			className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.normalFlex}`}
			style={{
				backgroundImage:
					"url(https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/Hero.jpg)",
			}}
		>
			<div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
				<h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
					Rumble in Your Tummy?
				</h1>
				<p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#000000ba]">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					<br />
					Beatae, assumenda? Quisquam itaque exercitationem labore
					vel,
					<br /> dolore quidem asperiores, laudantium temporibus
					soluta optio <br /> consequatur aliquam deserunt officia.
					Dolorum saepe nulla provident.
				</p>
				<Link to="/products" className="inline-block">
					<div className={`${styles.button} mt-5`}>
						<span className="text-[#fff] font-[Poppins] text-[18px]">
							Shop Now
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Hero;

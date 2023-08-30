import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
	return (
		<div className={`${styles.normalFlex}`}>
			{navItems &&
				navItems.map((i, index) => (
					<div className="flex">
						<Link
							to={i.url}
							className={`${
								active === index + 1
									? "text-[#372b94]"
									: "text-[#fff]"
							} font-[500] px-6 cursor-pointer`}
						>
							{i.title}
						</Link>
					</div>
				))}
		</div>
	);
};

export default Navbar;

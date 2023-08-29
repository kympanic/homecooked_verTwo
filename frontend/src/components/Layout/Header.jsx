import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		const filteredProducts =
			productData &&
			productData.filter((product) =>
				product.name.toLowerCase().includes(term.toLowerCase())
			);
		setSearchData(filteredProducts);
	};

	return (
		<div className={`${styles.section}`}>
			<div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
				<div>
					<Link to="/">
						<img
							src="https://airbnb-mern-danyoo.s3.us-west-2.amazonaws.com/HomecookedLogo.png"
							alt="logo"
						/>
					</Link>
					{/* search box */}
					<div className="w-[50%] relative">
						<input
							type="text"
							placeholder="Find your next homecooked meal...."
							value={searchData}
							onChange={handleSearchChange}
							className="h-[40px] w-full px2 border-[#3957db] border-[2px] rounded-md"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;

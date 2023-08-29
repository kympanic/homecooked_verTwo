import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const { allProducts } = useSelector((state) => state.products);

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		const filteredProducts =
			allProducts &&
			allProducts.filter((product) =>
				product.name.toLowerCase().includes(term.toLowerCase())
			);
		setSearchData(filteredProducts);
	};

	return (
		<div className={`${styles.section}`}>
			<div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
				<div>
					<Link to="/">
						<h1 className="text-4xl p-4 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
							HOMECOOKed
						</h1>
					</Link>
				</div>
				{/* search box */}
				<div className="w-[50%] relative">
					<input
						type="text"
						placeholder="Find your next homecooked meal...."
						value={searchTerm}
						onChange={handleSearchChange}
						className="h-[40px] w-full px2 border-[black] border-[2px] rounded-md"
					/>
					<AiOutlineSearch
						size={30}
						className="absolute right-2 top-1.5 cursor-pointer border-l-black"
					/>
					{searchData && searchData.length !== 0 ? (
						<div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
							{searchData.map((product) => {
								return (
									<Link
										to={`/product/${product.name}`}
										key={product._id}
									>
										<div className="w-full flex items-start-py-3">
											<img
												src={product.image_url}
												alt="product"
												className="w-[40px] h-[40px] mr-[10px]"
											/>
											<h1>{product.name}</h1>
										</div>
									</Link>
								);
							})}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Header;

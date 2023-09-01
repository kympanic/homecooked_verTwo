import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import { categoriesData } from "../../static/data";
import Navbar from "./Navbar.jsx";
import {
	AiOutlineHeart,
	AiOutlineSearch,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../server";

const Header = ({ activeHeading }) => {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	const { allProducts } = useSelector((state) => state.products);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [active, setActive] = useState(false);
	const [dropDown, setDropDown] = useState(false);

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (term === "") {
			setSearchData(null);
			return;
		}

		const filteredProducts =
			allProducts &&
			allProducts.filter((product) =>
				product.name.toLowerCase().includes(term.toLowerCase())
			);

		setSearchData(filteredProducts);
	};

	window.addEventListener("scroll", () => {
		if (window.scrollY > 70) {
			setActive(true);
		} else {
			setActive(false);
		}
	});

	return (
		<>
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
							className="h-[40px] w-full p-2 border-[black] border-[2px] rounded-md "
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
					<div className={`${styles.button}`}>
						<Link to="/seller">
							<h1 className="text-[#fff] flex items-center">
								Become Seller
								<IoIosArrowForward className="ml-1" />
							</h1>
						</Link>
					</div>
				</div>
			</div>
			<div
				className={`${
					active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
				} transition hidden 800px:flex items-center justify-between w-full bg-[#9e33d8] h-[70px]`}
			>
				<div
					className={`${styles.section} relative ${styles.normalFlex} justify-between`}
				>
					{/* categories */}
					<div
						onClick={() => setDropDown(!dropDown)}
						className="relative h-[60px] mt-[10px] w-[200px] hidden 1000px:block"
					>
						<BiMenuAltLeft
							size={30}
							className="absolute top-3 left-2"
						/>
						<button
							className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
						>
							Categories
						</button>
						<IoIosArrowDown
							size={20}
							className="absolute right-2 top-4 cursor-pointer"
							onClick={() => setDropDown(!dropDown)}
						/>
						{dropDown ? (
							<DropDown
								categoriesData={categoriesData}
								setDropDown={setDropDown}
							/>
						) : null}
					</div>
					{/* navitems */}
					<div className={`${styles.normalFlex}`}>
						<Navbar active={activeHeading} />
					</div>
					<div className="flex">
						<div className={`${styles.normalFlex}`}>
							<div className="relative cursor-pointer mr-[15px]">
								<AiOutlineHeart
									size={30}
									color="rgb(255 255 255/ 83%)"
								/>
								<span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
									0
								</span>
							</div>
						</div>
						<div className={`${styles.normalFlex}`}>
							<div className="relative cursor-pointer mr-[15px]">
								<AiOutlineShoppingCart
									size={30}
									color="rgb(255 255 255/ 83%)"
								/>
								<span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
									1
								</span>
							</div>
						</div>
						<div className={`${styles.normalFlex}`}>
							<div className="relative cursor-pointer mr-[15px]">
								{isAuthenticated ? (
									<Link to="/profile">
										<img
											src={`${backend_url}${user.avatar}`}
											alt="profile"
											className="w-[35px] h-[35px] rounded-full"
										/>
									</Link>
								) : (
									<Link to="/login">
										<CgProfile
											size={30}
											color="rgb(255 255 255/ 83%)"
										/>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;

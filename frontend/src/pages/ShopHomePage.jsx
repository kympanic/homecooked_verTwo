import React, { useEffect } from "react";
import styles from "../styles/styles";
import ShopInfo from "../components/Shop/ShopInfo";
import ShopProfileData from "../components/Shop/ShopProfileData";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../redux/actions/product";
import { backend_url } from "../server";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

const ShopHomePage = () => {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	const { seller } = useSelector((state) => state?.shop);
	const dispatch = useDispatch();
	const { id } = useParams();
	let isOwner;

	if (seller?._id === id) {
		isOwner = true;
	} else {
		isOwner = false;
	}

	useEffect(() => {
		dispatch(getAllProductsShop(id));
	}, [dispatch]);
	return (
		<>
			<div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-20 flex items-center justify-between px-4">
				<Link to="/">
					<h1 className="text-4xl p-4 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
						HOMECOOKed
					</h1>
				</Link>
				<div className={`flex justify-center items-center`}>
					<div className="relative cursor-pointer mr-[15px]">
						{isAuthenticated ? (
							<Link to="/profile">
								<img
									src={`${backend_url}${user?.avatar}`}
									alt="profile"
									className="w-[35px] h-[35px] rounded-full"
								/>
							</Link>
						) : (
							<Link to="/login">
								<CgProfile size={30} color="black" />
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className={`${styles.section} bg-[#f5f5f5]`}>
				<div className="w-full flex py-10 justify-between">
					<div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-auto h-[90vh] sticky top-10 left-0 z-10">
						<ShopInfo isOwner={isOwner} />
					</div>
					<div className="w-[72%] rounded-[4px]">
						<ShopProfileData isOwner={isOwner} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ShopHomePage;

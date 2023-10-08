import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
const DashboardHeader = ({ active, setActive }) => {
	const { seller } = useSelector((state) => state.shop);

	return (
		<div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-20 flex items-center justify-between px-4">
			<div>
				<Link to="/">
					<h1 className="text-4xl p-4 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
						HOMECOOKed
					</h1>
				</Link>
			</div>
			<div className="flex items-center">
				<div className="flex items-center mr-4">
					<AiOutlineGift
						color="#555"
						size={30}
						className="mx-5 cursor-pointer"
						onClick={() => setActive(6)}
					/>

					<FiShoppingBag
						color="#555"
						size={30}
						className="mx-5 cursor-pointer"
						onClick={() => setActive(2)}
					/>

					<FiPackage
						color="#555"
						size={30}
						className="mx-5 cursor-pointer"
						onClick={() => setActive(3)}
					/>

					<BiMessageSquareDetail
						color="#555"
						size={30}
						className="mx-5 cursor-pointer"
						onClick={() => setActive(5)}
					/>

					<Link to={`/shop/${seller._id}`}>
						<img
							className="h-[40px] rounded-full mx-5"
							src={`${backend_url}${seller.avatar}`}
							alt="store-logo"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;

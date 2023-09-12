import React from "react";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active, setActive }) => {
	return (
		<div className="w-full h-[90vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10 ">
			<div className="w-full flex items-center p-4 pt-6">
				<div
					className="w-full flex items-center pt-5 cursor-pointer"
					onClick={() => setActive(1)}
				>
					<RxDashboard
						size={30}
						color={`${active === 1 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 1 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Dashboard
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(2)}
				>
					<FiShoppingBag
						size={30}
						color={`${active === 2 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 2 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						All Orders
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(3)}
				>
					<FiPackage
						size={30}
						color={`${active === 3 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 3 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						All Meals
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(4)}
				>
					<AiOutlineFolderAdd
						size={30}
						color={`${active === 4 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 4 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Create Meal
					</h5>
				</div>
			</div>

			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(5)}
				>
					<BiMessageSquareDetail
						size={30}
						color={`${active === 5 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 5 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Shop Inbox
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(6)}
				>
					<AiOutlineGift
						size={30}
						color={`${active === 6 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 6 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Discount Codes
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(7)}
				>
					<HiOutlineReceiptRefund
						size={30}
						color={`${active === 7 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 7 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Refunds
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(8)}
				>
					<CiMoneyBill
						size={30}
						color={`${active === 8 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 8 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Withdraw Money
					</h5>
				</div>
			</div>
			<div className="w-full flex items-center p-4">
				<div
					className="w-full flex items-center pt-6 cursor-pointer"
					onClick={() => setActive(9)}
				>
					<CiSettings
						size={30}
						color={`${active === 9 ? "crimson" : "#555"}`}
					/>
					<h5
						className={`hidden 800px:block pl-5 text-[18px] font-[400] ${
							active === 9 ? "text-[crimson]" : "text-[#555]"
						}`}
					>
						Settings
					</h5>
				</div>
			</div>
		</div>
	);
};

export default DashboardSideBar;

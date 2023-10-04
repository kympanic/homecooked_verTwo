import React, { useState } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";
import CreateProduct from "../components/Shop/CreateProduct";
import AllProducts from "../components/Shop/AllProducts.jsx";
import ShopCoupons from "../components/Shop/ShopCoupons";
import AllOrders from "../components/Shop/AllOrders";

const ShopDashboardPage = () => {
	const { isSeller, seller } = useSelector((state) => state.shop);
	const [active, setActive] = useState(1);
	return (
		<div>
			<DashboardHeader />
			<div className="flex items-center justify-between w-full">
				<div className="w-[88px] 800px:w-[20%]">
					<DashboardSideBar active={active} setActive={setActive} />
				</div>
				{active === 2 && (
					<div className="w-[90%] 800px:w-[85%] 800px:mr-[10px]  shadow-sm h-[80vh] justify-center p-3 flex ">
						<AllOrders />
					</div>
				)}
				{active === 3 && (
					<div className="w-[90%] 800px:w-[85%] 800px:mr-[10px]  shadow-sm h-[80vh] justify-center p-3 flex ">
						<AllProducts />
					</div>
				)}
				{active === 4 && (
					<div className="w-[90%] 800px:w-[85%] 800px:mr-[10px]  shadow-sm h-[80vh] justify-center p-3 flex items-center">
						<CreateProduct />
					</div>
				)}
				{active === 6 && (
					<div className="w-[90%] 800px:w-[85%] 800px:mr-[10px]  shadow-sm h-[80vh] justify-center p-3 flex ">
						<ShopCoupons />
					</div>
				)}
			</div>

			<Footer />
		</div>
	);
};

export default ShopDashboardPage;

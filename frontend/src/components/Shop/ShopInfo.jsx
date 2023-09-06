import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const ShopInfo = ({ isOwner }) => {
	const { seller } = useSelector((state) => state.shop);
	return (
		<>
			<div className="w-full py-5">
				<div className="w-full flex item-center justify-center">
					<img
						src={`${backend_url}${seller?.avatar}`}
						alt=""
						className="w-[150px] h-[150px] object-cover rounded-full"
					/>
				</div>
				<h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
				{seller?.description ? (
					<p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
						{seller.description}
					</p>
				) : (
					<p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
						The store currently has no description. Please add the
						description if you are the store owner.
					</p>
				)}
			</div>
			<div className="p-3">
				<h5 className="font-[600]">Address</h5>
				<h4 className="text-[#000000a6]">{seller.address}</h4>
			</div>
		</>
	);
};

export default ShopInfo;

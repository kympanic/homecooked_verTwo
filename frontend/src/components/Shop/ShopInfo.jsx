import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ShopInfo = ({ isOwner }) => {
	const [data, setData] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${server}/shop/get-shop-info/${id}`)
			.then((res) => {
				setData(res.data.shop);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleLogout = () => {
		axios
			.get(`${server}/shop/logout`, { withCredentials: true })
			.then((res) => {
				toast.success(res.data.message);
				navigate("/");
				window.location.reload(true);
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	};

	return (
		<>
			<div className="w-full py-5">
				<div className="w-full flex item-center justify-center">
					<img
						src={`${backend_url}${data?.avatar}`}
						alt=""
						className="w-[150px] h-[150px] object-cover rounded-full"
					/>
				</div>
				<h3 className="text-center py-2 text-[20px]">{data.name}</h3>
				{data?.description ? (
					<p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
						{data.description}
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
				<h4 className="text-[#000000a6]">{data.address}</h4>
			</div>
			<div className="p-3">
				<h5 className="font-[600]">Phone Number</h5>
				<h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
			</div>
			<div className="p-3">
				<h5 className="font-[600]">Total Products</h5>
				<h4 className="text-[#000000a6]">10</h4>
			</div>
			<div className="p-3">
				<h5 className="font-[600]">Shop Rating</h5>
				<h4 className="text-[#000000a6]">4.5</h4>
			</div>
			<div className="p-3">
				<h5 className="font-[600]">Joined On</h5>
				<h4 className="text-[#000000a6]">
					{data?.createdAt?.slice(0, 10)}
				</h4>
			</div>
			{isOwner && (
				<div className="py-3 px4 pl-2 pr-2">
					<div
						className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
					>
						<span className="text-white">Edit Shop</span>
					</div>
					<div
						className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
						onClick={handleLogout}
					>
						<span className="text-white">Log Out</span>
					</div>
				</div>
			)}
		</>
	);
};

export default ShopInfo;

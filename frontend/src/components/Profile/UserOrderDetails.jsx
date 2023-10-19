import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux/actions/order";
import { backend_url } from "../../server";

const UserOrderDetails = () => {
	const { user } = useSelector((state) => state.user);
	const { orders } = useSelector((state) => state.orders);
	const dispatch = useDispatch();
	const [status, setStatus] = useState("");
	const { orderId } = useParams();

	useEffect(() => {
		dispatch(getAllOrdersUser(user._id));
	}, [dispatch]);

	const data = orders && orders.find((item) => item._id === orderId);

	const orderUpdateHandler = (e) => {
		console.log("eeee");
	};
	console.log(typeof id, "this is id");
	console.log(orders, "this is orders");
	console.log(data, "this is the data");

	return (
		<div className={`py-4 min-h-screen ${styles.section}`}>
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center">
					<BsFillBagFill size={30} color="crimson" />
					<h1 className="pl-2 text-[25px]">Order Details</h1>
				</div>
			</div>
			<div className="w-full flex items-center justify-between pt-6">
				<h5 className="text-[#00000084]">
					Order ID: <span>#{data?._id?.slice(0, 8)}</span>
				</h5>
				<h5 className="text-[#00000084]">
					Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
				</h5>
			</div>
			{/* order items */}
			<br />
			<br />
			{data &&
				data?.cart.map((item, index) => (
					<div className="w-full flex items-start mb-5" key={index}>
						<img
							src={`${backend_url}${item.images[0]}`}
							alt=""
							className="w-[80px] h-[80px]"
						/>
						<div className="w-full">
							<h5 className="pl-3 text-[20px]">{item.name}</h5>
							<h5 className="pl-3 text-[20px] text-[#00000091]">
								USD ${item.price} * {item.qty}
							</h5>
						</div>
					</div>
				))}
			<div className="border-t w-full text-right">
				<h5 className="pt-3 text-[18px]">
					Total Price <strong>${data?.totalPrice.toFixed(2)}</strong>
				</h5>
			</div>
			<br />
			<br />
			<div className="w-full 800px:flex items-center">
				<div className="w-full 800px:w-[60%]">
					<h4 className="pt-3 text-[20px] font-[600]">
						Shipping Address:
					</h4>
					<h4 className="pt-3 text-[20px]">
						{data?.shippingAddress.address1 +
							" " +
							data?.shippingAddress.address2}
					</h4>
					<h4 className="text-[20px]">
						{data?.shippingAddress.state}
					</h4>
					<h4 className="text-[20px]">
						{data?.shippingAddress.city}
					</h4>
					<h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
				</div>
				<div className="w-full 800px:w-[40%]">
					<h4 className="pt-3 text-[20px]">Payment Info:</h4>
					<h4 className="text-[20px]">
						Status:{" "}
						{data?.paymentInfo?.status
							? data?.paymentInfo.status
							: "Not Paid"}
					</h4>
				</div>
			</div>
			<br />
			<div className={`${styles.button} text-white`}> Send Message</div>
			<br />
			<br />
		</div>
	);
};

export default UserOrderDetails;

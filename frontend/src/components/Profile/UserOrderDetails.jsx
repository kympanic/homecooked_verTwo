import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux/actions/order";
import { backend_url } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const UserOrderDetails = () => {
	const { user } = useSelector((state) => state.user);
	const { orders } = useSelector((state) => state.orders);
	const { orderId } = useParams();
	const dispatch = useDispatch();
	const [status, setStatus] = useState("");
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [rating, setRating] = useState(1);

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
						{data?.status === "Delivered" && (
							<div
								className={`${styles.button} text-[#fff]`}
								onClick={() =>
									setOpen(true) || setSelectedItem(item)
								}
							>
								Write a Review
							</div>
						)}
					</div>
				))}
			{/* Review popup */}
			{open && (
				<div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
					<div className="w-[50%] h-[80vh] bg-[#fff] shadow rounded-md p-3">
						<div className="w-full flex justify-end p-3">
							<RxCross1
								size={30}
								onClick={() => setOpen(false)}
								className="cursor-pointer"
							/>
						</div>
						<h2 className="text-[30px] font-[500] font-Poppins text-center">
							Write a Review
						</h2>
						<br />
						<div className="w-full flex">
							<img
								src={`${backend_url}/${selectedItem?.images[0]}`}
								alt=""
								className="w-[140px] h-[120px]"
							/>
							<div>
								<div className="pl-3 text-[20px]">
									{selectedItem?.name}
								</div>
							</div>
							<h4 className="pl-3 text-[20px]">
								${selectedItem?.price} x {selectedItem?.qty}
							</h4>
						</div>
						<br />
						<br />
						{/* ratings */}
						<h5 className="pl-3 text-[20px] font-[500]">
							Give a Rating{" "}
							<span className="text-red-500">*</span>
						</h5>
						<div className="flex w0full ml-2 pt-1">
							{[1, 2, 3, 4, 5].map((i) =>
								rating >= i ? (
									<AiFillStar
										key={i}
										className="mr-1 cursor-pointer"
										color="rgb(246,186,0)"
										size={25}
										onClick={() => setRating(i)}
									/>
								) : (
									<AiOutlineStar
										key={i}
										className="mr-1 cursor-pointer"
										color="rgb(246,186,0)"
										size={25}
										onClick={() => setRating(i)}
									/>
								)
							)}
						</div>
					</div>
				</div>
			)}
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

import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import Orders from "./Orders";
import Refunds from "./Refunds";
import TrackOrders from "./TrackOrders";
import PaymentMethods from "./PaymentMethods";
import UserAddress from "./UserAddress";
import { updateUserInfo } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileContent = ({ active }) => {
	const { user, error } = useSelector((state) => state.user);
	const [name, setName] = useState(user && user.name);
	const [email, setEmail] = useState(user && user.email);
	const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState(user.avatar);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(updateUserInfo(email, password, phoneNumber, name));
	};

	const handleImage = async (e) => {
		const file = e.target.files[0];
		setAvatar(file);
		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		await axios
			.put(`${server}/user/update-avatar`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			})
			.then((response) => {
				window.location.reload();
				toast.success("Updated profile avatar successfully");
			})
			.catch((error) => {
				toast.error(error);
			});
	};
	return (
		<div className="w-full">
			{/* Profile Section */}
			{active === 0 && (
				<>
					<div className="flex justify-center w-full">
						<div className="relative">
							<img
								src={`${backend_url}${user?.avatar}`}
								alt=""
								className="w-[150px] h-[150px] rounded-full flex object-cover "
							/>
							<div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
								<input
									type="file"
									id="image"
									className="hidden"
									onChange={handleImage}
								/>
								<label htmlFor="image">
									<AiOutlineCamera />
								</label>
							</div>
						</div>
					</div>
					<br />
					<br />
					<form className="px-5">
						<div className="w-full 800px:flex block pb-3">
							<div className=" w-[100%] 800px:w-[50%]">
								<label className="block pb-2">Full Name</label>
								<input
									type="text"
									className={`${styles.input} focus:border-blue-500 !w-[95%] mb-4 800px:mb-0`}
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className=" w-[100%] 800px:w-[50%]">
								<label className="block pb-2">
									Phone Number
								</label>
								<input
									type="number"
									className={`${styles.input} focus:border-blue-500 !w-[95%] mb-4 800px:mb-0`}
									required
									value={phoneNumber}
									onChange={(e) =>
										setPhoneNumber(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="w-full 800px:flex block pb-3">
							<div className=" w-[100%] 800px:w-[50%]">
								<label className="block pb-2">
									Email Address
								</label>
								<input
									type="text"
									className={`${styles.input} focus:border-blue-500 !w-[95%] mb-1 800px:mb-0`}
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									readOnly
								/>
							</div>

							<div className=" w-[100%] 800px:w-[50%]">
								<label className="block pb-2">Password</label>
								<input
									type="text"
									className={`${styles.input} focus:border-blue-500 !w-[95%] mb-4 800px:mb-0`}
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
						</div>

						<div className="flex justify-center pt-10">
							<button
								className={`${styles.button}`}
								onClick={handleUpdate}
							>
								<span className="text-white">Update</span>
							</button>
						</div>
					</form>
				</>
			)}
			{/* Order Section */}
			{active === 1 && (
				<div>
					<Orders />
				</div>
			)}
			{/* Refund Section */}
			{active === 2 && (
				<div>
					<Refunds />
				</div>
			)}
			{/* TrackOrders Section */}
			{active === 4 && (
				<div>
					<TrackOrders />
				</div>
			)}
			{/* Payment Methods Section */}
			{active === 5 && (
				<div>
					<PaymentMethods />
				</div>
			)}
			{/* Address Section */}
			{active === 6 && (
				<div>
					<UserAddress />
				</div>
			)}
		</div>
	);
};

export default ProfileContent;

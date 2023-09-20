import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { State, City } from "country-state-city";
import { deleteUserAddress, updateUserAddress } from "../../redux/actions/user";

const UserAddress = () => {
	const { user, error, successMessage } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [addressType, setAddressType] = useState("");

	const addressTypeData = [
		{
			name: "Default",
		},
		{
			name: "Home",
		},
		{
			name: "Office",
		},
	];

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearErrors" });
		}
		if (successMessage) {
			toast.success(successMessage);
			dispatch({ type: "clearMessages" });
		}
	}, [error, successMessage, dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (addressType === "" || state === "" || city === "") {
			toast.error("Please fill out all the fields");
		}
		dispatch(
			updateUserAddress(
				state,
				city,
				address1,
				address2,
				zipCode,
				addressType
			)
		);
		setOpen(false);
		setState("");
		setCity("");
		setAddress1("");
		setAddress2("");
		setZipCode("");
		setAddressType("");
	};

	const removeAddressHandler = (item) => {
		dispatch(deleteUserAddress(item._id));
	};
	console.log(user, "this is the user");

	return (
		<div className="w-full px-5">
			<div className="flex w-full items-center justify-between">
				<h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
					My Addresses
				</h1>
				<div
					className={`${styles.button} rounded-md`}
					onClick={() => setOpen(true)}
				>
					<span className="text-white">Add New</span>
				</div>
			</div>
			<br />
			{user &&
				user.addresses.map((item, index) => (
					<div
						className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
						key={index}
					>
						<div className="w-1/6 flex items-center">
							<h5 className="pl-5 font-[600] truncate">
								{item.addressType}
							</h5>
						</div>
						<div className="w-1/2 pl-8 truncate">
							<h6 className="truncate">
								{item.address1} {item.address2} {item.city},
								{item.state}
							</h6>
						</div>

						<div className="w-1/8 flex items-center justify-between pl-8">
							<AiOutlineDelete
								size={25}
								className="cursor-pointer"
								onClick={() => removeAddressHandler(item)}
							/>
						</div>
					</div>
				))}
			{user && user.addresses.length === 0 && (
				<h5 className="text-center pt-8 text-[18px]">
					There are currently no saved addresses
				</h5>
			)}

			{/* Address Change Form */}
			{open && (
				<div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
					<div className="w-[35%] h-[65vh] bg-white rounded shadow relative overflow-y-auto">
						<div className="w-full flex justify-end p-3">
							<RxCross1
								size={30}
								className="cursor-pointer"
								onClick={() => setOpen(false)}
							/>
						</div>
						<h1 className="text-center text-[25px] font-Poppins">
							Add New Address
						</h1>
						<div className="w-full">
							<form className="w-full">
								<div className="w-full block p-4">
									<div className="w-full pb-2 pt-5">
										<label className="block pb-2">
											Address 1
										</label>
										<input
											type="address"
											className={`${styles.input}`}
											required
											value={address1}
											onChange={(e) =>
												setAddress1(e.target.value)
											}
										/>
									</div>
									<div className="w-full pb-2 pt-5">
										<label className="block pb-2">
											Address 2
										</label>
										<input
											type="address"
											className={`${styles.input}`}
											value={address2}
											onChange={(e) =>
												setAddress2(e.target.value)
											}
										/>
									</div>
									<div className="flex items-center justify-between pt-5">
										<div className="w-full pb-2">
											<label className="block pb-2">
												State
											</label>
											<select
												value={state}
												onChange={(e) =>
													setState(e.target.value)
												}
												className="w-[95%] border h-[40px] rounded-[5px]"
											>
												<option
													value=""
													className="block border pb-2"
												>
													Choose your State
												</option>
												{State &&
													State.getStatesOfCountry(
														"US"
													).map((item) => (
														<option
															className="block pb-2"
															key={item.isoCode}
															value={item.isoCode}
														>
															{item.name}
														</option>
													))}
											</select>
										</div>
										<div className="w-full pb-2">
											<label className="block pb-2">
												City
											</label>
											<select
												value={city}
												onChange={(e) =>
													setCity(e.target.value)
												}
												className="w-[95%] border h-[40px] rounded-[5px]"
											>
												<option
													value=""
													className="block border pb-2"
												>
													Choose your City
												</option>
												{City &&
													City.getCitiesOfState(
														"US",
														state
													).map((item) => (
														<option
															className="block pb-2"
															key={item.isoCode}
															value={item.isoCode}
														>
															{item.name}
														</option>
													))}
											</select>
										</div>
									</div>
									<div className="flex items-center justify-between pt-5">
										<div className="w-full pb-2">
											<label className="block pb-2">
												Zipcode
											</label>
											<input
												type="number"
												className={`${styles.input}`}
												required
												value={zipCode}
												onChange={(e) =>
													setZipCode(e.target.value)
												}
											/>
										</div>
										<div className="w-full pb-2">
											<label className="block pb-2">
												Address Type
											</label>
											<select
												value={addressType}
												onChange={(e) =>
													setAddressType(
														e.target.value
													)
												}
												className="w-[95%] border h-[40px] rounded-[5px]"
											>
												<option
													value=""
													className="block border pb-2"
												>
													Choose your Address Type
												</option>
												{addressTypeData &&
													addressTypeData.map(
														(item, index) => (
															<option
																className="block pb-2"
																key={index}
																value={
																	item.name
																}
															>
																{item.name}
															</option>
														)
													)}
											</select>
										</div>
									</div>
									<div className="flex items-center justify-center pt-10">
										<div
											className={`${styles.button} cursor-pointer`}
											onClick={handleSubmit}
										>
											<span className="text-white">
												Submit
											</span>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserAddress;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { State, City } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
const Checkout = () => {
	const { user } = useSelector((state) => state.user);
	const { cart } = useSelector((state) => state.cart);
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [userInfo, setUserInfo] = useState(false);
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [couponCode, setCouponCode] = useState("");
	const [couponCodeData, setCouponCodeData] = useState(null);
	const [discountPrice, setDiscountPrice] = useState("");
	const navigate = useNavigate();

	const paymentSubmit = () => {
		if (address1 === "" || zipCode === "" || state === "" || city === "") {
			toast.error("Fill out your receiving address!");
		} else {
			const shippingAddress = {
				address1,
				address2,
				zipCode,
				state,
				city,
			};
			const orderData = {
				cart,
				totalPrice,
				subTotalPrice,
				shippingCost,
				discountPrice,
				shippingAddress,
				user,
			};
			//updating local storage with updated orders array
			localStorage.setItem("latestOrder", JSON.stringify(orderData));
			navigate("/payment");
		}
	};

	console.log(cart, "this is the cart");

	const subTotalPrice = cart.reduce(
		(acc, item) => acc + item.qty * item.price,
		0
	);

	const shippingCost = subTotalPrice * 0.1;
	const discountPercentage = couponCodeData ? discountPrice : "";

	const totalPrice = couponCodeData
		? subTotalPrice + shippingCost - discountPercentage
		: subTotalPrice + shippingCost;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleCouponSubmit = async (e) => {
		e.preventDefault();
		const name = couponCode;

		await axios.get(`${server}/coupon/get-value/${name}`).then((res) => {
			const shopId = res.data.couponCode?.shop?._id;
			const couponCodeValue = res.data.couponCode?.value;
			if (res.data.couponCode !== null) {
				const isCouponValid =
					cart && cart.filter((item) => item.shopId === shopId);

				if (isCouponValid.length === 0) {
					toast.error("Coupon code is not valid for this shop");
					setCouponCode("");
				} else {
					const eligiblePrice = isCouponValid.reduce(
						(acc, item) => acc + item.qty * item.price,
						0
					);
					const discountPrice =
						(eligiblePrice * couponCodeValue) / 100;
					setDiscountPrice(discountPrice);
					setCouponCodeData(res.data.couponCode);
					setCouponCode("");
				}
			}
			if (res.data.couponCode === null) {
				toast.error("Coupon code doesn't exists!");
				setCouponCode("");
			}
		});
	};

	return (
		<div className="w-full flex flex-col items-center py-8">
			<div className="w-[90%] 1000px:w-[70%] block 800px:flex">
				<div className="w-full 800px:w-[65%]">
					<ShippingInfo
						user={user}
						state={state}
						setState={setState}
						city={city}
						setCity={setCity}
						address1={address1}
						setAddress1={setAddress1}
						address2={address2}
						setAddress2={setAddress2}
						zipCode={zipCode}
						setZipCode={setZipCode}
						userInfo={userInfo}
						setUserInfo={setUserInfo}
					/>
				</div>
				<div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
					<CartData
						handleCouponSubmit={handleCouponSubmit}
						totalPrice={totalPrice}
						shippingCost={shippingCost}
						subTotalPrice={subTotalPrice}
						couponCode={couponCode}
						setCouponCode={setCouponCode}
						discountPercentage={discountPercentage}
					/>
				</div>
			</div>
			<div
				className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
				onClick={paymentSubmit}
			>
				<h5 className="text-white">Go to Payment</h5>
			</div>
		</div>
	);
};

const ShippingInfo = ({
	user,
	state,
	setState,
	city,
	setCity,
	address1,
	setAddress1,
	address2,
	setAddress2,
	zipCode,
	setZipCode,
	userInfo,
	setUserInfo,
}) => {
	return (
		<div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
			<h5 className="text-[18px] font-[500]">Shipping Address</h5>
			<br />
			<form>
				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">Full Name</label>
						<input
							type="text"
							required
							readOnly
							value={user && user.name}
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
					<div className="w-[50%]">
						<label className="block pb-2">Email Address</label>
						<input
							type="email"
							required
							readOnly
							value={user && user.email}
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
				</div>
				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">Phone Number</label>
						<input
							type="number"
							readOnly
							value={user && user.phoneNumber}
							required
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
					<div className="w-[50%]">
						<label className="block pb-2">Zip Code</label>
						<input
							type="number"
							value={zipCode}
							onChange={(e) => setZipCode(e.target.value)}
							required
							className={`${styles.input}`}
						/>
					</div>
				</div>
				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">State</label>
						<select
							className="w-[95%] border h-[40px] rounded-[5px]"
							value={state}
							onChange={(e) => setState(e.target.value)}
						>
							<option className="block pb-2" value="">
								Choose your state
							</option>
							{State &&
								State.getStatesOfCountry("US").map((item) => (
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
					<div className="w-[50%]">
						<label className="block pb-2">City</label>
						<select
							className="w-[95%] border h-[40px] rounded-[5px]"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						>
							<option className="block pb-2" value="">
								Choose your City
							</option>
							{City &&
								City.getCitiesOfState("US", state).map(
									(item) => (
										<option
											className="block pb-2"
											key={item.isoCode}
											value={item.isoCode}
										>
											{item.name}
										</option>
									)
								)}
						</select>
					</div>
				</div>
				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">Address 1</label>
						<input
							type="address"
							required
							value={address1}
							onChange={(e) => setAddress1(e.target.value)}
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
					<div className="w-[50%]">
						<label className="block pb-2">Address 2</label>
						<input
							type="address"
							value={address2}
							onChange={(e) => setAddress2(e.target.value)}
							className={`${styles.input}`}
						/>
					</div>
				</div>
			</form>
			<h5
				className="text-[18px] cursor-pointer inline-block font-bold"
				onClick={() => setUserInfo(!userInfo)}
			>
				Choose from saved address
			</h5>
			{userInfo && (
				<div>
					{user &&
						user.addresses.map((item, index) => (
							<div className="w-full flex mt-1">
								<input
									type="checkbox"
									className="mr-3"
									value={item.addressType}
									onClick={() => {
										setAddress1(item.address1);
										setAddress2(item.address2);
										setZipCode(item.zipCode);
										setState(item.state);
										setCity(item.city);
									}}
								/>
								<h2>{item.addressType}</h2>
							</div>
						))}
				</div>
			)}
		</div>
	);
};
const CartData = ({
	handleCouponSubmit,
	totalPrice,
	shippingCost,
	subTotalPrice,
	couponCode,
	setCouponCode,
	discountPercentage,
}) => {
	return (
		<div className="w-full bg-[#fff] rounded-md p-5 pb-8">
			<div className="flex justify-between">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">
					Subtotal:
				</h3>
				<h5 className="text-[18px] font-[600]">
					${parseFloat(subTotalPrice).toFixed(2)}
				</h5>
			</div>
			<br />
			<div className="flex justify-between">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">
					Shipping Cost:
				</h3>
				<h5 className="text-[18px] font-[600]">
					${shippingCost.toFixed(2)}
				</h5>
			</div>
			<br />
			<div className="flex justify-between border-b pb-3">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">
					Discount:
				</h3>
				<h5 className="text-[18px] font-[600]">
					-{" "}
					{discountPercentage
						? "$" + discountPercentage.toFixed(2)
						: null}
				</h5>
			</div>
			<h5 className="text-[18px] font-[600] text-end pt-3">
				${parseFloat(totalPrice).toFixed(2)}
			</h5>
			<br />
			<form onSubmit={handleCouponSubmit}>
				<input
					type="text"
					className={`${styles.input} h-[40px] pl-2`}
					placeholder="Coupon code"
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
					required
				/>
				<input
					className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
					required
					value="Apply code"
					type="submit"
				/>
			</form>
		</div>
	);
};
export default Checkout;

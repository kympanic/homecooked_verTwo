import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const Payment = () => {
	const [orderData, setOrderData] = useState([]);

	useEffect(() => {
		const order = JSON.parse(localStorage.getItem("latestOrder"));
		setOrderData(order);
	}, []);
	return (
		<div className="w-full flex flex-col items-center py-8">
			<div className="w-[90%] 1000px:w-[70%] block 800px:flex">
				<div className="w-full 800px:w-[65%]">
					<PaymentInfo />
				</div>
				<div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
					<CartData orderData={orderData} />
				</div>
			</div>
		</div>
	);
};

const PaymentInfo = () => {
	const [select, setSelect] = useState(1);
	const navigate = useNavigate();

	const paymentHandler = (e) => {
		e.preventDefault();
	};
	return (
		<div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
			{/* select buttons */}
			<div>
				<div className="flex w-full pb-5 border-b mb-2">
					<div
						className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
						onClick={() => setSelect(1)}
					>
						{select === 1 ? (
							<div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
						) : null}
					</div>
					<h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
						Pay with Debit/credit card
					</h4>
				</div>
				{/* card payment */}
				{select === 1 ? (
					<div className="w-full flex border-b">
						<form className="w-full" onSubmit={paymentHandler}>
							<div className="w-full flex pb-3">
								<div className="w-[50%]">
									<label className="block pb-2">
										Card Number
									</label>
									<input
										required
										className={`${styles.input} !w-[95%] text-[#444]`}
									/>
								</div>
								<div className="w-[50%]">
									<label className="block pb-2">
										Exp Date
									</label>
									<input
										type="number"
										required
										className={`${styles.input} !w-[95%] text-[#444]`}
									/>
								</div>
							</div>
							<div className="w-full flex pb-3">
								<div className="w-[50%]">
									<label className="block pb-2">
										Name on Card
									</label>
									<input
										type="text"
										required
										className={`${styles.input} !w-[95%] text-[#444]`}
									/>
								</div>
								<div className="w-[50%]">
									<label className="block pb-2">
										Billing Address
									</label>
									<input
										type="text"
										required
										className={`${styles.input} !w-[95%] text-[#444]`}
									/>
								</div>
							</div>
							<input
								type="submit"
								value="Submit"
								className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
							/>
						</form>
					</div>
				) : null}
			</div>
			<br />
			{/* paypal payment */}
			<div>
				<div className="flex w-full pb-5 border-b mb-2">
					<div
						className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
						onClick={() => setSelect(2)}
					>
						{select === 2 ? (
							<div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
						) : null}
					</div>
					<h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
						Pay with Paypal
					</h4>
				</div>
				{select === 2 ? (
					<div className="w-full flex border-b"></div>
				) : null}
			</div>
		</div>
	);
};
const CartData = ({ orderData }) => {
	console.log(orderData, "this is order data");
	const shippingCost = orderData?.shippingCost?.toFixed(2);
	return (
		<div className="w-full bg-[#fff] rounded-md p-5 pb-8">
			<div className="flex justify-between">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">
					subtotal:
				</h3>
				<h5 className="text-[18px] font-[600]">
					${orderData?.subTotalPrice}
				</h5>
			</div>
			<br />
			<div className="flex justify-between">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">
					shipping:
				</h3>
				<h5 className="text-[18px] font-[600]">${shippingCost}</h5>
			</div>
			<br />
			<div className="flex justify-between border-b pb-3">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">
					Discount:
				</h3>
				<h5 className="text-[18px] font-[600]">
					{orderData?.discountPrice
						? "-$" + orderData.discountPrice.toFixed(2)
						: "-"}
				</h5>
			</div>
			<h5 className="text-[18px] font-[600] text-end pt-3">
				${orderData?.totalPrice}
			</h5>
			<br />
		</div>
	);
};
export default Payment;
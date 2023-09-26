import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
					<CartData />
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
			<div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-enter justify-center">
                
            </div>
		</div>
	);
};
const CartData = () => {};
export default Payment;

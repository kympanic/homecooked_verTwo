import React from "react";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";

const ChangePassword = () => {
	return (
		<div className="w-full px-5">
			<div className="flex w-full items-center justify-between">
				<h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
					Change Password
				</h1>
				<div className={`${styles.button} rounded-md`}>
					<span className="text-white">Add New</span>
				</div>
			</div>
			<br />
			<div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
				<div className="flex items-center">
					<img
						src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png"
						alt="Visa"
						className="h-[20px]"
					/>
					<h5 className="pl-5 font-[600] 800px:block hidden">
						Amy Leang
					</h5>
				</div>
				<div className="pl-8 flex items-center">
					<h6>1234 **** *** ****</h6>
					<h5 className="pl-6">09/2024</h5>
				</div>
				<div className="min-w-[10%] flex items-center justify0between pl-8">
					<AiOutlineDelete size={25} className="cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;

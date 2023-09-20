import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";

const UserAddress = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full px-5">
			<div className="flex w-full items-center justify-between">
				<h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
					My Addresses
				</h1>
				<div className={`${styles.button} rounded-md`}>
					<span className="text-white">Add New</span>
				</div>
			</div>
			<br />
			<div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
				<div className="flex items-center">
					<h5 className="pl-5 font-[600]">Default</h5>
				</div>
				<div className="pl-8 flex items-center">
					<h6>13210 Brentwood Lane, Moreno Valley CA 92553</h6>
				</div>
				<div className="pl-8 flex items-center">
					<h6>(951)454-4206</h6>
				</div>
				<div className="min-w-[10%] flex items-center justify0between pl-8">
					<AiOutlineDelete size={25} className="cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

export default UserAddress;

import React from "react";
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";
import {
	AiOutlineMessage,
	AiOutlineCreditCard,
	AiOutlineLogin,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";

const iconMapping = {
	RxPerson,
	HiOutlineShoppingBag,
	HiOutlineReceiptRefund,
	AiOutlineMessage,
	MdOutlineTrackChanges,
	AiOutlineCreditCard,
	TbAddressBook,
	AiOutlineLogin,
};

const ProfileSideBar = ({ active, setActive }) => {
	const navigate = useNavigate();
	const sections = [
		{ icon: "RxPerson", title: "Profile" },
		{ icon: "HiOutlineShoppingBag", title: "Orders" },
		{ icon: "HiOutlineReceiptRefund", title: "Refunds" },
		{ icon: "AiOutlineMessage", title: "Inbox" },
		{ icon: "MdOutlineTrackChanges", title: "Track Order" },
		{ icon: "AiOutlineCreditCard", title: "Payment Methods" },
		{ icon: "TbAddressBook", title: "Address" },
		{ icon: "AiOutlineLogin", title: "Log Out" },
	];

	const handleClick = (section, index) => {
		if (section.title === "Inbox") {
			navigate("/inbox");
		} else {
			setActive(index);
		}
	};

	return (
		<div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
			{sections &&
				sections.map((section, index) => {
					const IconComponent = iconMapping[section.icon];
					return (
						<div
							key={section.title}
							className="flex items-center cursor-pointer w-full mb-8"
							onClick={() => handleClick(section, index)}
						>
							<IconComponent
								size={20}
								color={active === index ? "red" : ""}
							/>
							<span
								className={`pl-3 ${
									active === index ? "text-[red]" : ""
								}`}
							>
								{section.title}
							</span>
						</div>
					);
				})}
		</div>
	);
};

export default ProfileSideBar;

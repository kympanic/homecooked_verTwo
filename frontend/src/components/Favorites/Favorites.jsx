import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";

import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const Favorites = ({ setOpenFavorites }) => {
	const cartData = [
		{
			name: "Rose pasta Ttobukki with pork and ramen",
			description: "test",
			price: "999",
		},
		{
			name: "Rose pasta Ttobukki with pork and ramen",
			description: "test",
			price: "250",
		},
		{
			name: "Rose pasta Ttobukki with pork and ramen",
			description: "test",
			price: "740",
		},
	];

	return (
		<div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
			<div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-md">
				<div>
					<div className="flex w-full justify-end pt-5 pr-5">
						<RxCross1
							size={20}
							className="cursor-pointer"
							onClick={() => setOpenFavorites(false)}
						/>
					</div>
					{/* Favorite Items */}
					<div className={`${styles.normalFlex} pl-4`}>
						<AiOutlineHeart size={25} />
						<h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
					</div>
					<br />
					<div className="w-full border-t">
						{cartData &&
							cartData.map((i, index) => (
								<FavoriteSingle key={index} data={i} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

const FavoriteSingle = ({ data }) => {
	const [value, setValue] = useState(1);
	const totalPrice = data.price * value;
	console.log(data.price, "this is the price");
	return (
		<div className="border-b p-4">
			<div className="w-full flex items-center">
				<RxCross1 className="cursor-pointer" />
				<img
					src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/American.jpg"
					alt=""
					className="w-[80x] h-[80px] ml-2"
				/>

				<div className="pl-3 pr-4">
					<h1>{data.name}</h1>
					<h4 className="font-[400] text-[15px] text-[#00000082]">
						${data.price} * {value}
					</h4>
					<h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
						${totalPrice}
					</h4>
				</div>
				<div>
					<BsCartPlus
						size={20}
						className="cursor-pointer"
						title="Add to cart"
					/>
				</div>
			</div>
		</div>
	);
};

export default Favorites;

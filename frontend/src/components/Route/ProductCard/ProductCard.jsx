import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";

import {
	AiFillHeart,
	AiFillStar,
	AiOutlineEye,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";

const ProductCard = ({ data }) => {
	const [click, setClick] = useState(false);
	const [open, setOpen] = useState(false);

	const d = data.name;
	const product_name = d.replace(/\s+/g, "-");
	return (
		<>
			{data && (
				<div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
					<Link to={`/product/${product_name}`}>
						<img
							src={`${backend_url}${data?.images?.[0]}`}
							alt=""
							className="w-full h-[170px] object-cover pr-8"
						/>
					</Link>
					<Link to={`/shop/${data?.shop._id}`}>
						<h5 className={`${styles.shop_name}`}>
							{data.shop.name}
						</h5>
					</Link>
					<Link to={`/product/${product_name}`}>
						<h4 className="pb-3 font-[500]">
							{data.name.length > 40
								? data.name.slice(0, 40) + "..."
								: data.name}
						</h4>
						<div className="flex">
							<AiFillStar
								className="mr-2 cursor-pointer"
								size={20}
								color="#F6BA00"
							/>
							<AiFillStar
								className="mr-2 cursor-pointer"
								size={20}
								color="#F6BA00"
							/>
							<AiFillStar
								className="mr-2 cursor-pointer"
								size={20}
								color="#F6BA00"
							/>
							<AiFillStar
								className="mr-2 cursor-pointer"
								size={20}
								color="#F6BA00"
							/>
							<AiFillStar
								className="mr-2 cursor-pointer"
								size={20}
								color="#F6BA00"
							/>
						</div>
						<div className="py-2 flex items-center justify-between">
							<div className="flex">
								<h5 className={`${styles.productPrice}`}>
									${data.price}
								</h5>
							</div>
							<span className="font-[400] text-[17px] text-[#68d284]">
								{data.sold_out} sold
							</span>
						</div>
					</Link>
					{/* side icons */}
					<div>
						{click ? (
							<AiFillHeart
								size={22}
								className="cursor-pointer absolute right-2 top-5"
								onClick={() => setClick(!click)}
								color={click ? "red" : "#333"}
								title="Remove from favorites"
							/>
						) : (
							<AiOutlineHeart
								size={22}
								className="cursor-pointer absolute right-2 top-5"
								onClick={() => setClick(!click)}
								color={click ? "red" : "#333"}
								title="Add to favorites"
							/>
						)}
						<AiOutlineEye
							size={22}
							className="cursor-pointer absolute right-2 top-14"
							onClick={() => setOpen(!open)}
							color="#333"
							title="Quick view"
						/>
						<AiOutlineShoppingCart
							size={25}
							className="cursor-pointer absolute right-2 top-24"
							onClick={() => setOpen(!open)}
							color="#444"
							title="Add to cart"
						/>
						{open ? (
							<ProductDetailsCard setOpen={setOpen} data={data} />
						) : null}
					</div>
				</div>
			)}
		</>
	);
};
export default ProductCard;

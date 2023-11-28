import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { AiOutlineMessage } from "react-icons/ai";
import Ratings from "./Ratings";

const ProductInfoSection = ({ data, products }) => {
	const [active, setActive] = useState(1);

	const handleMessageSubmit = () => {};

	return (
		<div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
			<div className="w-full flex justify-between border-b pt-10 pb-2">
				<div className="relative">
					<h5
						className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
						onClick={() => setActive(1)}
					>
						Product Details
					</h5>
					{active === 1 ? (
						<div className={`${styles.active_indicator}`}></div>
					) : null}
				</div>
				<div className="relative">
					<h5
						className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
						onClick={() => setActive(2)}
					>
						Product Reviews
					</h5>
					{active === 2 ? (
						<div className={`${styles.active_indicator}`}></div>
					) : null}
				</div>
				<div className="relative">
					<h5
						className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
						onClick={() => setActive(3)}
					>
						Store Information
					</h5>
					{active === 3 ? (
						<div className={`${styles.active_indicator}`}></div>
					) : null}
				</div>
			</div>
			{active === 1 ? (
				<>
					<p className="py-2 text-[18px] leading-9 pb-10 whitespace-pre-line">
						{data.description}
					</p>
				</>
			) : null}
			{active === 2 ? (
				<>
					<p className="w-full r min-h-[40vh] flex flex-col items-center py-3">
						{data &&
							data.reviews?.map((item, index) => (
								<div className="w-full flex my-2 mt-3">
									<img
										src={`${backend_url}/${item.user.avatar}`}
										alt="profile"
										className="w-[50px] h-[50px] rounded-full"
									/>
									<div className="pl-2">
										<div className="w-full flex items-center">
											<h1 className="pl-2 font-[500] mr-3">
												{item.user.name}
											</h1>

											<Ratings rating={item?.rating} />
										</div>
										<p className="pl-2">{item.comment}</p>
									</div>
								</div>
							))}
						<div className="w-full flex-justify-center">
							{data && data.reviews.length === 0 && (
								<h5>Currently no reviews for this product</h5>
							)}
						</div>
					</p>
				</>
			) : null}
			{active === 3 && (
				<div className="w-full block 800px:flex p-5">
					<div className="w-full 800px:w-[50%]">
						<div className="flex items-center">
							<img
								src={`${backend_url}${data.shop.avatar}`}
								alt=""
								className="w-[50px] h-[50px] rounded-full"
							/>

							<div className="pl-3">
								<Link to={`/shop/${data.shopId}`}>
									<h3 className={`${styles.shop_name}`}>
										{data.shop.name}
									</h3>
								</Link>
								<h5 className="pb-2 text=[15px]">
									(4.5) Ratings
								</h5>
							</div>
						</div>
						<p className="pt-2">{data.shop.description}</p>
					</div>
					<div className="w-full mt-5 800px:w-[50%] 800px:mt-0 800px:flex flex-col items-end">
						<div className="text-left">
							<h5 className="font-[600]">
								Joined on:
								<span className="font-[500] ml-1">
									{`${data.shop.createdAt.slice(0, 10)}`}
								</span>
							</h5>
							<h5 className="font-[600]">
								Total Products:
								<span className="font-[500]">
									{products?.length}
								</span>
							</h5>
							<h5 className="font-[600]">
								Total Reviews:
								<span className="font-[500]">5</span>
							</h5>
							<Link to={`/shop/${data.shopId}`}>
								<div
									className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
								>
									<h4 className="text-white">Shop Page</h4>
								</div>
							</Link>
							<div
								className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
								onClick={handleMessageSubmit}
							>
								<span className="text-white flex items-center">
									Send Message{" "}
									<AiOutlineMessage className="ml-1" />
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductInfoSection;

import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const ProductInfoSection = ({ data }) => {
	const [active, setActive] = useState(1);
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
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Odit expedita maiores eos voluptatum dolorum, sed,
						dolores quia est quod id magnam. Aperiam ex aut corrupti
						dolores odit ad cumque ullam? Lorem ipsum dolor sit,
						amet consectetur adipisicing elit. Odit expedita maiores
						eos voluptatum dolorum, sed, dolores quia est quod id
						magnam. Aperiam ex aut corrupti dolores odit ad cumque
						ullam?
					</p>
					<p className="py-2 text-[18px] leading-9 pb-10 whitespace-pre-line">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Odit expedita maiores eos voluptatum dolorum, sed,
						dolores quia est quod id magnam. Aperiam ex aut corrupti
						dolores odit ad cumque ullam? Lorem ipsum dolor sit,
						amet consectetur adipisicing elit. Odit expedita maiores
						eos voluptatum dolorum, sed, dolores quia est quod id
						magnam. Aperiam ex aut corrupti dolores odit ad cumque
						ullam?
					</p>
					<p className="py-2 text-[18px] leading-9 pb-10 whitespace-pre-line">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Odit expedita maiores eos voluptatum dolorum, sed,
						dolores quia est quod id magnam. Aperiam ex aut corrupti
						dolores odit ad cumque ullam? Lorem ipsum dolor sit,
						amet consectetur adipisicing elit. Odit expedita maiores
						eos voluptatum dolorum, sed, dolores quia est quod id
						magnam. Aperiam ex aut corrupti dolores odit ad cumque
						ullam?
					</p>
				</>
			) : null}
			{active === 2 ? (
				<>
					<p className="w-full justify-center min-h-[40vh] flex items-center">
						No Reviews Yet!
					</p>
				</>
			) : null}
			{active === 3 && (
				<div className="w-full block 800px:flex p-5">
					<div className="w-full 800px:w-[50%]">
						<div className="flex items-center">
							<img
								src={data.shop.shop_avatar.url}
								alt=""
								className="w-[50px] h-[50px] rounded-full"
							/>
							<div className="pl-3">
								<h3 className={`${styles.shop_name}`}>
									{data.shop.name}
								</h3>
								<h5 className="pb-2 text=[15px]">
									({data.shop.ratings}) Ratings
								</h5>
							</div>
						</div>
						<p className="pt-2">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Maxime distinctio nostrum aspernatur labore
							dolorem inventore saepe cumque, esse in obcaecati
							consectetur autem magnam natus iusto error minus
							nihil ipsam harums?
						</p>
					</div>
					<div className="w-full mt-5 800px:w-[50%] 800px:mt-0 800px:flex flex-col items-end">
						<div className="text-left">
							<h5 className="font-[600]">
								Joined on:
								<span className="font-[500]">
									01 September, 2023
								</span>
							</h5>
							<h5 className="font-[600]">
								Total Products:
								<span className="font-[500]">20</span>
							</h5>
							<h5 className="font-[600]">
								Total Reviews:
								<span className="font-[500]">5</span>
							</h5>
							<Link to="/">
								<div
									className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
								>
									<h4 className="text-white">Shop Page</h4>
								</div>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductInfoSection;

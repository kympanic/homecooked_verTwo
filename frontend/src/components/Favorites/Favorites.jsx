import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { removeFromFavorites } from "../../redux/actions/favorites";
import { backend_url } from "../../server";

const Favorites = ({ setOpenFavorites }) => {
	const { favorites } = useSelector((state) => state.favorites);
	const dispatch = useDispatch();

	const removeFromFavoritesHandler = (data) => {
		dispatch(removeFromFavorites(data));
	};

	const addToCartHandler = (data) => {
		const newData = { ...data, qty: 1 };
		dispatch(addToCart(newData));
		setOpenFavorites(false);
	};

	return (
		<div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
			<div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
				{favorites && favorites.length === 0 ? (
					<div className="w-full h-screen flex items-center justify-center">
						<div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
							<RxCross1
								size={25}
								className="cursor-pointer"
								onClick={() => setOpenFavorites(false)}
							/>
						</div>
						<h5>No items currently in favorites!</h5>
					</div>
				) : (
					<>
						<div>
							<div className="flex w-full justify-end pt-5 pr-5">
								<RxCross1
									size={25}
									className="cursor-pointer"
									onClick={() => setOpenFavorites(false)}
								/>
							</div>
							{/* Item length */}
							<div className={`${styles.normalFlex} p-4`}>
								<AiOutlineHeart size={25} />
								<h5 className="pl-2 text-[20px] font-[500]">
									{favorites && favorites.length} items
								</h5>
							</div>

							{/* favorites Single Items */}
							<br />
							<div className="w-full border-t">
								{favorites &&
									favorites.map((i, index) => (
										<FavoriteSingle
											key={index}
											data={i}
											removeFromFavoritesHandler={
												removeFromFavoritesHandler
											}
											addToCartHandler={addToCartHandler}
										/>
									))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const FavoriteSingle = ({
	data,
	removeFromFavoritesHandler,
	addToCartHandler,
}) => {
	const [value, setValue] = useState(1);
	const totalPrice = data.price * value;

	return (
		<div className="border-b p-4">
			<div className="w-full 800px:flex justify-start items-center border">
				<RxCross1
					className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-4 ml-5 mr-5"
					onClick={() => removeFromFavoritesHandler(data)}
				/>
				<img
					src={`${backend_url}${data.images[0]}`}
					alt=""
					className="w-[130px] h-min ml-2 mr-5 rounded-[5px]"
				/>

				<div className="pl-[5px]">
					<h1>{data.name}</h1>
					<h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
						US${totalPrice}
					</h4>
					<div
						className={`${styles.button} cursor-pointer mt-10`}
						onClick={() => addToCartHandler(data)}
					>
						<span className="text-white">Add to Cart</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Favorites;

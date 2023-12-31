import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineMessage,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
	addUserFavorite,
	deleteUserFavorite,
} from "../../../redux/actions/user";

const ProductDetailsCard = ({ setOpen, data }) => {
	const { cart } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const [count, setCount] = useState(1);
	const [click, setClick] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const isFavorite = user?.favorites?.some(
			(favItem) => favItem === data._id
		);
		setClick(isFavorite);
	}, [user?.favorites, data._id]);

	const handleMessageSubmit = () => {};

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};
	const incrementCount = () => {
		setCount(count + 1);
	};

	const addToCartHandler = (id) => {
		const doesItemExist = cart && cart.find((i) => i._id === id);
		if (doesItemExist) {
			toast.error("Item already in cart");
		} else {
			if (data.stock < count) {
				toast.error("Product stock limit exceeded");
			} else {
				const cartData = { ...data, qty: count };
				dispatch(addToCart(cartData));
				toast.success("Item added to cart");
			}
		}
	};

	const addToFavoritesHandler = async (data) => {
		dispatch(addUserFavorite(data?._id));
	};

	const removeFromFavoritesHandler = (data) => {
		dispatch(deleteUserFavorite(data?._id));
	};
	// const removeFromFavoritesHandler = () => {
	// 	setClick(!click);
	// 	dispatch(removeFromFavorites(data));
	// };

	// const addToFavoritesHandler = () => {
	// 	setClick(!click);
	// 	dispatch(addToFavorites(data));
	// };
	return (
		<div className="bg-[#fff]">
			{data ? (
				<div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
					<div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
						<RxCross1
							size={30}
							className="absolute right-3 top-3 z-50"
							onClick={() => setOpen(false)}
						/>
						<div className="block w-full 800px:flex">
							<div className="w-full 800px:w-[50%] ">
								<img
									src={`${backend_url}${data?.images?.[0]}`}
									alt=""
									className="w-full max-h-[400px] object-cover p-10"
								/>
								<div className="flex">
									<img
										src={`${backend_url}${data.shop.avatar}`}
										alt={data.name}
										className="w-[50px] h-[50px] rounded-full mr-2"
									/>
									<div>
										<Link to={`/shop/${data?.shop._id}`}>
											<h5
												className={`${styles.shop_name}`}
											>
												{data.shop.name}
											</h5>
										</Link>
										<h5 className="pb-3 text-[15px]">
											({data.shop.ratings}) Ratings
										</h5>
									</div>
								</div>
								<div
									className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
									onClick={handleMessageSubmit}
								>
									<span className="text-[#fff] flex items-center">
										Send Message
										<AiOutlineMessage className="ml-1" />
									</span>
								</div>
								<h5 className="text-[16px] text-[red] mt-5">
									({data.total_sell}) Sold out
								</h5>
							</div>
							<div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
								<h1
									className={`${styles.productTitle} text-[20px]`}
								>
									{data.name}
								</h1>
								<p>{data.description}</p>
								<div className="flex pt-3">
									<h3 className={`${styles.discount_price}`}>
										{data.price}
									</h3>
								</div>
								<div className="flex items-center mt-12 justify-between pr-3">
									<div>
										<button
											className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
											onClick={decrementCount}
										>
											-
										</button>
										<span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
											{count}
										</span>
										<button
											className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
											onClick={incrementCount}
										>
											+
										</button>
									</div>
									<div>
										{click ? (
											<AiFillHeart
												size={30}
												className="cursor-pointer"
												onClick={() =>
													removeFromFavoritesHandler(
														data
													)
												}
												color={click ? "red" : "#333"}
												title="Remove from favorites"
											/>
										) : (
											<AiOutlineHeart
												size={30}
												className="cursor-pointer"
												onClick={() =>
													addToFavoritesHandler(data)
												}
												title="Add to favorites"
											/>
										)}
									</div>
								</div>
								<div
									className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
								>
									<span
										className="text-[#fff] flex items-center"
										onClick={() =>
											addToCartHandler(data._id)
										}
									>
										Add to cart
										<AiOutlineShoppingCart className="ml-1" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ProductDetailsCard;

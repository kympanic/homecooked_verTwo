import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
	AiFillHeart,
	AiFillStar,
	AiOutlineStar,
	AiOutlineEye,
	AiOutlineHeart,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
	addUserFavorite,
	deleteUserFavorite,
} from "../../../redux/actions/user";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data }) => {
	const { cart } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const [click, setClick] = useState(false);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	console.log(data, "this is the data");

	useEffect(() => {
		const isFavorite = user?.favorites?.some(
			(favItem) => favItem === data._id
		);
		setClick(isFavorite);
	}, [user?.favorites, data._id]);

	const addToFavoritesHandler = async (data) => {
		dispatch(addUserFavorite(data?._id));
	};

	const removeFromFavoritesHandler = (data) => {
		dispatch(deleteUserFavorite(data?._id));
	};
	const addToCartHandler = (id) => {
		const doesItemExist = cart && cart.find((i) => i._id === id);
		if (doesItemExist) {
			toast.error("Item already in cart");
		} else {
			if (data.stock < 1) {
				toast.error("Product stock limit exceeded");
			} else {
				const cartData = { ...data, qty: 1 };
				dispatch(addToCart(cartData));
				toast.success("Item added to cart");
			}
		}
	};

	return (
		<>
			{data && (
				<div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
					<Link to={`/product/${data._id}`}>
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
					<Link to={`/product/${data._id}`}>
						<h4 className="truncate pb-3 font-[500]">
							{data.name.length > 40
								? data.name.slice(0, 40) + "..."
								: data.name}
						</h4>
						<div className="flex">
							<Ratings rating={data?.avgRating} />
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
								onClick={() => removeFromFavoritesHandler(data)}
								color={click ? "red" : "#333"}
								title="Remove from favorites"
							/>
						) : (
							<AiOutlineHeart
								size={22}
								className="cursor-pointer absolute right-2 top-5"
								onClick={() => addToFavoritesHandler(data)}
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
							onClick={() => addToCartHandler(data._id)}
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

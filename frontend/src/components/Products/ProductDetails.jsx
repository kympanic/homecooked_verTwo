import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductInfoSection from "./ProductInfoSection";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const ProductDetails = ({ data }) => {
	const { products } = useSelector((state) => state.products);
	const { cart } = useSelector((state) => state.cart);
	const [count, setCount] = useState(1);
	const [select, setSelect] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllProductsShop(data && data.shopId));
	}, [dispatch, data]);

	const incrementCount = () => {
		setCount(count + 1);
	};

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const handleMessageSubmit = () => {
		navigate("/inbox?conversation=test");
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

	return (
		<div className="bg-white">
			{data ? (
				<div className={`${styles.section} w-[90%] 800px:w[80%]`}>
					<div className="w-full py-5">
						<div className="block w-full 800px:flex">
							<div className="w-full max-h-[400px] border 800px:w-[35%] mb-[100px]">
								<img
									src={`${backend_url}${data?.images?.[select]}`}
									alt=""
									className="w-[100%] max-h-[400px] object-cover "
								/>
								<div className="w-full flex">
									{data &&
										data?.images.map((i, index) => (
											<img
												src={`${backend_url}${i}`}
												alt=""
												className="h-[100px] w-[100px] object-cover p-2"
												onClick={() => setSelect(index)}
											/>
										))}
								</div>
							</div>
							<div className="w-full 800px:w-[50%] pt-5 ml-10">
								<div className="flex items-center">
									<h1 className={`${styles.productTitle}`}>
										{data.name}
									</h1>
								</div>

								<h4
									className={`${styles.productDiscountPrice}`}
								>
									$ {data.price}
								</h4>

								<div className="flex items-center mt-5 justify-between pr-3">
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
								</div>
								<div
									className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
									onClick={() => addToCartHandler(data._id)}
								>
									<span className="text-white flex items-center">
										Add to cart{" "}
										<AiOutlineShoppingCart className="ml-1" />
									</span>
								</div>
								<div className="flex items-center pt-2">
									<img
										src={`${backend_url}${data.shop.avatar}`}
										alt=""
										className="w-[50px] h-[50px] rounded-full mr-2"
									/>
									<div className="pr-8">
										<Link to={`/shop/${data.shopId}`}>
											<h3
												className={`${styles.shop_name} pb-1 pt-1`}
											>
												{data.shop.name}
											</h3>
										</Link>

										<h5 className="pb-3 text-[15px]">
											(4.5) Rating
										</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ProductInfoSection data={data} products={products} />
					<br />
					<br />
				</div>
			) : null}
		</div>
	);
};

export default ProductDetails;

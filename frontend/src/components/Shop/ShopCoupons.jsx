import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const ShopCoupons = () => {
	const { products, isLoading } = useSelector((state) => state.products);
	const [coupons, setCoupons] = useState([]);
	const { seller } = useSelector((state) => state.shop);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [discount, setDiscount] = useState("");
	const [minAmount, setMinAmount] = useState("");
	const [maxAmount, setMaxAmount] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("");

	useEffect(() => {
		dispatch(getAllProductsShop(seller._id));
		axios
			.get(`${server}/coupon/all-coupons/${seller._id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setCoupons(res.data.coupons);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [dispatch, seller._id]);

	const handleDelete = async (id) => {
		await axios
			.delete(`${server}/coupon/delete-coupon/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				toast.success("Coupon code deleted succesfully!");
			});
		window.location.reload();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(
				`${server}/coupon/create-coupon`,

				{
					name,
					minAmount,
					maxAmount,
					selectedProduct,
					value: discount,
					shop: seller,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				setName("");
				setMinAmount("");
				setMaxAmount("");
				setSelectedProduct("");
				setDiscount("");
				toast.success("Coupon code created successfully!");
				setOpen(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	const columns = [
		{ field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
		{ field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
		{
			field: "discount",
			headerName: "Discount Value",
			minWidth: 100,
			flex: 0.6,
		},
		{
			field: "delete",
			headerName: "Delete",
			minWidth: 120,
			flex: 0.8,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Button>
							<AiOutlineDelete
								size={20}
								onClick={() => handleDelete(params.id)}
							/>
						</Button>
					</>
				);
			},
		},
	];

	const row = [];

	coupons &&
		coupons.forEach((item) => {
			row.push({
				id: item._id,
				name: item.name,
				discount: item.value + "%",
			});
		});
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="w-full mx-8 pt-1 mt-10 bg-white">
					<div className="w-full flex justify-end">
						<div
							className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-4`}
							onClick={() => setOpen(true)}
						>
							<span className="text-white">
								Create Coupon Code
							</span>
						</div>
					</div>

					<DataGrid
						rows={row}
						columns={columns}
						pageSize={10}
						disableRowSelectionOnClick
						autoHeight
						className="z-0"
					/>
					{open && (
						<div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-999 flex items-center justify-center">
							<div className="w-[70%] 800px:ml-[200px] 800px:w-[45%] h-[80vh] bg-white rounded-md shadow p-4">
								<div className="w-full flex justify-end cursor-pointer">
									<RxCross1
										size={30}
										onClick={() => setOpen(false)}
									/>
								</div>
								<h5 className="text-[30px] font-Poppins text-center">
									Create Coupon Code
								</h5>
								<form onSubmit={handleSubmit}>
									<br />
									<div className="w-full  mb-3">
										<label className="pb-[10px] pt-2">
											Name{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<input
											type="text"
											name="name"
											value={name}
											className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											onChange={(e) =>
												setName(e.target.value)
											}
											placeholder="Enter your coupon code name..."
											required
										/>
									</div>
									<br />
									<div className="w-full  mb-3">
										<label className="pb-[10px] pt-2">
											Discount Percentage{" "}
											<span className="text-red-500">
												*
											</span>
										</label>
										<input
											type="number"
											name="discount"
											value={discount}
											className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											onChange={(e) =>
												setDiscount(e.target.value)
											}
											placeholder="Enter your discount value..."
											required
										/>
									</div>
									<br />
									<div className="w-full  mb-3">
										<label className="pb-[10px] pt-2">
											Minimum Total Purchase
										</label>
										<input
											type="number"
											name="minamount"
											value={minAmount}
											className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											onChange={(e) =>
												setMinAmount(e.target.value)
											}
											placeholder="Enter minimum purchase amount if applicable..."
										/>
									</div>
									<br />
									<div className="w-full  mb-3">
										<label className="pb-[10px] pt-2">
											Maximum Total Purchase
										</label>
										<input
											type="number"
											name="maxamount"
											value={maxAmount}
											className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											onChange={(e) =>
												setMaxAmount(e.target.value)
											}
											placeholder="Enter maximum purchase amount if applicable..."
										/>
									</div>
									<br />
									<label className="pb-2">
										Selected Product
									</label>
									<select
										className="w-full mt-2 border h-[35px] rounded-[5px] mb-3"
										value={selectedProduct}
										onChange={(e) =>
											setSelectedProduct(e.target.value)
										}
									>
										<option value={""}>None</option>
										{products &&
											products.map((i, index) => (
												<option
													value={i.name}
													key={index}
												>
													{i.name}
												</option>
											))}
									</select>
									<br />
									<br />
									<br />
									<div>
										<button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ShopCoupons;

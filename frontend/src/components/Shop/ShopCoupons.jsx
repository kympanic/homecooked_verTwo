import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";

const ShopCoupons = () => {
	const { products, isLoading } = useSelector((state) => state.products);
	const { seller } = useSelector((state) => state.shop);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		dispatch(getAllProductsShop(seller._id));
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteProduct(id));
		window.location.reload();
	};

	const columns = [
		{ field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
		{ field: "name", headerName: "Name,", minWidth: 180, flex: 1.4 },
		{ field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
		{ field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
		{ field: "soldout", headerName: "Sold Out", minWidth: 130, flex: 0.6 },
		{
			field: "Preview",
			headerName: "Preview",
			minWidth: 100,
			flex: 0.8,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				const data = params.row.name;
				const product_name = data.replace(/\s+/g, "-");
				return (
					<>
						<Link to={`/product/${product_name}`}>
							<Button>
								<AiOutlineEye size={20} />
							</Button>
						</Link>
					</>
				);
			},
		},
		{
			field: "delete",
			headerName: "",
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

	products &&
		products.forEach((item) => {
			row.push({
				id: item._id,
				name: item.name,
				price: "$ " + item.price,
				stock: item.stock,
				soldout: 10,
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
					/>
					{open && (
						<div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-99 flex items-center justify center">
							<div className="w-[90%] 800px:w-[50%]"></div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ShopCoupons;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";

const AllProducts = () => {
	const { products, isLoading } = useSelector((state) => state.products);
	const { seller } = useSelector((state) => state.shop);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProductsShop(seller._id));
	}, [dispatch, seller._id]);

	const handleDelete = (id) => {
		dispatch(deleteProduct(id));
		window.location.reload();
	};

	const columns = [
		{ field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
		{ field: "name", headerName: "Name,", minWidth: 180, flex: 1.4 },
		{ field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
		{ field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
		{ field: "sold", headerName: "Sold", minWidth: 130, flex: 0.6 },
		{
			field: "Preview",
			headerName: "Preview",
			minWidth: 100,
			flex: 0.8,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				const productId = params.id;
				return (
					<>
						<Link to={`/product/${productId}`}>
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

	products &&
		products.forEach((item) => {
			row.push({
				id: item._id,
				name: item.name,
				price: "$ " + item.price,
				stock: item.stock,
				sold: item.sold_out,
			});
		});
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="w-full mx-8 pt-1 mt-10 bg-white">
					<DataGrid
						rows={row}
						columns={columns}
						pageSize={10}
						disableRowSelectionOnClick
						autoHeight
						className="z-0"
					/>
				</div>
			)}
		</>
	);
};

export default AllProducts;

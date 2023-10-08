import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrdersShop } from "../../redux/actions/order";

const AllOrders = () => {
	const { orders, isLoading } = useSelector((state) => state.orders);
	const { seller } = useSelector((state) => state.shop);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllOrdersShop(seller._id));
	}, [dispatch, seller._id]);

	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

		{
			field: "status",
			headerName: "Status",
			minWidth: 130,
			flex: 0.7,
			cellClassName: (params) => {
				return params.formattedValue === "Delivered"
					? "greenColor"
					: "redColor";
			},
		},
		{
			field: "itemsQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 130,
			flex: 0.7,
		},

		{
			field: "total",
			headerName: "Total",
			type: "number",
			minWidth: 130,
			flex: 0.8,
		},

		{
			field: " ",
			flex: 1,
			minWidth: 150,
			headerName: "",
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/order/${params.id}`}>
							<Button>
								<AiOutlineArrowRight size={20} />
							</Button>
						</Link>
					</>
				);
			},
		},
	];

	const row = [];

	orders &&
		orders.forEach((item) => {
			row.push({
				id: item._id,
				itemsQty: item.cart.length,
				total: "$ " + item.totalPrice.toFixed(2),
				status: item.status,
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

export default AllOrders;

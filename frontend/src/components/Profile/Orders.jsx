import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersUser } from "../../redux/actions/order";

const Orders = () => {
	const { user } = useSelector((state) => state.user);
	const { orders } = useSelector((state) => state.orders);
	const dispatch = useDispatch();

	console.log(user._id, "this is the user id");

	useEffect(() => {
		dispatch(getAllOrdersUser(user._id));
	}, []);

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
						<Link to={`/user/order/${params.id}`}>
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
	console.log(orders, "these are the orders");

	return (
		<div>
			<div className="pl-8 pt-1">
				<DataGrid
					sx={{ backgroundColor: "white" }}
					rows={row}
					columns={columns}
					pageSize={10}
					disableSelectionOnClick
					autoHeight
				/>
			</div>
		</div>
	);
};

export default Orders;

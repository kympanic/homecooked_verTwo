import axios from "axios";
import { server } from "../../server";

//get all orders of user
export const getAllOrdersUser = (userId) => async (dispatch) => {
	try {
		dispatch({
			type: "getAllOrdersUserRequest",
		});
		const { data } = await axios.get(`${server}/order/get-all/${userId}`);
		dispatch({
			type: "getAllOrdersUserSuccess",
			payload: data.orders,
		});
	} catch (error) {
		dispatch({
			type: "getAllOrdersUserFail",
			payload: error.response.data.message,
		});
	}
};

//get all orders of shop
export const getAllOrdersShop = (shopId) => async (dispatch) => {
	try {
		dispatch({
			type: "getAllOrdersShopRequest",
		});
		const { data } = await axios.get(
			`${server}/order/get-all-shop/${shopId}`
		);
		dispatch({
			type: "getAllOrdersShopSuccess",
			payload: data.orders,
		});
	} catch (error) {
		dispatch({
			type: "getAllOrdersShopFail",
			payload: error.response.data.message,
		});
	}
};

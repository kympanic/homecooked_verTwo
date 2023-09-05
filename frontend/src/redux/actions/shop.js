import axios from "axios";
import { server } from "../../server";

//load shop-seller

export const loadShop = () => async (dispatch) => {
	try {
		dispatch({
			type: "LoadShopRequest",
		});
		const { data } = await axios.get(`${server}/shop/get-shop`, {
			withCredentials: true,
		});
		dispatch({
			type: "LoadShopSuccess",
			payload: data.seller,
		});
	} catch (error) {
		dispatch({
			type: "LoadShopFail",
			payload: error.response.data.message,
		});
	}
};

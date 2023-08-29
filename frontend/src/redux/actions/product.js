import axios from "axios";
import { server } from "../../server";

//load products

export const getAllProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: "getAllProductsRequest",
		});
		const { data } = await axios.get(`${server}/product/all-products`, {
			// withCredentials: true,
		});
		console.log(data, "this is the data");
		dispatch({
			type: "getAllProductsSuccess",
			payload: data.allProducts,
		});
	} catch (error) {
		dispatch({
			type: "getAllProductsFailed",
			payload: error.response.data.message,
		});
	}
};

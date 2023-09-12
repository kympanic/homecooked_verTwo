import axios from "axios";
import { server } from "../../server";

//load ALL products

export const getAllProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: "getAllProductsRequest",
		});
		const { data } = await axios.get(`${server}/product/all-products`, {
			// withCredentials: true,
		});
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

//get all products form shop
export const getAllProductsShop = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "getAllProductsShopRequest",
		});
		const { data } = await axios.get(
			`${server}/product/all-products/shop/${id}`
		);
		dispatch({
			type: "getAllProductsShopSuccess",
			payload: data.products,
		});
	} catch (error) {
		dispatch({
			type: "getAllProductsShopFail",
			payload: error.response.data.message,
		});
	}
};

//create product
export const createProduct = (newForm) => async (dispatch) => {
	try {
		dispatch({
			type: "productCreateRequest",
		});
		const config = { headers: { "Content-Type": "multipart/form-data" } };
		const { data } = await axios.post(
			`${server}/product/create-product`,
			newForm,
			config
		);

		dispatch({
			type: "productCreateSuccess",
			payload: data.product,
		});
	} catch (error) {
		dispatch({
			type: "productCreateFail",
			payload: error.response.data.message,
		});
	}
};

//delete product
export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "deleteProductRequest",
		});
		const { data } = await axios.delete(
			`${server}/product//delete-product/${id}`,
			{ withCredentials: true }
		);
		dispatch({
			type: "deleteProductSuccess",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "deleteProductFail",
			payload: error.response.data.message,
		});
	}
};

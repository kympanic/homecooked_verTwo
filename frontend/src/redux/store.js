import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { productReducer } from "./reducers/product";
import { shopReducer } from "./reducers/shop";
const Store = configureStore({
	reducer: {
		user: userReducer,
		products: productReducer,
		shop: shopReducer,
	},
});

export default Store;

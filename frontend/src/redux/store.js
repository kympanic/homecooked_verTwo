import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { productReducer } from "./reducers/product";
import { shopReducer } from "./reducers/shop";
import { cartReducer } from "./reducers/cart";
// import { favoritesReducer } from "./reducers/favorites";
import { orderReducer } from "./reducers/order";

const Store = configureStore({
	reducer: {
		user: userReducer,
		products: productReducer,
		shop: shopReducer,
		cart: cartReducer,
		// favorites: favoritesReducer,
		orders: orderReducer,
	},
});

export default Store;

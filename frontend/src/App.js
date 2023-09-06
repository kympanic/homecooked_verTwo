import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { loadShop } from "./redux/actions/shop";
import {
	ActivationPage,
	BestSellingPage,
	CheckoutPage,
	EventsPage,
	FaqPage,
	HomePage,
	LoginPage,
	ProductDetailsPage,
	ProductsPage,
	ProfilePage,
	SellerActivationPage,
	ShopCreatePage,
	ShopHomePage,
	ShopLoginPage,
	ShopDashboardPage,
	SignupPage,
} from "./pages";
import UserProtectedRoute from "./protectedRoutes/UserProtectedRoute";
import SellerProtectedRoute from "./protectedRoutes/SellerProtectedRoute";

function App() {
	useEffect(() => {
		Store.dispatch(loadUser());
		Store.dispatch(loadShop());
		Store.dispatch(getAllProducts());
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/sign-up" element={<SignupPage />} />
				<Route
					path="/activation/:activation_token"
					element={<ActivationPage />}
				/>
				<Route
					path="/seller/activation/:activation_token"
					element={<SellerActivationPage />}
				/>
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/product/:name" element={<ProductDetailsPage />} />
				<Route path="/best-selling" element={<BestSellingPage />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/faq" element={<FaqPage />} />
				<Route
					path="/profile"
					element={
						<UserProtectedRoute>
							<ProfilePage />
						</UserProtectedRoute>
					}
				/>
				<Route
					path="/checkout"
					element={
						<UserProtectedRoute>
							<CheckoutPage />
						</UserProtectedRoute>
					}
				/>
				{/* Shop Routes */}
				<Route path="/shop-create" element={<ShopCreatePage />} />
				<Route path="/shop-login" element={<ShopLoginPage />} />
				<Route
					path="/shop/:id"
					element={
						<SellerProtectedRoute>
							<ShopHomePage />
						</SellerProtectedRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<SellerProtectedRoute>
							<ShopDashboardPage />
						</SellerProtectedRoute>
					}
				/>
			</Routes>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</BrowserRouter>
	);
}

export default App;

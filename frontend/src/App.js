import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect, useState } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
// import { getAllProducts } from "./redux/actions/product";
import { loadShop } from "./redux/actions/shop";
import {
	ActivationPage,
	BestSellingPage,
	CheckoutPage,
	EventsPage,
	FaqPage,
	HomePage,
	LoginPage,
	PaymentPage,
	ProductDetailsPage,
	ProductsPage,
	ProfilePage,
	SellerActivationPage,
	ShopCreatePage,
	ShopHomePage,
	ShopLoginPage,
	ShopDashboardPage,
	SignupPage,
	OrderSuccessPage,
	ShopOrderDetailsPage,
} from "./pages";
import UserProtectedRoute from "./protectedRoutes/UserProtectedRoute";
import SellerProtectedRoute from "./protectedRoutes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
	const [stripeApiKey, setStripeApiKey] = useState("");

	const getStripeApiKey = async () => {
		const { data } = await axios.get(`${server}/payment/stripeapikey`);
		setStripeApiKey(data?.stripeApiKey);
	};

	useEffect(() => {
		Store.dispatch(loadUser());
		Store.dispatch(loadShop());
		Store.dispatch(getAllProducts());
		getStripeApiKey();
	}, []);

	return (
		<BrowserRouter>
			{stripeApiKey && (
				<Elements stripe={loadStripe(stripeApiKey)}>
					<Routes>
						<Route
							path="/payment"
							element={
								<UserProtectedRoute>
									<PaymentPage />
								</UserProtectedRoute>
							}
						/>
					</Routes>
				</Elements>
			)}
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
				<Route path="/product/:id" element={<ProductDetailsPage />} />
				<Route path="/best-selling" element={<BestSellingPage />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/faq" element={<FaqPage />} />
				<Route path="/order/success" element={<OrderSuccessPage />} />
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
				<Route path="/shop/:id" element={<ShopHomePage />} />
				<Route
					path="/dashboard"
					element={
						<SellerProtectedRoute>
							<ShopDashboardPage />
						</SellerProtectedRoute>
					}
				/>
				<Route
					path="/order/:id"
					element={
						<SellerProtectedRoute>
							<ShopOrderDetailsPage />
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

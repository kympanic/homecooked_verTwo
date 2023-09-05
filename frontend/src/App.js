import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { useSelector } from "react-redux";
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
	SignupPage,
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";
import SellerProtectedRoute from "./SellerProtectedRoute";
function App() {
	const { loading, isAuthenticated } = useSelector((state) => state.user);
	const { isLoading, isSeller } = useSelector((state) => state.shop);

	useEffect(() => {
		Store.dispatch(loadUser());
		Store.dispatch(loadShop());
		Store.dispatch(getAllProducts());
	}, []);

	return (
		<>
			{loading || isLoading ? null : (
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
						<Route
							path="/product/:name"
							element={<ProductDetailsPage />}
						/>
						<Route
							path="/best-selling"
							element={<BestSellingPage />}
						/>
						<Route path="/events" element={<EventsPage />} />
						<Route path="/faq" element={<FaqPage />} />
						<Route
							path="/profile"
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
								>
									<ProfilePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/checkout"
							element={
								<ProtectedRoute
									isAuthenticated={isAuthenticated}
								>
									<CheckoutPage />
								</ProtectedRoute>
							}
						/>
						{/* Shop Routes */}
						<Route
							path="/shop-create"
							element={<ShopCreatePage />}
						/>
						<Route path="/shop-login" element={<ShopLoginPage />} />
						<Route
							path="/shop/:id"
							element={
								<SellerProtectedRoute>
									<ShopHomePage isSeller={isSeller} />
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
			)}
		</>
	);
}

export default App;

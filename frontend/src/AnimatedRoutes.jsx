import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
	LoginPage,
	SignupPage,
	ActivationPage,
	HomePage,
	ProductsPage,
	EventsPage,
	BestSellingPage,
	FaqPage,
	ProductDetailsPage,
	ProfilePage,
	CheckoutPage,
	ShopCreatePage,
	SellerActivationPage,
	ShopLoginPage,
	ShopHomePage,
} from "./pages";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Layout/Header";
import { ProtectedRoute, SellerProtectedRoute } from "./ProtectedRoute";
const AnimatedRoutes = ({ isAuthenticated }) => {
	//We can only use useLocation in components that are inside of the Router Wrap.
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		
			<AnimatePresence>
				<Routes location={location} key={currentPath}>
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
					<Route path="/best-selling" element={<BestSellingPage />} />
					<Route path="/events" element={<EventsPage />} />
					<Route path="/faq" element={<FaqPage />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/checkout"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<CheckoutPage />
							</ProtectedRoute>
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
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default AnimatedRoutes;

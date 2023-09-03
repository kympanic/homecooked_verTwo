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
} from "../pages";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/sign-up" element={<SignupPage />} />
				<Route
					path="/activation/:activation_token"
					element={<ActivationPage />}
				/>
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/product/:name" element={<ProductDetailsPage />} />

				<Route path="/best-selling" element={<BestSellingPage />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/faq" element={<FaqPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;

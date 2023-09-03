import { BrowserRouter, Route, Routes } from "react-router-dom";
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
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { useSelector } from "react-redux";

function App() {
	const { loading } = useSelector((state) => state.user);

	useEffect(() => {
		Store.dispatch(loadUser());
		Store.dispatch(getAllProducts());
	}, []);
	return (
		<>
			{loading ? null : (
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/sign-up" element={<SignupPage />} />
						<Route
							path="/activation/:activation_token"
							element={<ActivationPage />}
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
						<Route path="/profile" element={<ProfilePage />} />
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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage, HomePage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

function App() {
	useEffect(() => {
		Store.dispatch(loadUser());
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

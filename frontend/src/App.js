import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from "./pages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server";

function App() {
	useEffect(() => {
		axios
			.get(`${server}/user/get-user`, { withCredentials: true })
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.response?.data?.message);
			});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
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

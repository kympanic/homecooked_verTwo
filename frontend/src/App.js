import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { useSelector } from "react-redux";
import AnimatedRoutes from "./components/AnimatedRoutes";

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
					<AnimatedRoutes />
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

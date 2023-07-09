import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage } from "./pages";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/sign-up" element={<SignupPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

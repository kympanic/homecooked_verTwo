import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";

const LoginPage = () => {
	const { isAuthenticated } = useSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, []);
	return (
		<div>
			<Login />
		</div>
	);
};

export default LoginPage;

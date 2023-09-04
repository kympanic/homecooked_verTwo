import { useEffect } from "react";
import { Login } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

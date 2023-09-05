import { useSelector } from "react-redux";
import Signup from "../components/Auth/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupPage = () => {
	const { isAuthenticated } = useSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, []);
	return (
		<div>
			<Signup />
		</div>
	);
};

export default SignupPage;

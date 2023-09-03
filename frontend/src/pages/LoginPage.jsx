import { useEffect } from "react";
import { Login } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
	const { isAuthenticated } = useSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Login />
		</motion.div>
	);
};

export default LoginPage;

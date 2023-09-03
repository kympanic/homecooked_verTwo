import { useSelector } from "react-redux";
import { Signup } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const SignupPage = () => {
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
			<Signup />
		</motion.div>
	);
};

export default SignupPage;

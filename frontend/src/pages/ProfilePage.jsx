import React, { useState } from "react";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";
import { motion } from "framer-motion";

const ProfilePage = () => {
	const [active, setActive] = useState(0);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div
				className={`${styles.section} flex bg-[#f5f5f5] py-10 items-center 800px:items-start`}
			>
				<div className="w-[50px] 800px:w-[335px] sticky">
					<ProfileSideBar active={active} setActive={setActive} />
				</div>
				<ProfileContent active={active} />
			</div>
		</motion.div>
	);
};

export default ProfilePage;

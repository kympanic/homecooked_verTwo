import React, { useState } from "react";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";
import Header from "../components/Layout/Header";

const ProfilePage = () => {
	const [active, setActive] = useState(0);
	return (
		<div>
			<Header />
			<div
				className={`${styles.section} flex bg-[#f5f5f5] py-10 items-center 800px:items-start`}
			>
				<div className="w-[50px] 800px:w-[335px] sticky">
					<ProfileSideBar active={active} setActive={setActive} />
				</div>
				<ProfileContent active={active} />
			</div>
		</div>
	);
};

export default ProfilePage;

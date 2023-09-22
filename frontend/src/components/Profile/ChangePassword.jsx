import React, { useState } from "react";
import styles from "../../styles/styles";
import {
	AiOutlineDelete,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visible, setVisible] = useState(false);

	const handleUpdate = async (e) => {
		e.preventDefault();

		await axios
			.put(
				`${server}/user/update-password`,
				{ oldPassword, newPassword, confirmPassword },
				{ withCredentials: true }
			)
			.then((res) => {
				toast.success("Password changed successfully!");
				setOldPassword("");
				setNewPassword("");
				setConfirmPassword("");
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	};
	return (
		<div className="w-full px-5 ">
			<div className="flex justify-center items-center">
				<h1 className="block text-center text-[25px] font-[600] text-[#000000ba]">
					Change Password
				</h1>
				{visible ? (
					<AiOutlineEye
						className="cursor-pointer ml-2"
						size={25}
						onClick={() => setVisible(false)}
					/>
				) : (
					<AiOutlineEyeInvisible
						className="cursor-pointer ml-2"
						size={25}
						onClick={() => setVisible(true)}
					/>
				)}
			</div>

			<div className="w-full">
				<form className="flex flex-col items-center">
					<div className=" w-[100%] 800px:w-[50%] mt-5">
						<label className="block pb-2">Current Password</label>
						<input
							type={visible ? "text" : "password"}
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
						/>
					</div>
					<div className=" w-[100%] 800px:w-[50%] mt-2">
						<label className="block pb-2">New Password</label>
						<input
							type={visible ? "text" : "password"}
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<div className=" w-[100%] 800px:w-[50%] mt-2">
						<label className="block pb-2">Confirm Password</label>
						<input
							type={visible ? "text" : "password"}
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<div className="flex justify-center pt-10">
							<button
								className={`${styles.button}`}
								onClick={handleUpdate}
							>
								<span className="text-white">Update</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;

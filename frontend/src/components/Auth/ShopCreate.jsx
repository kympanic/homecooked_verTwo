import { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopCreate = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState();
	const [avatar, setAvatar] = useState(null);
	const [password, setPassword] = useState("");
	const [visible, setVisible] = useState(false);

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		setAvatar(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = { headers: { "Content-type": "multipart/form-data" } };

		const newForm = new FormData();
		newForm.append("file", avatar);
		newForm.append("name", name);
		newForm.append("email", email);
		newForm.append("password", password);
		newForm.append("phoneNumber", phone);
		newForm.append("zipCode", phone);
		newForm.append("address", phone);

		axios
			.post(`${server}/shop/create-shop`, newForm, config)
			.then((res) => {
				toast.success(res.data.message);
				setName("");
				setEmail("");
				setPassword("");
				setAvatar();
				setAddress("");
				setZipCode();
				setPhone();
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Register your Shop
				</h2>
			</div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Shop Name
							</label>
							<div className="mt-1">
								<input
									type="name"
									name="name"
									autoComplete="name"
									required
									value={name}
									placeholder="Shop Name"
									onChange={(e) => setName(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email Address
							</label>
							<div className="mt-1">
								<input
									type="email"
									name="email"
									autoComplete="email"
									required
									value={email}
									placeholder="example@gmail.com"
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700"
							>
								Phone Number
							</label>
							<div className="mt-1">
								<input
									type="tel"
									name="phone"
									autoComplete="phone"
									required
									value={phone}
									placeholder="2159219999"
									onChange={(e) => setPhone(e.target.value)}
									maxLength={10}
									onKeyPress={(event) => {
										if (!/[0-9]/.test(event.key)) {
											event.preventDefault();
										}
									}}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="address"
								className="block text-sm font-medium text-gray-700"
							>
								Address
							</label>
							<div className="mt-1">
								<input
									type="address"
									name="address"
									required
									value={address}
									placeholder="1234 Chocolate Way, Delicious Park CA"
									onChange={(e) => setAddress(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="zipcode"
								className="block text-sm font-medium text-gray-700"
							>
								Zipcode
							</label>
							<div className="mt-1">
								<input
									type="number"
									name="zipcode"
									required
									value={zipCode}
									placeholder="12345"
									onChange={(e) => setZipCode(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1 relative">
								<input
									type={visible ? "text" : "password"}
									name="password"
									autoComplete="current-password"
									required
									value={password}
									placeholder="your password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								/>
								{visible ? (
									<AiOutlineEye
										className="absolute right-2 top-2 cursor-pointer"
										size={25}
										onClick={() => setVisible(false)}
									/>
								) : (
									<AiOutlineEyeInvisible
										className="absolute right-2 top-2 cursor-pointer"
										size={25}
										onClick={() => setVisible(true)}
									/>
								)}
							</div>
						</div>
						<div>
							<label
								htmlFor="avatar"
								className="block text-sm font-medium text-gray-700"
							></label>
							<div className="mt-2 flex items-center">
								<span className="inline-block h-8 w-8 rounded-full overflow-hidden">
									{avatar ? (
										<img
											src={URL.createObjectURL(avatar)}
											alt="avatar"
											className="h-full w-full object-cover rounded-full"
										/>
									) : (
										<RxAvatar className="h-8 w-8" />
									)}
								</span>
								<label
									htmlFor="file-input"
									className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:cursor-pointer"
								>
									<span>Upload a file</span>
									<input
										type="file"
										name="avatar"
										id="file-input"
										accept=".jpg,.jpeg,.png"
										onChange={handleFileInputChange}
										className="sr-only"
									/>
								</label>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
							>
								Submit
							</button>
						</div>
						<div className={`${styles.normalFlex} w-full`}>
							<h4>Already have an account?</h4>
							<Link
								to="/shop-login"
								className="text-blue-600 hover:text-blue-500 pl-2"
							>
								Sign in
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ShopCreate;

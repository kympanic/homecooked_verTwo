import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const CreateProduct = () => {
	const { seller } = useSelector((state) => state.shop);
	const { success, error } = useSelector((state) => state.products);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [images, setImages] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (success) {
			toast.success("Product created successfully");
			navigate(`/dashboard`);
			window.location.reload();
		}
	}, [dispatch, success, error]);

	const handleImageChange = (e) => {
		e.preventDefault();

		let files = Array.from(e.target.files);
		setImages((prevImages) => [...prevImages, ...files]);
	};

	const removeImage = (indexToRemove) => {
		setImages((prevImages) =>
			prevImages.filter((_, index) => index !== indexToRemove)
		);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const newForm = new FormData();

		images.forEach((image) => {
			newForm.append("images", image);
		});

		if (images.length === 0) {
			toast.error("Please add at least one image");
		} else if (images.length > 4) {
			toast.error("Maximum of 4 images allowed");
		} else {
			newForm.append("name", name);
			newForm.append("description", description);
			newForm.append("category", category);
			newForm.append("price", price);
			newForm.append("stock", stock);
			newForm.append("shopId", seller._id);
			dispatch(createProduct(newForm));
		}
	};
	return (
		<div className="flex justify-center w-[90%] 800px:w-[50%] h-full bg-white p-2 overflow-y-auto ">
			<div className="w-[90%] 800px:w-[85%] 800px:mr-[10px]  h-[80vh] rounded-[4px] justify-center p-3 ">
				<h5 className="text-[30px] text-center font-Poppins">
					Create Product
				</h5>
				<div className="flex flex-initial w-full">
					<form onSubmit={handleSubmit} className="w-full">
						<br />
						<div className="w-full  mb-3">
							<label className="pb-[10px] pt-2">
								Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="name"
								value={name}
								className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter your product name..."
								required
							/>
						</div>
						<div className="w-full ">
							<label className="pb-2">
								Description{" "}
								<span className="text-red-500">*</span>
							</label>
							<textarea
								type="text"
								required
								name="description"
								value={description}
								className="mt-2 appearance-none block w-full
								px-3 h-[300px] border border-gray-300
								rounded-[3px] placeholder-gray-400
								focus:outline-none focus:ring-blue-500
								focus:border-blue-500 sm:text-sm resize-none"
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Ingredients,taste, preparation, etc..."
							>
								{description}
							</textarea>
						</div>

						<select
							className="w-full mt-2 border h-[35px] rounded-[5px] mb-3"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value="">Category</option>
							{categoriesData &&
								categoriesData.map((i) => (
									<option value={i.title} key={i.title}>
										{i.title}
									</option>
								))}
						</select>
						<div className="w-full  mb-3">
							<label className="pb-[10px] pt-2">
								Price <span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								name="price"
								value={price}
								className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								onChange={(e) => setPrice(e.target.value)}
								placeholder="Enter your product price..."
								required
							/>
						</div>
						<div className="w-full  mb-3">
							<label className="pb-[10px] pt-2">
								Product Stock
								<span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								name="productStock"
								value={stock}
								className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								onChange={(e) => setStock(e.target.value)}
								placeholder="Enter your product price..."
								required
							/>
						</div>
						<div className="w-full  mb-3">
							<label className="pb-[10px] pt-2">
								Upload Images
								<span className="text-red-500">*</span>
							</label>
							<input
								type="file"
								id="upload"
								name="image"
								className="hidden"
								multiple
								onChange={handleImageChange}
								placeholder="Enter your product price..."
								required
							/>
							<div className="w-full flex items-center flex-wrap">
								{images.length >= 4 ? null : (
									<label htmlFor="upload">
										<AiOutlinePlusCircle
											size={30}
											className="mt-3 cursor-pointer"
											color="#555"
										/>
									</label>
								)}

								{images &&
									images.map((i, index) => (
										<div className="relative m-2">
											<img
												src={URL.createObjectURL(i)}
												key={index}
												alt=""
												className="h-[120px] w-[120px] object-cover m-2 flex"
											/>
											<button
												className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
												onClick={() =>
													removeImage(index)
												}
											>
												<RxCross1
													size={12}
													color="white"
												/>
											</button>
										</div>
									))}
							</div>
							<br />
							<div>
								<button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;

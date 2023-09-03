import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown, dropDown }) => {
	const navigate = useNavigate();
	const handleSubmit = (i) => {
		navigate(`/products?category=${i.title}`);
		setDropDown(false);
	};

	return (
		<div className="pb-4 w-[200px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
			{categoriesData &&
				categoriesData.map((i, index) => {
					return (
						<div
							key={index}
							className={`${styles.normalFlex} hover:bg-gray-200 `}
							onClick={() => handleSubmit(i)}
						>
							<img
								src={i.image_Url}
								className="w-6 h-6 object-contain ml-2 select-none"
								alt=""
							/>
							<h3 className="m-3 cursor-pointer select-none">
								{i.title}
							</h3>
						</div>
					);
				})}
		</div>
	);
};

export default DropDown;

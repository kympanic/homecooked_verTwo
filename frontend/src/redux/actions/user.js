import axios from "axios";
import { server } from "../../server";

//load user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({
			type: "LoadUserRequest",
		});
		const { data } = await axios.get(`${server}/user/get-user`, {
			withCredentials: true,
		});
		dispatch({
			type: "LoadUserSuccess",
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: "LoadUserFail",
			payload: error.response.data.message,
		});
	}
};

//update user information
export const updateUserInfo =
	(email, password, phoneNumber, name) => async (dispatch) => {
		try {
			dispatch({
				type: "UpdateUserInfoRequest",
			});
			const { data } = await axios.put(
				`${server}/user/update-user`,
				{
					email,
					password,
					phoneNumber,
					name,
				},
				{
					withCredentials: true,
				}
			);
			dispatch({
				type: "UpdateUserInfoSuccess",
				payload: data.user,
			});
		} catch (error) {
			dispatch({
				type: "UpdateUserInfoFail",
				payload: error.response.data.message,
			});
		}
	};

//update user address
export const updateUserAddress =
	(state, city, address1, address2, zipCode, addressType) =>
	async (dispatch) => {
		try {
			dispatch({
				type: "UpdateUserAddressRequest",
			});
			const { data } = await axios.put(
				`${server}/user/update-address`,
				{
					state,
					city,
					address1,
					address2,
					zipCode,
					addressType,
				},
				{ withCredentials: true }
			);
			dispatch({
				type: "UpdateUserAddressSuccess",
				payload: data.user,
			});
		} catch (error) {
			dispatch({
				type: "UpdateUserAddressFail",
				payload: error.response.data.message,
			});
		}
	};

//add user favorites
export const addUserFavorite = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "AddUserFavorite",
		});
		const { data } = await axios.post(
			`${server}/user/add-favorite`,
			{
				id,
			},
			{ withCredentials: true }
		);
		dispatch({
			type: "AddUserFavoriteSuccess",
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: "AddUserFavoriteFail",
			payload: error.response.data.message,
		});
	}
};

//remove from favorites
export const deleteUserFavorite = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "DeleteUserFavoriteRequest",
		});

		const { data } = await axios.delete(
			`${server}/user/delete-favorite/${id}`,
			{ withCredentials: true }
		);
		dispatch({
			type: "DeleteUserFavoriteSuccess",
			payload: {
				successMessage: "Favorite removed successfully!",
				user: data.user,
			},
		});
	} catch (error) {
		dispatch({
			type: "DeleteUserFavoriteFail",
			payload: error.response.data.message,
		});
	}
};

//delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "DeleteUserAddressRequest",
		});

		const { data } = await axios.delete(
			`${server}/user/delete-address/${id}`,
			{ withCredentials: true }
		);
		dispatch({
			type: "deleteUserAddressSuccess",
			payload: {
				successMessage: "User deleted successfully!",
				user: data.user,
			},
		});
	} catch (error) {
		dispatch({
			type: "DeleteUserAddressFail",
			payload: error.response.data.message,
		});
	}
};

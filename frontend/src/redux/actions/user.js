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

//update user
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

import Axios from "../../Components/Axios/Axios";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    if (localStorage.getItem("refreshToken")) {
      const { data } = await Axios.post("/user/refreshtoken", {
        token: localStorage.getItem("refreshToken"),
      });
      dispatch({
        type: "loadUserSuccess",
        payload: data.user,
      });
    } else {
      dispatch({
        type: "loadUserFail",
        payload: "No user found",
      });
    }
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    const { data } = await Axios.get(`/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

export const loadSingleUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "singleUserRequest",
    });
    const { data } = await Axios.get(`/user/profile/singleUser/${username}`);
    dispatch({
      type: "singleUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "singleUserFail",
      payload: error.response.data.message,
    });
  }
};

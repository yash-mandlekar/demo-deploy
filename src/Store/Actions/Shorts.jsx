import Axios from "../../Components/Axios/Axios";

export const loadShorts = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadShortsRequest",
    });
    const res = await Axios.get("/all/shorts", {
      withCredentials: true,
    });
    dispatch({
      type: "loadShortsSuccess",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "loadShortsFail",
      payload: error.response.data.message,
    });
  }
};

export const loadShort = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "loadShortRequest",
    });
    const res = await Axios.get(`/shorts/${id}`);
    dispatch({
      type: "loadShortSuccess",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "loadShortFail",
      payload: error.response.data.message,
    });
  }
};

export const likeShort = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeShortRequest",
    });
    const res = await Axios.get(`/user/shorts/like/${id}`, {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    });
    dispatch({
      type: "likeShortSuccess",
      payload: res.data.short,
    });
  } catch (error) {
    dispatch({
      type: "likeShortFail",
      payload: error.response.data.message,
    });
  }
};

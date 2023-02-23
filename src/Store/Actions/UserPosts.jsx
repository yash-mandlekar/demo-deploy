import Axios from "../../Components/Axios/Axios";
const config = {
  headers: {
    token: localStorage.getItem("accessToken"),
  },
};
export const loadPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadPostsRequest",
    });

    const { data } = await Axios.get("/user/post", config);
    dispatch({
      type: "loadPostsSuccess",
      payload: data.user.posts,
    });
  } catch (error) {
    dispatch({
      type: "loadPostsFail",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });
    await Axios.delete(`/user/post/${id}`, config);
    dispatch({
      type: "deletePostSuccess",
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFail",
      payload: error.response.data.message,
    });
  }
};

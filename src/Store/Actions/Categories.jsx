import Axios from "../../Components/Axios/Axios";

export const loadCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadCategoriesRequest",
    });
    var Categories = [];
    const lang = localStorage.getItem("language");
    const { data } = await Axios.get("/news-category", {
      withCredentials: true,
    });
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      const res2 = await Axios.post("/user/translate", {
        text: data[i].hindiName,
        target: lang,
      });
      Categories.push({
        ...data[i],
        hindiName: res2.data.translation,
        share: res2.data.translation5,
      });
    }
    dispatch({
      type: "loadCategoriesSuccess",
      payload: Categories,
    });
  } catch (error) {
    dispatch({
      type: "loadCategoriesFail",
      payload: error.response.data.message,
    });
  }
};

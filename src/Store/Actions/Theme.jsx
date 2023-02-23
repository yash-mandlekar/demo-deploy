export const changeTheme = (theme) => async (dispatch) => {
  dispatch({
    type: "changeThemeSuccess",
    payload: theme === "light" ? "dark" : "light",
  });
};

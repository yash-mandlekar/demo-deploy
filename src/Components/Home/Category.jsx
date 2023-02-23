import { createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { filterNews } from "../../Store/Actions/News";
const Category = () => {
  const { theme, categories } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleData = async (e) => {
    navigate("/" + e);
    dispatch(filterNews(e));
  };
  function Carder() {
    return createElement(
      "div",
      { className: "carder" },
      createElement(
        "ul",
        null,
        createElement(
          "li",
          null,
          createElement("div", {
            className: "carderLogo",
          }),
          createElement("div", {
            className: "carderTitle",
          })
        )
      )
    );
  }
  return (
    <div className={`catagory ${theme.theme === "light" ? "light" : "dark"}`}>
      {categories.loading ? (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((e, i) => (
            <Carder key={i} />
          ))}
        </>
      ) : (
        categories.categories.map((category, i) => (
          <div
            key={i}
            className="catagoryItem"
            onClick={() => handleData(category.categoryUrl)}
          >
            <ul>
              <li>
                {category.icon && (
                  <img
                    src={`data:image/png;base64,${category.icon}`}
                    className="CatgoryLogo"
                  />
                )}
                {category.hindiName}
              </li>
            </ul>
          </div>
        ))
      )}
      <Link to="/feedback">
        <div className="feedback">
          <h1>फीडबैक दें</h1>
        </div>
      </Link>
    </div>
  );
};

export default Category;

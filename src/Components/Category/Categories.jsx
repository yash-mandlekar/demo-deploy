import Debate from "../Home/Debate";
import Category from "../Home/Category";
import News from "../Home/Livenews";
import { useSelector } from "react-redux";

const Categories = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      <div
        className="d-flex mt-5"
        style={{
          backgroundColor: `${theme === "light" ? "white" : "black"}`,
          color: `${theme === "light" ? "black" : "white"}`,
          height: "100vh",
        }}
      >
        <Category />
        <Debate show={false} />
        <News />
      </div>
    </>
  );
};

export default Categories;

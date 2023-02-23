import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../images/logo.png";
import Darklogo from "../images/darklogo.png";
import Playstorelogo from "../images/playstore.png";
import Applestorelogo from "../images/lolobg.png";
import { Link } from "react-router-dom";
import Axios from "../Axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Store/Actions/Theme";
import { loadUser } from "../../Store/Actions/User";
const Navbar = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { user, loading } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const handleNavItems = async () => {
    const lang2 = localStorage.getItem("language");
    const cpy = [];
    for (var i = 0; i < navItems.length; i++) {
      const res2 = await Axios.post("/user/translate", {
        text: navItems[i].title,
        target: lang2,
      });
      cpy.push({
        ...navItems[i],
        title: res2.data.translation,
        path: navItems[i].path,
        icon: navItems[i].icon,
      });
    }
    setNavItems(cpy);
  };
  useEffect(() => {
    handleNavItems();
    setNavItems([
      {
        title: "भाषा",
        path: "/Language",
        icon: "bi bi-translate",
      },
      {
        title: "वीडियो",
        path: "/video",
        icon: "bi bi-play-circle",
      },
      {
        title: "ई-पेपर",
        path: "/Epaper",
        icon: "bi bi-newspaper",
      },
      {
        title: "लॉग इन करें",
        path: "/Login",
        icon: "bi bi-box-arrow-in-right",
      },
      {
        title: "उपयोगकर्ता",
        path: `/User/${user?.userName}`,
        icon: "bi bi-person",
      },
    ]);
  }, [loading, user, theme]);
  return (
    <div className={`Navbar ${theme === "light" ? "" : "Navbar-dark"}`}>
      <span className="nav-logo">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={theme === "dark" ? Darklogo : Logo} alt="" />
        </Link>
      </span>

      <div
        className={`nav-items ${isOpen && "open"} ${
          theme === "light" ? "" : "Navbar-dark"
        }`}
      >
        {navItems.map((item, i) => (
          <Link key={i} to={item.path} onClick={() => setIsOpen(false)}>
            <i className={item.icon}></i>
            {item.title}
          </Link>
        ))}

        <a
          onClick={() => dispatch(changeTheme(theme))}
          className={`${theme === "dark" ? "Navbar-dark" : ""}`}
        >
          {theme === "light" ? (
            <>
              <i className="bi bi-moon"></i>
            </>
          ) : (
            <>
              <i className="bi bi-brightness-high"></i>
            </>
          )}
        </a>

        {/* <div className="playstore">
          <img src={Playstorelogo} alt="" />
        </div>
        <div className="applestore">
          <img src={Applestorelogo} alt="" />
        </div> */}
        <div className="followus">
          <h1>Follow us on</h1>
          <div className="sociali">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-youtube"></i>
          </div>
        </div>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;

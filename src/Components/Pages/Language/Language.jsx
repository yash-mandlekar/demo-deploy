import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Language.css";
import { loadCategories } from "../../../Store/Actions/Categories";
const Language = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [language, setLanguage] = useState([
    { lang1: "Hindi", lang2: "Hindi", code: "hi" },
    { lang1: "Arabic", lang2: "Arabic", code: "ar" },
    { lang1: "भोजपुरी", lang2: "Bhojpuri", code: "bh" },
    { lang1: "Bengali", lang2: "Bengali", code: "bn" },
    { lang1: "English (US)", lang2: "English (US)", code: "en" },
    { lang1: "English (UK)", lang2: "English (UK)", code: "en-GB" },
    { lang1: "French", lang2: "French", code: "fr" },
    { lang1: "ગુજરાતી", lang2: "Gujrati", code: "gu" },
    { lang1: "Kannada", lang2: "Kannada", code: "kn" },
    { lang1: "Korean", lang2: "Korean", code: "ko" },
    { lang1: "Malayalam", lang2: "Malayalam", code: "ml" },
    { lang1: "Marathi", lang2: "Marathi", code: "mr" },
    { lang1: "ଓଡିଆ", lang2: "Odia", code: "or" },
    { lang1: "ਪੰਜਾਬੀ", lang2: "Punjabi", code: "pa" },
    { lang1: "Sindhi", lang2: "Sindhi", code: "sd" },
    { lang1: "Telugu", lang2: "Telugu", code: "te" },
    { lang1: "Thai", lang2: "Thai", code: "th" },
    { lang1: "தமிழ்", lang2: "Tamil", code: "ta" },
    { lang1: "తెలుగు", lang2: "Telugu", code: "te" },
    { lang1: "اردو", lang2: "Urdu", code: "ur" },
  ]);
  const handleLanguage = (code) => {
    localStorage.setItem("language", code);
    dispatch(loadCategories());
  };
  return (
    <>
      <div
        className="Language"
        style={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      >
        <h1>अपनी भाषा चुनें</h1>
        <div className="Language__container">
          {language.map((lang, i) => (
            <button
              key={i}
              className="LCB"
              onClick={() => handleLanguage(lang.code)}
            >
              {/* <Link to="/">{lang.lang1}
              {lang.lang2 && <span>{lang.lang2}</span>}</Link> */}
              <Link to="/">{lang?.lang2}</Link>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Language;

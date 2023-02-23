import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../Axios/Axios";
import "./Singlenews.css";
import Kalua from "../images/add.jpg";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useSelector } from "react-redux";

const SingleNews = () => {
  const { id } = useParams();
  const { theme } = useSelector((state) => state.theme);
  const [NewsData, setNewsData] = useState({});
  useEffect(() => {
    getNews();
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "white" : "black";
    document.body.style.color = theme === "light" ? "black" : "white";
  }, []);
  const getNews = async () => {
    const lang2 = localStorage.getItem("language");
    const res = await Axios.get(`/news/${id}`);
    const res2 = await Axios.post("/user/translate", {
      text: res.data.metaTitle,
      text2: res.data.metaDescription,
      text3: res.data.shortDescription,
      text4: res.data.description,
      text5: "शेयर",
      target: lang2,
    });

    setNewsData({
      ...res.data,
      metaTitle: res2.data.translation,
      metaDescription: res2.data.translation2,
      shortDescription: res2.data.translation3,
      description: res2.data.translation4,
      share: res2.data.translation5,
    });
  };
  return (
    <>
      <div className="newsmain">
        <div className="NewsmainHeading">
          <h2>
            <Link to="/">Home</Link> /
          </h2>
          <h1>{NewsData.metaTitle}</h1>
        </div>
        <div className="singlenewDetailsIcon">
          <div className="singlenewDetailsIconLeft">
            <h1>
              December 02, 2022, Uploaded on : Fri Dec 02 2022 14:36:36 GMT+0530
            </h1>
          </div>
          <div className="singlenewDetailsIconRight">
            <FacebookShareButton url={`http://lokdeshtv.com/news/`}>
              <FacebookIcon size={26} round />
            </FacebookShareButton>

            <TwitterShareButton url={`http://lokdeshtv.com/news/`}>
              <TwitterIcon size={26} round />
            </TwitterShareButton>

            <WhatsappShareButton url={`http://lokdeshtv.com/news/`}>
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
          </div>
        </div>

        <img src={`data:image/jpg;base64,${NewsData.file}`} alt="" />
        <p>{NewsData.shortDescription}</p>
        <div className="singleNewsAddd">
          <img src={Kalua} alt="" />
        </div>
        <p>{NewsData.metaDescription}</p>
        <div dangerouslySetInnerHTML={{ __html: NewsData.description }}></div>
      </div>
      <div className="singleNewsAdd">
        <img src={Kalua} alt="" />
      </div>
    </>
  );
};

export default SingleNews;

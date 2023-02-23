import { DotSpinner } from "@uiball/loaders";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "../../Axios/Axios";
import ReactPlayer from "../../ReactPlayer/ReactPlayer";
import { RWebShare } from "react-web-share";
import "./video.css";
import "./SingleVideo.css";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import { likeShort, loadShort } from "../../../Store/Actions/Shorts";
const SingleVideo = () => {
  const { shorts, auth } = useSelector((state) => state);
  const [likes, setLikes] = useState(shorts.short.likes);
  const [comments, setComments] = useState(shorts.short.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(loadShort(id));
  }, []);
  useEffect(() => {
    setLikes(shorts.short.likes);
    setComments(shorts.short.comments);
  }, [shorts.short.likes, shorts.short.comments]);
  const handleHeart = async () => {
    // dispatch(likeShort(id));
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    if (localStorage.getItem("accessToken")?.length > 25) {
      try {
        const { data } = await Axios.get(`/user/shorts/like/${id}`, config);
        setLikes(data.short.likes);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    if (localStorage.getItem("accessToken")?.length > 25) {
      try {
        const res = await Axios.post(
          `/user/shorts/comment/${id}`,
          { comment: e.target.comment.value },
          config
        );
        setComments(res.data.comments);
        console.log(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  console.log(comments);
  return (
    <div className="SingleVideo">
      <div className="showSingleVideo">
        <div className="showvideoLeft">
          {shorts.loading ? (
            <div className="loader-cnt">
              <DotSpinner size={90} lineWeight={2} speed={0.8} color="white" />
              <h2 style={{ marginTop: "15px" }}>Loading...</h2>
            </div>
          ) : (
            <ReactPlayer
              options={{
                sources: [
                  {
                    src: `data:video/mp4;base64,${shorts.short.file}`,
                    type: "video/mp4",
                  },
                ],
              }}
              className="showvideoLeftt"
            />
          )}
        </div>
        <div className="showvideoRight">
          <div className="showvideoRightTop">
            <div className="showvideoRightTopLeft">
              <img
                src="https://images.unsplash.com/photo-1657299156332-7e1aea73093b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt=""
              />
              <h2 style={{ marginLeft: "10px" }}>लोकदेश</h2>
            </div>
            <div className="showvideoRightTopShare">
              <FacebookShareButton
                url={`http://lokdeshtv.com/SingleVideo/${id}`}
              >
                <FacebookIcon className="fbi" size={27} round />
              </FacebookShareButton>

              <WhatsappShareButton
                url={`http://lokdeshtv.com/SingleVideo/${id}`}
              >
                <WhatsappIcon className="fbi" size={27} round />
              </WhatsappShareButton>
              <div className="allreelSharwee">
                <RWebShare
                  data={{
                    text: "Lokdesh/shots",
                    url: `http://http://lokdeshtv.com/SingleVideo/${id}`,
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <button>
                    <i className="bi bi-cursor"></i>
                  </button>
                </RWebShare>
              </div>
            </div>
          </div>
          <div className="showvideoRightCenter">
            <div className="VideoDesc">
              <h1>
                महाराष्ट्र में मध्यप्रदेश के मजदूरों से भरी ट्रैक्टर-ट्रॉली
                पलटने से 5 की मौत हो गई। इनमें दो बच्चे हैं। मारे गए लोग सेंधवा
                के कोलकी मांग (जिला बड़वानी) के हैं। मृतकों में दो महिलाएं और एक
                युवती भी शामिल है।
              </h1>
            </div>
            {comments?.map((comment, i) => (
              <div className="userComment" key={i}>
                <img
                  className="userprofileComment"
                  src={
                    comment.user?.profileImage?.includes("/avtar")
                      ? comment.user?.profileImage
                      : `data:video/mp4;base64,${comment.user?.profileImage}`
                  }
                />
                <h5
                  style={{
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  @{comment?.user?.name}
                </h5>

                <div className="userCommentText">
                  <h2>{comment?.comment}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="showvideoRightBottom">
            <div className="showvideoRightBottomTop">
              {shorts.loading ? (
                <div className="loader-cnt">
                  <DotSpinner
                    size={15}
                    lineWeight={2}
                    speed={0.8}
                    color="black"
                  />
                </div>
              ) : (
                <div
                  onClick={handleHeart}
                  className="showvideoRightBottomTopLeft"
                >
                  {likes?.includes(auth.user?._id) ? (
                    <i
                      style={{ color: "red" }}
                      className="bi bi-heart-fill"
                    ></i>
                  ) : (
                    <i className="bi bi-heart"> </i>
                  )}
                  <a>{likes?.length} Likes</a>
                </div>
              )}
              <div className="showvideoRightBottomTopLeftTop">
                <a href="">
                  <i className="bi bi-bookmarks"></i>
                </a>
              </div>
            </div>
            <form
              onSubmit={handleComment}
              className="showvideoRightBottomBottom"
            >
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
              />
              <button>send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;

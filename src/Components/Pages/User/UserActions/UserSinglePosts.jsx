import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../../Axios/Axios";
import "./UploadSinglePosts.css";

const UserSinglePosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [Post, setPost] = useState();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    Datapost();
  }, []);

  const Datapost = async () => {
    const { data } = await Axios.get(`/user/post/${id}`);
    console.log(data.post);
    setPost(data.post);
    setLikes(data.post.likes);
    setComments(data.post.comments);
  };
  const handleHeart = async () => {
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    if (localStorage.getItem("accessToken")?.length > 25) {
      try {
        const { data } = await Axios.get(`/user/post/likes/${id}`, config);
        setLikes(data.post.likes);
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
        const { data } = await Axios.post(
          `/user/post/comment`,
          { comment: e.target.comment.value, postId: id },
          config
        );
        console.log(data.comments.comments);
        setComments(data.comments.comments);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="singleVideoBackground">
      <div className="SingleVideo">
        <div className="showSingleVideo">
          <div className="showvideoLeft">
            <img src={`data:image/mp4;base64,${Post?.file}`} alt="" />
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
                <div className="allreelSharwee"></div>
              </div>
            </div>
            <div className="showvideoRightCenter">
              <div className="VideoDesc">
                <h1>{Post?.caption}</h1>
              </div>
              {comments?.map((comment, i) => (
                <div key={i} className="userComment">
                  <div className="userprofileComment">
                    <img
                      src={`data:video/mp4;base64,${comment?.user.profileImage}`}
                      alt=""
                    />
                  </div>
                  <div className="userCommentText">
                    <h2>{comment.comment}</h2>
                  </div>
                </div>
              ))}
            </div>
            <div className="showvideoRightBottom">
              <div className="showvideoRightBottomTop">
                <div
                  onClick={handleHeart}
                  className="showvideoRightBottomTopLeft"
                >
                  {likes?.includes(user?._id) ? (
                    <i style={{ color: "red" }} className="bi bi-heart-fill">
                      {" "}
                    </i>
                  ) : (
                    <i className="bi bi-heart"> </i>
                  )}
                  <a>{likes?.length} Likes</a>
                </div>
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
    </div>
  );
};

export default UserSinglePosts;

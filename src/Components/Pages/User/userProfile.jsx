import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcList, IconName } from "react-icons/fc";
import "./user.css";
import Axios from "../../Axios/Axios";
import { loadSingleUser, loadUser } from "../../../Store/Actions/User";
import { loadPosts, deletePost } from "../../../Store/Actions/UserPosts";

const UserProfile = () => {
  const { username } = useParams();
  const CoverRef = useRef();
  const overLayerRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { singleUser } = useSelector((state) => state);
  const [isLive, setIsLive] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleFollow = async (id) => {
    if (user) {
      const config = {
        headers: {
          token: localStorage.getItem("accessToken"),
        },
      };
      const { data } = await Axios.post(
        "/user/followUnfollow/" + id,
        {},
        config
      );
      if (data.status == "success") {
        dispatch(loadUser());
      }
    } else {
      alert("please login first");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (user) {
      dispatch(loadPosts());
    }
    if (username === "undefined") {
      navigate("/login");
    } else {
      dispatch(loadSingleUser(username));
    }
  }, [loading, username]);
  useEffect(() => {
    setPosts(singleUser?.user?.posts);
  }, [singleUser]);
  const handleProfileImage = async (e) => {
    const formdata = new FormData();
    formdata.append("profileImage", e.target.files[0]);
    const res = await Axios.post("/user/profile/pic", formdata, {
      headers: {
        token: localStorage.getItem("accessToken"),
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status == 200) {
      dispatch(loadUser());
    }
  };
  const handleCoverImage = async (e) => {
    const formdata = new FormData();
    formdata.append("coverImage", e.target.files[0]);
    const res = await Axios.post("/user/cover/pic", formdata, {
      headers: {
        token: localStorage.getItem("accessToken"),
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status == 200) {
      dispatch(loadUser());
    }
  };
  const handleIsLive = async () => {
    const res = await Axios.get(`/user/isLive/${username}`);
    setIsLive(res.data.live);
  };
  const handleHeart = async (id, i) => {
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    if (localStorage.getItem("accessToken")?.length > 25) {
      try {
        const { data } = await Axios.get(`/user/post/likes/${id}`, config);
        const newPosts = [...posts];
        newPosts[i] = data.post;
        setPosts(newPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleIsLive();
    }, 1000);
    return () => clearInterval(interval);
  }, [username]);
  return (
    <>
      <div ref={overLayerRef} className="uploadpostmain">
        <div className="uploadpost1">
          <div className="uploadpost1top">
            <h1>Create post</h1>
          </div>
          <div className="uploadpost1center">
            <div className="img1center">
              <img
                src={
                  singleUser?.user?.profileImage?.includes("/avtar")
                    ? singleUser?.user?.profileImage
                    : `data:video/mp4;base64,${singleUser?.user?.profileImage}`
                }
                alt=""
              />
            </div>
            <textarea
              placeholder="What's on your mind ?"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <input type="file" placeholder="" />
          </div>
          <div className="uploadpost1bottom">
            <button>post</button>
          </div>
        </div>
      </div>
      <div className="profilemain">
        <div className="userProfile">
          <div className="coverphoto">
            <img
              src={
                singleUser?.user?.coverImage?.includes("/avtar")
                  ? singleUser?.user?.coverImage
                  : `data:video/mp4;base64,${singleUser?.user?.coverImage}`
              }
              alt=""
            />
            {singleUser?.user?._id === user?._id && (
              <div
                className="coverphotobutton"
                onClick={() => {
                  CoverRef.current.click();
                }}
              >
                <i className="bi bi-camera-fill"></i>
                <h6>Add Cover Photo</h6>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleCoverImage}
                  style={{ display: "none" }}
                  ref={CoverRef}
                />
              </div>
            )}
          </div>
          <div className="pofilephotodiv">
            <div className="profilephotodivm">
              <div className="profilephoto" title={singleUser?.user?.name}>
                <img
                  src={
                    singleUser?.user?.profileImage?.includes("/avtar")
                      ? singleUser?.user?.profileImage
                      : `data:video/mp4;base64,${singleUser?.user?.profileImage}`
                  }
                  alt=""
                />
                {singleUser?.user?._id === user?._id && (
                  <div
                    title="Change profile photo"
                    className="profileuploadbutton"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <i className="bi bi-camera-fill"></i>
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleProfileImage}
                      style={{ display: "none" }}
                      ref={inputRef}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="profilephototext">
              <h1>{singleUser?.user?.name}</h1>
              <h6>{singleUser?.user?.followers.length} followers</h6>
            </div>
            <div className="addmyprofile">
              {singleUser?.user?._id === user?._id ? (
                <button>
                  <Link to={`/user/editprofile`}>edit profile</Link>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleFollow(singleUser?.user?._id);
                  }}
                  style={{
                    backgroundColor: user?.following.includes(
                      singleUser?.user?._id
                    )
                      ? "white"
                      : "#0099ff",
                  }}
                >
                  {user?.following.includes(singleUser?.user?._id)
                    ? "unfollow"
                    : "follow"}
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="userprofileinfo">
            <div className="userprofileinfoleft">
              <a href="/userwall">Posts</a>
              {singleUser?.user?._id === user?._id ? (
                <Link to={"/myLiveoptions"}>Go Live</Link>
              ) : (
                isLive && <Link to={`/showlive/${username}`}>See Live</Link>
              )}
              <a href="">Friends</a>
              <a href="/usersphotos">Photos</a>
            </div>
            <div className="userprofileinforight">
              <div className="btn-group dropstart">
                <button
                  type="button"
                  className="btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/mynews">
                      स्थानीय समाचार साझा करना
                    </Link>
                    <Link className="dropdown-item" to={"/UserP"}>
                      संपादन करना
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="userBottompost">
          <div className="userBottompostTop">
            <div className="intro">
              <h1>Intro </h1>
              <button>Add Bio</button>
              <h3>
                <i className="bi bi-house-door"></i> &nbsp;lives in Bhopal,
                Madhya Pradesh
              </h3>
              <button>Edit details</button>
              <button> intrest</button>
            </div>
            <div className="photosTop">
              <div className="photosTop1">
                <h1>Photos</h1>
                <a href="">See all</a>
              </div>
              <div className="allphotos">
                {singleUser?.user?.posts?.map(
                  (post, i) =>
                    post?.fileType === "image" && (
                      <div key={i} className="allphotos1">
                        <img
                          className="post__media"
                          src={`data:video/mp4;base64,${post?.file}`}
                          alt="Post Content"
                        />
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="Friends">
              <div className="friends1">
                <h1>Friends</h1>
                <a href="">see all friends</a>
              </div>
              <div className="allfriends">
                {singleUser?.user?.following?.map((user, i) => (
                  <div
                    className="allfriends1"
                    key={i}
                    onClick={() => {
                      navigate(`/user/${user?.userName}`);
                    }}
                    title={user?.userName}
                  >
                    <img
                      src={
                        user?.profileImage?.includes("/avtar")
                          ? user?.profileImage
                          : `data:video/mp4;base64,${user?.profileImage}`
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="userBottompostBottom">
            <div
              onClick={() => (overLayerRef.current.style.display = "flex")}
              className="whatsyoutmind"
            >
              <div className="whatsyoutmindtop">
                <div className="whatsyoutmindtopPhoto">
                  <img
                    src={
                      singleUser?.user?.profileImage?.includes("/avtar")
                        ? singleUser?.user?.profileImage
                        : `data:video/mp4;base64,${singleUser?.user?.profileImage}`
                    }
                    alt=""
                  />
                </div>
                <input type="text" placeholder="whats on your mind ?" />
              </div>
              <div className="whatsyoutmindbottom">
                <h1>
                  <i className="bi bi-camera-video-fill"></i> &nbsp;video
                </h1>
                <h1>
                  <i className="bi bi-images"></i> &nbsp;photo/video
                </h1>
                <h1>
                  <i className="bi bi-emoji-smile"></i> &nbsp;feelings
                </h1>
              </div>
            </div>
            {posts?.map((post, i) => (
              <div key={i} className="myposts">
                <div className="mypostsTop">
                  <div className="mypostsTop1">
                    <img
                      src={
                        singleUser?.user?.profileImage?.includes("/avtar")
                          ? singleUser?.user?.profileImage
                          : `data:video/mp4;base64,${singleUser?.user?.profileImage}`
                      }
                      alt=""
                    />
                  </div>
                  <div className="mypostsTop2">
                    <h1>{singleUser?.user?.userName} </h1>
                    <h5>
                      {new Date(Date.now()).getDate() -
                        new Date(post?.createdAt).getDate() >
                      0
                        ? new Date(Date.now()).getDate() -
                          new Date(post?.createdAt).getDate() +
                          " days ago"
                        : new Date(Date.now()).getHours() -
                            new Date(post?.createdAt).getHours() >
                          0
                        ? new Date(Date.now()).getHours() -
                          new Date(post?.createdAt).getHours() +
                          " hours ago"
                        : new Date(Date.now()).getMinutes() -
                          new Date(post?.createdAt).getMinutes() +
                          " minutes ago"}
                    </h5>
                  </div>
                  <div className="mypostsTop3">
                    <div className="btn-group dropstart">
                      <button
                        type="button"
                        className="btn "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li
                          onClick={() => {
                            dispatch(deletePost(post._id));
                          }}
                        >
                          delete
                        </li>
                        <li>delete again</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mypostsCenter">
                  <div className="mypostsCaption">
                    <h3>{post?.caption}</h3>
                  </div>
                  <div className="mypostsimage">
                    {post?.fileType === "image" && (
                      <img
                        className="post__media"
                        src={`data:video/mp4;base64,${post?.file}`}
                        alt="Post Content"
                      />
                    )}
                    {post?.fileType === "video" && (
                      <video
                        src={`data:video/mp4;base64,${post?.file}`}
                        alt="Post Content"
                        controls
                      />
                    )}
                  </div>
                </div>
                <div className="mypostsBottom">
                  <div className="mypostsBottom1">
                    <h1 onClick={() => handleHeart(post._id, i)}>
                      {post?.likes?.some((like) => like._id === user._id) ? (
                        <i
                          style={{ color: "red" }}
                          className="bi bi-heart-fill"
                        ></i>
                      ) : (
                        <i className="bi bi-heart"></i>
                      )}{" "}
                      {post.likes.length} Like
                    </h1>
                    <h1
                      onClick={() => {
                        navigate(`/singlepost/${post._id}`);
                      }}
                    >
                      <i className="ri-message-line"></i> comment
                    </h1>
                    <h1>
                      <i className="ri-share-forward-line"></i> share
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

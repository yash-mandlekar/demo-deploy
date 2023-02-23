import React, { useEffect, useState } from "react";
import "./userNavbar.css";
import instalogo from "./instaclone.png";
import Lokdeshlogo from "../../../images/logo.png";
import userphoto from "./user.png";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../../Axios/Axios";
import { useSelector } from "react-redux";

const UserNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [posts, setposts] = useState(null);
  const getposts = async () => {
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    const { data } = await Axios.get("/user/feed", config);
    setposts(data.post);
  };
  useEffect(() => {
    getposts();
  }, []);
  const handleHeart = async (id, i) => {
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    if (localStorage.getItem("accessToken")?.length > 25) {
      try {
        const { data } = await Axios.get(`/user/post/likes/${id}`, config);
        setposts((prev) => {
          const newPosts = [...prev];
          newPosts[i].likes = data.post.likes;
          return newPosts;
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  const deletePost = async (id) => {
    console.log(id);
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    try {
      await Axios.delete(`/user/post/${id}`, config);
      setposts((prev) => {
        const newPosts = [...prev];
        const index = newPosts.findIndex((post) => post._id === id);
        newPosts.splice(index, 1);
        return newPosts;
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <main className="main-container">
        <section className="content-container">
          <div className="content">
            <div className="posts">
              {posts?.map((post, i) => (
                <article key={i} className="post">
                  <div className="post__header">
                    <Link
                      to={`/User/${post?.author?.userName}`}
                      className="post__profile"
                    >
                      <div to="/User" className="post__avatar">
                        <img
                          src={
                            post?.author?.profileImage?.includes("/avtar")
                              ? post?.author?.profileImage
                              : `data:video/mp4;base64,${post?.author?.profileImage}`
                          }
                          alt="User Picture"
                        />
                      </div>
                      <div to="/User" className="post__user">
                        {post?.author?.userName}
                      </div>
                    </Link>
                    <button className="post__more-options">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="6.5"
                          cy="11.5"
                          r="1.5"
                          fill="var(--text-dark)"
                        />
                        <circle
                          cx="12"
                          cy="11.5"
                          r="1.5"
                          fill="var(--text-dark)"
                        />
                        <circle
                          cx="17.5"
                          cy="11.5"
                          r="1.5"
                          fill="var(--text-dark)"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="post__content">
                    <div className="post__medias">
                      {post?.fileType === "image" && (
                        <img
                          className="post__media"
                          src={`data:video/mp4;base64,${post?.file}`}
                          alt="Post Content"
                        />
                      )}
                      {post?.fileType === "video" && (
                        <video
                          className="post__media"
                          src={`data:video/mp4;base64,${post?.file}`}
                          alt="Post Content"
                          controls
                        />
                      )}
                    </div>
                  </div>

                  <div className="post__footer">
                    <div className="post__buttons">
                      <button
                        onClick={() => handleHeart(post._id, i)}
                        className="post__button"
                      >
                        {post?.likes?.some((like) => like._id === user._id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="red"
                            className="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4995 21.2609C11.1062 21.2609 10.7307 21.1362 10.4133 20.9001C8.2588 19.3012 3.10938 15.3239 1.81755 12.9143C0.127895 9.76543 1.14258 5.72131 4.07489 3.89968C5.02253 3.31177 6.09533 3 7.18601 3C8.81755 3 10.3508 3.66808 11.4995 4.85726C12.6483 3.66808 14.1815 3 15.8131 3C16.9038 3 17.9766 3.31177 18.9242 3.89968C21.8565 5.72131 22.8712 9.76543 21.186 12.9143C19.8942 15.3239 14.7448 19.3012 12.5902 20.9001C12.2684 21.1362 11.8929 21.2609 11.4995 21.2609ZM7.18601 4.33616C6.34565 4.33616 5.5187 4.57667 4.78562 5.03096C2.43888 6.49183 1.63428 9.74316 2.99763 12.2819C4.19558 14.5177 9.58639 18.6242 11.209 19.8267C11.3789 19.9514 11.6158 19.9514 11.7856 19.8267C13.4082 18.6197 18.799 14.5133 19.997 12.2819C21.3603 9.74316 20.5557 6.48738 18.209 5.03096C17.4804 4.57667 16.6534 4.33616 15.8131 4.33616C14.3425 4.33616 12.9657 5.04878 12.0359 6.28696L11.4995 7.00848L10.9631 6.28696C10.0334 5.04878 8.6611 4.33616 7.18601 4.33616Z"
                              fill="var(--text-dark)"
                              stroke="var(--text-dark)"
                              strokeWidth="0.6"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => navigate(`/singlepost/${post._id}`)}
                        className="post__button"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipule="evenodd"
                            d="M21.2959 20.8165L20.2351 16.8602C20.1743 16.6385 20.2047 16.3994 20.309 16.1907C21.2351 14.3342 21.5438 12.117 20.9742 9.80402C20.2003 6.67374 17.757 4.16081 14.6354 3.33042C13.7833 3.10869 12.9442 3 12.1312 3C6.29665 3 1.74035 8.47365 3.31418 14.5647C4.04458 17.3819 7.05314 20.2992 9.88344 20.9861C10.6486 21.173 11.4008 21.26 12.1312 21.26C13.7006 21.26 15.1701 20.8557 16.4614 20.1601C16.6049 20.0818 16.7657 20.0383 16.9222 20.0383C17.0005 20.0383 17.0787 20.047 17.157 20.0688L21.009 21.0991C21.0307 21.1035 21.0525 21.1078 21.0699 21.1078C21.2177 21.1078 21.3351 20.9687 21.2959 20.8165ZM19.0178 17.1863L19.6178 19.4253L17.4831 18.8558C17.3005 18.8079 17.1135 18.7819 16.9222 18.7819C16.557 18.7819 16.1875 18.8775 15.8571 19.0558C14.6963 19.6818 13.4441 19.9992 12.1312 19.9992C11.4834 19.9992 10.8269 19.9166 10.1791 19.7601C7.78354 19.1775 5.14453 16.6037 4.53586 14.2473C3.90111 11.7865 4.40109 9.26057 5.90536 7.31719C7.40964 5.3738 9.6791 4.26081 12.1312 4.26081C12.8529 4.26081 13.5876 4.35646 14.3137 4.5521C16.9961 5.26511 19.0786 7.39544 19.7525 10.1084C20.2264 12.0213 20.0308 13.9299 19.183 15.6298C18.9395 16.1168 18.8787 16.6689 19.0178 17.1863Z"
                            fill="var(--text-dark)"
                            stroke="var(--text-dark)"
                            strokeWidth="0.7"
                          />
                        </svg>
                      </button>
                      <button className="post__button">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipule="evenodd"
                            d="M22.8555 3.44542C22.6978 3.16703 22.3962 3 22.0714 3L2.91369 3.01392C2.52859 3.01392 2.19453 3.25055 2.05997 3.60781C1.96254 3.86764 1.98574 4.14603 2.11565 4.37338C2.16669 4.45689 2.23165 4.53577 2.31052 4.60537L9.69243 10.9712L11.4927 20.5338C11.5623 20.9096 11.8499 21.188 12.2304 21.2483C12.6062 21.3086 12.9774 21.1323 13.1723 20.8029L22.8509 4.35018C23.0179 4.06715 23.0179 3.72381 22.8555 3.44542ZM4.21748 4.39194H19.8164L10.4255 9.75089L4.21748 4.39194ZM12.6248 18.9841L11.1122 10.948L20.5171 5.58436L12.6248 18.9841Z"
                            fill="var(--text-dark)"
                            stroke="var(--text-dark)"
                            strokeWidth="0.3"
                          />
                        </svg>
                      </button>
                      <div className="post__indicators"></div>

                      <button className="post__button post__button--align-right">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.875 2H4.125C3.50625 2 3 2.44939 3 3.00481V22.4648C3 23.0202 3.36563 23.1616 3.82125 22.7728L11.5444 16.1986C11.7244 16.0471 12.0225 16.0471 12.2025 16.1936L20.1731 22.7879C20.6287 23.1666 21 23.0202 21 22.4648V3.00481C21 2.44939 20.4994 2 19.875 2ZM19.3125 20.0209L13.3444 15.0827C12.9281 14.7394 12.405 14.5677 11.8763 14.5677C11.3363 14.5677 10.8019 14.7444 10.3856 15.0979L4.6875 19.9502V3.51479H19.3125V20.0209Z"
                            fill="var(--text-dark)"
                            stroke="var(--text-dark)"
                            strokeWidth="0.7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="post__infos">
                      <div className="post__likes">
                        {post?.likes?.length > 0 && (
                          <a href="#" className="post__likes-avatar">
                            <img
                              src={
                                post?.likes[0]?.profileImage?.includes("/avtar")
                                  ? post?.likes[0]?.profileImage
                                  : `data:video/mp4;base64,${post?.likes[0]?.profileImage}`
                              }
                              alt="User Picture"
                            />
                          </a>
                        )}

                        {post?.likes?.length > 0 && (
                          <span>
                            Liked by&nbsp;
                            <a className="post__name--underline" href="#">
                              {post?.likes[0].userName}
                            </a>
                          </span>
                        )}
                        {post?.likes?.length > 1 && (
                          <a href="#">and {post.likes.length - 1} others</a>
                        )}
                      </div>

                      <div className="post__description">
                        <span>
                          <a
                            className="post__name--underline"
                            href=""
                            target="_blank"
                          >
                            {post?.author?.userName}
                            &nbsp;
                          </a>
                          {post.caption}
                        </span>
                      </div>

                      <span className="post__date-time">30 minutes ago</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <section className="side-menu">
            <div className="side-menu__user-profile">
              <a href="" target="_blank" className="side-menu__user-avatar">
                <img
                  src={
                    user?.profileImage?.includes("/avtar")
                      ? user?.profileImage
                      : `data:video/mp4;base64,${user?.profileImage}`
                  }
                  alt="User Picture"
                />
              </a>
              <div className="side-menu__user-info">
                <a href="/">{user?.userName}</a>
                {/* <span>Leonardo Costa</span> */}
              </div>
              <button className="side-menu__user-button">
                <div className="dropdown">
                  <a
                    className="btn dropdown-toggle "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-arrow-up-circle"></i>
                  </a>

                  <ul className="dropdown-menu">
                    <li></li>
                    <li>
                      <a className="dropdown-item" href="#"></a>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user/photoupload">
                        <i className="bi bi-paragraph"></i> पोस्ट अपलोड करें
                      </Link>
                    </li>
                  </ul>
                </div>
              </button>
            </div>

            <div className="side-menu__suggestions-section">
              <div className="side-menu__suggestions-header">
                <h2>Suggestions for You</h2>
                <button>See All</button>
              </div>
              <div className="side-menu__suggestions-content">
                <div className="side-menu__suggestion">
                  <a href="#" className="side-menu__suggestion-avatar">
                    <img src={userphoto} alt="User Picture" />
                  </a>
                  <div className="side-menu__suggestion-info">
                    <a href="#">usernick16</a>
                    <span>Followed by user1, user2 and 9 others</span>
                  </div>
                  <button className="side-menu__suggestion-button">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="side-menu__footer">
              <div className="side-menu__footer-links">
                <ul className="side-menu__footer-list">
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      About
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Help
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Press
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      API
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Jobs
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Privacy
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Terms
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Locations
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Top Accounts
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="#">
                      Hashtag
                    </a>
                  </li>
                  <li className="side-menu__footer-item">
                    <a className="side-menu__footer-link" href="/">
                      Language
                    </a>
                  </li>
                </ul>
              </div>

              <span className="side-menu__footer-copyright">
                &copy; 2023 LOKDESH
              </span>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default UserNavbar;
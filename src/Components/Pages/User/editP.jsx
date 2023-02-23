import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios/Axios";
import "./userEditProfile.css";
import { loadUser } from "../../../Store/Actions/User";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserEditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();
  const { loading, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    district: "",
    bio: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    business: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    };
    const formdata = new FormData(e.target);
    try {
      const res = await Axios.put("/user/profile", formdata, config);
      if (res.status == 200) {
        alert("profile updated");
        dispatch(loadUser());
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
    // navigate("/User");
  };
  const handleLogout = async () => {
    try {
      await Axios.post("/user/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("logout success");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
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
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="editProfile">
          <div className="editProfileLeft">
            <div className="editProfileLeftBox">
              <div className="editpofileleft">
                <img
                  onClick={() => fileRef.current.click()}
                  src={
                    user?.profileImage?.includes("/avtar")
                      ? user?.profileImage
                      : `data:video/mp4;base64,${user?.profileImage}`
                  }
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div className="editProfileCenter">
            <form onSubmit={handleSubmit} className="editPRofileCenter">
              <ul>
                <label htmlFor="">name</label>
                <br />
                <input
                  onChange={handleInput}
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                />
                <br />
                <label htmlFor="">username</label>
                <br />

                <input
                  type="text"
                  name="userName"
                  onChange={handleInput}
                  defaultValue={user?.userName}
                />
                <br />
                <label htmlFor="">email</label>
                <br />
                <input
                  onChange={handleInput}
                  type="text"
                  name="email"
                  defaultValue={user?.email}
                />
                <br />
                <label htmlFor="">location</label>
                <br />
                <input
                  type="text"
                  name="district"
                  onChange={handleInput}
                  defaultValue={user?.district}
                />
                <br />
                <label htmlFor="">bio</label>
                <br />
                <input
                  type="text"
                  name="bio"
                  onChange={handleInput}
                  defaultValue={user?.bio}
                />
                <br />
                <label htmlFor="">date Of Birth</label>
                <br />
                <input
                  type="date"
                  defaultValue={user?.dateOfBirth.split("T")[0]}
                  name="dateOfBirth"
                  onChange={handleInput}
                />
                <br />
                <label htmlFor=""> phone</label>
                <br />
                <input
                  type="text"
                  name="phone"
                  onChange={handleInput}
                  defaultValue={user?.phone}
                />
                <br />
                <label htmlFor="">gender</label>
                <br />
                <input
                  type="text"
                  list="gender"
                  name="gender"
                  placeholder="Enter Here"
                  onChange={handleInput}
                  defaultValue={user?.gender}
                />
                <datalist id="gender">
                  <option value="male">male</option>
                  <option value="female">female</option>
                </datalist>
                <br />
                <label htmlFor="">business acc</label>
                <br />
                <input
                  type="text"
                  list="bussiness"
                  name="businessAcc"
                  placeholder="Enter Here"
                  onChange={handleInput}
                />
                <datalist id="bussiness">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </datalist>
                <br />

                <button type="submit">Update</button>
              </ul>
            </form>
            <input
              type="file"
              name="profileImage"
              onChange={handleProfileImage}
              style={{ display: "none" }}
              ref={fileRef}
            />
          </div>

          <div className="editProfileRight">
            <div className="editProfileRightBox">
              <button onClick={handleLogout}>
                <i className="bi bi-door-closed"></i>Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditProfile;

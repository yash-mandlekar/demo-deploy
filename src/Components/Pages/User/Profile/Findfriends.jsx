import React, { useState } from "react";
import "./Findfriends.css";
import Axios from "../../../Axios/Axios";
const Findfriends = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      const { data } = await Axios.get(`/user/profile/user/${e.target.value}`);
      setUsers(data.user);
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      <div className="findfriends">
        <div className="findfriendsearch">
          <div className="inputFriends">
            <i className="bi bi-search"></i>
            <input
              onChange={handleChange}
              value={search}
              type="text"
              placeholder="Search for friends"
            />
          </div>
          <div className="showFriends">
            {users?.map((user, i) => (
              <div key={i} className="showfriendsh1">
                <h1>{user?.userName}</h1>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default Findfriends;

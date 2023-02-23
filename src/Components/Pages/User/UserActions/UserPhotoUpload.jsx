import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios/Axios";
import "./userPhotoUpload.css";

const UserPhotoUpload = () => {
  const navigate = useNavigate();
  const fileTypes = ["JPG", "PNG", "GIF", "mp4"];
  const [file, setFile] = useState();
  const handleChange = (file) => {
    setFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("caption", e.target.caption.value);
    formData.append("file", file);
    console.log(Array.from(formData));
    try {
      const res = await Axios.post("/user/post", formData, config);
      navigate("/userwall");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      
       <div className="photouploadform">
        <div className="photouploadmain">
          <form onSubmit={handleSubmit} className="uploadphoto">
            <h1>Create Post</h1>
            <hr />
            <div className="userdets">
              <img className="img5" src="" alt="" />
              <h4>abhay singh</h4>
            </div>
            <p>What's on your mind, Ankit</p>
            <div className="uploadform">
              <FileUploader
                className="fileupload"
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                value={file}
              />
              <input type="text" name="caption" className="postcaption" placeholder="Enter your caption"/>
              {/* <textarea name="caption" rows="5" cols="81" id=""></textarea> */}
            </div>
            <button type="submit">
              <b>Post</b>
            </button>
           
          </form>
        </div>
      </div>
    </>
  );
  
  
};

export default UserPhotoUpload;

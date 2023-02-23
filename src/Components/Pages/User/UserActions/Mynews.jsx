import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios/Axios";
import "./mynews.css";

const Mynews = () => {
  const navigate = useNavigate();
  const fileInput = useRef();
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    message: "",
  });
  const [file, setFile] = useState();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    message: "",
  });
  const { first_name, last_name, phone, message } = form;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name) return setError({ ...error, first_name: true });
    if (!phone) return setError({ ...error, phone: true });
    if (!message) return setError({ ...error, message: true });
    if (!file) return setError({ ...error, file: true });
    const config = {
      headers: {
        token: localStorage.getItem("accessToken"),
        "Content-Type": "multipart/form-data",
      },
    };
    const data = new FormData(e.target);
    try {
      await Axios.post("/user/usernews", data, config);
      navigate("/user");
      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        message: "",
        file: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError({ ...error, file: false });
  };
  return (
    <>
      <div className="contact" id="contact">
        <img
          className="bg-img-mynews"
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <div className="mynews-head">
          <h2>
            अगर आप लोकदेश टीवी में अपनी खबर दिखाना चाहते हैं तो कृपया इस फॉर्म
            को भरें
          </h2>
        </div>
        <div className="cnt">
          <form
            method="post"
            action="contact.php"
            name="contactform"
            id="contactform"
            onSubmit={handleSubmit}
          >
            <div className="d-flex" style={{ gap: "8%" }}>
              <div className="col-md-offset-1 col-md-5">
                <fieldset>
                  <input
                    name="first_name"
                    type="text"
                    id="name"
                    size="30"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={first_name}
                    className={error.first_name ? "error-border" : ""}
                  />
                  <input
                    name="last_name"
                    type="text"
                    id="email"
                    size="30"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={last_name}
                    className={error.last_name ? "error-border" : ""}
                  />
                  <input
                    name="phone"
                    type="text"
                    id="phone"
                    size="30"
                    placeholder="Phone"
                    onChange={handleChange}
                    value={phone}
                    className={error.phone ? "error-border" : ""}
                  />
                  <input
                    name="file"
                    type="file"
                    id="file"
                    size="30"
                    placeholder="file"
                    style={{ display: "none" }}
                    ref={fileInput}
                    onChange={handleFileChange}
                  />
                  <div
                    className={`attach-file ${file ? "news-active" : ""} ${
                      error.file ? "error-border" : ""
                    }`}
                    onClick={() => fileInput.current.click()}
                  >
                    {file ? (
                      <>
                        <i className="bi bi-check2"></i>
                        <span>File Attached</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle"></i>
                        <span>Attach File</span>
                      </>
                    )}
                  </div>
                </fieldset>
              </div>
              <div className="col-md-5">
                <fieldset>
                  <textarea
                    name="message"
                    cols="40"
                    rows="20"
                    id="comments"
                    placeholder="Message"
                    onChange={handleChange}
                    value={message}
                    className={error.message ? "error-border" : ""}
                  ></textarea>
                </fieldset>
              </div>
            </div>
            <div className="col-md-offset-1 col-md-11">
              <fieldset>
                <button
                  type="submit"
                  className="btn btn-lg"
                  id="submit"
                  value="Submit"
                >
                  Send Message
                </button>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mynews;
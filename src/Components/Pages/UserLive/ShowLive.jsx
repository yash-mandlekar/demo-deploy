import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import Axios from "../../Axios/Axios";
import "./UserLive.css";

const ShowLive = () => {
  const videoRef = useRef(null);
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const zg = new ZegoExpressEngine(
    628726461,
    "wss://webliveroom628726461-api.coolzcloud.com/ws"
  );
  zg.on("playerStateUpdate", (roomID, state, errorCode, extendedData) => {
    console.log(
      "%croomID ",
      "color: black;background-color: yellow;font-size: 30px;"
    );
    console.log(roomID);
    console.log(
      "%croomID ",
      "color: black;background-color: yellow;font-size: 30px;"
    );
  });

  useEffect(() => {
    showLive();
  }, []);
  const showLive = async () => {
    const { data } = await Axios.get(`/user/zego/token/${user?.userName}`);
    const result = await zg.loginRoom(
      roomId,
      data.token,
      { userID: user?.userName, userName: user?.userName },
      { userUpdate: true }
    );
    const remoteStream = await zg.startPlayingStream(roomId);
    videoRef.current.srcObject = remoteStream;
  };
  return (
    <>
     <div className="Liveuser">
        <div className="liveuservideo">
        <video autoPlay={true} ref={videoRef}></video>
          <div className="liveuservideofeatures">
            <div className="liveuservideofeaturesTop">
              <div className="liveuservideofeaturesTopLeft">
                <div className="liveuservideofeaturesTopLeftphoto">
                  <img src="" alt="" />
                </div>
              </div>
              <div className="liveuservideofeaturesTopLeftName">
                <h3>{roomId}</h3>
              </div>
            </div>
            <div className="liveuservideofeaturesMiddle"></div>
            <div className="liveuservideofeaturesBottom">
              <div className="liveuservideofeaturesBottomleft">
                <div className="liveuservideofeaturesBottomleftmute1">
                  <div className="liveuservideofeaturesBottomleftmute">
                    <i
                      className="bi bi-mic"
                    ></i>
                  </div>
                </div>
                <div className="liveuservideofeaturesBottomleftmute11">
                  <div className="liveuservideofeaturesBottomleftcammera">
                    <i
                      className="bi bi-camera-video"
                    ></i>
                  </div>
                </div>
              </div>
              <div className="liveuservideofeaturesBottomRight">
                <div
              
                  className="liveuservideofeaturesBottomRightclose"
                >
                 <i class="bi bi-x-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default ShowLive;

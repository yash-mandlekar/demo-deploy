import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import "./UserLive.css";
import Axios from "../../Axios/Axios";
import { useSelector } from "react-redux";

var localStream = null;
const UserLive = () => {
  const { roomId } = useParams();
  const streamRef = useRef(null);
  const micRef = useRef(null);
  const cameraRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const appID = 628726461;
  var zg = new ZegoExpressEngine(
    appID,
    "wss://webliveroom628726461-api.coolzcloud.com/ws"
  );
  zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
    if (state == "DISCONNECTED") {
      console.log(
        "%cDisconnected from the room.",
        "color: black;background-color: red;"
      );
    }
    if (state == "CONNECTING") {
      console.log(
        "%cConnecting from the room.",
        "color: black;background-color: yellow;"
      );
    }
    if (state == "CONNECTED") {
      console.log(
        "%cNormal from the room.",
        "color: black;background-color: yellow;font-size: 30px;"
      );
      // joined user name
      console.log(extendedData);
      console.log(
        "%cNormal from the room.",
        "color: black;background-color: yellow;font-size: 30px;"
      );
    }
  });
  const goLive = async () => {
    const { data } = await Axios.get(`/user/zego/token/${user?.userName}`);
    const result = await zg.loginRoom(
      roomId,
      data.token,
      { userID: user?.userName, username: user?.userName },
      { userUpdate: true }
    );
    localStream = await zg.createStream();
    streamRef.current.srcObject = localStream;
    zg.startPublishingStream(roomId, localStream);
    const formdata = new FormData();
    formdata.append("url", roomId);
    const res = await Axios.post("/user/golive", formdata, {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    });
    console.log(
      "%cres: ",
      "color: black;background-color: yellow;font-size: 20px;"
    );
    console.log(res);
    console.log(
      "%cres: ",
      "color: black;background-color: yellow;font-size: 20px;"
    );
  };
  const stopLive = async () => {
    zg.stopPublishingStream(roomId);
    zg.destroyStream(localStream);
    streamRef.current.srcObject = null;
    zg.logoutRoom(roomId);
    await Axios.get("/user/removeLive", {
      headers: {
        token: localStorage.getItem("accessToken"),
      },
    });
    navigate("/myLiveoptions");
  };
  var camera = false;
  const PlayPauseCamera = async () => {
    if (camera) {
      zg.mutePublishStreamVideo(localStream, false);
      cameraRef.current.className = "bi bi-camera-video";
      camera = false;
    } else {
      zg.mutePublishStreamVideo(localStream, true);
      cameraRef.current.className = "bi bi-camera-video-off-fill";
      camera = true;
    }
  };
  var mic = false;
  const PlayPauseMic = async () => {
    if (mic) {
      zg.mutePublishStreamAudio(localStream, false);
      micRef.current.className = "bi bi-mic";
      mic = false;
    } else {
      zg.mutePublishStreamAudio(localStream, true);
      micRef.current.className = "bi bi-mic-mute-fill";
      mic = true;
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        goLive();
      }, 1000);
    }
  }, [user]);
  return (
    <>
      <div className="Liveuser">
        <div className="liveuservideo">
          <video autoPlay={true} className="myvideo" ref={streamRef}></video>
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
                      ref={micRef}
                      onClick={PlayPauseMic}
                      className="bi bi-mic"
                    ></i>
                  </div>
                </div>
                <div className="liveuservideofeaturesBottomleftmute11">
                  <div className="liveuservideofeaturesBottomleftcammera">
                    <i
                      ref={cameraRef}
                      onClick={PlayPauseCamera}
                      className="bi bi-camera-video"
                    ></i>
                  </div>
                </div>
              </div>
              <div className="liveuservideofeaturesBottomRight">
                <div
                  onClick={stopLive}
                  className="liveuservideofeaturesBottomRightclose"
                >
                 <i class="bi bi-x-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserLive;

// zg.on("roomUserUpdate", (roomID, updateType, userList) => {
//   console.log("%croomUserUpdate: ", "color: black;background-color: yellow;");
// });
// zg.on("publisherStateUpdate", (result) => {
//   // Callback for updates on stream publishing status.
//   // ...
// });
// zg.on("publishQualityUpdate", (streamID, stats) => {
//   // Callback for reporting stream publishing quality.
//   // ...
// });

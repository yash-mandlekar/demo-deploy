import React, { useRef } from "react";
import SingleNews from "./AllNews";
import Earth from "../images/earth.mp4";
import ReactPlayer from "../ReactPlayer/ReactPlayer";
const Debate = ({ show }) => {
  const playerRef = useRef(null);
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };
  return (
    <>
      <div className="scroll">
        {show && (
          <div className="DebateBox">
            <ReactPlayer
              options={{
                controls: true,
                responsive: true,
                fluid: true,
                sources: [
                  {
                    src: Earth,
                    type: "video/mp4",
                  },
                ],
              }}
              onReady={handlePlayerReady}
            />
          </div>
        )}

        <div className="Allnewsfeed">
          <SingleNews />
        </div>
      </div>
    </>
  );
};

export default Debate;

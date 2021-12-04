import React, { useState } from "react";
import Channel from "./channel";
import "./discussion.css";

function Discussion(props) {
  const [selectedChannel, setSelectedChannel] = useState("C++");
  return (
    <div className="Discussion">
      <div className="topics">
        <div className="topic" onClick={() => setSelectedChannel("C++")}>
          C++
        </div>
        <div className="topic" onClick={() => setSelectedChannel("Java")}>
          Java
        </div>
        <div className="topic" onClick={() => setSelectedChannel("Python")}>
          Python
        </div>
      </div>
      <div className="discuss">
        <div className="discussion_heading">{selectedChannel}</div>
        <div className="discussion_Channel">
          <Channel channel={selectedChannel}></Channel>
        </div>
      </div>
    </div>
  );
}

export default Discussion;

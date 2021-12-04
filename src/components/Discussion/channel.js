import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";
import "./channel.css";
import { useNavigate } from "react-router-dom";
function Channel(props) {
  const [user] = useStateValue();
  const [value, setValue] = useState([]);
  const [msg, setmsg] = useState("");

  const chatRef = db.collection(props.channel);
  const navigate = useNavigate();
  const updateChat = (e) => {
    e.preventDefault();
    if (user?.user) {
      chatRef.add({
        msg: msg,
        user: user.user.uid,
        userName: user.user.displayName,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setmsg("");
    } else {
      alert("Login First ");
      navigate("/login");
    }
  };
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const unsubscribe = chatRef.orderBy("time", "asc").onSnapshot((snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          setValue((value) => [...value, change.doc.data()]);
        }
      });
    });

    return () => unsubscribe();
  }, [props.channel]);

  useEffect(() => {
    scrollToBottom();
  }, [value]);

  useEffect(() => {
    setValue([]);
    chatRef
      .orderBy("time", "asc")
      .get()
      .then((snap) => setValue(snap.docs.map((doc) => doc.data())));
  }, [props.channel]);
  const setchat = (e) => {
    e.preventDefault();
    setmsg(e.target.value);
  };
  return (
    <div className="Channel">
      <div className="chats">
        {value.map((value) =>
          user && value.user === user.user?.uid ? (
            <div className="chat Self">{value.msg}</div>
          ) : (
            <div className="chatbox">
              {value.userName && (
                <div className="displayName">
                  <small>{value.userName} : </small>
                </div>
              )}
              <div className="chat">{value.msg}</div>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={updateChat} className="sendText">
        <input value={msg} className="textinput" onChange={setchat}></input>
        {user?.user ? (
          <button type="submit" className="textSubmit">
            {" "}
            SEND
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Login to send
          </button>
        )}
      </form>
    </div>
  );
}

export default Channel;

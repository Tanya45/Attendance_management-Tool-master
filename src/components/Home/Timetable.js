import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import _uniqueId from "lodash/uniqueId";
import "./Timetable.css";
import { useStateValue } from "../../StateProvider";
function Timetable() {
  const [day, setDay] = useState("Mon");
  const [user] = useStateValue() ;
  const [time, setTime] = useState();
  const [Sub, setSub] = useState("");
  const [Mon, setMon] = useState([]);
  const [Tue, setTue] = useState([]);
  const [Wed, setWed] = useState([]);
  const [Thu, setThu] = useState([]);
  const [Fri, setFri] = useState([]);
  const [Sat, setSat] = useState([]);
  const [Sun, setSun] = useState([]);
  const days = [
    { S: "Mon", F: "Monday", a: setMon, b: Mon },
    { S: "Tue", F: "Tuesday", a: setTue, b: Tue },
    { S: "Wed", F: "Wednesday", a: setWed, b: Wed },
    { S: "Thu", F: "Thursday", a: setThu, b: Thu },
    { S: "Fri", F: "Friday", a: setFri, b: Fri },
    { S: "Sat", F: "Saturday", a: setSat, b: Sat },
    { S: "Sun", F: "Sunday", a: setSun, b: Sun },
  ];
  const ref = db.collection("Shedules").doc("Days");
  const createClass = (e) => {
    e.preventDefault();
    ref.collection(day).add({
      sub: Sub,
      time: time,
      id: _uniqueId(),
    });
  };
  useEffect(() => {
    days.map((day) => {
      ref
        .collection(day.S)
        ?.orderBy("time", "asc")
        .onSnapshot((snap) => {
          day.a(snap.docs.map((doc) => doc.data()));
        });
    });
  }, []);

  return (
    <div className="timetable">
      <div className="showTimetable">
        <div className="timetable_Heading">Timetable</div>
        {days.map((day) => (
          <div className="block light">
            <div className="block_day"> {day.F}</div>
            <div className="block_shedule">
              {day.b?.map((classes) => (
                <div className="Shed_class">
                  <div className="shed_classTime">
                    <small>{classes.time}</small>
                  </div>
                  <div className="Shed_className">{classes.sub}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {user && user.user?.uid === "qS7VCrpOagbLoI1gIHBlQ6qv47I2"?
      <div className="createTimetable">
        <div className="AddClassHeading">Add Class</div>
        <form onSubmit={createClass} className="timetableForm">
          <div className="feild">
            <label for="feild_day">Day : </label>
            <select
              className="day"
              id="day"
              value={day}
              onChange={(e) => {
                e.preventDefault();
                setDay(e.target.value);
                console.log(e.target.value);
              }}
            >
              {days.map((day) => (
                <option value={day.S}>{day.F}</option>
              ))}
            </select>
          </div>
          <div className="feild">
            <label for="startTime">Start Time : </label>
            <input
              type="time"
              value={time}
              className="startTime"
              id="startTime"
              onChange={(e) => {
                e.preventDefault();
                setTime(e.target.value);
              }}
            />
          </div>
          <div className="feild">
            <label for="subject">Subject : </label>
            <input
              type="text"
              className="subject"
              id="subject"
              placeholder="DSA"
              value={Sub}
              onChange={(e) => {
                e.preventDefault();
                setSub(e.target.value);
              }}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
            :<></>}
              
    </div>
  );
}


export default Timetable;

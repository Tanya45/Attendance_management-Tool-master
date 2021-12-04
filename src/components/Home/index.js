import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./index.css";
function Home() {
  const d = new Date();
  const Today = d.getDay();
  const weekday = ["Sun" ,"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const ref = db.collection("Shedules").doc("Days");
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    ref
      .collection(weekday[Today])
      .orderBy("time", "asc")
      .get()
      .then((snap) => {
        setClasses(snap.docs.map((doc) => doc.data()));
      });
  });

  return (
    <div className="home">
      <div className="TodayShedule">
        <div className="sheduleHeading">Today's Shedule</div>
        {classes.map((classP) => (
          <div className="classBlock">
            <div className="classTime">{classP.time}</div>
            <div className="className">{classP.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

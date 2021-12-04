import { useEffect } from "react";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/login/Register";
import Home from "./components/Home";
import Header from "./components/Header";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discussion from "./components/Discussion/discussion";
import Timetable from "./components/Home/Timetable";
import Attendance from "./components/Attendance/attendance";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: auth.currentUser,
        });
        console.log("State is Login", auth.currentUser);
      } else {
        dispatch({
          type: "CLEAR_USER",
        });
        console.log("State is Log-out");
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/discussion" element={<Discussion />}></Route>
          <Route path="/timetable" element={<Timetable />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>

        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;

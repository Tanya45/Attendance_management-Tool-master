import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

function Header() {
  const navigate = useNavigate();
  const [user, dispatch] = useStateValue();
  const logout = (e) => {
    e.preventDefault();
    console.log("dispatched Log out ");
    dispatch({
      type: "CLEAR_USER",
    });
    navigate("/login");
  };

  return (
    <div className="Header">
      <div className="HeaderWrap">
        <div
          className="Logo"
          onClick={() => {
            navigate("/");
          }}
        >
          CVC
        </div>
        <div className="Navigations">
          <div
            className="nav"
            onClick={() => {
              navigate("/timetable");
            }}
          >
            Timetable
          </div>
          <div
            className="nav"
            onClick={() => {
              navigate("/Discussion");
            }}
          >
            Discussion
          </div>
          <div
            className="nav"
            onClick={() => {
              navigate("/attendance");
            }}
          >
            Attendance
          </div>
          <div className="nav">
            {user.user ? (
              `Hello ${user?.user?.displayName}`
            ) : (
              <div
                className="nav"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </div>
            )}
          </div>
          {user.user ? (
            <div className="nav" onClick={logout}>
              Signout
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

// import { Link } from '@material-ui/core';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import "./Register.css";

function Register() {
  const [firstname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();
    if (password === Cpassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            auth.user.updateProfile({
              displayName: firstname,
            });
            db.collection("User").doc(auth?.user?.uid).set({
              uid: auth?.user?.uid,
              email: auth?.user?.email,
              Name: firstname,
              Reg: registrationNumber,
            });

            navigate("/");
          }
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Password Not match");
    }
  };

  return (
    <div className="register">
      <div
        class="absolute_blackDim"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      ></div>
      <div class="register_details">
        <p> Register </p>
        <br />
        <div class="register_row">
          <p className="register_name"> Your Name </p>
          <input
            className="register_value"
            type="text"
            value={firstname}
            onChange={(e) => {
              setFName(e.target.value);
            }}
          />
        </div>
        <div class="register_row">
          <p className="register_name"> Email </p>
          <input
            className="register_value"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="register_row">
          <p className="register_name"> Roll No. </p>
          <input
            className="register_value"
            type="text"
            value={registrationNumber}
            onChange={(e) => {
              setRegistrationNumber(e.target.value);
            }}
          />
        </div>
        <div class="register_row">
          <p className="register_name"> Password </p>
          <input
            className="register_value"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div class="register_row">
          <p className="register_name"> Confirm Password </p>
          <input
            className="register_value"
            type="password"
            value={Cpassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          />
        </div>
        {password === Cpassword ? (
          <small color="Green"></small>
        ) : (
          <small style={{ color: "red" }}>Password Doesn't Match</small>
        )}
        <button class="register_button" onClick={register}>
          Submit Details
        </button>

        <pre
          className="register_loginLink"
          onClick={() => {
            navigate("/login");
          }}
          style={{ marginTop: "20px" }}
        >
          {" "}
          Already a user? Login.
        </pre>
      </div>
    </div>
  );
}

export default Register;

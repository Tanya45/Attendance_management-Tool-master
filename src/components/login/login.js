import React, { useState } from "react";
import { auth, db } from "../../firebase";
// import { useHistory } from "react-router-dom";
import "./login.css";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../StateProvider";
function Login() {
  const [{ user }] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const history = useHistory();
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        db.collection("User")
          .doc(auth.user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              db.collection("User").doc(auth.user.uid).set({
                email: auth.user.email,
                uid: auth.user.uid,
                Name: auth.user.displayName,
                basket: [],
                Address: {},
              });
            }
          });
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div
        class="absolute_blackDim"
        onClick={(e) => {
          e.preventDefault();
          //   history.goBack();
        }}
      ></div>
      <div
        class="login_container_end"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        X
      </div>
      <div className="login_container">
        <h1> Sign-in </h1>
        <form>
          <h5>Email </h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <h5>Password </h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" onClick={signIn} className="login_signInButton">
            SIGN-IN
          </button>

          <p
            onClick={() => {
              //   history.push("/register");
              navigate("/register");
            }}
            className="login_registerButton"
          >
            {" "}
            Not a user yet? Create Account
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../app/features/userSlice";
import { auth } from "../../configs/firebase";

import "./Auth.css";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email & password");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleSignInWithGoogle = (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const register = () => {
    if (!email || !password) {
      alert("Please enter your email & password");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="auth">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name=""
          id=""
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Not a member?{" "}
        <span className="auth_register" onClick={register}>
          Register Now
        </span>
      </p>

      {/* <form className="form_wrapper">
        <div className="google_btn_wrapper" onClick={handleSignInWithGoogle}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            style={{ width: "50px", height: "50px" }}
          />
          Sign in with Google
        </div>
      </form> */}
    </div>
  );
};

export default Auth;

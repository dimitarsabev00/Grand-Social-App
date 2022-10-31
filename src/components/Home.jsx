import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../configs/firebase";
import { login, logout, selectUser } from "../app/features/userSlice";
import AuthHeader from "./Auth/Auth";
import Feed from "./Feed/Feed";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import Welcome from "./AuthHeader/AuthHeader";
const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      {!user ? <Welcome /> : <Header />}
      {!user ? (
        <AuthHeader />
      ) : (
        <div className="app_body_wrapper">
          <div className="app_body">
            <SideBar />
            <Feed />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOption from "../HeaderOption/HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="main_content">
        <img
          src="https://media.istockphoto.com/vectors/camera-icon-simple-style-isolated-vector-illustration-on-white-vector-id1278996256?k=20&m=1278996256&s=612x612&w=0&h=bTKSsWlqGPZKZL4b-JCwU825aHySeU88-ZNFm8LFOsc="
          alt=""
        />
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search.." />
        </div>
      </div>
      <div className="nav">
        <HeaderOption title="Home" Icon={HomeIcon} />
        <HeaderOption title="My Network" Icon={SupervisorAccountIcon} />
        <HeaderOption title="Jobs" Icon={BusinessCenterIcon} />
        <HeaderOption title="Messaging" Icon={ChatIcon} />
        <HeaderOption title="Notifications" Icon={NotificationsIcon} />
        <HeaderOption
          avatar="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          title="Me"
          OnClick={logoutOfApp}
        />
      </div>
    </div>
  );
};

export default Header;

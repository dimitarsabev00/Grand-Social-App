import { Avatar } from "@mui/material";
import React from "react";
import "./SideBar.css";
const SideBar = () => {
  const recentItem = (topic) => {
    return (
      <div className="sidebar_recentItem">
        <span className="sidebar_hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <Avatar
          src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          className="sidebar_avatar"
        />
        <h2>Dimitar Sabev</h2>
        <h4>Junior React Developer</h4>
        <h4>dimitar@abv.bg</h4>
      </div>
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p className="sidebar_statText">Who viewed you</p>
          <p className="sidebar_statNumber">2,543</p>
        </div>
        <div className="sidebar_stat">
          <p className="sidebar_statText">Views on post</p>
          <p className="sidebar_statNumber">5,754</p>
        </div>
      </div>
      <div className="sidebar_bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("javascript")}
        {recentItem("nodejs")}
      </div>
    </div>
  );
};

export default SideBar;

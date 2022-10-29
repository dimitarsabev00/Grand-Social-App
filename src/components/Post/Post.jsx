import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import InputOption from "../InputOption/InputOption";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./Post.css";
const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className="post">
      <div className="post_header">
        <Avatar src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
        <div className="post_info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="post_body">
        <p>{message}</p>
      </div>
      <div className="post_buttons">
        <InputOption Icon={ThumbUpOffAltIcon} title="Like" color="gray" />

        <InputOption Icon={ChatOutlinedIcon} title="Comments" color="gray" />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
      </div>
    </div>
  );
});

export default Post;

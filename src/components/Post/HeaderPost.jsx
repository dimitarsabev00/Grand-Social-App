import React from "react";
import { Link } from "react-router-dom";

const HeaderPost = ({ authorUsername }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/profile/${authorUsername}`} className="flex items-center">
          <img
            src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            alt=""
            className="rounded-full h-8 w-8 flex mr-3"
          />
        </Link>
        <p className="font-bold">{authorUsername}</p>
      </div>
    </div>
  );
};

export default HeaderPost;

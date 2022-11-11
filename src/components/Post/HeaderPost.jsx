import React from "react";
import { Link } from "react-router-dom";

const HeaderPost = ({ authorUsername }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-primary h-4 p-4 py-8">
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </div>
  );
};

export default HeaderPost;

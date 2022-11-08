import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/profile/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          alt=""
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

export default memo(User);

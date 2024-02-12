import { memo } from "react";
import Skeleton from "react-loading-skeleton";

import { Link } from "react-router-dom";
const User = ({ authUser }) =>
  !authUser?.username ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/profile/${authUser?.username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={authUser?.photoURL}
          alt=""
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{authUser?.username}</p>
        <p className="text-sm">{`${authUser?.firstName} ${authUser?.lastName}`}</p>
      </div>
    </Link>
  );

export default memo(User);

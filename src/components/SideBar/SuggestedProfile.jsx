import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";
const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  profileAvatar,
}) => {
  const [followed, setFollowed] = useState(false);
  const handleFollowUser = async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  };
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={profileAvatar}
          alt=""
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/profile/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;

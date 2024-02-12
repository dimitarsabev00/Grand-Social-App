import React from "react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const SuggestedProfile = ({ profile }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    profile?.uid
  );
  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between gap-2">
        <img
          src={profile?.photoURL}
          alt={`${profile?.username} profile`}
          className="rounded-full h-8 w-8 flex object-cover"
        />
        <Link to={`/profile/${profile?.username}`}>
          <p className="font-bold text-sm">{profile?.username}</p>
        </Link>
      </div>

      <button
        type="button"
        className={`text-xs font-bold text-blue-600 hover:text-blue-400 flex justify-center items-center ${
          isUpdating && "opacity-50"
        }`}
        onClick={handleFollowUser}
      >
        {isUpdating ? (
          <div className="spinner-in-button"></div>
        ) : (
          <>{isFollowing ? "Unfollow" : "Follow"}</>
        )}
      </button>
    </div>
  );
};

export default SuggestedProfile;

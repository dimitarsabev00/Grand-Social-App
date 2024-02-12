import React from "react";
import useFollowUser from "../../hooks/useFollowUser";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";

const SuggestedUser = ({ user, setUser, searchRef }) => {
  const authUser = useSelector(selectUser);

  const navigate = useNavigate();

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    user?.uid
  );
  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };
  return (
    <div className="absolute top-[30px] w-full h-auto bg-white rounded-lg border border-[#bbbbbb]">
      <div
        className={`flex gap-[10px] items-center p-[10px] cursor-pointer rounded-lg ${
          authUser?.uid !== user?.uid && "justify-between"
        }`}
      >
        <img
          src={user?.photoURL}
          alt={`${user?.username} profile`}
          className="w-[40px] h-[40px] rounded-[50%]"
          onClick={() => {
            navigate(`/profile/${user?.username}`);
            setUser(null);
            searchRef.current.value = null;
          }}
        />
        <div
          className="flex flex-col gap-2"
          onClick={() => {
            navigate(`/profile/${user?.username}`);
            setUser(null);
            searchRef.current.value = null;
          }}
        >
          <p className="text-[10px]">{user?.username}</p>
          <p className="text-[10px]">{user?.followers?.length} followers</p>
        </div>
        {authUser?.uid !== user?.uid && (
          <button
            type="button"
            className={`text-xs font-bold text-blue-600 hover:text-blue-400 flex justify-center items-center ${
              isUpdating && "opacity-50"
            }`}
            onClick={onFollowUser}
          >
            {isUpdating ? (
              <div className="spinner-in-button"></div>
            ) : (
              <>{isFollowing ? "Unfollow" : "Follow"}</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestedUser;

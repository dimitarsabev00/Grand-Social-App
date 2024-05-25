import { useSelector } from "react-redux";
import { selectUser, selectUserProfile } from "../../app/features/userSlice";
import { useNavigate } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const HeaderUserProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const authUser = useSelector(selectUser);

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          src={userProfile?.photoURL}
          alt={`${userProfile?.username} profile picture`}
          className="rounded-full h-40 w-40 flex object-cover"
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2x1 mr-4">{userProfile?.username}</p>
          {visitingAnotherProfileAndAuth && (
            <button
              type="button"
              className={`bg-blue-500 font-bold text-sm rounded text-white w-20 h-8 hover:bg-blue-400 flex justify-center items-center ${
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
          )}

          {visitingOwnProfileAndAuth && (
            <button
              className="text-sm rounded text-black font-semibold  border border-gray-500 p-1"
              type="button"
              onClick={() => {
                navigate(`/editProfile/${authUser?.username}`);
              }}
            >
              Edit profile
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          <p className="mr-8 whitespace-nowrap">
            <span className="font-bold">{userProfile?.posts?.length}</span>{" "}
            posts
          </p>
          <p className="mr-8 whitespace-nowrap">
            <span className="font-bold">{userProfile?.followers?.length}</span>
            {` `}
            {userProfile?.followers?.length === 1 ? `follower` : `followers`}
          </p>
          <p className="mr-8 whitespace-nowrap">
            <span className="font-bold">{userProfile?.following?.length}</span>{" "}
            following
          </p>
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {`${userProfile?.firstName} ${userProfile?.lastName}`}
          </p>
        </div>
        <div className="container mt-4">
          <p>{userProfile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderUserProfile;

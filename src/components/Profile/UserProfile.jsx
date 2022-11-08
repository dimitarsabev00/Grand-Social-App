import { useReducer, useEffect } from "react";
import { getUserPostsByUsername } from "../../services/firebase";
import HeaderUserProfile from "./HeaderUserProfile";
import PostsUserProfile from "./PostsUserProfile";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    postsCollection: [],
    followerCount: 0,
  };

  const [{ profile, postsCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const getProfileInfoAndPosts = async () => {
      const posts = await getUserPostsByUsername(user.username);
      dispatch({
        profile: user,
        postsCollection: posts,
        followerCount: user.followers.length,
      });
    };
    if (user.username) {
      getProfileInfoAndPosts();
    }
  }, [user.username]);
  return (
    <div>
      <HeaderUserProfile
        postsCount={postsCollection ? postsCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <PostsUserProfile posts={postsCollection} />
    </div>
  );
};

export default UserProfile;

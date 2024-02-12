import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import HeaderUserProfile from "../components/Profile/HeaderUserProfile";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostsUserProfile from "../components/Profile/PostsUserProfile";
import useGetUserPosts from "../hooks/useGetUserPosts";

const Profile = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const { isLoadingPosts, posts } = useGetUserPosts();

  const userNotFound = !isLoading && !userProfile;
  const postsNotFound = posts.length === 0;

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-lg">
        {!isLoading && userProfile && (
          <HeaderUserProfile userProfile={userProfile} />
        )}
        {userNotFound && (
          <p className="text-center text-2x1">Not Found User!</p>
        )}

        {!isLoadingPosts && posts && <PostsUserProfile posts={posts} />}
        {postsNotFound && <p className="text-center text-2x1">No Posts Yet!</p>}
      </div>

      {isLoading && (
        <div className="mx-auto max-w-screen-lg">
          {/* Skeleton For HeaderUserProfile */}
          <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
              <Skeleton circle height={150} width={150} count={1} />
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
              <div className="container flex mt-4">
                <Skeleton count={1} width={200} height={24} />
              </div>
              <div className="container mt-4">
                <p className="font-medium">
                  <Skeleton count={1} height={24} width={300} />
                </p>
              </div>
              <div className="container mt-4">
                <Skeleton count={1} height={24} width={200} />
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoadingPosts && (
        <div className="mx-auto max-w-screen-lg">
          {/* Skeleton For PostsUserProfile */}
          <div className="h-16 border-t border-gray-500 mt-12 pt-4">
            <div className="grid grid-cols-3 gap-4 mt-4 mb-12">
              <Skeleton key={12} width={330} height={165} />
              <Skeleton key={12} width={330} height={165} />
              <Skeleton key={12} width={330} height={165} />
              <Skeleton key={12} width={330} height={165} />
              <Skeleton key={12} width={330} height={165} />
              <Skeleton key={12} width={330} height={165} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

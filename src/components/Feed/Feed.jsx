import Post from "../Post/Post";
import Skeleton from "react-loading-skeleton";
import CreatePost from "./CreatePost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
const Feed = () => {
  const { isLoading, posts } = useGetFeedPosts();

  const feedPostsNotFound = !isLoading && posts.length === 0;

  return (
    <div className="container col-span-2">
      <CreatePost />
      {isLoading && (
        <Skeleton count={3} width={675} height={500} className="mb-5" />
      )}

      {!isLoading &&
        posts?.length > 0 &&
        posts.map((post) => {
          return <Post key={post?.id} post={post} />;
        })}

      {feedPostsNotFound && (
        <p className="flex justify-center font-bold">
          Follow other people to see Posts
        </p>
      )}
    </div>
  );
};

export default Feed;

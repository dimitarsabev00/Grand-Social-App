import Post from "../Post/Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useUser from "../../hooks/useUser";
import usePosts from "../../hooks/usePosts";
const Feed = () => {
  const { user } = useUser();

  const { posts } = usePosts(user);

  return (
    <div className="container col-span-2">
      {user.following === undefined ? (
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : user.following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Posts
        </p>
      ) : posts ? (
        posts.map((post) => {
          return (
            <Post
              authorUsername={post.authorUsername}
              docId={post.docId}
              totalLikes={post.likes.length}
              likedPhoto={post.userLikedPhoto}
              description={post.description}
              comments={post.comments}
              posted={post.dateCreated}
            />
          );
        })
      ) : null}
    </div>
  );
};

export default Feed;

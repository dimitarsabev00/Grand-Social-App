import Post from "../Post/Post";

const PostsUserProfile = ({ posts }) => {
  return (
    <div className="h-16 border-t border-gray-500 mt-12 pt-4">
      <div className="flex flex-col mt-4 mb-12">
        {posts.map((post) => {
          return <Post post={post} key={post?.id} />;
        })}
      </div>
    </div>
  );
};

export default PostsUserProfile;

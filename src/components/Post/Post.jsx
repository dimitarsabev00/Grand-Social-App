import HeaderPost from "./HeaderPost";
import ImagePost from "./ImagePost";
import ActionsPost from "./ActionsPost";
import { useRef } from "react";
import DescriptionPost from "./DescriptionPost";
import CommentPost from "./CommentPost";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const Post = ({ post }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const { isLoadingUserData, userProfile, setUserProfile } =
    useGetUserProfileById(post?.createdBy);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <HeaderPost authorProfile={userProfile} postID={post.id} />
      <DescriptionPost postDescription={post?.description} />
      <ImagePost postImage={post?.imageURL} />
      <ActionsPost handleFocus={handleFocus} post={post} />
      <CommentPost commentInput={commentInput} post={post} />
    </div>
  );
};

export default Post;

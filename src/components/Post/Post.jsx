import HeaderPost from "./HeaderPost";
import ImagePost from "./ImagePost";
import ActionsPost from "./ActionsPost";
import { useRef } from "react";
import DescriptionPost from "./DescriptionPost";
import CommentPost from "./CommentPost";
const Post = ({
  authorUsername,
  docId,
  totalLikes,
  likedPhoto,
  description,
  comments,
  posted,
}) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <HeaderPost authorUsername={authorUsername} />
      <DescriptionPost description={description} />
      <ImagePost />
      <ActionsPost
        docId={docId}
        totalLikes={totalLikes}
        likedPhoto={likedPhoto}
        handleFocus={handleFocus}
      />
      <CommentPost
        docId={docId}
        comments={comments}
        posted={posted}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;

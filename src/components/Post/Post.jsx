import HeaderPost from "./HeaderPost";
import ImagePost from "./ImagePost";
import ActionsPost from "./ActionsPost";
import { useRef } from "react";
import FooterPost from "./FooterPost";
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
      <ImagePost />
      <ActionsPost
        docId={docId}
        totalLikes={totalLikes}
        likedPhoto={likedPhoto}
        handleFocus={handleFocus}
      />
      <FooterPost description={description} authorUsername={authorUsername} />
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

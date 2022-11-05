import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AddCommentPost from "./AddCommentPost";
const CommentPost = ({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) => {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 0 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => {
          return (
            <p key={`${item.comment}-${item.username}`} className="mb-1">
              <Link to={`/profile/${item.username}`}>
                <span className="mr-1 font-bold">{item.username}</span>
              </Link>
              <span>{item.comment}</span>
            </p>
          );
        })}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddCommentPost
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default CommentPost;

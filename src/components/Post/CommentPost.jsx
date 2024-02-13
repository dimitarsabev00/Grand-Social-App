import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCommentPost from "./AddCommentPost";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { timeAgo } from "../../utils/timeAgo";
const CommentPost = ({ commentInput, post }) => {
  const authUser = useSelector(selectUser);

  const [commentsSlice, setCommentsSlice] = useState(3);

  const { isLoadingUserData, userProfile, setUserProfile } =
    useGetUserProfileById(post?.createdBy);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {post?.comments?.slice(0, commentsSlice)?.map((item) => (
          <p key={item.id} className="mb-1">
            <Link to={`/profile/${userProfile?.username}`}>
              <span className="mr-1 font-bold">{userProfile?.username}</span>
            </Link>
            <span>{item?.comment}</span>
          </p>
        ))}
        {post?.comments.length >= 3 &&
          commentsSlice < post?.comments.length && (
            <button
              className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
              type="button"
              onClick={showNextComments}
            >
              View more comments
            </button>
          )}

        <p className="text-gray-base uppercase text-xs mt-2">
          {timeAgo(post?.createdAt)}
        </p>
      </div>
      {authUser && (
        <AddCommentPost postID={post.id} commentInput={commentInput} />
      )}
    </>
  );
};

export default CommentPost;

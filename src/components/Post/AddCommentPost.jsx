import React, { useState } from "react";
import usePostComment from "../../hooks/usePostComment";

const AddCommentPost = ({ commentInput, postID }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(postID, comment);
    setComment("");
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          ref={commentInput}
        />
        <button
          disabled={comment.length < 1 || isCommenting}
          type="submit"
          className={`text-sm font-bold ${
            (comment.length < 1 || isCommenting) && "opacity-25"
          }`}
        >
          {isCommenting ? <div className="spinner-in-button"></div> : "Post"}
        </button>
      </form>
    </div>
  );
};

export default AddCommentPost;

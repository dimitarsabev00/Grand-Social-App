import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import { db } from "../../configs/firebase";

const AddCommentPost = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    setComments([...comments, { username: user.username, comment }]);
    setComment("");

    const postDoc = doc(db, "posts", docId);
    const newField = {
      comments: arrayUnion({ username: user.username, comment }),
    };
    await updateDoc(postDoc, newField);
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment ..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddCommentPost;

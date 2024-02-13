import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../app/features/userSlice";
import { addCommentInPost } from "../app/features/postsSlice";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser) return toast.error("You must be logged in to comment");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      dispatch(addCommentInPost({ postId, newComment }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  removePostInUserProfile,
  selectUser,
} from "../../app/features/userSlice";
import { db, storage } from "../../configs/firebase";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deletePost } from "../../app/features/postsSlice";
import { toast } from "react-hot-toast";
import useFollowUser from "../../hooks/useFollowUser";
const HeaderPost = ({ authorProfile, postID }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { pathname } = useLocation();
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    authorProfile?.uid
  );

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const imageRef = ref(storage, `posts/${postID}`);
      await deleteObject(imageRef);
      const userRef = doc(db, "users", authUser.uid);
      await deleteDoc(doc(db, "posts", postID));

      await updateDoc(userRef, {
        posts: arrayRemove(postID),
      });
      dispatch(deletePost({ postID }));
      dispatch(removePostInUserProfile({ postID }));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-between items-center h-4 p-4 py-8 relative">
      <Link
        to={`/profile/${authorProfile?.username}`}
        className="flex items-center"
      >
        <img
          src={authorProfile?.photoURL}
          alt=""
          className="rounded-full h-8 w-8 flex mr-3"
        />
        <p className="font-bold">{authorProfile?.username}</p>
      </Link>
      {/* // Three Dot Icon */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg> */}
      {authUser?.uid !== authorProfile?.uid &&
        !pathname.includes("/profile") && (
          <button
            type="button"
            className={`text-xs font-bold text-blue-600 hover:text-blue-400 flex justify-center items-center ${
              isUpdating && "opacity-50"
            }`}
            onClick={handleFollowUser}
          >
            {isUpdating ? (
              <div className="spinner-in-button"></div>
            ) : (
              "Unfollow"
            )}
          </button>
        )}

      {authUser?.uid === authorProfile?.uid && (
        <div className="absolute right-2 top-3 cursor-pointer rounded-[50%] p-[6px]">
          {isDeleting ? (
            <div className="spinner-in-button"></div>
          ) : (
            <DeleteIcon
              className="text-black hover:text-red-500"
              onClick={handleDeletePost}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderPost;

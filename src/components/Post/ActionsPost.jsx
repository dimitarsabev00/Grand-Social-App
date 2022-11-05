import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import { db } from "../../configs/firebase";

const ActionsPost = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const { uid } = useSelector(selectUser);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    const userDoc = doc(db, "posts", docId);
    const newField = {
      likes: toggleLiked ? arrayRemove(uid) : arrayUnion(uid),
      userLikedPhoto: !toggleLiked,
    };
    await updateDoc(userDoc, newField);
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };
  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLiked}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLiked ? "fill-red text-red-primary" : "text-black-light"
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ActionsPost;

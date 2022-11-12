import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import { db } from "../../configs/firebase";

const CreatePost = () => {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);

  const postsCollectionRef = collection(db, "posts");
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setInput("");
    await addDoc(postsCollectionRef, {
      authorUsername: user.username,
      description: input,
      likes: [],
      comments: [],
      userLikedPhoto: false,
      imageUrl: "",
      dateCreated: Date.now(),
      userId: user.uid,
    });
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 mb-9">
      <div className="flex space-x-4 p-4 items-center">
        <img src={user.avatar} alt="" className="rounded-full w-16 mr-3" />
        <form onSubmit={handleCreatePost} className="flex flex-1">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder={`What's in your mind ${user.username}?`}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
          />
          <button type="submit" className="hidden">
            Post
          </button>
        </form>
      </div>
      <div className="flex p-3 border-t">
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-7 text-green-400 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="text-sm sm:text-sm xl:text-base">Photo/Video</p>
        </div>

        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-7 text-red-500"
          >
            <path
              stroke-linecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>

          <p className="text-sm sm:text-sm xl:text-base">Live Video</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

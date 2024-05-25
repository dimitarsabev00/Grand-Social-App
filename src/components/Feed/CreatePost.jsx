import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import usePreviewImg from "../../hooks/usePreviewImg";
import CloseIcon from "@mui/icons-material/Close";
import useCreatePost from "../../hooks/useCreatePost";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postDescription, setPostDescription] = useState("");
  const authUser = useSelector(selectUser);
  const navigate = useNavigate();

  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const imageRef = useRef(null);

  const { isLoading, handleCreatePost } = useCreatePost();
  const handlePostCreation = async (e) => {
    e.preventDefault();
    try {
      await handleCreatePost(selectedFile, postDescription);
      setPostDescription("");
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-md text-gray-500 font-medium mt-6 mb-9">
      <div className="flex space-x-4 p-4">
        <img
          src={authUser?.photoURL}
          alt=""
          className="rounded-full h-12 w-12 md:h-16 md:w-16 flex object-cover cursor-pointer"
          onClick={() => navigate(`/profile/${authUser?.username}`)}
        />
        <form onSubmit={handlePostCreation} className="flex flex-1 flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            onChange={(e) => {
              setPostDescription(e.target.value);
            }}
            value={postDescription}
            placeholder={`What's in your mind ${authUser?.username}?`}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none w-full"
          />
          <button
            disabled={isLoading}
            className={`text-sm rounded-full text-black font-semibold border hover:border-gray-500 px-5 py-3 w-full sm:w-auto ${
              isLoading && "opacity-50"
            }`}
            type="submit"
          >
            {isLoading ? <div className="spinner-in-button"></div> : "Post"}
          </button>
        </form>
      </div>
      {selectedFile && (
        <div className="flex justify-center items-center relative h-64 sm:h-80 md:h-96 lg:h-500">
          <img
            src={selectedFile}
            alt={`Selected file`}
            className="h-full w-full flex object-contain"
          />
          <div className="absolute right-2 top-3 cursor-pointer hover:bg-gray-500 rounded-full p-1.5">
            <CloseIcon
              className="text-white"
              onClick={() => {
                setSelectedFile(null);
              }}
            />
          </div>
        </div>
      )}
      <div
        className="flex p-3 border-t"
        onClick={() => imageRef.current.click()}
      >
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-7 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="text-sm sm:text-sm xl:text-base">Photo</p>
        </div>
        <input type="file" hidden ref={imageRef} onChange={handleImageChange} />
      </div>
    </div>
  );
};

export default CreatePost;

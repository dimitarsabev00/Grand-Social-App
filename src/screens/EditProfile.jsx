import React, { useRef, useState } from "react";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/userSlice";
import usePreviewImg from "../hooks/usePreviewImg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useEditProfile from "../hooks/useEditProfile";

const EditProfile = () => {
  const { isUpdating, editProfile } = useEditProfile();

  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

  const authUser = useSelector(selectUser);
  const [formDate, setFormDate] = useState({
    firstName: authUser?.firstName,
    lastName: authUser?.lastName,
    username: authUser?.username,
    bio: authUser?.bio || "",
  });

  const fileRef = useRef(null);

  const navigate = useNavigate();
  const handleEditProfile = async () => {
    try {
      await editProfile(formDate, selectedFile);
      setSelectedFile(null);
      navigate(`/profile/${formDate?.username}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <div className="flex flex-col items-center">
            <div className="container flex justify-center items-center">
              <img
                src={selectedFile || authUser?.photoURL}
                alt={` profile picture`}
                className="rounded-full h-40 w-40 flex object-fill"
              />
            </div>
            <button
              className="text-sm rounded text-black font-semibold  border border-gray-500 p-1 w-[300px] mt-5 "
              type="button"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Edit Profile Avatar
            </button>
            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="flex items-center justify-center flex-col col-span-2">
            <div className="container mt-4 flex flex-col gap-2">
              <p className="font-medium">First Name</p>
              <input
                type="text"
                placeholder="Enter your First Name"
                className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
                value={formDate?.firstName}
                onChange={(e) =>
                  setFormDate({ ...formDate, firstName: e.target.value })
                }
              />
            </div>
            <div className="container mt-4 flex flex-col gap-2">
              <p className="font-medium">Last Name</p>
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
                value={formDate?.lastName}
                onChange={(e) =>
                  setFormDate({ ...formDate, lastName: e.target.value })
                }
              />
            </div>
            <div className="container mt-4 flex flex-col gap-2">
              <p className="font-medium">Username</p>
              <input
                type="text"
                placeholder="Enter your username"
                className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
                value={formDate?.username}
                onChange={(e) =>
                  setFormDate({ ...formDate, username: e.target.value })
                }
              />
            </div>
            <div className="container mt-4 flex flex-col gap-2">
              <p className="font-medium">Bio</p>
              <textarea
                type="text"
                placeholder="Enter your Bio"
                className="text-sm text-gray-500 w-full py-5 px-4 border border-gray-300 rounded"
                value={formDate?.bio}
                onChange={(e) =>
                  setFormDate({ ...formDate, bio: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              onClick={handleEditProfile}
              className={`text-sm rounded text-black font-semibold  border border-gray-500 p-1 w-[300px] mt-5  flex justify-center items-center${
                isUpdating && "opacity-50"
              }`}
            >
              {isUpdating ? <div className="spinner-in-button"></div> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

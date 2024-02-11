import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../configs/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setAuthUser, setUserProfile } from "../app/features/userSlice";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const editProfile = async (formDate, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(db, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      const updatedUser = {
        ...authUser,
        firstName: formDate.firstName || authUser.firstName,
        lastName: formDate.lastName || authUser.lastName,
        username: formDate.username || authUser.username,
        bio: formDate.bio || authUser.bio,
        photoURL: URL || authUser.photoURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      dispatch(setAuthUser({ ...updatedUser }));
      dispatch(setUserProfile({ ...updatedUser }));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;

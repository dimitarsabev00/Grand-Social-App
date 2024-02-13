import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { toast } from "react-hot-toast";

const useGetUserProfileById = (userId) => {
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
        setIsLoadingUserData(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(db, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoadingUserData(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, userId]);

  return { isLoadingUserData, userProfile, setUserProfile };
};

export default useGetUserProfileById;

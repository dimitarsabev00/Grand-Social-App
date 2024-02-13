import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserProfile,
  setUserProfile,
} from "../app/features/userSlice";
import { toast } from "react-hot-toast";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = useSelector(selectUserProfile);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return dispatch(setUserProfile(null));

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        dispatch(setUserProfile({ ...userDoc }));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, toast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;

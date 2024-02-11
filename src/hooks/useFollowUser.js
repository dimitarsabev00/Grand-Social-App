import { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import {
  selectUser,
  selectUserProfile,
  setAuthUser,
  setUserProfile,
} from "../app/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const authUser = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(db, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(db, "users", userId);
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        // unfollow functionality
        dispatch(
          setAuthUser({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        if (userProfile)
          dispatch(
            setUserProfile({
              ...userProfile,
              followers: userProfile.followers.filter(
                (uid) => uid !== authUser.uid
              ),
            })
          );

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        // follow functionality
        dispatch(
          setAuthUser({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );

        if (userProfile)
          dispatch(
            setUserProfile({
              ...userProfile,
              followers: [...userProfile.followers, authUser.uid],
            })
          );

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;

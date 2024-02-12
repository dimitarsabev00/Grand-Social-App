import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../app/features/userSlice";
import { toast } from "react-hot-toast";
import { setPosts } from "../app/features/postsSlice";

const useGetUserPosts = () => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const posts = useSelector((state) => state.postsSlice.posts);
  const userProfile = useSelector(selectUserProfile);

  const dispatch = useDispatch();
  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoadingPosts(true);
      dispatch(setPosts([]));

      try {
        const q = query(
          collection(db, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        dispatch(setPosts([...posts]));
      } catch (error) {
        toast.error(error.message);
        dispatch(setPosts([]));
      } finally {
        setIsLoadingPosts(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile]);

  return { isLoadingPosts, posts };
};

export default useGetUserPosts;

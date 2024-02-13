import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserProfile } from "../app/features/userSlice";
import { toast } from "react-hot-toast";
import { setPosts } from "../app/features/postsSlice";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.postsSlice.posts);

  const authUser = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        dispatch(setPosts([]));

        return;
      }
      const q = query(
        collection(db, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        dispatch(setPosts([...feedPosts]));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;

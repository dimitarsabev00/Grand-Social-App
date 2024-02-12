import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPostInUserProfile,
  selectUser,
  selectUserProfile,
} from "../app/features/userSlice";
import { useLocation } from "react-router-dom";
import { db, storage } from "../configs/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "react-hot-toast";
import { createPost } from "../app/features/postsSlice";

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleCreatePost = async (selectedFile, postDescription) => {
    if (isLoading) return;
    if (!postDescription) throw new Error("Please write description for post");
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost = {
      description: postDescription,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser?.uid,
    };
    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      const userDocRef = doc(db, "users", authUser?.uid);
      const imageRef = ref(storage, `posts/${postDocRef?.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef?.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile?.uid === authUser?.uid)
        dispatch(createPost({ ...newPost, id: postDocRef?.id }));

      if (pathname !== "/" && userProfile?.uid === authUser?.uid)
        dispatch(addNewPostInUserProfile({ ...newPost, id: postDocRef?.id }));

      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;

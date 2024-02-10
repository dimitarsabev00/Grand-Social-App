import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../configs/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { login } from "../app/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

const useSignUpWithEmailAndPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const signup = async (data) => {
    setLoading(true);

    const usersRef = collection(db, "users");

    const q = query(usersRef, where("username", "==", data?.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error("Username already exists");
      setLoading(false);
      return;
    }

    try {
      const newUserCredential = await createUserWithEmailAndPassword(
        data?.email,
        data?.password
      );

      const newUser = newUserCredential?.user;

      if (!newUser) {
        toast.error("Email already exists");
        setLoading(false);
        return;
      }

      const userDoc = {
        uid: newUser.uid,
        email: data?.email,
        username: data?.username,
        firstName: data?.firstName,
        lastName: data?.lastName,
        bio: "",
        photoURL: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };
      await updateProfile(newUser, {
        displayName: data?.username,
        photoURL: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
      });
      await setDoc(doc(db, "users", newUser?.uid), userDoc);
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      dispatch(login({ ...userDoc }));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUpWithEmailAndPassword;

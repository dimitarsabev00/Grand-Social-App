import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { toast } from "react-hot-toast";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return toast.error("User not found");
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      toast.error(error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;

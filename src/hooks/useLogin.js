import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../configs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../app/features/userSlice";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const logIn = async (data) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        data.email,
        data.password
      );
      const tryLogInUser = userCredential?.user;

      if (!tryLogInUser) {
        toast.error("Еmail or password is incorrect!");
        setLoading(false);
        return;
      }
      if (userCredential) {
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        setLoading(false);
        dispatch(login({ ...docSnap.data() }));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return { loading, logIn };
};

export default useLogin;

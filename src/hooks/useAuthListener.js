import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../app/features/userSlice";
import { auth } from "../configs/firebase";

const useAuthListener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userAuth"))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const funcListener = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        localStorage.setItem("userAuth", JSON.stringify(userAuth));
        setUser(userAuth);

        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            username: userAuth.displayName,
          })
        );
      } else {
        localStorage.removeItem("userAuth");
        setUser(null);
        dispatch(logout());
      }
    });

    return () => funcListener();
  }, []);

  return { user };
};

export default useAuthListener;

import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout } from "../app/features/userSlice";

const useLogout = () => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { handleLogout };
};

export default useLogout;

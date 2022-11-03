import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/userSlice";
import { getUserByUserId } from "../services/firebase";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const user = useSelector(selectUser);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    };
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
};

export default useUser;

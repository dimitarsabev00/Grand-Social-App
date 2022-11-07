import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/Header/Header";
import UserProfile from "../components/Profile/UserProfile";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExist, setUserExist] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserExist = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
        setUserExist(true);
      } else {
        navigate("/not-found");
      }
    };
    checkUserExist();
  }, [username, navigate]);

  return userExist ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile />
      </div>
    </div>
  ) : null;
};

export default Profile;

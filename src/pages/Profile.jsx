import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/Header/Header";
import UserProfile from "../components/Profile/UserProfile";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserExist = async () => {
      const [user] = await getUserByUsername(username);
      if (user.userId) {
        setUser(user);
      } else {
        navigate("/not-found");
      }
    };
    checkUserExist();
  }, [username, navigate]);

  return user?.username ? (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;

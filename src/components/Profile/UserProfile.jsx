import { useEffect } from "react";
import HeaderUserProfile from "./HeaderUserProfile";

const UserProfile = ({ username }) => {
  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {};
    getProfileInfoAndPhotos();
  }, []);

  return (
    <div>
      <HeaderUserProfile />
    </div>
  );
};

export default UserProfile;

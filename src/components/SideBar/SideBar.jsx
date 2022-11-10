import { memo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import useUser from "../../hooks/useUser";
import Suggestions from "./Suggestions";
import User from "./User";
const SideBar = () => {
  const user = useSelector(selectUser);

  const {
    user: { docId, fullName, username, userId, following, userAvatar },
  } = useUser();

  return (
    <div className="p-4">
      {user ? (
        <>
          <User
            username={username}
            fullName={fullName}
            userAvatar={userAvatar}
          />
          <Suggestions
            userId={userId}
            following={following}
            loggedInUserDocId={docId}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(SideBar);

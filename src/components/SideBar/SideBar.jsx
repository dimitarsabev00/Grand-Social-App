import { memo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import useUser from "../../hooks/useUser";
import Suggestions from "./Suggestions";
import User from "./User";
const SideBar = () => {
  const user = useSelector(selectUser);

  const {
    user: {
      docId,
      firstName,
      lastName,
      username,
      userId,
      following,
      userAvatar,
    },
  } = useUser();

  return (
    <div className="p-4">
      {user ? (
        <>
          <User
            username={username}
            fullName={`${firstName} ${lastName}`}
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
      <div className="text-xs text-black mt-4">
        © 2024 Built By{" "}
        <a
          href="https://github.com/dimitarsabev00/"
          target="_blank"
          // style={{ color: "blue", fontSize: "14px" }}
          className=" text-sm text-blue-600"
        >
          dimitarsabev00
        </a>
      </div>
    </div>
  );
};

export default memo(SideBar);

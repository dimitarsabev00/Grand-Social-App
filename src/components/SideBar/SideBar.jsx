import { memo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import Suggestions from "./Suggestions";
import User from "./User";
const SideBar = () => {
  const authUser = useSelector(selectUser);

  return (
    <div className="p-4">
      {authUser ? (
        <>
          <User authUser={authUser} />
          <Suggestions
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

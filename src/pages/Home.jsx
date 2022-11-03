import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../configs/firebase";
import { login, logout } from "../app/features/userSlice";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Social Media App";
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />

      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <p>Im Feed</p>
        <p>Im SideBar</p>
        {/* <Feed /> */}
        {/* <SideBar /> */}
      </div>
    </div>
  );
};

export default Home;

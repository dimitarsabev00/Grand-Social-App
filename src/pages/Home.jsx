import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
const Home = () => {
  useEffect(() => {
    document.title = "Social Media App";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />

      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg ">
        <Feed />

        <SideBar />
      </div>
    </div>
  );
};

export default Home;

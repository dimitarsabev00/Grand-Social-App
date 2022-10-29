import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { selectUser } from "./app/features/userSlice";
import Auth from "./components/Auth/Auth";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
function App() {
  const user = useSelector(selectUser);
  return (
    <div className="app">
      <Header />
      {!user ? (
        <Auth />
      ) : (
        <div className="app_body">
          <SideBar />
          <Feed />
          {/* Widgets */}
        </div>
      )}
    </div>
  );
}

export default App;

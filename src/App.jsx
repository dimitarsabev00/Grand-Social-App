import React from "react";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
function App() {
  return (
    <div className="app">
      <Header />
      <div className="app_body">
        <SideBar />
        <Feed />
        {/* Widgets */}
      </div>
    </div>
  );
}

export default App;

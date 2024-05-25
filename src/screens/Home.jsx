import { useEffect } from "react"
import Feed from "../components/Feed/Feed"
import Header from "../components/Header/Header"
import SideBar from "../components/SideBar/SideBar"

const Home = () => {
  useEffect(() => {
    document.title = "Grand Social"
  }, [])

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Feed className="col-span-2 md:col-span-2" />
        <SideBar className="col-span-1 md:col-span-1" />
      </div>
    </div>
  )
}

export default Home

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import useAuthListener from "./hooks/useAuthListener";
import ReactLoader from "./components/ReactLoader/loader";
import { Toaster } from "react-hot-toast";

const Profile = lazy(() => import("./screens/Profile"));
const Home = lazy(() => import("./screens/Home"));
const SignUp = lazy(() => import("./screens/SignUp"));
const Login = lazy(() => import("./screens/Login"));
const ErrorPage = lazy(() => import("./screens/ErrorPage"));
function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Suspense fallback={<ReactLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("userAuth") ? (
                <Home />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/not-found" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;

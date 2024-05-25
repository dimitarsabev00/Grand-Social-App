import { lazy, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { auth } from "../configs/firebase";
import ReactLoader from "./ReactLoader/loader";
import { Toaster } from "react-hot-toast";

const EditProfile = lazy(() => import("../screens/EditProfile"));
const Profile = lazy(() => import("../screens/Profile"));
const Home = lazy(() => import("../screens/Home"));
const SignUp = lazy(() => import("../screens/SignUp"));
const Login = lazy(() => import("../screens/Login"));
const ErrorPage = lazy(() => import("../screens/ErrorPage"));

const RoutesComp = () => {
  const [user] = useAuthState(auth);

  const PrivateRoute = ({ children }) => {
    let location = useLocation();
    if (!user)
      return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
  };

  const AuthRoute = ({ children }) => {
    let location = useLocation();
    if (user) return <Navigate to={"/"} state={{ from: location }} replace />;
    return children;
  };

  return (
    <>
      <Suspense fallback={<ReactLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/editProfile/:username" element={<EditProfile />} />
          <Route path="/not-found" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top right" />
    </>
  );
};

export default RoutesComp;

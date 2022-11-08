import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import useAuthListener from "./hooks/useAuthListener";
import PrivateRoutes from "./helpers/PrivateRoute";
import ReactLoader from "./ReactLoader/loader";

const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Suspense fallback={<ReactLoader />}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/not-found" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

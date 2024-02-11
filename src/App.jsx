import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import ReactLoader from "./components/ReactLoader/loader";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./configs/firebase";
import "./App.css";
import EditProfile from "./screens/EditProfile";

const Profile = lazy(() => import("./screens/Profile"));
const Home = lazy(() => import("./screens/Home"));
const SignUp = lazy(() => import("./screens/SignUp"));
const Login = lazy(() => import("./screens/Login"));
const ErrorPage = lazy(() => import("./screens/ErrorPage"));
function App() {
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
    <Router>
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
      <Toaster position="top right"/>
    </Router>
  );
}

export default App;

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import Protected from "./components/Protected";
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading..</p>}>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/profile/:username" element={<ProfilePage />} /> */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

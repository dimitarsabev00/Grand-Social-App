import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../app/features/userSlice";
import { auth, db } from "../configs/firebase";
import { doesUsernameExist } from "../services/firebase";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password == "" || email == "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email & password");
    }
    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists.length) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(user, {
          displayName: username,
          photoURL:
            "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
        });
        const usersCollectionRef = collection(db, "users");
        await addDoc(usersCollectionRef, {
          userId: user.uid,
          username,
          firstName,
          lastName,
          email,
          userAvatar:
            "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
          following: [],
          followers: [],
          dataCreated: Timestamp.now().toDate().toDateString(),
        });
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            username: user.displayName,
            avatar: user.photoURL,
          })
        );
        navigate("/");
      } catch (error) {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");

      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Page";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen ">
      {/* <div className="flex w-3/5 ">
        <img
          src="https://media.istockphoto.com/vectors/camera-icon-simple-style-isolated-vector-illustration-on-white-vector-id1278996256?k=20&m=1278996256&s=612x612&w=0&h=bTKSsWlqGPZKZL4b-JCwU825aHySeU88-ZNFm8LFOsc="
          alt=""
        />
      </div> */}
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="https://media.istockphoto.com/vectors/camera-icon-simple-style-isolated-vector-illustration-on-white-vector-id1278996256?k=20&m=1278996256&s=612x612&w=0&h=bTKSsWlqGPZKZL4b-JCwU825aHySeU88-ZNFm8LFOsc="
              alt=""
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp}>
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <input
              aria-label="Enter your first name"
              type="text"
              placeholder="First Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
            <input
              aria-label="Enter your last name"
              type="text"
              placeholder="Last Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account? {` `}
            <Link to="/login" className="font-bold text-blue-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

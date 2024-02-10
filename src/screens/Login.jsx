import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useLogin from "../hooks/useLogin";
const Login = () => {
  const validations = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(6).required().label("Password"),
  });
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validations),
    defaultValues: {},
  });
  const isInvalid = !watch("email") || !watch("password");
  const { loading, logIn } = useLogin();

  const handleLogin = async (data) => logIn(data);

  useEffect(() => {
    document.title = "Login - Page";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen justify-center">
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-300 mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="https://media.istockphoto.com/vectors/camera-icon-simple-style-isolated-vector-illustration-on-white-vector-id1278996256?k=20&m=1278996256&s=612x612&w=0&h=bTKSsWlqGPZKZL4b-JCwU825aHySeU88-ZNFm8LFOsc="
              alt=""
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className=" flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
              {...register("email")}
            />
            {errors?.email?.message && (
              <span
                style={{
                  ...(errors?.email && { color: "red" }),
                }}
              >
                {errors?.email?.message}
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
              {...register("password")}
            />
            {errors?.password?.message && (
              <span
                style={{
                  ...(errors?.password && { color: "red" }),
                }}
              >
                {errors?.password?.message}
              </span>
            )}
            <button
              disabled={isInvalid || loading}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold flex justify-center items-center ${
                (isInvalid || loading) && "opacity-50"
              }`}
            >
              {loading ? <div className="spinner-in-button"></div> : "Sign In"}
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-300">
          <p className="text-sm">
            Don't have an account? {` `}
            <Link to="/sign-up" className="font-bold text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

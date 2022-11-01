import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../app/features/userSlice";
const Protected = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;

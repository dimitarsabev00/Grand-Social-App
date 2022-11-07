import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../app/features/userSlice";

const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

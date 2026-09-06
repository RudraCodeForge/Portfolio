import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Pages/Login";

export const ProtectedRoute = ({ children }) => {
  const { accessToken, isVerified } = useSelector((state) => state.auth);

  return isVerified && accessToken ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

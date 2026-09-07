import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import MessageDetail from "../Pages/MessageDetail";
import PortfolioForm from "../Pages/PortfolioForm";
import Profile from "../Pages/Profile";
export const ProtectedRoute = ({ children }) => {
  const { accessToken, isVerified } = useSelector((state) => state.auth);

  return isVerified && accessToken ? children : <Navigate to="/" replace />;
};

export const PublicOnlyRoute = ({ children }) => {
  const { accessToken, isVerified } = useSelector((state) => state.auth);

  return isVerified && accessToken ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/message/:id"
        element={
          <ProtectedRoute>
            <MessageDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/:section/new"
        element={
          <ProtectedRoute>
            <PortfolioForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/:section/edit/:id"
        element={
          <ProtectedRoute>
            <PortfolioForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PrivateRoute = () => {
  const { isLoggedIn, userData, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!userData?.isAccountVerified) return <Navigate to="/email-verify" replace />;

  return <Outlet />; // ✅ render child routes
};

export default PrivateRoute;

import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PrivateRoute = () => {
  const data = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.token) {
      console.log("yes");
      // navigate("/Budget", { replace: true });
    } else {
      console.log("no");
    }
  }, []);

  const location = useLocation();

  return data?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

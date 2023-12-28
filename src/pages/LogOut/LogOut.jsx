import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenUser } from "../../store/TokenSlice";

const LogOut = () => {
  const data = useSelector((state) => state.Token.token);
  const dispatch = useDispatch();
  console.log(data);
  useEffect(() => {
    localStorage.removeItem("token");

    dispatch(TokenUser(""));
    console.log(data, "00000");
  }, []);

  return <Navigate to="/login" />;
};

export default LogOut;

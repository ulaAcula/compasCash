import { useEffect, useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import {
  Budget,
  RegisterPage,
  LoginPage,
  Expenses,
  Account,
  LogOut,
  Statistick,
} from "./pages";
import { PrivateRoute, SideNavigate } from "./components";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { TokenUser } from "./store/TokenSlice";

function App() {
  const token = useSelector((state) => state.Token.token);
  const sidebarClose = useSelector((state) => state.Token.sidebar);

  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("token"));
    if (getLS?.token == token) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, [token]);
  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("token"));
    if (getLS?.token) {
      dispatch(TokenUser(getLS.token));
    }
  }, []);
  useEffect(() => {
    setSidebar(false);
  }, [sidebarClose]);

  return (
    <>
      <div className="flex">
        {sidebar && <SideNavigate />}
        <div className="positionSidebar">
          <Routes className="everything">
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/Budget" element={<Budget />} />
              <Route path="/Expenses" element={<Expenses />} />
              <Route path="/Account/:id" element={<Account />} />
              <Route path="/Reports" element={<Statistick />} />
              <Route path="/AllAccounts" element={<div>f</div>} />
            </Route>
            <Route path="/logout" element={<LogOut />} />
            <Route path="/login/password" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="*" element={<div>404</div>}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

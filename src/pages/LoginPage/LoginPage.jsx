import { useEffect, useState } from "react";
import s from "./LoginPage.module.css";
import { InputStyle, ButtonAdaptive } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import viteLogo from "../../assets/Logo.svg";
import { TokenUser } from "../../store/TokenSlice";
import axios from "axios";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem("token"));
    console.log(getLS);
    if (getLS?.token) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [NoResponse, setNoResponse] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = async (email, password) => {
      try {
        const response = await axios.post(
          "https://compass-server.onrender.com/login",
          {
            email: email,
            password: password,
          }
        );
        navigate("/");
        localStorage.setItem("token", JSON.stringify(response.data));
        localStorage.setItem(
          "userAuth",
          JSON.stringify({ login: formData.email, password: formData.password })
        );
        dispatch(TokenUser(response.data.token));
      } catch (error) {
        if (error.response) {
          console.error("Login failed:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
          setNoResponse(true);
        } else {
          console.error("Error in axios request:", error.message);
        }
      }
    };

    loginUser(formData.email, formData.password);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className={s.bg}>
        <form className={s.forma} onSubmit={handleSubmit}>
          <div>
            <img src={viteLogo} className={s.logo} alt="Vite logo" />
          </div>
          <div className={s.divWidth}></div>
          <div>
            <InputStyle
              placeholder="email"
              type="email"
              id="email"
              ThisName="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <InputStyle
              type="password"
              placeholder="password"
              id="password"
              ThisName="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <ButtonAdaptive
            type="submit"
            children={"login"}
            buttonType="loginBlue"
          />
          <div className={s.borderT}>
            {NoResponse && <div className={s.noRes}>NoResponse</div>}
            <p className={s.description}>
              This app will help you manage your budget!
            </p>
          </div>
          <Link to="/login/password">
            <ButtonAdaptive
              type="submit"
              children={"Register now"}
              buttonType="login"
            />
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

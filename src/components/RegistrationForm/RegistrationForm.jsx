import React, { useState } from "react";
import s from "./RegistrationForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputStyle, ButtonAdaptive, Line } from "../index";

import viteLogo from "../../assets/Logo.svg";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerUser = async (userData) => {
      try {
        const response = await fetch(
          "https://compass-server.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          navigate("/login");
          console.error("Response is not OK.");
        }
      } catch (error) {
        console.error("Error in fetch request:", error);
      }
    };

    registerUser(formData);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
    });
  };
  const NavigateLoginPage = () => {
    navigate("/login");
  };
  return (
    <form className={s.forma} onSubmit={handleSubmit}>
      <div className={s.formaTitle}>
        <img src={viteLogo} className={s.logo} alt="Vite logo" />
        <h1>
          Create a new account <Line type="gray" /> or <br /> Have an account?
          <ButtonAdaptive
            onClick={NavigateLoginPage}
            buttonType="transparentUnderline"
            children="Log In"
          />
        </h1>
        <h5 className={s.quick}>It’s quick and easy.</h5>
      </div>
      <div className={s.names}>
        <InputStyle
          isHalfInput
          type="text"
          id="firstName"
          ThisName="firstName"
          placeholder="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputStyle
          isHalfInput
          type="text"
          id="lastName"
          ThisName="lastName"
          placeholder="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={s.divWidth}>
        <InputStyle
          type="text"
          id="username"
          placeholder="username"
          ThisName="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <InputStyle
        placeholder="email"
        type="email"
        id="email"
        ThisName="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <InputStyle
        type="password"
        placeholder="password"
        id="password"
        ThisName="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <ButtonAdaptive type="submit" children={"Sign Up"} buttonType="login" />
    </form>
  );
};

export default RegistrationForm;

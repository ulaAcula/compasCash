import { useState, useEffect } from "react";
import clsx from "clsx";
import s from "./Tabs.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import viteLogo from "../../assets/Logo.svg";
const Tabs = ({
  type,
  onClick,
  to,
  icon,
  size2,
  size,
  nameOfRoute,
  isSidebarOpen,
  innerRef,
}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("token");
    console.log(storedData);
    const userData = storedData ? JSON.parse(storedData) : null;

    const userEmail = userData ? userData.email : "";

    setEmail(userEmail);
  }, []);
  console.log(email);
  return type == "main" ? (
    <button ref={innerRef} onClick={onClick} className={s.AcoundManager}>
      <div className={s.insideButton}>
        {/* <FontAwesomeIcon
          icon={iconMain}
          style={{ color: "#ffffff" }}
          size={size4}
        /> */}

        <img src={viteLogo} className={s.logo} alt="Vite logo" />
        {isSidebarOpen && (
          <div>
            <h1 className={s.insideButtonH1}>My Budget</h1>
            <h3 className={s.insideButtonH3}>{email}</h3>
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <span className={s.arrow}>
          <FontAwesomeIcon
            icon="caret-down"
            style={{ color: "#374d9b" }}
            size={size2}
          />
        </span>
      )}
    </button>
  ) : (
    <Link
      className={clsx(s.nameRoute, { [s.nameRouteW]: !isSidebarOpen })}
      to={to}
    >
      <FontAwesomeIcon icon={icon} style={{ color: "#ffffff" }} size={size} />
      {isSidebarOpen && <span className={s.nameRouteSpan}>{nameOfRoute}</span>}
    </Link>
  );
};

export default Tabs;

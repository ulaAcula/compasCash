import React, { useState } from "react";
import s from "./TabsOfSettings.module.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TabsOfSettings = ({ onClick, icon, text, size, fontSize = "1.5em" }) => {
  return (
    <li>
      <button onClick={onClick} className={s.yanabButton}>
        <FontAwesomeIcon
          icon={icon}
          style={{ color: "rgb(110, 122, 136)", fontSize: fontSize }}
          size={size}
        />

        <span className={s.colorCategory}>{text}</span>
      </button>
    </li>
  );
};

export default TabsOfSettings;

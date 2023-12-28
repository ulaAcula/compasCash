import { Children, useState } from "react";
import s from "./AccountLine.module.css";
import clsx from "clsx";
import { ButtonAdaptive } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const AccountLine = ({
  Tag,
  icon,
  MainTitle,
  id,
  currency,
  cash,
  to,
  isRotated,
  onClick,
  dataTransfer,
  description,
}) => {
  return Tag == "h1" ? (
    <div id={id} className={s.TagH1}>
      <div className={s.TagIconH1}>
        <FontAwesomeIcon
          icon={icon}
          style={{
            color: "#ffffff",
            transform: isRotated ? "rotate(-90deg)" : "none",
          }}
          size={"1x"}
        />
        <h2>{MainTitle}</h2>
      </div>
      {cash < 0 ? (
        <ButtonAdaptive buttonType="negative">{`-$${
          cash * -1
        }`}</ButtonAdaptive>
      ) : (
        <span>
          {currency}
          {cash}
        </span>
      )}
    </div>
  ) : (
    <li id={id} className={s.liStyle}>
      <Link className={s.linkStyle} to={`${to}`}>
        <div className={s.TagIconH1}>
          <div onClick={onClick} className={s.HoverNone}>
            <ButtonAdaptive onClick={dataTransfer} buttonType="transparent">
              <FontAwesomeIcon
                icon={icon}
                style={{ color: "#ffffff" }}
                size={"1x"}
              />
            </ButtonAdaptive>
          </div>

          <h3>{MainTitle}</h3>
        </div>
        {cash < 0 ? (
          <ButtonAdaptive buttonType="negative">{`-$${
            cash * -1
          }`}</ButtonAdaptive>
        ) : (
          <span>
            {currency}
            {cash}
          </span>
        )}
      </Link>
    </li>
  );
};

export default AccountLine;

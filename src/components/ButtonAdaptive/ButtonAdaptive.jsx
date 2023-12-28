import React from "react";
import clsx from "clsx";
import s from "./ButtonAdaptive.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ButtonAdaptive = ({
  buttonType,
  children,
  type,
  onClick,
  classSecond,
  checked,
  value,
  disabled,
  onKeyDown,
  style,
}) => {
  const buttonClass = clsx({
    [s.loginButton]: buttonType === "login",
    [s.transparent]: buttonType === "transparent",
    [s.transparentWhite]: buttonType === "transparentWhite",
    [s.transparentWithUnderline]: buttonType === "transparentUnderline",
    [s.findButton]: buttonType === "find",
    [s.saveButton]: buttonType === "save",
    [s.delateButton]: buttonType === "delate",
    [s.cancelButton]: buttonType === "cancel",
    [s.NextButton]: buttonType === "next",
    [s.nextDisabled]: buttonType === "nextDisabled",
    [s.categotiesOfaccount]: buttonType === "categotiesOfaccount",
    [s.loginButtonBlue]: buttonType === "loginBlue",
    [s.availble]: buttonType === "availble",
    [s.overspent]: buttonType === "overspent",
    [s.zero]: buttonType === "zero",
    [s.negative]: buttonType === "negative",
  });

  return (
    <button
      style={style}
      disabled={disabled}
      onClick={onClick}
      className={clsx(buttonClass, classSecond)}
      type={type}
      value={value}
      onKeyDown={onKeyDown}
    >
      {children}
      {checked && (
        <FontAwesomeIcon
          icon="check"
          style={{
            color: "#374d9b",
            transform: "none",
          }}
          size={"1x"}
        />
      )}
    </button>
  );
};

export default ButtonAdaptive;

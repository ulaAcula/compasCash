import React, { useState } from "react";
import s from "./InputStyle.module.css";
import clsx from "clsx";

const InputStyle = ({
  type,
  placeholder,
  id,
  ThisName,
  value,
  onChange,
  isHalfInput,
  classSecond,
  onKeyDown,
  InputOrTextArea,
  onClick,
}) => {
  const inputClass = clsx({
    [s.halfInput]: isHalfInput,
    [s.fullInput]: !isHalfInput,
  });
  return InputOrTextArea == "textArea" ? (
    <textarea
      className={clsx(inputClass, classSecond)}
      type={type}
      placeholder={placeholder}
      id={id}
      name={ThisName}
      value={value || ""}
      onChange={onChange}
      required
      cols="30"
    ></textarea>
  ) : (
    <input
      onKeyDown={onKeyDown}
      className={clsx(inputClass, classSecond)}
      type={type}
      placeholder={placeholder}
      id={id}
      name={ThisName}
      value={value}
      onChange={onChange}
      onClick={onClick}
      required
    />
  );
};

export default InputStyle;

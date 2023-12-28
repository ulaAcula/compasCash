import React, { useState } from "react";
import s from "./Line.module.css";
import clsx from "clsx";

const Line = ({ type, classSecond }) => {
  const inputClass = clsx({
    [s.lineGray]: type == "gray",
    [s.lineGray05]: type == "gray05",
    [s.lineGrayMargin]: type == "grayMargin",
    [s.LineBlack]: type == "black",
  });
  return <div className={clsx(inputClass, classSecond)}></div>;
};

export default Line;

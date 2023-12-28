import React from "react";
import s from "./CheckBox.module.css";
import clsx from "clsx";

const CheckBox = ({ checkedState, onChange, classSecond }) => {
  return (
    <div className={clsx(s.notAlight, classSecond)}>
      <input
        disabled
        checked={checkedState}
        type="checkbox"
        id="myCheckbox"
        onChange={onChange}
      />
      <label htmlFor="myCheckbox"></label>
    </div>
  );
};

export default CheckBox;

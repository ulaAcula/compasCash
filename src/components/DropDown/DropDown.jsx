import { useState } from "react";
import s from "./DropDown.module.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DropDown = ({ options, onSelect, id, onClick, fake, valueOfchecked }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return !fake ? (
    <div onClick={onClick} className={s.dropdownDiv}>
      <select
        id={id}
        value={selectedOption}
        onChange={(e) => handleSelect(e.target.value)}
        className={s.dropdown}
        placeholder="Select account type"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={s.arrowLeft}>
        <FontAwesomeIcon
          icon="sort-down"
          style={{
            color: "#3b5eda",
            transform: "rotate(-90deg)",
          }}
          size={"1x"}
        />
      </div>
    </div>
  ) : (
    <div onClick={onClick} className={s.dropdownDiv}>
      <input
        id={id}
        value={valueOfchecked}
        onChange={(e) => handleSelect(e.target.value)}
        className={s.dropdown}
        placeholder="Select account type"
      />
      <div className={s.arrowLeft}>
        <FontAwesomeIcon
          icon="sort-down"
          style={{
            color: "#3b5eda",
            transform: "rotate(-90deg)",
          }}
          size={"1x"}
        />
      </div>
    </div>
  );
};

export default DropDown;

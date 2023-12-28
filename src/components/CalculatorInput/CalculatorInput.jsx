import { useState, useRef, useEffect } from "react";
import s from "./CalculatorInput.module.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { Rerender } from "../../store/EditAccSlice";
import { Assigned } from "../../store/AssignedSlice";
const CalculatorInput = ({ activate, valueOfAssig, nameOfCategory, List }) => {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [inputSymbolab, setInputSymbolab] = useState("$");

  const [inputValue, setInputValue] = useState(valueOfAssig);
  const [PrewinputValue, setPrewInputValue] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (activate) {
      inputRef.current.focus();
      setTimeout(() => {
        inputRef.current.select();
      }, 5);
      removeDollar();
    }
  }, [activate]);
  const removeDollar = () => {
    if (inputSymbolab && inputSymbolab.includes("$")) {
      const newValue = inputSymbolab.replace("$", "");
      setInputSymbolab(newValue);
    } else {
      if (document.activeElement === inputRef.current) {
        return;
      }
      setInputSymbolab("$");
    }
  };
  const handleClick = () => {
    removeDollar();
    setTimeout(() => {
      inputRef.current.select();
    }, 5);

    inputRef.current.blur();
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleOutsideClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setInputSymbolab("$");
    }
  };
  useEffect(() => {
    const value = valueOfAssig;
    setInputValue(value);
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      inputRef.current.blur();
      setInputSymbolab("$");
      if (Number(inputValue) !== Number(PrewinputValue)) {
        dispatch(
          Assigned({
            categoryNameToUpdate: nameOfCategory,
            listItemToUpdate: List,
            assignedToUpdate: inputValue,
          })
        );
        setTimeout(() => {
          dispatch(Rerender());
        }, 50);
      }
    }
  };
  useEffect(() => {
    if (inputSymbolab === "$") {
      const newValue = inputValue;
      if (/^\d+$/.test(newValue)) {
        setInputValue(`${newValue}.00`);
      } else if (/^\d+\.\d$/.test(newValue)) {
        setInputValue(`${newValue}0`);
      } else if (/^\d+(\.\d{0,2})?$/.test(newValue)) {
        setInputValue(newValue);
      } else {
        setInputValue("0.00");
      }
    }
  }, [inputSymbolab, inputValue]);
  useEffect(() => {
    if (true) {
      setPrewInputValue(inputValue);
    }
  }, [isFocused]);

  const FinallyBlur = () => {
    setIsFocused(false);
    if (Number(inputValue) !== Number(PrewinputValue)) {
      dispatch(
        Assigned({
          categoryNameToUpdate: nameOfCategory,
          listItemToUpdate: List,
          assignedToUpdate: inputValue,
        })
      );
      setTimeout(() => {
        dispatch(Rerender());
      }, 50);
    }
  };

  return (
    <div className={s.inputCalculator}>
      <div className={clsx(s.InputContainer, { [s.focused]: isFocused })}>
        <FontAwesomeIcon
          className={clsx(s.calculator, { [s.focused]: isFocused })}
          icon="calculator"
          size={"1x"}
        />

        <input
          ref={inputRef}
          value={`${inputSymbolab}${inputValue}`}
          className={s.MainInput}
          type="text"
          onClick={handleClick}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={FinallyBlur}
          onKeyDown={handleEnterKey}
        />
      </div>
      <div className={s.HoverNone}>
        <FontAwesomeIcon
          icon="clock-rotate-left"
          style={{
            cursor: "pointer",
            color: "#374d9b",
            transform: "none",
          }}
          size={"1x"}
        />
      </div>
    </div>
  );
};

export default CalculatorInput;

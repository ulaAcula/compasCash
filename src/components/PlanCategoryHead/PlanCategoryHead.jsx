import { useEffect, useState, useRef } from "react";
import s from "./PlanCategoryHead.module.css";
import clsx from "clsx";
import { CheckBox, Line, ButtonAdaptive, MiniModal } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateEachSatate,
  UpdateSatate,
  FindAndChange,
} from "../../store/StateManagerSlice";
const PlanCategoryHead = ({
  children,
  AboveItem,
  selfItem,
  Type,
  toSumUp,
  toSumUpAssigned,
  toSumUpActivity,
  CategoryOfcell,
}) => {
  const data1 = useSelector((state) => state.StateManager);
  const data2 = useSelector((state) => state.Assigned);
  const position = useSelector((state) => state.EditAcc.positionSidebar);
  const dispatch = useDispatch();
  const [isCheckedCatego, setCheckedCatego] = useState(false);

  useEffect(() => {
    if (data1) {
      const frequentCategory = data1.find(
        (category) => category.nameOfCategory === CategoryOfcell
      );
      setCheckedCatego(frequentCategory);
    }
  }, [data1]);

  const MainCategoryChange = () => {
    dispatch(UpdateEachSatate());
    dispatch(UpdateSatate());
  };

  const FindChange = () => {
    console.log("find work");
    console.log(isCheckedCatego.nameOfCategory);
    dispatch(FindAndChange(isCheckedCatego.nameOfCategory));
    console.log(data1);
  };

  const [isChildrenVisible, setChildrenVisible] = useState(true);

  const handleCheckBoxClose = () => {
    setChildrenVisible(!isChildrenVisible);
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [data2]);

  const [isOpen1, setIsOpen1] = useState(false);
  const [Xcordinate, setXcordinate] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen1(false);
      }
    };

    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [dropdownRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen1(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsOpen1(true);

    setXcordinate(event.clientX);
  };
  useEffect(() => {
    setIsOpen1(false);
  }, [data2]);

  return Type == "main" ? (
    <div className={clsx(s.PlanAll, { [s.checked]: data1[0].EachSatate })}>
      <Line type="gray05" />
      <div className={clsx(s.PlanCategoryHead, s.needPadd)}>
        <div onClick={MainCategoryChange}>
          <CheckBox
            checkedState={data1[0].EachSatate}
            onChange={MainCategoryChange}
          />
        </div>

        <div onClick={handleCheckBoxClose} className={s.iconManager}>
          <FontAwesomeIcon
            icon="caret-down"
            style={{
              color: "#19223c",
              fontSize: "1.5em",
              transform: isChildrenVisible ? "rotate(0deg)" : "rotate(-90deg)",
            }}
            size="2x"
          />
          <span>CATEGORY</span>
        </div>

        <div className={s.ForPreloader}></div>
        <div className={s.amounts}>
          <div className={clsx(s.InputContainer, s.comonSize, s.NeedMargin)}>
            ASSIGNED
          </div>
          <div className={clsx(s.equal, s.comonSize)}>ACTIVITY</div>
          <div className={clsx(s.equal, s.comonSize, s.comonSizePadd)}>
            AVAILABLE
          </div>
        </div>
      </div>
      <Line type="gray05" />
      {isChildrenVisible && children}
    </div>
  ) : (
    <div
      className={clsx(s.PlanAll, s.bgSubmain, {
        [s.checked]: isCheckedCatego?.statate,
      })}
    >
      <Line type="gray05" />
      <div
        onContextMenu={handleContextMenu}
        ref={dropdownRef}
        className={s.PlanCategoryHead}
      >
        {isOpen1 && (
          <MiniModal
            headCategory="headCategory"
            AboveItem={AboveItem}
            Editor
            NameToFind={CategoryOfcell}
            namelist={CategoryOfcell}
            style={{
              left: position
                ? `${Xcordinate - 435}px`
                : `${Xcordinate - 195}px`,
            }}
            classPosition={s.positionModal}
          />
        )}
        <div className={s.solutionContainer} onClick={FindChange}>
          <CheckBox
            classSecond={s.solution}
            checkedState={isCheckedCatego?.statate}
            onChange={FindChange}
          />
        </div>
        <div className={s.iconManager}>
          <FontAwesomeIcon
            onClick={handleCheckBoxClose}
            className={s.arrowDown}
            icon="caret-down"
            style={{
              color: "#19223c",
              fontSize: "1.5em",
              transform: isChildrenVisible ? "rotate(0deg)" : "rotate(-90deg)",
            }}
            size="2x"
          />
          <span>{CategoryOfcell}</span>

          <div ref={menuRef} className={s.relativePlas}>
            <ButtonAdaptive
              onClick={handleToggle}
              classSecond={s.hoverNone}
              buttonType="transparent"
            >
              <FontAwesomeIcon
                icon="circle-plus"
                style={{ color: "#3b5eda", fontSize: "1.2em" }}
              />
            </ButtonAdaptive>
            {isOpen && (
              <MiniModal
                NameToFind={CategoryOfcell}
                classPosition={s.positionModal}
              />
            )}
          </div>
        </div>
        <div className={s.ForPreloader}></div>
        <div className={s.amounts}>
          <div className={s.InputContainer}>${toSumUpAssigned}</div>

          <div className={s.equal}>
            <ButtonAdaptive buttonType="transparentUnderline">
              {toSumUpActivity < 0
                ? `-$${Math.abs(toSumUpActivity)}`
                : `$${toSumUpActivity}`}
            </ButtonAdaptive>
          </div>
          <div className={s.equal}>
            {toSumUp < 0 ? `-$${Math.abs(toSumUp)}` : `$${toSumUp}`}
          </div>
        </div>
      </div>

      <Line type="gray05" />
      {isChildrenVisible && children}
    </div>
  );
};

export default PlanCategoryHead;

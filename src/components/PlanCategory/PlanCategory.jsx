import { useEffect, useState, useRef } from "react";
import s from "./PlanCategory.module.css";
import clsx from "clsx";
import {
  CalculatorInput,
  CheckBox,
  Line,
  ButtonAdaptive,
  MiniModal,
} from "../index";
import { useDispatch, useSelector } from "react-redux";
import { JustChange, JustFalse } from "../../store/StateManagerSlice";
const PlanCategory = ({
  categoryName,
  ListCategory,
  assigned,
  availble,
  activity,
  activityOravailble,
  children,
  AboveItem,
  selfItem,
}) => {
  const data1 = useSelector((state) => state.StateManager);
  const position = useSelector((state) => state.EditAcc.positionSidebar);
  console.log();
  const dispatch = useDispatch();
  const [isCheckedCatego1, setCheckedCatego1] = useState(null);

  useEffect(() => {
    if (data1) {
      const frequentCategory = data1.find(
        (category) => category.nameOfCategory === categoryName
      );

      if (frequentCategory) {
        const transportationItem = frequentCategory.nameListCategory.find(
          (item) => item.List === ListCategory
        );

        if (transportationItem) {
          setCheckedCatego1(transportationItem);
        }
      }
    }
  }, [data1]);

  const handleCheckBoxClick = () => {
    console.log("все");
    dispatch(
      JustFalse({
        categoryNameToUpdate: categoryName,
        listItemToUpdate: isCheckedCatego1.List,
      })
    );
    dispatch(
      JustChange({
        categoryNameToUpdate: categoryName,
        listItemToUpdate: isCheckedCatego1.List,
      })
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [Xcordinate, setXcordinate] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  useEffect(() => {
    setIsOpen(false);
  }, [data1]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsOpen(true);

    setXcordinate(event.clientX);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      ref={dropdownRef}
      className={clsx(s.PlanAll, { [s.checked]: isCheckedCatego1?.statate })}
    >
      {isOpen && (
        <MiniModal
          selfItem={selfItem}
          AboveItem={AboveItem}
          Editor
          AboveNAME={categoryName}
          NameToFind={ListCategory}
          namelist={ListCategory}
          style={{
            left: position ? `${Xcordinate - 435}px` : `${Xcordinate - 195}px`,
          }}
          classPosition={s.positionModal}
        />
      )}

      <Line type="gray05" />
      <div onClick={handleCheckBoxClick} className={s.PlanCategory}>
        <CheckBox checkedState={isCheckedCatego1?.statate} />
        <div className={s.ForPreloader}>
          <div className={s.overspendRate}>
            <h2 className={s.categoryName}>{ListCategory}</h2>
            {activityOravailble == "Fully Spent" ? (
              <div className={s.InfoOfOverSpend}>
                <span>{activityOravailble}</span>
              </div>
            ) : (
              <div className={s.InfoOfOverSpend}>
                <span>{activityOravailble}</span>
                <span>{activity}</span>
                <span>of</span>
                <span>{assigned}</span>
              </div>
            )}
          </div>
          {children}
        </div>
        <div className={s.amounts}>
          <CalculatorInput
            nameOfCategory={categoryName}
            List={isCheckedCatego1 && isCheckedCatego1.List}
            valueOfAssig={assigned}
            activate={isCheckedCatego1 && isCheckedCatego1.statate}
          />
          <div className={clsx(s.equal, s.activity)}>
            <ButtonAdaptive buttonType="transparentUnderline">
              {`-$${activity}`}
            </ButtonAdaptive>
          </div>
          <div className={s.equal}>
            {availble && (
              <ButtonAdaptive
                buttonType={
                  availble.replace("$", "") > 0
                    ? "availble"
                    : availble.replace("$", "") < 0
                    ? "overspent"
                    : "zero"
                }
              >
                {availble < 0 ? `-$${Math.abs(availble)}` : `$${availble}`}
                {availble % 1 == 0 ? `.00` : `${""}`}
              </ButtonAdaptive>
            )}
          </div>
        </div>
      </div>
      <Line type="gray05" />
    </div>
  );
};

export default PlanCategory;

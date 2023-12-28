import { useEffect, useState, useRef, Children } from "react";
import clsx from "clsx";
import s from "./AddTransaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckBox,
  Line,
  MiniModal,
  InputStyle,
  ButtonAdaptive,
} from "../index";
import { useDispatch, useSelector } from "react-redux";
const AddTransaction = ({
  openCategory,
  children,
  SuperNewValue,
  memoNewValue,
  outflowNewValue,
  inflowNewValue,
  onChangeInflow,
  onChangeOutflow,
  onChangeMemo,
  clickCancel,
  clickSave,
  SaveIt,
}) => {
  const today = new Date();

  const formattedDate =
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    today.getDate().toString().padStart(2, "0") +
    "/" +
    today.getFullYear();
  return (
    <div>
      <div className={s.extends}>
        <div className={s.dispalyDerection}>
          <div className={clsx(s.borderConCenter)}>
            <CheckBox />
          </div>
          <div className={clsx(s.borderCon, s.borderNone)}>
            <FontAwesomeIcon
              icon="flag"
              style={{
                color: "#405163",
              }}
              size={"1x"}
            />
          </div>
          <div className={clsx(s.borderCon, s.data, s.borderNone)}>
            <InputStyle value={formattedDate} classSecond={s.commonInput} />
          </div>
          <div className={clsx(s.borderCon, s.category, s.borderNone)}>
            <FontAwesomeIcon
              className={s.font}
              icon="caret-down"
              style={{
                color: "#405163",
              }}
              size={"1x"}
            />
            <InputStyle
              onKeyDown={SaveIt}
              value={SuperNewValue}
              onClick={openCategory}
              placeholder={"category"}
              classSecond={s.commonInput}
            />
          </div>
          <div className={clsx(s.borderCon, s.important, s.borderNone)}>
            <InputStyle
              onKeyDown={SaveIt}
              onChange={onChangeMemo}
              value={memoNewValue}
              placeholder={"memo"}
              classSecond={s.commonInput}
            />
          </div>
          <div className={clsx(s.borderCon, s.important, s.borderNone)}>
            <InputStyle
              onKeyDown={SaveIt}
              type="number"
              onChange={onChangeOutflow}
              value={outflowNewValue}
              placeholder={"outflow"}
              classSecond={s.commonInput}
            />
          </div>
          <div
            className={clsx(s.borderCon, s.important, s.inflow, s.borderNone)}
          >
            <InputStyle
              onKeyDown={SaveIt}
              type="number"
              onChange={onChangeInflow}
              value={inflowNewValue}
              placeholder={"inflow"}
              classSecond={s.commonInput}
            />
          </div>
          <div className={clsx(s.borderCon, s.balance, s.borderNone)}></div>
        </div>
        <div className={s.ButtonSaveCan}>
          <ButtonAdaptive onClick={clickCancel} buttonType="cancel">
            cancel
          </ButtonAdaptive>
          <ButtonAdaptive onClick={clickSave} buttonType="save">
            save
          </ButtonAdaptive>
        </div>
      </div>

      <Line type="gray05" />
      {children}
    </div>
  );
};

export default AddTransaction;

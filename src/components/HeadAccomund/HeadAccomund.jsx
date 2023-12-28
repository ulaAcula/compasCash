import React, { useState } from "react";
import s from "./HeadAccomund.module.css";
import clsx from "clsx";
import { ButtonAdaptive, Line, StatisticCancul } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const HeadAccomund = ({
  icon,
  Title,
  categoryType,
  Cash,
  makeCount,
  countCash,
}) => {
  const minus = makeCount.filter((transaction) => transaction.Type === false);
  const plus = makeCount.filter((transaction) => transaction.Type === true);
  const plusArray = plus.map((transaction) => transaction.amount);
  const initialValue = 0;
  const Totalplus = plusArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const minusArray = minus.map((transaction) => transaction.amount);
  const initialValue2 = 0;
  const Totalminus = minusArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue2
  );

  const commonsum = Totalplus - Totalminus;

  return (
    <div>
      <div className={s.HeaderDinamic}>
        <div>
          <h4 className={s.mainHead}>{Title}</h4>
          <div className={s.infoAbout}>
            <div className={s.iconInfo}>
              <FontAwesomeIcon
                icon={icon}
                style={{
                  color: "#405163",
                }}
                size={"0,1x"}
              />
              <span className={s.spanInfo}>{categoryType}</span>
            </div>
            <div className={s.iconInfo}>
              <FontAwesomeIcon
                icon={"lock"}
                style={{
                  color: "#405163",
                }}
                size={"0,1x"}
              />
              <span className={s.spanInfo}>Not Yet Reconciled</span>
            </div>
          </div>
        </div>
        <div className={s.ButtonContainer}>
          <ButtonAdaptive buttonType="cancel">
            <FontAwesomeIcon
              icon={"pen"}
              style={{
                color: "#3b5eda",
              }}
              size={"1x"}
            />
          </ButtonAdaptive>
        </div>
      </div>
      <Line type="gray05" />
      <div className={s.canculation}>
        <StatisticCancul
          colorOfTransaction={Cash > 0 ? "#4d9119" : "#c72c1e"}
          Cash={Cash > 0 ? `$${Cash}` : `-$${Cash * -1}`}
          TypeBalance="Cleared Balance"
        />{" "}
        <span className={s.symbol}>+</span>
        <StatisticCancul
          colorOfTransaction={commonsum > 0 ? "#4d9119" : "#c72c1e"}
          Cash={commonsum > 0 ? `$${commonsum}` : `-$${commonsum * -1}`}
          TypeBalance="Uncleared Balance"
        />
        <span className={s.symbol}>=</span>
        <StatisticCancul
          colorOfTransaction={Cash + commonsum > 0 ? "#4d9119" : "#c72c1e"}
          Cash={
            Cash + commonsum > 0
              ? `$${Cash + commonsum}`
              : `-$${Cash + commonsum * -1}`
          }
          TypeBalance="Working Balance"
        />
      </div>

      <Line type="gray05" />
    </div>
  );
};

export default HeadAccomund;

import React, { useState } from "react";
import s from "./StatisticCancul.module.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StatisticCancul = ({ Cash, TypeBalance, colorOfTransaction }) => {
  return (
    <div className={s.Amountcontainer}>
      <div className={s.cashComponent}>
        <h4 style={{ color: colorOfTransaction }} className={s.cash}>
          {Cash}
        </h4>
        <div className={s.gapMiniCont}>
          <FontAwesomeIcon
            className={s.widthIcon}
            icon={"copyright"}
            style={{
              color: "#19223c",
            }}
            // size={"0.1x"}
          />
          <span className={s.descript}>{TypeBalance}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticCancul;

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import s from "./PreAccSetting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonAdaptive, Line, MiniModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
const PreAccSetting = ({ OpenTransaction }) => {
  return (
    <div>
      <div className={s.dispalyDerection}>
        <div>
          <ButtonAdaptive
            onClick={OpenTransaction}
            classSecond={s.colorBut}
            buttonType="transparentWhite"
          >
            <FontAwesomeIcon
              icon="circle-plus"
              style={{ color: "#3b5eda", fontSize: "1.2em" }}
            />
            <span>Add Transaction</span>
          </ButtonAdaptive>
        </div>
      </div>

      <Line type="gray05" />
    </div>
  );
};

export default PreAccSetting;

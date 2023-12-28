import { useEffect, useState } from "react";
import s from "./Statistick.module.css";
import { useDispatch, useSelector } from "react-redux";

import { PieChart } from "../../components";
const Statistick = () => {
  return (
    <>
      <div className={s.backChart}>
        <h1>Your Pie Chart</h1>
        <PieChart height="600px" />
      </div>
    </>
  );
};

export default Statistick;

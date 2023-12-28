import { useEffect, useState } from "react";
import s from "./Expenses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { InputStyle } from "../../components";

const Expenses = () => {
  return (
    <>
      <div>
        amount:
        <InputStyle />
        <br />
        accound:
        <InputStyle />
      </div>
    </>
  );
};

export default Expenses;

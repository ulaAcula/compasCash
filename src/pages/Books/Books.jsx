import { useEffect, useState } from "react";
import s from "./Books.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { TitlePage, ButtonAction, TableRow } from "../../components";
const Books = () => {
  const books = useSelector((state) => state.Book);

  return <></>;
};

export default Books;

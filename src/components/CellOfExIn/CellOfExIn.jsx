import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import s from "./CellOfExIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonAdaptive, Line, CheckBox } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { XcordinatePosition } from "../../store/EditAccSlice";
const CellOfExIn = ({
  type,
  data,
  outflow,
  children,
  category,
  balance,
  memo,
  TableType,
  id,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const ModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ModalRef.current && !ModalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [ModalRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ModalRef.current && !ModalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ModalRef]);
  const Xcord = useSelector((state) => state.EditAcc.Xcordinate);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsOpen(true);

    dispatch(XcordinatePosition(event.clientX));
  };

  return type == "main" ? (
    <div>
      <div className={s.dispalyDerection}>
        {/* <div className={clsx(s.borderConCenter)}><CheckBox /></div> */}
        <div className={clsx(s.borderCon)}>
          <FontAwesomeIcon
            icon="flag"
            style={{
              color: "#405163",
            }}
            size={"1x"}
          />
        </div>
        <div className={clsx(s.borderCon, s.data)}>
          <span className={s.SuperSpan}>DATA</span>
          {/* <FontAwesomeIcon
            className={s.font}
            icon="caret-down"
            style={{
              color: "#405163",
            }}
            size={"1x"}
          /> */}
        </div>
        <div className={clsx(s.borderCon, s.category)}>
          <span className={s.SuperSpan}>CATEGORY</span>
        </div>
        <div className={clsx(s.borderCon, s.important)}>
          <span className={s.SuperSpan}>MEMO</span>
        </div>
        <div className={clsx(s.borderCon, s.important)}>
          <span className={s.SuperSpan}>OUTFLOW </span>
        </div>
        <div className={clsx(s.borderCon, s.important, s.inflow)}>
          <span className={s.SuperSpan}>INFLOW</span>
        </div>
        <div className={clsx(s.borderCon, s.balance)}>
          <span className={s.SuperSpan}>BALANCE</span>
        </div>
      </div>

      <Line type="gray05" />
    </div>
  ) : (
    <div>
      <div
        ref={ModalRef}
        onContextMenu={handleContextMenu}
        className={s.dispalyDerection}
      >
        {/* <div className={clsx(s.borderConCenter)}>
          <CheckBox />
        </div> */}
        <div className={clsx(s.borderCon, s.borderNone)}>
          <FontAwesomeIcon
            icon="flag"
            style={{
              color: TableType ? "#4d9119" : "#c72c1e",
            }}
            size={"1x"}
          />
        </div>
        <div className={clsx(s.borderCon, s.data, s.borderNone)}>
          <span className={s.SuperSpan}>{data}</span>
        </div>
        <div className={clsx(s.borderCon, s.category, s.borderNone)}>
          <span className={s.SuperSpan}>{category}</span>
        </div>
        <div className={clsx(s.borderCon, s.important, s.borderNone)}>
          <span className={s.SuperSpan}>{memo}</span>
        </div>
        <div className={clsx(s.borderCon, s.important, s.borderNone)}>
          <span
            style={{
              color: TableType ? "#4d9119" : "#c72c1e",
            }}
            className={s.SuperSpan}
          >
            {!TableType && `-$${outflow}`}{" "}
          </span>
        </div>
        <div className={clsx(s.borderCon, s.important, s.inflow, s.borderNone)}>
          <span
            style={{
              color: TableType ? "#4d9119" : "#c72c1e",
            }}
            className={s.SuperSpan}
          >
            {TableType && `$${outflow}`}
          </span>
        </div>
        <div className={clsx(s.borderCon, s.balance, s.borderNone)}>
          <span
            style={{
              color: balance > 0 ? "#4d9119" : "#c72c1e",
            }}
            className={s.SuperSpan}
          >
            {balance > 0 ? `$${balance}` : `-$${balance * -1}`}
          </span>
        </div>
      </div>
      {isOpen && children}

      <Line type="gray05" />
    </div>
  );
};

export default CellOfExIn;

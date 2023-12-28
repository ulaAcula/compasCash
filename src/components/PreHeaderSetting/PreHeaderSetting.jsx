import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import s from "./PreHeaderSetting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonAdaptive, Line, ConfirmModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SaveArrayBack } from "../../store/AssignedSlice";
import { SaveNewArray } from "../../store/StateManagerSlice";
const PreHeaderSetting = ({}) => {
  const length = useSelector((state) => state.Assigned);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
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
  }, [length]);

  const updatePlan = async () => {
    const plan = [
      {
        nameOfCategory: "Bills",
        nameListCategory: [
          {
            List: "Rent/Mortgage",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Electric",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Water",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Internet",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Cellphone",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
        ],
        totalAmount: "0.00",
        statate: false,
        totalActivity: "0.00",
        totalAssigned: "0.00",
      },
      {
        nameOfCategory: "Frequent",
        nameListCategory: [
          {
            List: "Groceries",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Eating Out",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Transportation",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
        ],
        totalAmount: "0.00",
        statate: false,
        totalActivity: "0.00",
        totalAssigned: "0.00",
      },
      {
        nameOfCategory: "Goals",
        nameListCategory: [
          {
            List: "Vacation",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Education",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
        ],
        totalAmount: "0.00",
        statate: false,
        totalActivity: "0.00",
        totalAssigned: "0.00",
      },
      {
        nameOfCategory: "Quality of Life",
        nameListCategory: [
          {
            List: "Hobbies",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Entertainment",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
          {
            List: "Health & Wellness",
            assigned: 0,
            activity: "0",
            statate: false,
            property: "Fully Spent",
            available: "0",
          },
        ],
        totalAmount: "0.00",
        statate: false,
        totalActivity: "0.00",
        totalAssigned: "0.00",
      },
    ];
    console.log(plan);
    dispatch(SaveNewArray(plan));
    dispatch(SaveArrayBack(plan));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    updatePlan();
    handleCloseModal();
  };
  return (
    <div>
      <Line type="gray05" />
      <div className={s.dispalyDerection}>
        <div ref={menuRef}>
          <ButtonAdaptive
            onClick={handleToggle}
            classSecond={s.colorBut}
            buttonType="transparentWhite"
          >
            <FontAwesomeIcon
              icon="circle-plus"
              style={{ color: "#3b5eda", fontSize: "1.2em" }}
            />
            <span>Category Group</span>
          </ButtonAdaptive>{" "}
          {isOpen && <MiniModal type="main" classPosition={s.positionModal} />}
        </div>

        <ButtonAdaptive
          onClick={handleOpenModal}
          classSecond={s.colorBut}
          buttonType="transparentWhite"
        >
          <FontAwesomeIcon
            icon="bars-progress"
            style={{
              cursor: "pointer",
              color: "#374d9b",
              transform: "none",
            }}
            size={"1x"}
          />
          <span>Create an Expense Chart</span>
        </ButtonAdaptive>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
      />
      <Line type="gray05" />
    </div>
  );
};

export default PreHeaderSetting;

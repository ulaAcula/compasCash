import React, { useState } from "react";
import s from "./ModalWindow.module.css";
import clsx from "clsx";
import { ButtonAdaptive, Line, InputStyle } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setCash,
  Rerender,
  setDecription,
} from "../../store/EditAccSlice";
import axios from "axios";
const ModalWindow = ({
  children,
  buttonBack,
  buttonClose,
  title,
  OnClicBack,
  OnClickClose,
  idSecond,
  idForModal,
  modalType,
  onclickDelate,

  Closer,
}) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.EditAcc);
  console.log(values);
  const Token = useSelector((state) => state.Token.token);
  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };

  const handleCashChange = (event) => {
    dispatch(setCash(Number(event.target.value)));
  };
  const handleDescriptionChange = (event) => {
    dispatch(setDecription(event.target.value));
  };
  const OnSave = () => {
    const editAccount = async () => {
      const options = {
        method: "PUT",
        url: `http://localhost:4034/editAccount/${values.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
        data: {
          balance: values.cash,
          description: values.description || "",
          categoryName: values.title,
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    editAccount();
    dispatch(Rerender());
    Closer();
  };
  return modalType == "AccountEdit" ? (
    <div className={s.center}>
      <div id={idForModal} className={s.modalWindEdit}>
        <div className={s.HeaderModalEdit}>
          <div className={s.topModalEdit}>
            <h2 className={s.headerCenterEdit}>{title}</h2>

            <ButtonAdaptive
              classSecond={s.buttonCloseEdit}
              buttonType="transparent"
              onClick={OnClickClose}
            >
              <FontAwesomeIcon
                icon="xmark"
                style={{
                  color: "#3b5eda",
                }}
                size={"2x"}
              />
            </ButtonAdaptive>
          </div>

          <Line type="gray" />
        </div>
        <div id={idSecond} className={s.dividerEdit}>
          <h2 className={clsx(s.color, s.AccountInformation)}>
            Account Information
          </h2>
          <div>
            <h3 className={clsx(s.color, s.AccountNickname)}>
              Account Nickname
            </h3>
            <InputStyle
              onChange={handleTitleChange}
              value={values.title}
              classSecond={s.InputS}
            />
          </div>
          <div>
            <h3 className={clsx(s.color, s.AccountNickname)}>Account Notes</h3>
            <InputStyle
              value={values.description}
              onChange={handleDescriptionChange}
              InputOrTextArea="textArea"
              classSecond={s.InputT}
            />
          </div>
          <Line type="grayMargin" />
          <div>
            <h2 className={clsx(s.color, s.AccountInformation)}>
              Working Balance
            </h2>
            <InputStyle
              onChange={handleCashChange}
              value={values.cash}
              classSecond={s.InputInvisible}
            />
          </div>
          <p className={s.paragraphBottom}>
            An adjustment transaction will be created automatically if you
            change this amount.
          </p>
        </div>
        <Line type="gray" />
        <div className={s.dividerEditBottom}>
          <ButtonAdaptive onClick={onclickDelate} buttonType="delate">
            Delate Account
          </ButtonAdaptive>
          <div className={s.dividerBottom}>
            <ButtonAdaptive onClick={OnClickClose} buttonType="cancel">
              Cancel
            </ButtonAdaptive>
            <ButtonAdaptive onClick={OnSave} buttonType="save">
              Save
            </ButtonAdaptive>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={s.center}>
      <div id={idForModal} className={s.modalWind}>
        <div className={s.HeaderModal}>
          {buttonBack && (
            <ButtonAdaptive
              onClick={OnClicBack}
              classSecond={s.buttonBack}
              buttonType="transparent"
            >
              <FontAwesomeIcon
                icon="angle-down"
                style={{
                  color: "#3b5eda",
                  transform: "rotate(90deg)",
                }}
                size={"2x"}
              />
            </ButtonAdaptive>
          )}
          <h2 className={s.headerCenter}>{title}</h2>
          {buttonClose && (
            <ButtonAdaptive
              classSecond={s.buttonClose}
              buttonType="transparent"
              onClick={OnClickClose}
            >
              <FontAwesomeIcon
                icon="xmark"
                style={{
                  color: "#3b5eda",
                }}
                size={"2x"}
              />
            </ButtonAdaptive>
          )}
          <Line type="gray" />
        </div>
        <div id={idSecond} className={s.divider}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;

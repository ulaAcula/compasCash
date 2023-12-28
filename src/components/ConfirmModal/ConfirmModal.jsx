import React from "react";
import s from "./ConfirmModal.module.css";
import { ButtonAdaptive } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={s.confirmationmodaloverlay}>
      <div className={s.confirmationmodal}>
        <div>
          <div className={s.contaierWarning}>
            <FontAwesomeIcon
              icon="triangle-exclamation"
              style={{
                color: "#374d9b",
                transform: "none",
              }}
              size={"3x"}
            />
            <h1 className={s.warningH1}>Warning</h1>
          </div>

          <p className={s.warning}>
            If you confirm, all data about the previous plan will be deleted.
          </p>
        </div>

        <div className={s.ContainerButton}>
          <ButtonAdaptive buttonType="cancel" onClick={handleCancel}>
            Cancel
          </ButtonAdaptive>
          <ButtonAdaptive
            buttonType="save"
            className={s.confirmbutton}
            onClick={handleConfirm}
          >
            Confirm
          </ButtonAdaptive>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

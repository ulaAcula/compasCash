import { useState } from "react";
import clsx from "clsx";
import { InputStyle, ButtonAdaptive } from "../index";
import s from "./MiniModal.module.css";
import {
  NewCategory,
  FindAndAdd,
  FindAndRemove,
  FindMainRemove,
  changeListNAme,
  changeCategoryName,
} from "../../store/AssignedSlice";
import {
  changeListNAmeS,
  NewCategoryS,
  FindAndAddS,
  FindAndRemoveS,
  FindMainRemoveS,
} from "../../store/StateManagerSlice";
import { Rerender } from "../../store/EditAccSlice";
import { useDispatch, useSelector } from "react-redux";
const MiniModal = ({
  onClickCancel,
  onClickDelate,

  clearModal,
  classPosition,
  type,
  NameToFind,
  style,
  Editor,
  namelist,
  AboveItem,
  selfItem,
  AboveNAME,
  headCategory,
}) => {
  const data1 = useSelector((state) => state.Assigned);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(namelist);
  const [message, setMessage] = useState(false);
  const [messageAlreadyExsist, setMessageAlreadyExsist] = useState(false);
  const NewPlanCat = (event) => {
    setIsOpen(event.target.value);
  };
  const SaveCat = () => {
    let data = null;

    if (type === "main") {
      data = {
        nameOfCategory: isOpen,
        nameListCategory: [],
        totalAmount: "0.00",
        statate: false,
        totalActivity: "0.00",
        totalAssigned: "0.00",
      };

      if (!data.nameOfCategory || data.nameOfCategory.trim() === "") {
        setMessage(true);
        return;
      }
      if (data1) {
        const foundObject = data1.find((item) => item.nameOfCategory == isOpen);
        if (foundObject) {
          setMessageAlreadyExsist(true);
          return;
        }
      }

      dispatch(NewCategory(data));
      dispatch(NewCategoryS(data));
      setTimeout(() => {
        dispatch(Rerender());
      }, 500);
    } else {
      data = {
        List: isOpen,
        assigned: "0.00",
        activity: "0.00",
        statate: false,
        property: "",
        available: "0",
      };

      if (!data.List || data.List.trim() === "") {
        setMessage(true);
        return;
      }
      if (data1) {
        const foundObject = data1.find(
          (item) => item.nameOfCategory == NameToFind
        );
        console.log(foundObject.nameListCategory);
        if (foundObject) {
          const foundItemInNameListCategory = foundObject.nameListCategory.find(
            (item) => item.List == isOpen
          );
          if (foundItemInNameListCategory) {
            setMessageAlreadyExsist(true);
            return;
          }
        }
      }

      dispatch(FindAndAdd({ CategoryToUpdate: data, HowToFind: NameToFind }));
      dispatch(FindAndAddS({ CategoryToUpdate: data, HowToFind: NameToFind }));
      setTimeout(() => {
        dispatch(Rerender());
      }, 500);
    }
  };
  const SaveCatEnter = (event) => {
    if (event.key === "Enter") {
      SaveCat();
    }
  };
  const DelateCat = () => {
    if (headCategory == "headCategory") {
      console.log(AboveItem);
      const filteredList = data1.filter(
        (item) => item.nameOfCategory !== AboveItem.nameOfCategory
      );

      dispatch(FindMainRemove(filteredList));
      dispatch(FindMainRemoveS(filteredList));
    } else {
      const filteredList = AboveItem.nameListCategory.filter(
        (item) => item.List !== selfItem.List
      );

      dispatch(
        FindAndRemove({
          Update: filteredList,
          HowToFind: AboveItem.nameOfCategory,
        })
      );
      dispatch(
        FindAndRemoveS({
          Update: filteredList,
          HowToFind: AboveItem.nameOfCategory,
        })
      );
    }
  };

  const NewListName = () => {
    if (headCategory == "headCategory") {
      console.log(NameToFind);
      dispatch(
        changeCategoryName({
          categoryNameToUpdate: NameToFind,

          NewValue: isOpen,
        })
      );
    } else {
      dispatch(
        changeListNAme({
          categoryNameToUpdate: AboveNAME,
          listItemToUpdate: namelist,
          NewValue: isOpen,
        })
      );
      dispatch(
        changeListNAmeS({
          categoryNameToUpdate: AboveNAME,
          listItemToUpdate: namelist,
          NewValue: isOpen,
        })
      );
    }
  };
  const NewListNameEnter = (event) => {
    if (event.key === "Enter") {
      NewListName();
    }
  };
  return clearModal ? (
    <div style={style} className={classPosition}>
      <div className={clsx(s.bgModal, s.bgModalTransaction)}>
        <div className={s.triangle}></div>

        <div className={clsx({ [s.Editor]: !Editor })}>
          <ButtonAdaptive onClick={onClickCancel} buttonType="cancel">
            Cancel
          </ButtonAdaptive>

          <ButtonAdaptive onClick={onClickDelate} buttonType="delate">
            Delate
          </ButtonAdaptive>
        </div>
      </div>
    </div>
  ) : (
    <div style={style} className={classPosition}>
      <div
        className={clsx(
          { [s.bgModal]: !Editor },
          { [s.bgModalEditor]: Editor }
        )}
      >
        <div className={s.triangle}></div>
        {Editor ? (
          <InputStyle
            onKeyDown={NewListNameEnter}
            value={isOpen}
            onChange={NewPlanCat}
            placeholder="New Category"
            classSecond={s.InputStyle}
          />
        ) : (
          <InputStyle
            onKeyDown={SaveCatEnter}
            value={isOpen}
            onChange={NewPlanCat}
            placeholder="New Category"
            classSecond={s.InputStyle}
          />
        )}

        {message && (
          <div className={s.message}>Name of Category is empty or null</div>
        )}
        {messageAlreadyExsist && (
          <div className={s.message}>This category already exists</div>
        )}
        <div className={clsx({ [s.Editor]: Editor })}>
          {Editor && (
            <div>
              <ButtonAdaptive onClick={DelateCat} buttonType="delate">
                Delate
              </ButtonAdaptive>
            </div>
          )}

          <div className={s.buttonCon}>
            <ButtonAdaptive buttonType="cancel">Cancel</ButtonAdaptive>
            {Editor ? (
              <ButtonAdaptive onClick={NewListName} buttonType="save">
                OK
              </ButtonAdaptive>
            ) : (
              <ButtonAdaptive onClick={SaveCat} buttonType="save">
                OK
              </ButtonAdaptive>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniModal;

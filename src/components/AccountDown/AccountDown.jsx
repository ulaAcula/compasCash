import { useEffect } from "react";
import { Children, useState } from "react";
import s from "./AccountDown.module.css";
import clsx from "clsx";
import axios from "axios";
import {
  AccountLine,
  ButtonAdaptive,
  DropDown,
  ModalWindow,
  InputStyle,
  Line,
} from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { TokenUser, sidebarCloser } from "../../store/TokenSlice";
import { useNavigate } from "react-router-dom";
import { activateCategory, notCategory } from "../../store/CategorySlice";
import { EditValues, Rerender } from "../../store/EditAccSlice";

const AccountDown = ({ downclose }) => {
  const categories = useSelector((state) => state.Category);
  const rerender = useSelector((state) => state.EditAcc);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Token, setToken] = useState(null);
  const [PasswordLogin, setPasswordLogin] = useState(null);
  const [managerModal, setManagerModal] = useState({
    isModalOpiner: false,
    switcBetweenTypes: true,
    preparingModal: false,
    FinishModal: false,
    editModal: false,
  });

  const [valueOfCategories, setvalueOfCategories] = useState({
    categoryName: "",
    balance: "",
    category: "",
    type: "",
  });

  const SetStatePrev = (state, key, property) => {
    state((prevValue) => ({
      ...prevValue,
      [key]: property,
    }));
  };

  const isFieldsFilled = Boolean(
    valueOfCategories.categoryName &&
      valueOfCategories.balance &&
      valueOfCategories.category
  );

  const initialState = () => {
    isOpenAcc("switcBetweenTypes", setManagerModal, managerModal);
    isOpenAcc("FinishModal", setManagerModal, managerModal);
    dispatch(Rerender());
  };
  useEffect(() => {
    const pass = localStorage.getItem("userAuth");
    const passObject = JSON.parse(pass);

    if (passObject) {
      setPasswordLogin(passObject);
    } else {
      console.log("token is not in localStore");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenObject = JSON.parse(token);
    if (tokenObject) {
      setToken(tokenObject.token);
    } else {
      console.log("token is not in localStore");
    }
  }, []);

  const [AccountData, setAccountData] = useState(null);
  const [totalAmount, settotalAmount] = useState({ Budget: "", Loans: "" });
  const [isOpen, setisOpen] = useState({
    Budget: false,
    Loans: false,
    Tracking: false,
    Closed: false,
  });
  const [filtredAccount, setfiltredAccount] = useState({
    Budget: [],
    Loans: [],
    Tracking: [],
  });

  const isOpenAcc = (key, state, useObject) => {
    SetStatePrev(state, key, !useObject[key]);
  };
  useEffect(() => {
    const getAccount = {
      method: "GET",
      url: "https://compass-server.onrender.com/getAccount",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    };
    if (Token) {
      const fetchData = async () => {
        try {
          const response = await axios.request(getAccount);

          setAccountData(response.data.Accounts);
        } catch (error) {
          console.error(error);
          try {
            const response = await axios.post(
              "https://compass-server.onrender.com/login",
              {
                email: PasswordLogin.login,
                password: PasswordLogin.password,
              }
            );

            console.log(response.data.token);
            setToken(response.data.token);

            localStorage.setItem("token", JSON.stringify(response.data));
            dispatch(TokenUser(response.data.token));
          } catch (error) {
            console.error("An error occurred during login:", error);
            localStorage.removeItem("token");
            dispatch(sidebarCloser());
            navigate("/login");
          }
        }
      };
      fetchData();
    }
  }, [Token, rerender.rerenderData]);

  useEffect(() => {
    if (AccountData) {
      const budgetAccounts = AccountData.filter((item) => {
        return item.type === "Budget Accounts";
      });
      SetStatePrev(setfiltredAccount, "Budget", budgetAccounts);

      const mortgagesAndLoans = AccountData.filter((item) => {
        return item.type === "Mortgages and Loans";
      });

      SetStatePrev(setfiltredAccount, "Loans", mortgagesAndLoans);
      const TrackingAccounts = AccountData.filter((item) => {
        return item.type === "Tracking Accounts";
      });
      SetStatePrev(setfiltredAccount, "Tracking", TrackingAccounts);
    }
  }, [AccountData]);
  useEffect(() => {
    if (filtredAccount) {
      const Budget = filtredAccount.Budget.map((item) => item.balance);
      const Loans = filtredAccount.Loans.map((item) => item.balance);
      const Tracking = filtredAccount.Tracking.map((item) => item.balance);
      const BudgetSum = Budget.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const LoansSum = Loans.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const TrackingSum = Tracking.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      SetStatePrev(settotalAmount, "Budget", BudgetSum);
      SetStatePrev(settotalAmount, "Loans", LoansSum);
      SetStatePrev(settotalAmount, "Tracking", TrackingSum);
    }
  }, [filtredAccount]);

  const budgetAccounts = categories.filter(
    (category) => category.category === "Budget Accounts"
  );
  const mortgagesAndLoans = categories.filter(
    (category) => category.category === "Mortgages and Loans"
  );
  const TrackingAccounts = categories.filter(
    (category) => category.category === "Tracking Accounts"
  );

  const handleCategoryClick = (category) => {
    SetStatePrev(setvalueOfCategories, "type", category.category);
    SetStatePrev(setvalueOfCategories, "category", category.categoryName);

    dispatch(notCategory());
    dispatch(activateCategory(category.categoryName));
    isOpenAcc("switcBetweenTypes", setManagerModal, managerModal);
  };

  const renderCategoryButtons = (categoriesList) => {
    return categoriesList.map((category, index) => (
      <ButtonAdaptive
        value={category.categoryName}
        key={index}
        buttonType="categotiesOfaccount"
        checked={category.chacked ? true : undefined}
        onClick={() => handleCategoryClick(category)}
      >
        {category.categoryName}
      </ButtonAdaptive>
    ));
  };
  const [EditAcc, setEditAcc] = useState({
    mainTitle: null,
    cash: null,
    description: null,
    id: null,
  });
  const dataOk = (mainTitle, cash, description, id) => {
    SetStatePrev(setEditAcc, "mainTitle", mainTitle);
    SetStatePrev(setEditAcc, "description", description);
    SetStatePrev(setEditAcc, "cash", cash);
    SetStatePrev(setEditAcc, "id", id);
  };
  useEffect(() => {
    dispatch(
      EditValues({
        title: EditAcc.mainTitle,
        cash: EditAcc.cash,
        description: EditAcc.description,
        id: EditAcc.id,
      })
    );
  }, [EditAcc]);
  const onclickDelate = () => {
    const deleteAccount = async () => {
      const DelateAccountOptions = {
        method: "DELETE",
        url: `https://compass-server.onrender.com/deleteAccount/${EditAcc.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
      };

      try {
        const response = await axios.request(DelateAccountOptions);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    deleteAccount();
    dispatch(Rerender());
    isOpenAcc("editModal", setManagerModal, managerModal);
  };

  const renderAccountLines = (AccountLines) => {
    return AccountLines.map(
      ({ _id, categoryName, balance, user, createdAt, type, description }) => (
        <AccountLine
          description={description}
          dataTransfer={() => dataOk(categoryName, balance, description, _id)}
          onClick={() => isOpenAcc("editModal", setManagerModal, managerModal)}
          key={_id}
          id={_id}
          MainTitle={categoryName}
          to={`/Account/${_id}`}
          icon="pen"
          currency="$"
          cash={balance}
        />
      )
    );
  };
  // console.log(managerModal);
  const handleChange = (event, type) => {
    const newCategoryName = event.target.value;
    SetStatePrev(setvalueOfCategories, type, newCategoryName);
  };
  const submitData = () => {
    const createAccount = {
      method: "POST",
      url: "https://compass-server.onrender.com/create/Account",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      data: {
        categoryName: valueOfCategories.categoryName,
        balance: parseFloat(valueOfCategories.balance),
        category: valueOfCategories.category,
        type: valueOfCategories.type,
      },
    };
    axios
      .request(createAccount)
      .then(function (response) {
        console.log(response);
        isOpenAcc("preparingModal", setManagerModal, managerModal);
      })
      .catch(function (error) {
        console.error(error.response.data.message);
      });
    setvalueOfCategories({
      categoryName: "",
      balance: "",
      category: "",
      type: "",
    });
  };

  useEffect(() => {
    if (managerModal.preparingModal) {
      setTimeout(() => {
        isOpenAcc("isModalOpiner", setManagerModal, managerModal);
        isOpenAcc("switcBetweenTypes", setManagerModal, managerModal);
        isOpenAcc("preparingModal", setManagerModal, managerModal);
        isOpenAcc("FinishModal", setManagerModal, managerModal);
      }, 2000);
    }
  }, [managerModal.preparingModal]);

  const renderAccountLineButton = (Title, cash, Opiner) => (
    <ButtonAdaptive
      onClick={() => isOpenAcc(Opiner, setisOpen, isOpen)}
      buttonType="transparent"
    >
      <AccountLine
        isRotated={
          Title == "BUDGET"
            ? isOpen.Budget
            : Title == "LOANS"
            ? isOpen.Loans
            : Title == "TRACKING"
            ? isOpen.Tracking
            : isOpen.Closed
        }
        MainTitle={Title}
        icon="angle-down"
        Tag="h1"
        currency="$"
        cash={cash}
      ></AccountLine>
    </ButtonAdaptive>
  );
  const closeHandal = () => {
    isOpenAcc("editModal", setManagerModal, managerModal);
    dispatch(Rerender());
  };

  return (
    <div
      className={clsx({
        [s.DownOpen]: !downclose,
        [s.DownClose]: downclose,
      })}
    >
      <div className={s.accountTypes}>
        {filtredAccount.Budget[0] && (
          <div>
            {filtredAccount.Budget[0] &&
              renderAccountLineButton("BUDGET", totalAmount.Budget, "Budget")}

            <ul
              className={clsx({
                [s.AccountRout]: !isOpen.Budget,
                [s.AccountCollapsed]: isOpen.Budget,
              })}
            >
              {filtredAccount.Budget[0] &&
                renderAccountLines(filtredAccount.Budget, totalAmount.Budget)}
            </ul>
          </div>
        )}

        {filtredAccount.Loans[0] && (
          <div>
            {filtredAccount.Loans[0] &&
              renderAccountLineButton("LOANS", totalAmount.Loans, "Loans")}

            <ul
              className={clsx({
                [s.AccountRout]: !isOpen.Loans,
                [s.AccountCollapsed]: isOpen.Loans,
              })}
            >
              {filtredAccount.Loans[0] &&
                renderAccountLines(filtredAccount.Loans)}
            </ul>
          </div>
        )}

        {filtredAccount.Tracking[0] && (
          <div>
            {totalAmount &&
              renderAccountLineButton(
                "TRACKING",
                totalAmount.Tracking,
                "Tracking"
              )}

            <ul
              className={clsx({
                [s.AccountRout]: !isOpen.Tracking,
                [s.AccountCollapsed]: isOpen.Tracking,
              })}
            >
              {filtredAccount.Tracking &&
                renderAccountLines(filtredAccount.Tracking)}
            </ul>
          </div>
        )}

        <ButtonAdaptive
          onClick={() =>
            isOpenAcc("isModalOpiner", setManagerModal, managerModal)
          }
          classSecond={s.transparentWhite}
          buttonType="transparentWhite"
        >
          <FontAwesomeIcon
            icon="circle-plus"
            style={{ color: "#ffffff" }}
            size={"1x"}
          />
          <span>Add Account</span>
        </ButtonAdaptive>
      </div>
      {managerModal.isModalOpiner &&
        managerModal.switcBetweenTypes &&
        !managerModal.preparingModal &&
        !managerModal.FinishModal && (
          <ModalWindow
            idSecond={s.overflov}
            OnClickClose={() =>
              isOpenAcc("isModalOpiner", setManagerModal, managerModal)
            }
            buttonClose
            title="Add Account"
          >
            <div>
              <p>
                Let's go! And don’t worry—if you change your mind, you can link
                your account at any time.
              </p>
              <div className={s.examination}>
                <div>
                  <h3 className={s.modalCreateAcc}>Give it a nickname</h3>
                  <InputStyle
                    value={valueOfCategories.categoryName}
                    onChange={(value) => handleChange(value, "categoryName")}
                    classSecond={s.inputWidth}
                  />
                </div>
                <div>
                  <h3 className={s.modalCreateAcc}>
                    What type of account are you adding?
                  </h3>
                  <DropDown
                    valueOfchecked={valueOfCategories.category}
                    onClick={() =>
                      isOpenAcc(
                        "switcBetweenTypes",
                        setManagerModal,
                        managerModal
                      )
                    }
                    id={s.dropMake6}
                    fake
                  />
                </div>
                <div>
                  <h3 className={s.modalCreateAcc}>
                    What is your current account balance?
                  </h3>
                  <InputStyle
                    value={valueOfCategories.balance}
                    onChange={(value) => handleChange(value, "balance")}
                    classSecond={s.inputWidth}
                  />
                </div>
              </div>
            </div>
            <div>
              <Line classSecond={s.linerBottom} type="gray" />
              <ButtonAdaptive
                disabled={!isFieldsFilled}
                onClick={submitData}
                buttonType={clsx({
                  ["nextDisabled"]: !isFieldsFilled,
                  ["next"]: isFieldsFilled,
                })}
              >
                Next
              </ButtonAdaptive>
            </div>
          </ModalWindow>
        )}
      {managerModal.isModalOpiner &&
        managerModal.switcBetweenTypes &&
        managerModal.preparingModal &&
        !managerModal.FinishModal && (
          <ModalWindow idSecond={s.overflov} title="Adding an account">
            <FontAwesomeIcon
              className={s.bouncingIcon}
              icon="compass"
              style={{
                color: "#374d9b",
                transform: "none",
              }}
              size={"2x"}
            />
            <div>
              <span>Loading...</span> <br />
              <span>That might take a few seconds...</span>
            </div>
          </ModalWindow>
        )}
      {managerModal.isModalOpiner &&
        !managerModal.switcBetweenTypes &&
        !managerModal.preparingModal &&
        !managerModal.FinishModal && (
          <ModalWindow
            OnClickClose={() => {
              isOpenAcc("isModalOpiner", setManagerModal, managerModal);
              isOpenAcc("switcBetweenTypes", setManagerModal, managerModal);
            }}
            OnClicBack={() =>
              isOpenAcc("switcBetweenTypes", setManagerModal, managerModal)
            }
            buttonBack
            buttonClose
            title="Select Account Type"
          >
            <div className={s.categoryFlex}>
              <div>
                <div>
                  <h1 className={s.category16font}>Budget Accounts</h1>
                  <p className={s.discriptionGray}>
                    Accounts that you'll spend from in the near future (usually
                    within the next year or two).
                  </p>
                  <div>{renderCategoryButtons(budgetAccounts)}</div>
                </div>
              </div>
              <div>
                <div>
                  <h1 className={s.category16font}>Mortgages and Loans</h1>
                  <p className={s.discriptionGray}>
                    Accounts that have an outstanding balance you're currently
                    paying off, and aren't spending from.
                  </p>
                  <div>{renderCategoryButtons(mortgagesAndLoans)}</div>
                </div>
              </div>
              <div>
                <div>
                  <h1 className={s.category16font}>Tracking Accounts</h1>
                  <p className={s.discriptionGray}>
                    Accounts that hold money you don't plan to spend soon, such
                    as investments or loans.
                  </p>
                  <div>{renderCategoryButtons(TrackingAccounts)}</div>
                </div>
              </div>
            </div>
          </ModalWindow>
        )}
      {!managerModal.isModalOpiner &&
        !managerModal.switcBetweenTypes &&
        !managerModal.preparingModal &&
        managerModal.FinishModal && (
          <ModalWindow
            idSecond={s.overflov}
            OnClickClose={initialState}
            buttonClose
            title="Adding an account"
          >
            <FontAwesomeIcon
              icon="circle-check"
              style={{
                color: "#4d9119",
                transform: "none",
              }}
              size={"2x"}
            />
            <div>
              <h1 className={s.Margin}>Success!</h1> <br />
              <span>Add transactions on the web or in our mobile apps.</span>
            </div>
          </ModalWindow>
        )}
      {managerModal.editModal && (
        <ModalWindow
          modalType="AccountEdit"
          idSecond={s.overflov}
          OnClickClose={() =>
            isOpenAcc("editModal", setManagerModal, managerModal)
          }
          Closer={closeHandal}
          buttonClose
          title="Edit Account"
          onclickDelate={onclickDelate}
        ></ModalWindow>
      )}
    </div>
  );
};

export default AccountDown;

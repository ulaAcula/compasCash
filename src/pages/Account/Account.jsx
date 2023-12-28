import { useEffect, useState, useRef } from "react";
import s from "./Account.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  HeadAccomund,
  PreAccSetting,
  CellOfExIn,
  AddTransaction,
  DropCategory,
  MiniModal,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { AddActivity, RemoveActivity } from "../../store/AssignedSlice";
import { Rerender } from "../../store/EditAccSlice";
import { SaveArrayBack } from "../../store/AssignedSlice";
import { SaveNewArray } from "../../store/StateManagerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Account = () => {
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.EditAcc.rerenderData);

  const [Token, setToken] = useState(null);
  const data00 = useSelector((state) => state.Assigned);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenObject = JSON.parse(token);
    if (tokenObject) {
      setToken(tokenObject.token);
    } else {
      console.log("token is not in localStore");
    }
  }, []);
  // это для удалениее всего activity a так это не нужно
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://compass-server.onrender.com/getPlan",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: Token,
            },
          }
        );

        dispatch(
          SaveNewArray([...response.data[0].data, { EachSatate: false }])
        );

        dispatch(SaveArrayBack([...response.data[0].data]));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Token]);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (Token) {
      const fetchData = async () => {
        const options = {
          method: "GET",
          url: `https://compass-server.onrender.com/getAccountBy/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: Token,
          },
        };

        try {
          const response = await axios.request(options);

          setData(response.data.account);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [Token, id, rerender]);
  const [idPlan, setIdPlan] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://compass-server.onrender.com/getPlan",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: Token,
            },
          }
        );
        setIdPlan(response.data[0]._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data00]);

  const [openCategory, setopenCategory] = useState(false);
  const dropdownRef = useRef();

  const OpinerOfDrop = () => {
    setopenCategory(!openCategory);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setopenCategory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [valueTransaction, setValueTransaction] = useState(null);
  const handleListItemClick = (listItem) => {
    setValueTransaction(listItem);
    setopenCategory(false);
  };

  const [memoNewValue, setMemoNewValue] = useState(null);
  const [outflowNewValue, setOutflowNewValue] = useState(null);
  const [inflowNewValue, setInflowNewValue] = useState(null);
  const [isAddtransaction, setisAddtransaction] = useState(null);
  const OpenTransaction = () => {
    setisAddtransaction(true);
  };
  const CloseTransaction = () => {
    setisAddtransaction(false);
  };

  const handleMemoChange = (event) => {
    setMemoNewValue(event.target.value);
  };

  const handleOutflowChange = (event) => {
    setOutflowNewValue(event.target.value);
    setInflowNewValue("");
  };

  const handleInflowChange = (event) => {
    setInflowNewValue(event.target.value);
    setOutflowNewValue("");
  };

  const SaveToStore = () => {
    if (outflowNewValue) {
      if (outflowNewValue == null || inflowNewValue == null) {
        return;
      }
      const createExpenses = async () => {
        const options = {
          method: "POST",
          url: "https://compass-server.onrender.com/create/Expenses",
          headers: {
            "Content-Type": "application/json",
            Authorization: Token,
          },
          data: {
            amount: outflowNewValue,
            yourAccount: data.categoryName,
            balance: data.balance,
            memo: memoNewValue ? memoNewValue : "",
            list: valueTransaction,
          },
        };

        try {
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        } catch (error) {
          console.error("Request Error:", error);
        }
      };

      createExpenses();

      dispatch(
        AddActivity({
          listItemToUpdate: valueTransaction,
          NewValue: outflowNewValue,
        })
      );
      setOutflowNewValue(null);
      setMemoNewValue(null);
      setValueTransaction(null);
      setisAddtransaction(false);
      // setTimeout(() => {
      //   dispatch(Rerender());
      // }, 50);
    } else {
      if (outflowNewValue == null || inflowNewValue == null) {
        return;
      }
      const CreateIncome = async () => {
        const options = {
          method: "POST",
          url: "https://compass-server.onrender.com/create/Income",
          headers: {
            "Content-Type": "application/json",
            Authorization: Token,
          },
          data: {
            amount: inflowNewValue,
            yourAccount: data.categoryName,
            balance: data.balance,
            memo: memoNewValue ? memoNewValue : "",
            list: valueTransaction,
          },
        };

        try {
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        } catch (error) {
          console.error("Request Error:", error);
        }
      };

      CreateIncome();
      setOutflowNewValue(null);
      setMemoNewValue(null);
      setValueTransaction(null);
      setisAddtransaction(false);
      // setTimeout(() => {
      //   dispatch(Rerender());
      // }, 50);
    }
    setTimeout(() => {
      dispatch(Rerender());
    }, 400);
    setTimeout(() => {
      dispatch(Rerender());
    }, 900);
  };

  useEffect(() => {
    const neWdata = data00.slice(0, -1);
    if (idPlan) {
      if (neWdata) {
        const updatePlan = async () => {
          const url = `https://compass-server.onrender.com/editPlan/${idPlan}`;

          const headers = {
            "Content-Type": "application/json",
            Authorization: Token,
          };

          const data = {
            plan: neWdata,
          };

          try {
            const response = await axios.put(url, data, { headers });

            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };

        updatePlan();
      } else {
        console.log("empti plan");
      }
    }
  }, [data00]);

  const [Expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: `https://compass-server.onrender.com/getIncomeAndExpenses/${data.categoryName}`,

          headers: {
            "Content-Type": "application/json",
            Authorization: Token,
          },
        };

        const response = await axios.request(options);

        setExpenses(response.data.transactions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Token, id, rerender, data]);
  const position = useSelector((state) => state.EditAcc.positionSidebar);
  const Xcordinate = useSelector((state) => state.EditAcc.Xcordinate);
  const delateExpenseOrIncome = (id, Type, list, amount) => {
    if (!Type) {
      dispatch(
        RemoveActivity({
          listItemToUpdate: list,
          NewValue: amount,
        })
      );
    }
    const Income = `Incomedelate`;
    const Expense = `Expensedelate`;
    const options = {
      method: "DELETE",
      url: `https://compass-server.onrender.com/${
        Type ? Income : Expense
      }/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    setTimeout(() => {
      dispatch(Rerender());
    }, 200);
    setTimeout(() => {
      dispatch(Rerender());
    }, 600);
  };

  const renderExpenses = (expenses) => {
    return expenses.map(
      ({ amount, balance, memo, createdAt, yourAccount, _id, list, Type }) => {
        const dateObj = new Date(createdAt);
        const outputStr =
          dateObj.getMonth() +
          1 +
          "/" +
          dateObj.getDate() +
          "/" +
          dateObj.getFullYear();

        return (
          <div>
            <CellOfExIn
              key={_id}
              TableType={Type}
              id={_id}
              data={outputStr}
              outflow={amount}
              inflow=""
              category={list}
              balance={balance}
              memo={memo}
            >
              <MiniModal
                clearModal
                onClickCancel
                onClickDelate={() =>
                  delateExpenseOrIncome(_id, Type, list, amount)
                }
                style={{
                  position: "absolute",
                  left: position
                    ? `${Xcordinate - 105}px`
                    : `${Xcordinate - 85}px`,
                }}
              />
            </CellOfExIn>
          </div>
        );
      }
    );
  };

  const SaveEnter = (event) => {
    if (event.key === "Enter") {
      if (outflowNewValue == null || inflowNewValue == null) {
        return;
      }
      SaveToStore();
    }
  };
  return (
    <>
      {Expenses ? (
        <div>
          <div className={s.containerAccount}>
            <HeadAccomund
              icon={clsx({
                ["money-bills"]: data?.type === "Budget Accounts",
                ["chart-line"]: data?.type === "Mortgages and Loans",
                ["chart-column"]: data?.type === "Tracking Accounts",
              })}
              countCash={data?.unchangingBalance}
              makeCount={Expenses}
              Title={data?.categoryName}
              categoryType={data?.type}
              Cash={data?.unchangingBalance}
            />
          </div>

          <div>
            <PreAccSetting OpenTransaction={OpenTransaction} />

            <CellOfExIn type="main" />
            {isAddtransaction && (
              <div ref={dropdownRef}>
                <AddTransaction
                  SaveIt={SaveEnter}
                  clickCancel={CloseTransaction}
                  clickSave={SaveToStore}
                  SuperNewValue={valueTransaction}
                  openCategory={OpinerOfDrop}
                  memoNewValue={memoNewValue}
                  outflowNewValue={outflowNewValue}
                  inflowNewValue={inflowNewValue}
                  onChangeMemo={handleMemoChange}
                  onChangeOutflow={handleOutflowChange}
                  onChangeInflow={handleInflowChange}
                >
                  {openCategory && (
                    <DropCategory
                      data={data00}
                      onListItemClick={handleListItemClick}
                    />
                  )}
                </AddTransaction>
              </div>
            )}
            <div>{Expenses && renderExpenses(Expenses)}</div>
          </div>
        </div>
      ) : (
        <div className={s.loading}>
          <div className={s.Containerloading}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Account;

import { useEffect, useState } from "react";
import s from "./Budget.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateEachSatate,
  UpdateSatate,
  SaveNewArray,
} from "../../store/StateManagerSlice";
import { SaveArrayBack } from "../../store/AssignedSlice";
import {
  Preloader,
  PlanCategoryHead,
  PlanCategory,
  MiniModal,
  ButtonAdaptive,
  PreHeaderSetting,
} from "../../components";
import axios from "axios";
import { Rerender } from "../../store/EditAccSlice";

const Budget = () => {
  const [Token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenObject = JSON.parse(token);
    if (tokenObject) {
      setToken(tokenObject.token);
    } else {
      console.log("token is not in localStore");
    }
  }, []);

  const data = useSelector((state) => state.Assigned);

  console.log(data);
  const rerender = useSelector((state) => state.EditAcc);

  const [idPlan, setIdPlan] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UpdateEachSatate());
    dispatch(UpdateSatate());
  }, []);

  const fetchData = async (Switch) => {
    try {
      const response = await axios.get("http://localhost:4034/getPlan", {
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
      });
      if (Switch) {
        dispatch(
          SaveNewArray([...response.data[0].data, { EachSatate: false }])
        );
      }
      dispatch(SaveArrayBack([...response.data[0].data]));
      setIdPlan(response.data[0]._id);
    } catch (error) {
      console.error("Ошибка при запросе через axios.get", error);
      console.log("Попытка выполнить запрос через axios.post");

      try {
        const postResponse = await axios.post(
          "http://localhost:4034/createPlan",
          {
            plan: [
              {
                nameOfCategory: "Bills",
                nameListCategory: [
                  {
                    List: "Rent/Mortgage",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Electric",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Water",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Internet",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Cellphone",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                ],
                totalAmount: null,
                statate: false,
              },
              {
                nameOfCategory: "Frequent",
                nameListCategory: [
                  {
                    List: "Groceries",
                    assigned: 0,
                    activity: 0,
                    statate: false,
                  },
                  {
                    List: "Eating Out",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Transportation",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                ],
                totalAmount: null,
                statate: false,
              },
              {
                nameOfCategory: "Goals",
                nameListCategory: [
                  {
                    List: "Vacation",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Education",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                ],
                totalAmount: null,
                statate: false,
              },
              {
                nameOfCategory: "Quality of Life",
                nameListCategory: [
                  {
                    List: "Hobbies",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Entertainment",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                  {
                    List: "Health & Wellness",
                    assigned: 0.0,
                    activity: 0.0,
                    statate: false,
                  },
                ],
                totalAmount: null,
                statate: false,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: Token,
            },
          }
        );

        console.log("Успешный ответ от axios.post", postResponse.data);
      } catch (postError) {
        console.error("Ошибка при запросе через axios.post", postError);
      }
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [Token]);

  useEffect(() => {
    fetchData(false);
  }, [rerender.rerenderData]);
  useEffect(() => {
    const neWdata = data.slice(0, -1);

    const updatePlan = async () => {
      const url = `http://localhost:4034/editPlan/${idPlan}`;

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
  }, [data]);

  const planCategories = () => {
    if (data) {
      return data.slice(0, -1).map((category, index) => (
        <PlanCategoryHead
          key={index}
          AboveItem={category}
          CategoryOfcell={category.nameOfCategory}
          toSumUp={category.totalAmount}
          toSumUpActivity={category.totalActivity}
          toSumUpAssigned={category.totalAssigned}
        >
          {category.nameListCategory.map((item, itemIndex) => {
            const data = {
              activity: parseFloat(item.activity),
              assigned: parseFloat(item.assigned),
              availble: parseFloat(item.available),
            };

            return (
              <PlanCategory
                categoryName={category.nameOfCategory}
                children={<Preloader data={data} />}
                key={itemIndex}
                AboveItem={category}
                selfItem={item}
                ListCategory={item.List}
                assigned={item.assigned}
                availble={item.available}
                activity={item.activity}
                activityOravailble={item.property}
              />
            );
          })}
        </PlanCategoryHead>
      ));
    }

    return null;
  };

  return (
    <>
      <div className={s.BudgetContainer}>
        <div className={s.SubBudgetContainer}>
          <PreHeaderSetting idPlan={idPlan} />
          <PlanCategoryHead Type="main">
            {data && planCategories()}
          </PlanCategoryHead>
        </div>
      </div>
    </>
  );
};

export default Budget;

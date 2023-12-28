// import { useEffect, useState } from "react";
// import s from "./DropCategory.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ButtonAdaptive, Line } from "../index";
// import { useDispatch, useSelector } from "react-redux";

// const DropCategory = ({ onListItemClick, data }) => {
//   const rerender = useSelector((state) => state.EditAcc.rerenderData);
//   const [Token, setToken] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const tokenObject = JSON.parse(token);
//     if (tokenObject) {
//       setToken(tokenObject.token);
//     } else {
//       console.log("token is not in localStore");
//     }
//   }, []);

//   const renderCategory = (data) => {
//     if (data) {
//       return data?.slice(0, -1).map((category, index) => (
//         <h3 className={s.wronCon} key={index}>
//           <span className={s.head}>{category.nameOfCategory}</span>

//           {category.nameListCategory.map((item, itemIndex) => {
//             const handleListItemClick = () => {
//               onListItemClick(item.List);
//             };

//             return (
//               <li
//                 onClick={handleListItemClick}
//                 className={s.liclass}
//                 key={itemIndex}
//               >
//                 <span>{item.List}</span>
//                 <span>
//                   {parseFloat(item.available) > 0
//                     ? `$${item.available}`
//                     : `-$${item.available * -1}`}
//                 </span>
//               </li>
//             );
//           })}
//         </h3>
//       ));
//     }

//     return null;
//   };
//   useEffect(() => {
//     console.log(renderCategory());
//   }, [data]);

//   return (
//     <div className={s.container}>
//       <div className={s.triangle}></div>
//       <ButtonAdaptive classSecond={s.colorBut} buttonType="transparentWhite">
//         <FontAwesomeIcon
//           icon="circle-plus"
//           style={{ color: "#3b5eda", fontSize: "1.2em" }}
//         />
//         <span>New Category</span>
//       </ButtonAdaptive>
//       <Line type="gray05" />
//       {data && <ul className={s.ulcon}>{renderCategory(data)}</ul>}
//     </div>
//   );
// };

// export default DropCategory;
import { useEffect, useState } from "react";
import s from "./DropCategory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonAdaptive, Line } from "../index";
import { useDispatch, useSelector } from "react-redux";

const DropCategory = ({ onListItemClick }) => {
  const rerender = useSelector((state) => state.EditAcc.rerenderData);
  const [Token, setToken] = useState(null);
  const data = useSelector((state) => state.Assigned);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenObject = JSON.parse(token);
    if (tokenObject) {
      setToken(tokenObject.token);
    } else {
      console.log("token is not in localStore");
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={s.container}>
      <div className={s.triangle}></div>
      <ButtonAdaptive classSecond={s.colorBut} buttonType="transparentWhite">
        <FontAwesomeIcon
          icon="circle-plus"
          style={{ color: "#3b5eda", fontSize: "1.2em" }}
        />
        <span>New Category</span>
      </ButtonAdaptive>
      <Line type="gray05" />

      <ul className={s.ulcon}>
        {data.slice(0, -1).map((category, index) => (
          <h3 className={s.wronCon} key={index}>
            <span className={s.head}>{category.nameOfCategory}</span>

            {category.nameListCategory.map((item, itemIndex) => (
              <li
                onClick={() => onListItemClick(item.List)}
                className={s.liclass}
                key={itemIndex}
              >
                <span>{item.List}</span>
                <span>
                  {parseFloat(item.available) > 0
                    ? `$${item.available}`
                    : `-$${item.available * -1}`}
                </span>
              </li>
            ))}
          </h3>
        ))}
      </ul>
    </div>
  );
};

export default DropCategory;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faXRay,
  faUser,
  faMoneyBills,
  faChartPie,
  faVihara,
  faCaretDown,
  faLandmark,
  faChartSimple,
  faWallet,
  faMoneyCheckDollar,
  faArrowsLeftRight,
  faCirclePlus,
  faWrench,
  faFlag,
  faPaintRoller,
  faRightFromBracket,
  faAngleDown,
  faPen,
  faXmark,
  faSortDown,
  faCheck,
  faCalculator,
  faClockRotateLeft,
  faLock,
  faChartLine,
  faChartColumn,
  faCopyright,
  faBarsProgress,
  faTriangleExclamation,
  faCompass,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faXRay,
  faUser,
  faChartPie,
  faVihara,
  faCaretDown,
  faLandmark,
  faChartSimple,
  faWallet,
  faMoneyCheckDollar,
  faArrowsLeftRight,
  faCirclePlus,
  faWrench,
  faFlag,
  faPaintRoller,
  faRightFromBracket,
  faAngleDown,
  faPen,
  faXmark,
  faSortDown,
  faCheck,
  faCalculator,
  faClockRotateLeft,
  faMoneyBills,
  faLock,
  faChartLine,
  faChartColumn,
  faCopyright,
  faBarsProgress,
  faTriangleExclamation,
  faCompass,
  faCircleCheck
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

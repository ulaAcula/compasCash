import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import s from "./SideNavigate.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tabs,
  ButtonAdaptive,
  TabsOfSettings,
  Line,
  AccountDown,
} from "../index";
import { useDispatch, useSelector } from "react-redux";
import { Position } from "../../store/EditAccSlice";

import { useNavigate } from "react-router-dom";
const SideNavigate = () => {
  const sidebarPosition = useSelector((state) => state.EditAcc.positionSidebar);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const scrollableDivRef = useRef(null);
  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const closeMenuIfClickedOutside = (event) => {
    if (
      isWindowVisible &&
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsWindowVisible(false);
    }
    if (!isSidebarOpen) {
      console.log("this");
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", closeMenuIfClickedOutside);
    };
  }, [isWindowVisible]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    dispatch(Position());
    scrollableDivRef.current.scrollTo({
      top: 0,
    });
  };

  const settings = () => {
    setIsWindowVisible(!isWindowVisible);
  };
  const LogOut = () => {
    navigate("/logout");
  };

  return (
    <div className={clsx(s.sidebar, { [s.collapsed]: !isSidebarOpen })}>
      <Tabs
        innerRef={buttonRef}
        type="main"
        size4={clsx({
          ["4x"]: isSidebarOpen,
          ["2x"]: !isSidebarOpen,
        })}
        iconMain="money-check-dollar"
        size2="2x"
        isSidebarOpen={isSidebarOpen}
        onClick={settings}
      ></Tabs>
      <div
        ref={scrollableDivRef}
        className={clsx(s.ShouldPad, { [s.alightCollapsed]: !isSidebarOpen })}
      >
        {isWindowVisible && (
          <div
            ref={menuRef}
            className={clsx(s.menuSettings)}
            // className={clsx(s.sidebar, {
            //   [s.menuSettings]: isSidebarOpen,
            //   [s.menuSettingsCollap]: !isSidebarOpen,
            // })}
          >
            <ul className={s.settingsMenu}>
              <TabsOfSettings icon="circle-plus" text="New Budget" />
              <Line type="gray" />
              <h2 className={s.settingsName}>Current Budget</h2>
              <TabsOfSettings icon="wrench" text="Budget Settings" />
              <TabsOfSettings icon="flag" text="Edit Flags" />
              <TabsOfSettings icon="paint-roller" text="Display Options" />
              <Line type="gray" />
              <h2 className={s.settingsName}>Account</h2>
              <TabsOfSettings icon="user" text="Account Settings" />
              <TabsOfSettings
                onClick={LogOut}
                icon="right-from-bracket"
                text="Log Out"
              />
            </ul>
          </div>
        )}
        <nav>
          <ul className={s.navigationMeny}>
            <li
              className={clsx({
                [s.navigationLI]: isSidebarOpen,
                [s.navigationLIClose]: !isSidebarOpen,
              })}
            >
              <Tabs
                isSidebarOpen={isSidebarOpen}
                icon="wallet"
                size="1x"
                nameOfRoute="Budget"
                to="/Budget"
              />
            </li>

            <li
              className={clsx({
                [s.navigationLI]: isSidebarOpen,
                [s.navigationLIClose]: !isSidebarOpen,
              })}
            >
              <Tabs
                isSidebarOpen={isSidebarOpen}
                icon="chart-simple"
                size="1x"
                nameOfRoute="Reports"
                to="/Reports"
              />
            </li>
            {/* <li
              className={clsx({
                [s.navigationLI]: isSidebarOpen,
                [s.navigationLIClose]: !isSidebarOpen,
              })}
            >
              <Tabs
                isSidebarOpen={isSidebarOpen}
                icon="landmark"
                size="1x"
                nameOfRoute="All Accounts"
                to="/AllAccounts"
              />
            </li> */}
            <AccountDown downclose={isSidebarOpen}></AccountDown>
          </ul>
        </nav>
      </div>

      <ButtonAdaptive
        style={{
          left: sidebarPosition ? `${250}px` : `${15}px`,
          transition: "0.3s",
        }}
        classSecond={s.buttonStyle}
        buttonType="transparent"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon="arrows-left-right"
          style={{ color: "#ffffff" }}
          size={"2x"}
        />
      </ButtonAdaptive>
    </div>
  );
};

export default SideNavigate;

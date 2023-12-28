import React, { useEffect, useState } from "react";
import s from "./Preloader.module.css";
import clsx from "clsx";

const Preloader = ({ data }) => {
  const [ShowCategory, setShowCategory] = useState({
    activity: false,
    assigned: false,
    availble: false,
    totalAmount: null,
    widthassigned: null,
    widthactivity: null,
    widthAvailble: null,
  });

  useEffect(() => {
    if (data) {
      let updatedState = {
        activity: false,
        assigned: false,
        availble: false,
        totalAmount: null,
        widthassigned: null,
        widthactivity: null,
        widthAvailble: null,
      };

      if (data.assigned < data.activity && data.activity > data.availble) {
        updatedState = {
          ...updatedState,
          assigned: true,
          activity: true,
          totalAmount: data.assigned + data.activity,
        };
      } else if (
        data.assigned == data.activity &&
        data.activity > data.availble &&
        data.assigned > data.availble
      ) {
        updatedState = {
          ...updatedState,
          totalAmount: data.assigned,
          assigned: true,
        };
      } else if (
        data.availble == data.activity &&
        data.assigned < data.availble &&
        data.assigned < data.activity
      ) {
        updatedState = {
          ...updatedState,
          totalAmount: data.activity,
          activity: true,
        };
      } else if (
        data.assigned > data.activity &&
        data.assigned > data.availble
      ) {
        updatedState = {
          ...updatedState,
          totalAmount: data.assigned + data.availble,
          assigned: true,
          availble: true,
        };
      } else if (
        data.assigned > data.activity &&
        data.availble > data.activity
      ) {
        updatedState = {
          ...updatedState,
          totalAmount: data.availble,

          availble: true,
        };
      }

      const assignedPercentage =
        (data.assigned / updatedState.totalAmount) * 100;
      const activitysPercentage =
        (data.activity / updatedState.totalAmount) * 100;
      const availblePercentage =
        (data.availble / updatedState.totalAmount) * 100;
      setShowCategory({
        ...updatedState,
        widthassigned: assignedPercentage,
        widthactivity: activitysPercentage,
        widthAvailble: availblePercentage,
      });
    }
  }, [data]);

  return (
    <figure className={s.lineOfpercent}>
      {ShowCategory.assigned && (
        <div
          className={clsx(s.assigned, s.common)}
          style={{ width: `${ShowCategory.widthassigned || 0}%` }}
        ></div>
      )}
      {ShowCategory.activity && (
        <div
          className={clsx(s.activity, s.common)}
          style={{ width: `${ShowCategory.widthactivity || 0}%` }}
        ></div>
      )}
      {ShowCategory.availble && (
        <div
          className={clsx(s.availble, s.common)}
          style={{ width: `${ShowCategory.widthAvailble || 0}%` }}
        ></div>
      )}
    </figure>
  );
};

export default Preloader;

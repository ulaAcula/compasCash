import React from "react";
import clsx from "clsx";
import s from "./PieChart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactEcharts from "echarts-for-react";
import { useSelector } from "react-redux";
const PieChart = ({}) => {
  const data = useSelector((state) => state.Assigned).slice(0, -1);

  const formateInerChat = () => {
    const filteredData = data.map(({ totalActivity, nameOfCategory }) => ({
      value: totalActivity,
      name: nameOfCategory,
    }));
    return filteredData;
  };
  const formateOutChat = () => {
    const result = data.flatMap(({ nameListCategory }) =>
      nameListCategory.map(({ List, activity }) => ({
        value: parseFloat(activity),
        name: List,
      }))
    );

    return result;
  };

  const arrayOfCategory = [...formateOutChat(), ...formateInerChat()];
  const array = arrayOfCategory.map((item) => item.name);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      // orient: "vertical",
      left: 0,

      data: array,
    },
    // xAxis: {
    //   type: "value",
    // },
    // yAxis: {
    //   type: "category",
    //   data: array,
    // },
    series: [
      {
        name: "Category",
        type: "pie",
        selectedMode: "single",
        radius: [40, "35%"],

        label: {
          position: "inner",
          color: "#000",
        },
        labelLine: {
          show: false,
        },
        data: formateInerChat(),
      },
      {
        name: "Category",
        type: "pie",
        radius: ["40%", "55%"],
        colors: [
          "#FF5733",
          "#33FF57",
          "#3366FF",
          "#FF33A1",
          "#FFFF33",
          "#33FFFF",
          "#000",
          "#FF33AA",
          "#9933FF",
          "#FF3366",
          "#66FF33",
          "#33CCFF",
          "#FF9933",
          "#FFCC33",
          "#CC33FF",
        ],
        label: {
          formatter: "{a|{a}}{sabg|}\n{hr|}\n  {b|{b}：}${c}  {per|{d}%}  ",
          backgroundColor: "#eee",
          borderColor: "#aaa",
          borderWidth: 1,
          borderRadius: 4,
          // shadowBlur: 3,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          // shadowColor: "#999",
          // padding: [0, 7],
          rich: {
            a: {
              color: "#999",
              lineHeight: 12,
              align: "center",
            },
            // abg: {
            //     backgroundColor: '#333',
            //     width: '100%',
            //     align: 'right',
            //     height: 22,
            //     borderRadius: [4, 4, 0, 0]
            // },
            hr: {
              borderColor: "#aaa",
              width: "100%",
              borderWidth: 0.5,
              height: 0,
            },
            b: {
              fontSize: 14,
              lineHeight: 22,
            },
            per: {
              color: "#eee",
              backgroundColor: "#334455",
              padding: [1, 3],
              borderRadius: 2,
            },
          },
        },
        data: formateOutChat(),
      },
    ],
  };

  return (
    <ReactEcharts
      className={s.chart}
      option={option}
      style={{ height: "500px", width: "100%" }}
    />
  );
};

export default PieChart;

import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";

const DemoPie = (props) => {
  console.log(props);
  const allTransaction = props.data;
  var cat = {};
  allTransaction.forEach((element) => {
    var category = element.category;
    if (cat[category] === undefined) {
      cat[category] = 0;
    }
    cat[category] += parseFloat(element.amount);
    console.log(parseFloat(element.amount));
  });
  console.log(cat);
  var resArray = [];
  for (var category in cat) {
    resArray.push({ type: category, value: cat[category] });
  }
  console.log(resArray);

  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  console.log(data)
  const config = {
    appendPadding: 10,
    data: resArray,
    angleField: "value",
    colorField: "type",
    radius: 1,
    // 设置圆弧起始角度
    startAngle: Math.PI,
    endAngle: Math.PI * 3,
    label: {
      type: "inner",
      offset: "-8%",
      content: "{name}",
      style: {
        fontSize: 18,
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    pieStyle: {
      lineWidth: 0,
    },
  };
  return <Pie {...config} />;
};

export default DemoPie;

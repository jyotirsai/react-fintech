import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Graph = (props) => {
  let array = [];

  Object.entries(props.data).forEach((entry) => {
    let [key, value] = entry;
    let obj = { Time: key, Price: value["4. close"] };
    array.push(obj);
  });

  array.reverse();

  let y_min =
    Math.min.apply(
      Math,
      array.map(function (o) {
        return o.Price;
      })
    ) - 1;
  let y_max =
    Math.max.apply(
      Math,
      array.map(function (o) {
        return o.Price;
      })
    ) + 1;

  // chart properties
  const renderLineChart = (
    <LineChart
      width={900}
      height={400}
      data={array}
      margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
    >
      <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      <Tooltip />
      <Legend />
      <XAxis dataKey="Time" />
      <YAxis domain={[y_min, y_max]} />
    </LineChart>
  );
  return <div>{renderLineChart}</div>;
};

export default Graph;

import React from "react";
import {
  AreaChart,
  Area,
  linearGradient,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Graph = (props) => {
  let array = [];

  Object.entries(props.data).forEach((entry) => {
    let [key, value] = entry;
    let obj = { Time: key, Price: value["4. close"] };
    array.push(obj);
  });

  array.reverse();
  console.log(array);

  if (array !== undefined) {
    console.log(array.Time);
  }

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
    <AreaChart
      width={900}
      height={400}
      data={array}
      margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="Price"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Tooltip />
      <Legend />
      <XAxis dataKey="Time" />
      <YAxis domain={[y_min, y_max]} />
    </AreaChart>
  );

  return <div>{renderLineChart}</div>;
};

export default Graph;

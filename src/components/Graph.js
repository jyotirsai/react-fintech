import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Graph = (props) => {
  const renderLineChart = (
    <LineChart
      width={900}
      height={400}
      data={props.array}
      margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
    >
      <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      <Tooltip />
      <Legend />
      <XAxis dataKey="Time" />
      <YAxis domain={[props.y_min, props.y_max]} />
    </LineChart>
  );
  return <div>{renderLineChart}</div>;
};

export default Graph;

import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const App = () => {
  const [data, setData] = useState([]);
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
    )
      .then((response) => response.json())
      .then((data) => setData(data["Time Series (5min)"]));
  }, []);

  let array = [];

  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    const obj = { Time: key, Price: value["4. close"] };
    array.push(obj);
  });

  console.log(array);
  const renderLineChart = (
    <LineChart width={800} height={600} data={array}>
      <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[116, 120]} />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
};

export default App;

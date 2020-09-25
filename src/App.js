import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const App = () => {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("IBM");

  useEffect(() => {
    dailyDataFetch();
  }, []);

  let array = [];

  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    const obj = { Time: key, Price: value["4. close"] };
    array.push(obj);
  });
  const y_min = 116;
  const y_max = 120;

  function dailyDataFetch() {
    const base_url = `https://www.alphavantage.co/query?`;
    const funct = `TIME_SERIES_INTRADAY`;
    const symbol = ticker;
    const interval = `5min`;
    const apikey = `RISJR704KEB8ZCB6`;
    const final_url = base_url.concat(
      "function=",
      funct,
      "&symbol=",
      symbol,
      "&interval=",
      interval,
      "&apikey=",
      apikey
    );
    fetch(final_url)
      .then((response) => response.json())
      .then((data) => setData(data["Time Series (5min)"]));
  }
  const renderLineChart = (
    <LineChart width={800} height={600} data={array}>
      <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <XAxis dataKey="name" />
      <YAxis domain={[y_min, y_max]} />
    </LineChart>
  );

  function handleChange(event) {
    setTicker(event.target.value);
  }

  return (
    <div>
      <input value={ticker} onChange={handleChange}></input>
      <button onClick={dailyDataFetch}>Data</button>
      {renderLineChart}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
    )
      .then((response) => response.json())
      .then((data) => setData(data["Time Series (5min)"]));
  }, []);

  Object.keys(data).forEach((key) => {
    console.log(key, data[key]["4. close"]);
  });

  return <div>hi</div>;
};

export default App;

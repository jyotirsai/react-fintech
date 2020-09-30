import React, { useState, useEffect } from "react";
import Graph from "./components/Graph";
import Options from "./components/Options";

const App = () => {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("IBM");

  useEffect(() => {
    intraDataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let array = [];

  Object.entries(data).forEach((entry) => {
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

  function intraDataFetch() {
    dataFetch("intraday");
  }

  function dailyDataFetch() {
    dataFetch("daily");
  }

  function weeklyDataFetch() {
    dataFetch("weekly");
  }

  function monthlyDataFetch() {
    dataFetch("monthly");
  }

  function dataFetch(time) {
    const base_url = `https://www.alphavantage.co/query?`;
    const symbol = ticker;
    const apikey = `RISJR704KEB8ZCB6`;
    let funct = ``;
    switch (time) {
      case "intraday":
        funct = `intraday`;
        break;
      case "daily":
        funct = `daily`;
        break;
      case "weekly":
        funct = `weekly`;
        break;
      case "monthly":
        funct = `monthly`;
        break;
    }
    if (funct === "intraday") {
      const final_url = base_url.concat(
        "function=TIME_SERIES_",
        funct,
        "&symbol=",
        symbol,
        "&interval=5min&apikey=",
        apikey
      );
      fetch(final_url)
        .then((response) => response.json())
        .then((data) => setData(data["Time Series (5min)"]));
    } else if (funct === `daily`) {
      const final_url = base_url.concat(
        "function=TIME_SERIES_",
        funct,
        "&symbol=",
        symbol,
        "&apikey=",
        apikey
      );
      fetch(final_url)
        .then((response) => response.json())
        .then((data) => setData(data["Time Series (Daily)"]));
    } else if (funct === `weekly`) {
      const final_url = base_url.concat(
        "function=TIME_SERIES_",
        funct,
        "&symbol=",
        symbol,
        "&apikey=",
        apikey
      );
      fetch(final_url)
        .then((response) => response.json())
        .then((data) => setData(data["Weekly Time Series"]));
    } else if (funct === `monthly`) {
      const final_url = base_url.concat(
        "function=TIME_SERIES_",
        funct,
        "&symbol=",
        symbol,
        "&apikey=",
        apikey
      );
      fetch(final_url)
        .then((response) => response.json())
        .then((data) => setData(data["Monthly Time Series"]));
    }
  }

  return (
    <div>
      <Options
        ticker={ticker}
        setTicker={setTicker}
        intraDataFetch={intraDataFetch}
        dailyDataFetch={dailyDataFetch}
        weeklyDataFetch={weeklyDataFetch}
        monthlyDataFetch={monthlyDataFetch}
      />
      <Graph y_min={y_min} y_max={y_max} array={array} />
    </div>
  );
};

export default App;

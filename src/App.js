import React, { useState, useEffect } from "react";
import Graph from "./components/Graph";
import Options from "./components/Options";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("IBM");

  useEffect(() => {
    dataFetch("daily");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dataFetch() {
    const base_url = `https://www.alphavantage.co/query?`;
    const symbol = ticker;
    const apikey = `RISJR704KEB8ZCB6`;
    const funct = `Weekly`;
    const final_url = base_url.concat(
      "function=TIME_SERIES_",
      funct,
      "_ADJUSTED&symbol=",
      symbol,
      "&apikey=",
      apikey
    );
    axios.get(final_url).then((response) => {
      setData(response.data["Weekly Adjusted Time Series"]);
    });
  }

  return (
    <div>
      <Options ticker={ticker} setTicker={setTicker} dataFetch={dataFetch} />
      <Graph data={data} />
    </div>
  );
};

export default App;

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
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  textSpace: {
    paddingLeft: "7.5px",
  },
});

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("IBM");

  useEffect(() => {
    dailyDataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let array = [];

  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    const obj = { Time: key, Price: value["4. close"] };
    array.push(obj);
  });

  const y_min =
    Math.min.apply(
      Math,
      array.map(function (o) {
        return o.Price;
      })
    ) - 1;
  const y_max =
    Math.max.apply(
      Math,
      array.map(function (o) {
        return o.Price;
      })
    ) + 1;

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
    <LineChart width={600} height={400} data={array}>
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid container item direction="row" alignItems="center">
              <Typography variant="subtitle2">Time Series: </Typography>
              <Typography variant="subtitle2" className={classes.textSpace}>
                {" "}
                Intraday
              </Typography>
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {renderLineChart}
    </div>
  );
};

export default App;

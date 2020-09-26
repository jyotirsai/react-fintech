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
  iconPadding: {
    padding: 2,
  },
});

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("IBM");
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeSeries, setTimeSeries] = useState("Intraday");

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
    const base_url = `https://www.alphavantage.co/query?`;
    const funct = `intraday`;
    const symbol = ticker;
    const interval = `5min`;
    const apikey = `RISJR704KEB8ZCB6`;
    const final_url = base_url.concat(
      "function=TIME_SERIES_",
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

  function dailyDataFetch() {
    const base_url = `https://www.alphavantage.co/query?`;
    const funct = `daily`;
    const symbol = ticker;
    const apikey = `RISJR704KEB8ZCB6`;
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
  }

  function weeklyDataFetch() {
    const base_url = `https://www.alphavantage.co/query?`;
    const funct = `weekly`;
    const symbol = ticker;
    const apikey = `RISJR704KEB8ZCB6`;
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
  }

  function monthlyDataFetch() {
    const base_url = `https://www.alphavantage.co/query?`;
    const funct = `monthly`;
    const symbol = ticker;
    const apikey = `RISJR704KEB8ZCB6`;
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

  const renderLineChart = (
    <LineChart width={900} height={400} data={array}>
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

  function menuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function menuClose(event) {
    let name = event.target.getAttribute("name");
    setTimeSeries(name);
    if (name === "Intraday") {
      intraDataFetch();
    } else if (name === "Daily") {
      dailyDataFetch();
    } else if (name === "Weekly") {
      weeklyDataFetch();
    } else if (name === "Monthly") {
      monthlyDataFetch();
    }
    setAnchorEl(null);
  }

  const timeSeriesMenu = ["Intraday", "Daily", "Weekly", "Monthly"];

  return (
    <div>
      <input value={ticker} onChange={handleChange}></input>
      <button onClick={intraDataFetch}>Data</button>
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
                {timeSeries}
              </Typography>
              <IconButton onClick={menuClick} className={classes.iconPadding}>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                keepMounted
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                getContentAnchorEl={null}
              >
                {timeSeriesMenu.map((item, key) => (
                  <MenuItem name={item} onClick={menuClose} key={key}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {renderLineChart}
    </div>
  );
};

export default App;

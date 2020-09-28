import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  TextField,
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

const Options = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [timeSeries, setTimeSeries] = useState("Intraday");

  const timeSeriesMenu = ["Intraday", "Daily", "Weekly", "Monthly"];

  function menuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  // execute when user selects a menu option
  function menuClose(event) {
    const name = event.target.getAttribute("name");
    setTimeSeries(name);
    if (name === "Intraday") {
      props.intraDataFetch();
    } else if (name === "Daily") {
      props.dailyDataFetch();
    } else if (name === "Weekly") {
      props.weeklyDataFetch();
    } else if (name === "Monthly") {
      props.monthlyDataFetch();
    }
    setAnchorEl(null);
  }

  function handleChange(event) {
    props.setTicker(event.target.value);
  }

  function tickerChange(event) {
    if (event.key === "Enter") {
      if (timeSeries === "Intraday") {
        props.intraDataFetch();
      } else if (timeSeries === "Daily") {
        props.dailyDataFetch();
      } else if (timeSeries === "Weekly") {
        props.weeklyDataFetch();
      } else if (timeSeries === "Monthly") {
        props.monthlyDataFetch();
      }
    }
  }

  return (
    <div>
      <TextField
        value={props.ticker}
        onChange={handleChange}
        onKeyPress={tickerChange}
      ></TextField>
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
    </div>
  );
};

export default Options;

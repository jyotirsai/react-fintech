import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

  const optionTabs = ["1D", "6M", "1Y", "5Y", "MAX"];

  function handleChange(event) {
    props.setTicker(event.target.value);
  }

  function tickerChange(event) {
    if (event.key === "Enter") {
      props.dataFetch();
    }
  }

  return (
    <div>
      <TextField
        value={props.ticker}
        onKeyPress={tickerChange}
        onChange={handleChange}
      ></TextField>
      <Grid>
        {optionTabs.map((option, key) => (
          <Button variant="outlined" key={key}>
            {option}
          </Button>
        ))}
      </Grid>
    </div>
  );
};

export default Options;

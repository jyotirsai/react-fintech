import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
} from "@material-ui/core";
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Options</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Options;

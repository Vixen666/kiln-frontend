import React, { useState, useEffect, useRef} from "react";
import { TextField, Grid, Paper, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { startReal, stopReal } from './store/scheduleSlice';
import {  fetchCurrentStatus } from "./store/burnSlice";
import { useSelector } from "react-redux";
function ScheduleComponent() {
    const dispatch = useDispatch();
    const parameters = useSelector(
      (state) => state.burn.data.selected.parameters
    ); // Replace 'burnslice' with the actual slice name
    const handleStartBurn = () => {
      dispatch(startReal());
    };

    const handleStopBurn = () => {
      dispatch(stopReal());
    };
  // Calculate default values
  const defaultDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const defaultTime =
    new Date(new Date().setHours(new Date().getHours() + 2))
      .toTimeString()
      .split(":")[0] + ":00"; // Current time + 2 hours, rounded to the nearest hour

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [confirmed, setConfirmed] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    fetchCurrentStatus();
    if (parameters && parameters.burn_id) {
      // Fetch temperature data every 10 seconds
      intervalRef.current = setInterval(() => {
        dispatch(fetchCurrentStatus());
      }, 10000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalRef.current);
    }
  }, [parameters]);

  // Handle changes
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const confirmSchedule = () => {
    console.log("schedueled for" + date + " " + time);
    setConfirmed(true);
  };

  const removeSchedule = () => {
    console.log("schedueled for" + date + " " + time);
    setConfirmed(false);
  };

  return (
    <Paper elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
      <Grid container spacing={2}>
        
        {/*
        <Grid item xs={4}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            disabled={confirmed}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            fullWidth
            disabled={confirmed}
          />
        </Grid>
        <Button
                variant="contained"
                component="label" // Allows the button to act as a label for the hidden file input
                style={{ marginTop: "10px" }}
                onClick={confirmSchedule}
              >
                Confirm Schedule
              </Button>
        */}
        
        <Grid item xs={4}>
              <Button
                variant="contained"
                component="label" // Allows the button to act as a label for the hidden file input
                style={{ marginLeft: "10px"}}
                onClick={handleStartBurn}
                disabled={parameters.status !== "Preparing"}
              >
                Start Burn Now
              </Button>
              <Button
                variant="contained"
                component="label" // Allows the button to act as a label for the hidden file input
                style={{ marginLeft: "10px"}}
                onClick={handleStopBurn}
              >
                Stop Burn Now
              </Button>
            
          
        </Grid>
        <Grid item xs={4}>
          {parameters && parameters.status}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ScheduleComponent;

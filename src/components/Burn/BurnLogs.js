import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
const BurnLogs = () => {
  const dispatch = useDispatch();
  const burnLogs = useSelector(
    (state) => state.burn.data.selected.temperatureData
  ); // Adjust based on your state structure
  const [open, setOpen] = useState(false);

  return (
    <Paper style={{ padding: 16, position: "relative", marginTop: "20px" }}>
      <Typography gutterBottom variant="h5" component="h2" onClick={() => setOpen(!open)}>
        Logs
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 8, right: 8 }}
        onClick={() => setOpen(!open)}
      >
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </IconButton>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Runtime</TableCell>
            <TableCell>Sequence</TableCell>
            <TableCell>Target</TableCell>
            <TableCell>Temp</TableCell>
            <TableCell>Err</TableCell>
            <TableCell>Heat</TableCell>
            <TableCell>P</TableCell>
            <TableCell>I</TableCell>
            <TableCell>D</TableCell>
            <TableCell>PID</TableCell>
          </TableRow>
        </TableHead>
        {open && (
          <TableBody>
            {burnLogs &&
              burnLogs
                .slice()
                .sort((a, b) => b.sequence - a.sequence)
                .map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.runtime}</TableCell>
                    <TableCell>{log.sequence}</TableCell>
                    <TableCell>{log.setpoint}</TableCell>
                    <TableCell>{log.ispoint}</TableCell>
                    <TableCell>{log.err}</TableCell>
                    <TableCell>{log.heat_on}</TableCell>
                    <TableCell>{log.p}</TableCell>
                    <TableCell>{log.i}</TableCell>
                    <TableCell>{log.d}</TableCell>
                    <TableCell>{log.pid}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        )}
      </Table>
    </Paper>
  );
};

export default BurnLogs;

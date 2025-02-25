import TableContainer from "@mui/material/TableContainer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import {
  handleCurveChange,
  deleteDataPoint,
  duplicateDataPoint,
  updateTemplateCurve,
  addDataPoint,
} from "./store/templateSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CopyIcon from "@mui/icons-material/FileCopy";
import useApiFetcher from "./utils/apiUtils";

function BurnCurveTable() {
  const dispatch = useDispatch();
  const chartData = useSelector(
    (state) => state.template.data.selected.templateData
  );
  const [isEdited, setIsEdited] = useState(false);
  const { fetchData } = useApiFetcher();

  const handleInputChange = (index, field, value) => {
    dispatch(handleCurveChange({ index, field, value }));
    setIsEdited(true);
  };

  const handleDelete = (sequence) => {
    dispatch(deleteDataPoint(sequence));
    setIsEdited(true);
  };

  const handleDuplicate = (index) => {
    dispatch(duplicateDataPoint({ index }));
    setIsEdited(true);
  };

  const handleAddDataPoint = () => {
    dispatch(addDataPoint());
  };

  const handleSave = async () => {
    // API call to save the data
    try {
      fetchData(updateTemplateCurve(), {
        success: "Template Cruve saved successfully!",
        error: "Failed to save curve.",
        error2: "Network problem while saving curve",
      });
      setIsEdited(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Paper style={{ marginTop: "20px", padding: "20px" }}>
      <TableContainer>
        <Table aria-label="burn curve table">
          <TableHead>
            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell>Target Temp</TableCell>
              <TableCell>Temp Change/Min (°C/min)</TableCell>
              <TableCell>Temp Change/Hour (°C/hour)</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={handleAddDataPoint}
                  style={{ marginLeft: "10px" }}
                >
                  Add Data Point
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData &&
              chartData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={data.time}
                      onChange={(e) =>
                        handleInputChange(index, "time", e.target.value)
                      }
                      type="number"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={data.temperature}
                      onChange={(e) =>
                        handleInputChange(index, "temperature", e.target.value)
                      }
                      type="number"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>{data.tempChangePerMinute}</TableCell>
                  <TableCell>{data.tempChangePerMinute*60}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(data.sequence)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDuplicate(index)}>
                      <CopyIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEdited && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            padding: "16px 48px", // Increase padding for larger button
            fontSize: "16px", // Increase font size
          }}
        >
          Save
        </Button>
      )}
    </Paper>
  );
}

export default BurnCurveTable;

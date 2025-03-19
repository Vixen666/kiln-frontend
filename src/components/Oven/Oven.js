// src/components/Oven.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Fab,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { updateOvenField, saveOven, fetchOvens } from "../../store/ovenSlice";
import EditableHelpText from "./../../utils/EditableHelpText";
import OvenTestModal from "./OvenTestModal";
import useTranslation from "../../utils/useTranslation";
function Oven({ oven }) {
  const dispatch = useDispatch();
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const selectedOven = useSelector((state) => state.oven.selectedOven);

  const handleChange = (field) => (event) => {
    console.log(event.target)
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    dispatch(updateOvenField({ field, value }));
    setShowSaveButton(true);
  };

  const handleSave = () => {
    console.log("saving", selectedOven); // Log selectedOven
    if (!selectedOven) {
      console.error("No oven selected to save!");
      return;
    }
    dispatch(saveOven(selectedOven));
    dispatch(fetchOvens);
    setShowSaveButton(false);
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Test Oven {oven.oven_id}
        </Button>

        <OvenTestModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          ovenId={oven.oven_id}
        />
      </div>

      <Paper
        elevation={15}
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${{ oven }.id}-pid_kp`}
              margin="dense"
              name="pid_kp"
              value={oven.pid_kp}
              label={useTranslation("Pid_kp")}
              type="number"
              fullWidth
              onChange={handleChange("pid_kp")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${oven.id}-pid_ki`}
              margin="dense"
              name="pid_ki"
              value={oven.pid_ki}
              label="Pid_ki"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("pid_ki")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${oven.id}-pid_kd`}
              margin="dense"
              name="pid_kd"
              value={oven.pid_kd}
              label="Pid_kd"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("pid_kd")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <EditableHelpText field="pid_help" />
          </Grid>
        </Grid>
      </Paper>
      <Paper
        elevation={15}
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={12} md={12}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel htmlFor="thermocouple_type">
                Thermocouple_type
              </InputLabel>
              <Select
                key={`field-${oven.id}-thermocouple_type`}
                native
                value={oven.thermocouple_type || ""}
                label="Thermocouple_type"
                inputProps={{
                  name: "thermocouple_type",
                  id: "thermocouple_type",
                }}
                onChange={handleChange("thermocouple_type")}
              >
                <option aria-label="None" value="" />
                <option value="MAX31855">MAX31855</option>
                <option value="MAX31856">MAX31856</option>
                <option value="DHT11">DHT11</option>
                <option value="DHT22">DHT22</option>
                <option value="DS1820">DS1820</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              key={`field-${oven.id}-gpio_sensor_cs`}
              margin="dense"
              name="gpio_sensor_cs"
              value={oven.gpio_sensor_cs}
              label="Gpio_sensor_cs"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("gpio_sensor_cs")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              key={`field-${oven.id}-gpio_sensor_clock`}
              margin="dense"
              name="gpio_sensor_clock"
              value={oven.gpio_sensor_clock}
              label="Gpio_sensor_clock"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("gpio_sensor_clock")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              key={`field-${oven.id}-gpio_sensor_data`}
              margin="dense"
              name="gpio_sensor_data"
              value={oven.gpio_sensor_data}
              label="Gpio_sensor_data"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("gpio_sensor_data")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              key={`field-${oven.id}-gpio_sensor_di`}
              margin="dense"
              name="gpio_sensor_di"
              value={oven.gpio_sensor_di}
              label="Gpio_sensor_di"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("gpio_sensor_di")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <EditableHelpText field="sensor_data_help" />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={15}
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${{ oven }.id}-gpio_heat`}
              margin="dense"
              name="gpio_heat"
              value={oven.gpio_heat}
              label="gpio_heat"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="NULL"
              onChange={handleChange("gpio_heat")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <TextField
              key={`field-${{ oven }.id}-gpio_cool`}
              margin="dense"
              name="gpio_cool"
              value={oven.gpio_cool}
              label="gpio_cool"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="NULL"
              onChange={handleChange("gpio_cool")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${{ oven }.id}-gpio_failsafe`}
              margin="dense"
              name="gpio_failsafe"
              value={oven.gpio_failsafe}
              label="gpio_failsafe"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="NULL"
              onChange={handleChange("gpio_failsafe")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              key={`field-${{ oven }.id}-gpio_hatchet`}
              margin="dense"
              name="gpio_hatchet"
              value={oven.gpio_hatchet}
              label="gpio_hatchet"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="NULL"
              onChange={handleChange("gpio_hatchet")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel htmlFor="hatchet_mode">hatchet_mode</InputLabel>
              <Select
                key={`field-${oven.id}-hatchet_mode`}
                native
                value={oven.hatchet_mode || ""}
                label="hatchet_mode"
                inputProps={{
                  name: "hatchet_mode",
                  id: "hatchet_mode",
                }}
                onChange={handleChange("hatchet_mode")}
              >
                <option value="HIGH_OPEN">High Open</option>
                <option value="HIGH_CLOSED">High Closed</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <EditableHelpText field="gpio_help" />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={15}
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        <TextField
          key={`field-${oven.id}-name`}
          margin="dense"
          name="name"
          value={oven.name}
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleChange("name")}
        />

        <TextField
          key={`field-${oven.id}-location`}
          margin="dense"
          name="location"
          value={oven.location}
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleChange("location")}
        />
      </Paper>

      <Paper
        elevation={15}
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${{ oven }.id}-sensor_time_wait`}
              margin="dense"
              name="sensor_time_wait"
              value={oven.sensor_time_wait}
              label="Sensor_time_wait"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="2"
              onChange={handleChange("sensor_time_wait")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${{ oven }.id}-pid_control_window`}
              margin="dense"
              name="pid_control_window"
              value={oven.pid_control_window}
              label="Pid_control_window"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="5"
              onChange={handleChange("pid_control_window")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              key={`field-${{ oven }.id}-temperature_average_samples`}
              margin="dense"
              name="temperature_average_samples"
              value={oven.temperature_average_samples}
              label="Temperature_average_samples"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange("temperature_average_samples")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <EditableHelpText field="control_help" />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={15}
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <FormControlLabel
              key={`field-${oven.id}-kiln_must_catch_up`}
              name="kiln_must_catch_up"
              control={
                <Checkbox
                  name="kiln_must_catch_up"
                  color="primary"
                  checked={oven.kiln_must_catch_up === 1} // This checks if the value is 1 (checked)
                  onChange={handleChange("kiln_must_catch_up")}
                />
              }
              label="Kiln_must_catch_up"
            />
          </Grid>
          <Grid item xs={12} sm={6}  md={4} lg={2}>
            <TextField
              key={`field-${{ oven }.id}-temp_scale`}
              margin="dense"
              name="temp_scale"
              value={oven.temp_scale}
              label="Temp_scale"
              type="text"
              fullWidth
              variant="outlined"
              inputProps={{ maxLength: 1 }}
              onChange={handleChange("temp_scale")}
            />
          </Grid>
          <Grid item xs={12} sm={6}  md={4} lg={2}>
            <TextField
              key={`field-${{ oven }.id}-emergency_shutoff_temp`}
              margin="dense"
              name="emergency_shutoff_temp"
              value={oven.emergency_shutoff_temp}
              label="Emergency_shutoff_temp"
              type="number"
              fullWidth
              variant="outlined"
              inputProps={{ maxLength: undefined }}
              onChange={handleChange("emergency_shutoff_temp")}
            />
          </Grid>
          <Grid item xs={12} sm={6}  md={4} lg={2}>
            <TextField
              key={`field-${{ oven }.id}-thermocouple_offset`}
              margin="dense"
              name="thermocouple_offset"
              value={oven.thermocouple_offset}
              label="Thermocouple_offset"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue="0"
              inputProps={{ maxLength: undefined }}
              onChange={handleChange("thermocouple_offset")}
            />
          </Grid>
          <Grid item xs={12} sm={6}  md={4} lg={2}>
            <FormControlLabel
              key={`field-${{ oven }.id}-ac_freq_50hz`}
              name="ac_freq_50hz"
              control={
                <Checkbox
                  name={oven.ac_freq_50hz}
                  color="primary"
                  checked={oven.ac_freq_50hz === 1}
                />
              }
              label="Ac_freq_50hz"
              onChange={handleChange("ac_freq_50hz")}
            />
          </Grid>
          <Grid item xs={12} sm={6}  md={4} lg={2}>
            <FormControlLabel
              key={`field-${{ oven }.id}-automatic_restarts`}
              name="automatic_restarts"
              control={
                <Checkbox
                  name={oven.automatic_restarts}
                  color="primary"
                  checked={oven.automatic_restarts === 1}
                  onChange={handleChange("automatic_restarts")}
                />
              }
              label="Automatic_restarts"
            />
          </Grid>
          <Grid item xs={12} sm={6}  md={4} lg={2}>
            <TextField
              key={`field-${{ oven }.id}-automatic_restart_window`}
              margin="dense"
              name="automatic_restart_window"
              value={oven.automatic_restart_window}
              label="Automatic_restart_window"
              type="number"
              fullWidth
              variant="outlined"
              inputProps={{ maxLength: undefined }}
              onChange={handleChange("automatic_restart_window")}
            />{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <EditableHelpText field="misc_help" />
          </Grid>
        </Grid>
      </Paper>

      {showSaveButton && (
        <Fab
          color="primary"
          aria-label="save"
          onClick={handleSave}
          variant="extended"
          style={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <SaveIcon /> Save
        </Fab>
      )}
    </div>
  );
}

export default Oven;

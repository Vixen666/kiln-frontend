import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CreateOvenModal({ isOpen, onClose, onSave, ovenDataToEdit }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    MaxTempChangePositive: "",
    MaxTempChangeNegative: "",
    location: "",
    power: "",
    image: null,
    TherometerType: "",
    TherometerPin: "",
    BurnerPin: "",
  });

  useEffect(() => {
    setFormData({
      id: "",
      name: "",
      MaxTempChangePositive: "",
      MaxTempChangeNegative: "",
      location: "",
      power: "",
      image: null,
      TherometerType: "",
      TherometerPin: "",
      BurnerPin: "",
    });
    if (ovenDataToEdit) {
      setFormData(ovenDataToEdit);
    }
    console.log(ovenDataToEdit);
  }, [ovenDataToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose(); // Close modal after save
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="create-oven-modal">
      <DialogTitle id="create-oven-modal-title">Create New Oven</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="id"
          label="Id"
          type="number"
          fullWidth
          variant="outlined"
          required
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: 450 }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="max_temp_positive"
          label="Max_temp_positive"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="max_temp_negative"
          label="Max_temp_negative"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: 450 }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="power"
          label="Power"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="thermometer_type"
          label="Thermometer_type"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: 20 }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="thermometer_pin"
          label="Thermometer_pin"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="burner_pin"
          label="Burner_pin"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="thermocouple_type"
          label="Thermocouple_type"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue="'max31856'"
          inputProps={{ maxLength: 45 }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="gpio_sensor_cs"
          label="Gpio_sensor_cs"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="gpio_sensor_clock"
          label="Gpio_sensor_clock"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="gpio_sensor_data"
          label="Gpio_sensor_data"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="gpio_sensor_di"
          label="Gpio_sensor_di"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="NULL"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="sensor_time_wait"
          label="Sensor_time_wait"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="2"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="pid_kp"
          label="Pid_kp"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="25"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="pid_ki"
          label="Pid_ki"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="10"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="pid_kd"
          label="Pid_kd"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="200"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="temp_scale"
          label="Temp_scale"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue="'c'"
          inputProps={{ maxLength: 1 }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="emergency_shutoff_temp"
          label="Emergency_shutoff_temp"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="1500"
          inputProps={{ maxLength: undefined }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="kiln_must_catch_up"
              color="primary"
              defaultChecked
            />
          }
          label="Kiln_must_catch_up"
        />

        <TextField
          autoFocus
          margin="dense"
          name="pid_control_window"
          label="Pid_control_window"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="5"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="thermocouple_offset"
          label="Thermocouple_offset"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="0"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="temperature_average_samples"
          label="Temperature_average_samples"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="40"
          inputProps={{ maxLength: undefined }}
        />

        <FormControlLabel
          control={<Checkbox name="ac_freq_50hz" color="primary" />}
          label="Ac_freq_50hz"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="automatic_restarts"
              color="primary"
              defaultChecked
            />
          }
          label="Automatic_restarts"
        />

        <TextField
          autoFocus
          margin="dense"
          name="automatic_restart_window"
          label="Automatic_restart_window"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue="15"
          inputProps={{ maxLength: undefined }}
        />

        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Oven Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name} // Set value from formData state
          onChange={handleChange}
          inputProps={{ maxLength: 3 }}
        />
        <TextField
          margin="dense"
          name="MaxTempChangePositive"
          label="Max Temp Change Positive"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.MaxTempChangePositive} // Set value from formData state
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="MaxTempChangeNegative"
          label="Max Temp Change Negative"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.MaxTempChangeNegative} // Set value from formData state
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.location} // Set value from formData state
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="power"
          label="Power"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.power} // Set value from formData state
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="TherometerType"
          label="Therometer Type"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.TherometerType}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="TherometerPin"
          label="Therometer PIN"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.TherometerPin}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="BurnerPin"
          label="Burner PIN"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.BurnerPin}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOvenModal;

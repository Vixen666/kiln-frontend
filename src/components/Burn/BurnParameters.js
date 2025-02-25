import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Grid, TextField, Typography, IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
const BurnParameters = () => {
  const parameters = useSelector(
    (state) => state.burn.data.selected.parameters
  ); // Replace 'burnslice' with the actual slice name
  const [open, setOpen] = useState(false);

  if (!parameters) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: 16, position: "relative", marginTop: "20px" }}
    >
      <Typography variant="h4" gutterBottom onClick={() => setOpen(!open)}>
        Burn Parameters
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 8, right: 8 }}
        onClick={() => setOpen(!open)}
      >
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </IconButton>
      {open && parameters && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2} key="ac_freq_50hz">
            <TextField
              label="ac_freq_50hz"
              value={parameters["ac_freq_50hz"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="automatic_restart_window">
            <TextField
              label="automatic_restart_window"
              value={parameters["automatic_restart_window"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="automatic_restarts">
            <TextField
              label="automatic_restarts"
              value={parameters["automatic_restarts"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="burn_id">
            <TextField
              label="burn_id"
              value={parameters["burn_id"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2} key="currency_type">
            <TextField
              label="currency_type"
              value={parameters["currency_type"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="description">
            <TextField
              label="description"
              value={parameters["description"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="emergency_shutoff_temp">
            <TextField
              label="emergency_shutoff_temp"
              value={parameters["emergency_shutoff_temp"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="end_date">
            <TextField
              label="end_date"
              value={parameters["end_date"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2} key="kiln_must_catch_up">
            <TextField
              label="kiln_must_catch_up"
              value={parameters["kiln_must_catch_up"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="oven_id">
            <TextField
              label="oven_id"
              value={parameters["oven_id"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="start_date">
            <TextField
              label="start_date"
              value={parameters["start_date"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="status">
            <TextField
              label="status"
              value={parameters["status"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="temp_scale">
            <TextField
              label="temp_scale"
              value={parameters["temp_scale"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2} key="template_id">
            <TextField
              label="template_id"
              value={parameters["template_id"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="thermocouple_offset">
            <TextField
              label="thermocouple_offset"
              value={parameters["thermocouple_offset"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} key="thermocouple_type">
            <TextField
              label="thermocouple_type"
              value={parameters["thermocouple_type"]}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid container={"true"} item sx={12} spacing={3}>
            <Grid item xs={12} key="PID_Parameters">
              <Typography
                variant="h6"
                gutterBottom
                onClick={() => setOpen(!open)}
              >
                PID Parameters
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="pid_kd">
              <TextField
                label="pid_kd"
                value={parameters["pid_kd"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="pid_ki">
              <TextField
                label="pid_ki"
                value={parameters["pid_ki"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="pid_kp">
              <TextField
                label="pid_kp"
                value={parameters["pid_kp"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="cool_window">
              <TextField
                label="cool_window"
                value={parameters["cool_window"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="pid_control_window">
              <TextField
                label="pid_control_window"
                value={parameters["pid_control_window"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sensor_time_wait">
              <TextField
                label="sensor_time_wait"
                value={parameters["sensor_time_wait"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2} key="temperature_average_samples">
              <TextField
                label="temperature_average_samples"
                value={parameters["temperature_average_samples"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Grid container={"true"} item sx={12} spacing={3}>
            <Grid item xs={12} key="GPIO_Parameters">
              <Typography
                variant="h6"
                gutterBottom
                onClick={() => setOpen(!open)}
              >
                GPIO
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_cool">
              <TextField
                label="gpio_cool"
                value={parameters["gpio_cool"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_heat">
              <TextField
                label="gpio_heat"
                value={parameters["gpio_heat"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_sensor_clock">
              <TextField
                label="gpio_sensor_clock"
                value={parameters["gpio_sensor_clock"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_sensor_cs">
              <TextField
                label="gpio_sensor_cs"
                value={parameters["gpio_sensor_cs"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_sensor_data">
              <TextField
                label="gpio_sensor_data"
                value={parameters["gpio_sensor_data"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_sensor_di">
              <TextField
                label="gpio_sensor_di"
                value={parameters["gpio_sensor_di"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="gpio_shutdown">
              <TextField
                label="gpio_shutdown"
                value={parameters["gpio_shutdown"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Grid container={"true"} item sx={12} spacing={3}>
            <Grid item xs={12} key="Simulate_Parameters">
              <Typography
                variant="h6"
                gutterBottom
                onClick={() => setOpen(!open)}
              >
                Simulate Parameters
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="kw_elements">
              <TextField
                label="kw_elements"
                value={parameters["kw_elements"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="kwh_rate">
              <TextField
                label="kwh_rate"
                value={parameters["kwh_rate"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_R_ho_air">
              <TextField
                label="sim_R_ho_air"
                value={parameters["sim_R_ho_air"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_R_ho_noair">
              <TextField
                label="sim_R_ho_noair"
                value={parameters["sim_R_ho_noair"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_R_o_cool">
              <TextField
                label="sim_R_o_cool"
                value={parameters["sim_R_o_cool"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_R_o_nocool">
              <TextField
                label="sim_R_o_nocool"
                value={parameters["sim_R_o_nocool"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_c_heat">
              <TextField
                label="sim_c_heat"
                value={parameters["sim_c_heat"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_c_oven">
              <TextField
                label="sim_c_oven"
                value={parameters["sim_c_oven"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_p_heat">
              <TextField
                label="sim_p_heat"
                value={parameters["sim_p_heat"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="sim_t_env">
              <TextField
                label="sim_t_env"
                value={parameters["sim_t_env"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} key="simulate">
              <TextField
                label="simulate"
                value={parameters["simulate"]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default BurnParameters;

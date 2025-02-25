// SettingsPage.js
import React from "react";
import { Paper, Typography } from "@mui/material";
import LanguageSelector from "./LanguageSelector"; // Adjust the import path as necessary
import { useDispatch, useSelector } from "react-redux";
import { setShowHelpFields } from "./../../store/settingsSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import EditableHelpText from "../../utils/EditableHelpText";
const SettingsPage = () => {
  const dispatch = useDispatch();
  const showHelpFields = useSelector((state) => state.settings.showHelpFields);

  const handleChange = (event) => {
    dispatch(setShowHelpFields(event.target.value));
  };

  return (
    <div>
      <Paper style={{ padding: 16, marginTop: 16 }}>
        <Typography variant="h4" gutterBottom>
          Language
        </Typography>
        <LanguageSelector />
      </Paper>
      <Paper style={{ padding: 16, marginTop: 16 }}>
        <Typography variant="h4" gutterBottom>
          Help
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="help-fields-dropdown-label">
            Show Help Fields
          </InputLabel>
          <Select
            labelId="help-fields-dropdown-label"
            value={showHelpFields}
            onChange={handleChange}
            label="Show Help Fields"
          >
            <MenuItem value="NO">No</MenuItem>
            <MenuItem value="READONLY">Read Only</MenuItem>
            <MenuItem value="YES">Yes</MenuItem>
          </Select>
        </FormControl>
        <EditableHelpText field="show_help" />
      </Paper>
    </div>
  );
};

export default SettingsPage;

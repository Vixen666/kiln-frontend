import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { fetchOvens } from "../../store/ovenSlice";
import useApiFetcher from "../../utils/apiUtils";
import { fetchAllBurns, selectBurn } from "../../store/burnSlice";
import { useCallback } from "react";
import {
  fetchAllTemplates
} from "../../store/templateSlice";
import config from '../../config';
import { useNavigate } from "react-router-dom";
function BurnPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ovens, status, error } = useSelector(
    (state) => state.oven
  );
  const [description, setDescription] = useState('');
  const [burnId, setBurnId] = useState(null);
  const [selectedOven, setSelectedOven] = React.useState('');
  const [selectedTemplate, setSelectedTemplate] = React.useState('');
  const { templates } = useSelector((state) => state.template.data);
  const { fetchData } = useApiFetcher();
  const fetchOvensData = useCallback(() => {
    fetchData(fetchOvens(), {
      success: "Ovens loaded successfully!",
      error: "Failed to load ovens.",
      error2: "Network problem while fetching ovens in component.",
    });
  }, [fetchData]);

  useEffect(() => {
    if (status === "idle") {
      fetchOvensData();
    }
  }, [status, fetchOvensData]);


  const fetchTemplatesData = useCallback(() => {
    fetchData(fetchAllTemplates(), {
      success: "Templates loaded successfully!",
      error: "Failed to load templates.",
      error2: "Network problem while fetching templates in component.",
    });
  }, [fetchData]);

  useEffect(() => {
    if (status === "idle") {
      fetchTemplatesData();
    }
  }, [status, fetchTemplatesData]);

   const createBurn = async (ovenId, templateId) => {
    const url = `${config.apiUrl}/Burn_Api_Create_Burn`; // Make sure the URL matches your Flask route
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oven_id: ovenId,
          template_id: templateId,
          description: description
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setBurnId(data.burn_id)
      
      await fetchData(fetchAllBurns(), {
        success: "Burns loaded successfully!",
        error: "Failed to load burns.",
        error2: "Network problem while fetching burns in component."
      });
      dispatch(selectBurn(data.burn_id));
      navigate("/burn-settings");
    } catch (error) {
      console.error('Error creating new burn:', error);
    }
  };


  const handleOvenChange = (event) => {
    console.log(event.target.value)
    setSelectedOven(event.target.value);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
        <FormControl fullWidth>
          <InputLabel id="oven-select-label">Oven</InputLabel>
          <Select
            labelId="oven-select-label"
            id="oven-select"
            value={selectedOven || ""}
            label="Oven"
            onChange={handleOvenChange}
            disabled={!!burnId}
          >
            {ovens.map((oven) => (
              <MenuItem key={oven.oven_id} value={oven.oven_id}>{oven.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel id="template-select-label">Template</InputLabel>
          <Select
            labelId="template-select-label"
            id="template-select"
            value={selectedTemplate}
            label="Template"
            onChange={handleTemplateChange}
            disabled={!!burnId}
          >
            {templates.map((template) => (
              <MenuItem key={template.template_id} value={template.template_id}>{template.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={!!burnId}
        />

        {!burnId && <Button
          variant="contained"
          color="primary"
          onClick={() => createBurn(selectedOven, selectedTemplate)}
          style={{ marginTop: '20px' }}
        >
          Create Burn
        </Button>}
      </Paper>
    </div >
  );
}

export default BurnPage;

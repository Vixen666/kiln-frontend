import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Container, Paper } from '@mui/material';
import { setNewTemplateName, insertTemplate, fetchAllTemplates } from '../store/templateSlice';

const NewTemplate = () => {
  const dispatch = useDispatch();
  const templateName = useSelector((state) => state.template.data.newTemplate.name);

  const handleNameChange = (event) => {
    dispatch(setNewTemplateName(event.target.value));
  };

  const handleCreateTemplate = async () => {
    await dispatch(insertTemplate(templateName));
    // Assuming you have an action to fetch all templates after creating a new one
    dispatch(fetchAllTemplates());
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <h2>Create New Template</h2>
      <TextField
        label="Template Name"
        value={templateName}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
        Create
      </Button>
    </Paper>
  );
};

export default NewTemplate;

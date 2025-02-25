import React, { useState, useCallback, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Paper} from '@mui/material';
import { debounce } from 'lodash';
import { useSnackbar } from '../../utils/SnackbarContext';
import config from '../../config';
function BurnNotes({ burnId }) {
    const [notes, setNotes] = useState([]);
    const { showSnackbar } = useSnackbar();
    const addNote = () => {
        const newNote = {
            id: notes.length + 1,
            date: new Date().toISOString(),
            content: '',
            isSaved: false,
        };
        setNotes(notes.concat(newNote));
    };



    const saveNoteToDB = useCallback(debounce(async (id, content) => {
        try {
            // Placeholder for your API call
            console.log(burnId)
            const response = await fetch(`${config.apiUrl}/api/BurnNotesService/Insert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({p_note_text: content, p_burn_id: burnId}),
            });
            if (!response.ok) {
                const errorBody = await response.json(); // Parse the JSON body of the response to get the error message
                let errorMessage = errorBody.error || 'Failed to save note'; // Use the server's error message if available
                
                // If there are missing parameters, append them to the error message
                if (errorBody.missing && errorBody.missing.length) {
                    errorMessage += ` ${errorBody.missing.join(', ')}`;
                }
                
                throw new Error(errorMessage); // Throw an error with the detailed message
            }
            const data = await response.json();
            showSnackbar('Notes saved!', 'SUCCESS');
            // Update note status upon successful save
            setNotes(prevNotes => prevNotes.map(note =>
                note.id === id ? { ...note, isSaved: true } : note
            ));
        } catch (error) {
            showSnackbar(' ' + error, 'ERROR');
        }
    }, 2000), []); // 2000 ms = 2 seconds delay

    const updateNoteContent = (id, content) => {
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === id ? { ...note, content, isSaved: false } : note
        ));
        saveNoteToDB(id, content);
    };

    // Fetch notes when component mounts or burnId changes
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/BurnNotesService/Get_By_Brun_Id?p_burn_id=${burnId}`);
                if (!response.ok) throw new Error('Failed to fetch notes');

                const fetchedNotes = await response.json();
                console.log(fetchedNotes)
                setNotes(fetchedNotes.map((note, index) => ({
                    ...note,
                    id: note.note_id, // Assuming your API returns notes without an 'id' field
                    date: note.created_at,
                    content: note.note_text,
                    isSaved: true // Assuming notes fetched from the API are already saved
                })));
            } catch (error) {
                showSnackbar('Error fetching notes: ' + error, 'ERROR');
            }
        };

        fetchNotes();
    }, [burnId]); // Depend on burnId to refetch when it changes

    return (
        <Paper elevation={15} style={{ padding: '20px', marginBottom: '20px', marginTop: '20px'}}>

            {notes&& notes.map((note, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                    <Grid item xs={3}>
                        <Typography>{new Date(note.date).toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            placeholder="Enter note text..."
                            value={note.content}
                            onChange={(e) => updateNoteContent(note.id, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{note.isSaved ? 'Saved' : 'Unsaved'}</Typography>
                    </Grid>
                </Grid>
            ))}
            <Button onClick={addNote} variant="contained">Add Note</Button>
        </Paper>
    );
}

export default BurnNotes;

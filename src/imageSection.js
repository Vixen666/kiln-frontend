import React from "react";
import { Button, Typography, Grid, Card, CardMedia, Paper } from '@mui/material';
import config from './config';
import "./styles.css";

const imageStyle = {
    height: '200px', // Set a fixed height
    width: '100%', // Make width responsive to the container
    objectFit: 'cover', // This will ensure the image covers the area without distorting its aspect ratio
};

function ImageSection({ phase, burnId, setImages, images, header }) {
    const handleImageChange = async (event) => {
        console.log(phase, burnId, images)
        const files = event.target.files;
        if (files.length === 0) return; // Exit if no files selected

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('file', file); // Append each file to formData
        });

        // Append the burn_id to the FormData
        formData.append('burn_id', burnId); // Assuming burnId is available in your component
        formData.append('imageType', phase); // Assuming burnId is available in your component
        const url = `${config.apiUrl}/upload`; // Ensure this endpoint is configured to handle burn_id
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result.new_img_name); // Process success response
            setImages(prevImages => ({
                ...prevImages,
                [phase]: [...prevImages[phase], result.new_img_name]
            }));// Append the new image name to the images state
        } catch (error) {
            console.error('Upload error:', error);
        }
    };


    return (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px'}}>
            <Typography variant="h6">
                {header}
            </Typography>

            <Grid container spacing={2} >
                {images[phase].map((image, index) => (
                    <Grid item xs={6} sm={4} key={index} >
                        <Card >
                            <CardMedia
                                onClick={() => window.open(`${config.apiUrl}/uploads/${image.new_img_name}`, '_blank')}
                                component="img"
                                image={`${config.apiUrl}/uploads/${image.new_img_name}`}
                                alt={`Preburn Image ${index + 1}`}
                                style={imageStyle}
                            />
                            <Typography variant="h6">
                                {image.image_text}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                component="label" // Allows the button to act as a label for the hidden file input
                style={{ marginTop: '20px' }}
            >
                Upload Images
                <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleImageChange} // Calls your modified handleImageChange function
                />
            </Button>

        </Paper>
    )
}
export default ImageSection;
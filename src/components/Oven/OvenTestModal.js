import { useState, useEffect } from "react";
import { Box, Button, Modal, Typography, Switch } from "@mui/material";
import { io } from "socket.io-client";

function OvenTestModal({ open, handleClose, ovenId }) {
  const [temperature, setTemperature] = useState(0);
  const [hatchet, setHatchet] = useState("");

  const testTemperature = async () => {
    try {
      const response = await fetch('http://192.168.0.21:5000/test_temp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oven_id: ovenId }) // Adjust oven_id as needed
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setTemperature(data.temp);
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  };
  

  const testHatchet = async () => {
    try {
      const response = await fetch('http://192.168.0.21:5000/test_hatchet', {
        method: 'POST', // Changed from GET to POST
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oven_id: ovenId }) // Adjust payload if needed
      });
  
      if (response.ok) {
        const data = await response.json();
        setHatchet(data.hatchet);
      } else {
        console.error('Error fetching hatchet data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  const testOutputs = async () => {
    try {
      const response = await fetch('http://192.168.0.21:5000/test_outputs', {
        method: 'POST', // Changed from GET to POST
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oven_id: ovenId }) // Adjust payload if needed
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Outputs data:", data); // Ensure this logs something useful
      } else {
        console.error('Error fetching outputs data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  


  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Oven {ovenId} Test</Typography>
        <Box mt={2}>
          <Typography variant="body1">Temperature: {temperature}°C</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={testTemperature}
            sx={{ mt: 2 }}
          >
            Get Temperature
          </Button>
        </Box>



        <Box mt={2}>
          <Typography variant="body1">Hatchet: {hatchet}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={testHatchet}
            sx={{ mt: 2 }}
          >
            Test hatchet
          </Button>
        </Box>

        <Box mt={2}>
          <Typography variant="body1">Switching between ON and OFF for 10s. Then Mainswitch off</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={testOutputs}
            sx={{ mt: 2 }}
          >
            Test outputs
          </Button>
        </Box>

        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
          sx={{ mt: 2, ml: 1 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default OvenTestModal;

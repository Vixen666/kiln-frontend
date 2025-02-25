// src/utils/SnackbarContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    console.log("SnackbarProvider useEffect running");
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const showSnackbar = (msg, state) => {
    if (msg.length > 0) {
      setSnackPack((prev) => [
        ...prev,
        { message: msg, state, key: new Date().getTime() },
      ]);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const getColor = (state) => {
    switch (state) {
      case "SUCCESS":
        return "success"; // Green
      case "ERROR":
        return "error"; // Red
      case "INFO":
        return "info"; // Blue by default, customize if needed
      default:
        return "info";
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo ? getColor(messageInfo.state) : "info"}
          sx={{ width: "100%", fontSize: "1.25rem" }} // Example of styling
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

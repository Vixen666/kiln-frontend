// src/components/OvenSelection.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOvens, selectOven, newOven } from "../../store/ovenSlice";
import { Paper, Grid, Card, CardHeader, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Oven from "./Oven";
import useApiFetcher from "../../utils/apiUtils";
import { useCallback } from "react";

const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  cursor: "pointer",
};

function OvenSelection() {
  const dispatch = useDispatch();
  const { ovens, selectedOven, status, error } = useSelector(
    (state) => state.oven
  );
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

  const handleOvenSelect = (oven) => {
    dispatch(selectOven(oven));
  };

  const handleNewOven = () => {
    dispatch(newOven());
  };

  return (
    <div>
      <Paper
        elevation={15}
        style={{
          padding: "20px",
          marginBottom: "20px",
          marginTop: "20px",
          background: "#001c27",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {ovens &&
            ovens.map((oven) => (
              <Grid item xs={12} sm={12} md={12} key={oven.id}>
                <Card
                  variant="outlined"
                  style={{ ...cardStyle, flexDirection: "column" }}
                  onClick={() => {
                    handleOvenSelect(oven);
                  }}
                >
                  <CardHeader
                    title={oven.name}
                    titleTypographyProps={{ variant: "h6" }}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  />
                </Card>
              </Grid>
            ))}
          <Grid item xs={12} sm={12} md={12}>
            <Card variant="outlined" style={cardStyle} onClick={handleNewOven}>
              <IconButton
                color="primary"
                aria-label="add new oven"
                style={{ paddingBottom: 0, paddingTop: 0 }}
              >
                <AddCircleOutlineIcon style={{ fontSize: 30 }} />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      {selectedOven && <div></div>}
      {selectedOven && <Oven oven={selectedOven} />}
    </div>
  );
}

export default OvenSelection;

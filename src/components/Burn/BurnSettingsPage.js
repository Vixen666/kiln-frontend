import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Paper,
} from "@mui/material";
import BurnCurveChart from "../../BurnCurveChart";
import ScheduleComponent from "../../ScheduleComponent";
import BurnNotes from "./BurnNotes";
import ImageSection from "../../imageSection";
import BurnLogs from "./BurnLogs";
import "../../styles.css";
//import io from 'socket.io-client';
import useApiFetcher from "../../utils/apiUtils";
//const socket = io(url);
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchBurnTemperature, fetchTemplateData } from "../../store/burnSlice";
import BurnParameters from "./BurnParameters";

function BurnSettingsPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState({ PRE: [], DURING: [], POST: [] });
  const { data, status, error } = useSelector((state) => state.burn);
  const { selected } = data || {
    burns: [],
    selected: { burnId: null, temperatureData: [] },
  };
  const { fetchData } = useApiFetcher();
  const intervalRef = useRef(null);

  const fetchBurnTemperatureData = useCallback(() => {
    fetchData(fetchBurnTemperature(), {
      success: "Burn temperature loaded successfully!",
      error: "Failed to load burn temperature.",
      error2: "Network problem while fetching burn temperature in component.",
    });
  }, [fetchData]);

  const fetchTemplateDataOnce = useCallback(() => {
    if (selected.templateId && !selected.templateDataFetched) {
      fetchData(fetchTemplateData(), {
        success: "Template data loaded successfully!",
        error: "Failed to load template data.",
        error2: "Network problem while fetching template data in component.",
      });
    }
  }, [selected.templateId, selected.templateDataFetched, fetchData]);

  useEffect(() => {
    if (selected.burnId) {
      fetchTemplateDataOnce(); // Fetch template data once

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Fetch temperature data every 10 seconds
      intervalRef.current = setInterval(() => {
        fetchBurnTemperatureData();
      }, 100000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalRef.current);
    }
  }, [selected.burnId, fetchBurnTemperatureData, fetchTemplateDataOnce]);

  if (status === "failed") return <p>Error: {error}</p>;

  // Prepare chart data and zones
  const chartData = [];
  const zones = [];
  let cumulativeDuration = 0;
  let previousPoint = null;

  selected.templateData.forEach((point, index) => {
    cumulativeDuration += point.time;
    chartData.push([cumulativeDuration, point.temperature]);

    if (previousPoint) {
      const tempChangePerMinute =
        (point.temperature - previousPoint.temperature) /
        (cumulativeDuration - previousPoint.cumulativeDuration);
      const color =
        tempChangePerMinute > 0
          ? "red"
          : tempChangePerMinute < 0
          ? "blue"
          : "green";

      zones.push({
        value: chartData[index][0], // x-axis value where the zone change occurs
        color: color,
      });
    }

    previousPoint = { cumulativeDuration, temperature: point.temperature };
  });
  const options = {
    title: {
      text: "",
    },
    chart: {
      zoomType: "x", // Enable zooming along the x-axis. Use 'xy' for both axes.
    },
    xAxis: [
      {
        title: {
          text: "Cumulative Duration",
        },
        tickInterval: 10,
      },
      {
        // Secondary x-axis (hours)
        opposite: true, // Position it on the opposite side
        linkedTo: 0, // Link this axis to the primary axis
        labels: {
          formatter: function () {
            return (this.value / 60).toFixed(1) + "h"; // Convert minutes to hours
          },
        },
        tickInterval: 60, // One tick per hour (60 minutes)
      },
    ],
    yAxis: {
      title: {
        text: "Target Temperature",
      },
    },
    tooltip: {
      shared: true, // This enables the tooltip for all series at the current x-axis point
      crosshairs: true, // This draws a line across the chart at the hover point
      formatter: function () {
        let points = this.points || []; // Safeguard for when points are not available
        let tooltipText = `<b>Time: ${this.x}</b><br/>`; // Adjust label as necessary

        // Store temperatures to calculate difference
        let temperatures = {};

        points.forEach((point) => {
          temperatures[point.series.name] = point.y;
          tooltipText += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${point.y}°C</b><br/>`;
        });

        // Check if both temperatures are available
        if (
          temperatures["Target Temp"] !== undefined &&
          temperatures["Current Temperature"] !== undefined
        ) {
          let diff = Math.abs(
            temperatures["Target Temp"] - temperatures["Current Temperature"]
          );
          tooltipText += `Difference: <b>${diff}°C</b><br/>`;
        }

        // Example of including 'heat_on' info if present
        points.forEach((point) => {
          if (point.point.heat_on !== undefined) {
            tooltipText += `Heat On (${point.series.name}): <b>${
              point.point.heat_on ? "Yes" : "No"
            }</b><br/>`;
          }
        });

        return tooltipText;
      },
    },
    series: [
      {
        name: "Target Temp",
        data: chartData,
        type: "line",
        zoneAxis: "x",
        zones: zones,
      },
      {
        name: "Current Temperature",
        data: selected.temperatureData.map((point) => [
          point.runtime / 60,
          point.ispoint,
          point.heat_on,
        ]),
        type: "line",
        // You can add more settings as per your requirements
      },
    ],
    exporting: {
      enabled: true, // Enable the export button for downloading charts
    },
  };
  // Now you can use the burn object in your component
  // Check if burn exists since state may be undefined if navigating directly to the page
  if (!selected.burnId) {
    navigate("/burn-current");
  }

  return (
    <>
      <Paper>
        {/* Render your burn settings UI here */}
        <BurnCurveChart options={options} />
      </Paper>
      <ScheduleComponent />
      <BurnNotes burnId={selected.burnId} />
      <BurnLogs />
      <BurnParameters />
      <ImageSection
        phase="PRE"
        burnId={selected.burnId}
        setImages={setImages}
        images={images}
        header={"Images"}
      />
    </>
  );
}
export default BurnSettingsPage;

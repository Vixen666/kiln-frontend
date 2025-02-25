import React, { useEffect, useState } from 'react';
import BurnCurveTable from "./BurnCurveTable";
import BurnCurveChart from "./BurnCurveChart";
import "./styles.css";
import { useSelector } from 'react-redux';
function TemplateDisplay() {
  const templateData = useSelector((state) => state.template.data.selected.templateData);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (templateData) {
      const transformedData = templateData.map((point) => {
        return [point.cumulativeDuration, parseFloat(point.temperature), point.color];
      });
      setChartData(transformedData);
    }
  }, [templateData]);

  const options = {
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
    series: [
      {
        name: "Target Temp",
        data: chartData,
        type: "line",
        zoneAxis: "x"
      }
    ],
  };

  return (
    <div>
      <BurnCurveChart options={options} />
      <BurnCurveTable/>
    </div>
  );
}

export default TemplateDisplay;

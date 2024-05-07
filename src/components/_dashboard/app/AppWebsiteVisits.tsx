import React from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, Box } from "@mui/material";
import { BaseOptionChart } from "../../charts";
import { ApexOptions } from "apexcharts";
import { Patient } from "@/interface/employee";

export const AppWebsiteVisits = ({
  employee,
}: {
  employee: Patient | undefined;
}): JSX.Element => {
  console.log(employee);
  const chartOptions: ApexOptions = merge(BaseOptionChart(), {
    chart: {
      zoom: {
        enabled: false
      }
    },
    stroke: { width: [3, 3], show: true, curve: "straight" },
    markers: {
      size: 5,
      strokeWidth: 2,
      strokeColors: "#ffffff"
    },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["solid", "solid"] },
    labels: employee?.copdHistory.map((history) => {
      const dateObj = new Date(history.date);
      return dateObj.toLocaleString("default", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }),
    xaxis: {
      type: "datetime",
      tickAmount: 5, // Reduced for a more cramped look
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleString("default", {
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      datetimeUTC: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(2)} units`;
          }
          return y;
        },
      },
    },
  });

  const COConcentration = employee?.copdHistory.map(
    (history) => history.gasConcentration
  );
  const NH3Concentration = employee?.copdHistory.map(
    (history) => history.nh3Concentration
  );

  const CHART_DATA = [
    {
      name: "CO Concentration",
      type: "line",
      data: COConcentration?.length > 0 ? COConcentration : [0],
    },
    {
      name: "NH3 Concentration",
      type: "line",
      data: NH3Concentration?.length > 0 ? NH3Concentration : [0],
    },
  ];

  return (
    <Card>
      <CardHeader
        title="COPD Data Overview"
        subheader="CO and NH3 Concentrations"
      />
      {employee && (
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            type="line"
            series={CHART_DATA}
            options={chartOptions}
            height={364}
          />
        </Box>
      )}
    </Card>
  );
};

export default AppWebsiteVisits;

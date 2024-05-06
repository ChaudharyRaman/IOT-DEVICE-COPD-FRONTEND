import React from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, Box } from "@mui/material";
import { BaseOptionChart } from "../../charts";
import { ApexOptions } from "apexcharts";
import { Patient } from "@/interface/employee";

// const CHART_DATA = [
//   {
//     name: "CO Concentration",
//     type: "line",
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//   },
//   {
//     name: "NH3 Concentration",
//     type: "line",
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//   },
//   //   {
//   //     name: "Team C",
//   //     type: "line",
//   //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//   //   },
// ];

export const AppWebsiteVisits = ({
  employee,
}: {
  employee: Patient | undefined;
}): JSX.Element => {
  console.log(employee);
  const chartOptions: ApexOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2], show: true },
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
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleString("default", {
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      tickAmount: 10,
      // You might want to adjust `min` and `max` or `tickAmount` based on the actual data spread to improve visibility
      datetimeUTC: false, // Adjust this based on whether your dates are UTC or local
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

  //   console.log(
  //     employee?.copdHistory.map((history) => {
  //       const dateObj = new Date(history.date);
  //       return dateObj.toLocaleDateString();
  //     })
  //   );

  const COConcentration = employee?.copdHistory.map(
    (history) => history.gasConcentration
  );
  const NH3Concentration = employee?.copdHistory.map(
    (history) => history.nh3Concentration
  );

  console.log(COConcentration);
  console.log(NH3Concentration);

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

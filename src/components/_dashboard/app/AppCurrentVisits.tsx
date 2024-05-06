import React from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
import { fNumber } from "@/utils/formatNumber";
import { BaseOptionChart } from "@/components/charts";
import { ApexOptions } from "apexcharts";

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const AppCurrentVisits = ({ employee }): JSX.Element => {
  const theme = useTheme();

  const chartOptions: ApexOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    // labels: ["America", "Asia", "Europe", "Africa"],
    labels: ["No COPD", "Has COPD"],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  const hasCOPD = employee?.filter((employ) => employ.hasCOPD).length;
  const noCOPD = employee?.filter((employ) => !employ.hasCOPD).length;

  const CHART_DATA = [noCOPD, hasCOPD];

  return (
    <Card>
      <CardHeader title="Employees COPD Status" />
      {employee && (
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart
            type="pie"
            series={CHART_DATA}
            options={chartOptions}
            height={320}
          />
        </ChartWrapperStyle>
      )}
    </Card>
  );
};

export default AppCurrentVisits;

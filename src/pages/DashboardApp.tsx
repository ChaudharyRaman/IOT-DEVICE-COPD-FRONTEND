/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import Page from "@/components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "@/components/_dashboard/app";
import { useContextState } from "@/context/contextProvider";
import axios from "axios";
import { Patient } from "@/interface/employee";

const DashboardApp = (): JSX.Element => {
  const { userToken } = useContextState();
  const [employee, setEmployee] = useState<Patient[]>();

  const fetchEmployeeData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/employee/",
        config
      );
      setEmployee(data);
    } catch {
      console.error("Failed to fetch employee data");
    }
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  console.log("employee", employee);

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales employee={employee} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers employee={employee} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders employee={employee} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits employee={employee && employee[7]} />
          </Grid>

          <Grid item xs={10} md={4} lg={10}>
            <AppCurrentVisits employee={employee} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardApp;

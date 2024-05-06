/* eslint-disable prettier/prettier */
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { HeaderLabel, IUser } from "@/models";
import { sentenceCase } from "change-case";
import React, { useEffect, useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

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
import Page from "@/components/Page";
import Label from "@/components/Label";
import Scrollbar from "@/components/Scrollbar";
import SearchNotFound from "@/components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "@/components/_dashboard/user";
import USER_LIST from "@/_mocks_/user";
import axios from "axios";
import { useContextState } from "@/context/contextProvider";
import { Patient } from "@/interface/employee";
import NewEmployeeModal from "@/components/EmployeeCreateModal";

const TABLE_HEAD: HeaderLabel[] = [
  { id: "id", label: "ID", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "age", label: "Age", alignRight: false },
  //   { id: "company", label: "Company", alignRight: false },
  //   { id: "role", label: "Role", alignRight: false },
  { id: "hasCOPD", label: "COPD Status", alignRight: false },
  //   { id: "status", label: "Status", alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if (!array) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const User = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState<IUser[]>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userToken } = useContextState();
  const [employee, setEmployee] = useState<Patient>();
  const [open, setOpen] = useState(false);
  const [fetchEmployee, setFetchEmployee] = useState(false);

  const fetchEmployeeData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:3000/api/employee/",
        config
      );
      setEmployee(data);
    } catch {
      console.error("Failed to fetch employee data");
    }
  };
  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployee]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(USER_LIST);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: IUser[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USER_LIST.length) : 0;

  //   const filteredUsers = applySortFilter(
  //     USER_LIST,
  //     getComparator(order, orderBy),
  //     filterName
  //   );

  const filteredUsers = applySortFilter(
    employee,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  //   console.log(filteredUsers);

  return (
    <>
      <NewEmployeeModal
        open={open}
        setOpen={setOpen}
        setFetchEmployee={setFetchEmployee}
        fetchEmployee={fetchEmployee}
      ></NewEmployeeModal>
      <Page title="User">
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
        </Grid>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Employees
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={() => setOpen(true)}
            >
              New Employee
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USER_LIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers?.length > 0 &&
                      filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            name,
                            role,
                            status,
                            company,
                            avatarUrl,
                            isVerified,
                            age,
                            hasCOPD,
                          } = row;
                          const isItemSelected = selected.indexOf(name) !== -1;
                          console.log("row",row);
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role=""
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, name)}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="normal"
                                align="left"
                              >
                                {id}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Avatar alt={name} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              {/* <TableCell align="left">{company}</TableCell> */}
                              <TableCell align="left">{age}</TableCell>
                              {/* <TableCell align="left">{role}</TableCell> */}
                              <TableCell align="left">
                                {hasCOPD ? "Yes" : "No"}
                              </TableCell>

                              <TableCell align="right">
                                <UserMoreMenu employee={row}/>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USER_LIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default User;

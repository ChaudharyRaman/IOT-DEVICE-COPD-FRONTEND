import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContextState } from "@/context/contextProvider";
import axios from "axios";

function NewEmployeeModal({ open, setOpen, setFetchEmployee, fetchEmployee }) {
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { userToken } = useContextState();
  const [snackbarData, setSnackbarData] = useState({
    alert: "",
    message: "",
    open: false,
  });

  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/add-employee/",
        { name, age },
        config
      );
      console.log(data);
      setSnackbarData({
        alert: "success",
        message: "Employee added successfully",
        open: true,
      });
      setOpen(false);
      setFetchEmployee(!fetchEmployee);
    } catch (error: any) {
      console.error("Failed to fetch employee data");
      setSnackbarData({
        alert: "error",
        message: `${error.response.data.message}`,
        open: true,
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={5000}
        onClose={() => setSnackbarData({ alert: "", message: "", open: false })}
        message={snackbarData.message}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Employee
          </Typography>
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              type="number"
              onChange={(e) => setAge(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default NewEmployeeModal;

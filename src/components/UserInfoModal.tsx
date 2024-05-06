import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { AppWebsiteVisits } from "./_dashboard/app";
import Scrollbar from "./Scrollbar";

const UserInfoModal = ({ openInfoModal, setOpenInfoModal, employee }) => {
  const handleClose = () => setOpenInfoModal(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
        <Box>
          <Modal
            open={openInfoModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {employee?.name}
              </Typography>
              <AppWebsiteVisits employee={employee} />
            </Box>
          </Modal>
        </Box>
    </div>
  );
};

export default UserInfoModal;

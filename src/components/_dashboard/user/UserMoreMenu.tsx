import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
// import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// import roundInfo from '@iconify/icons-eva/round-info';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UserInfoModal from "@/components/UserInfoModal";

const UserMoreMenu = ({employee}): JSX.Element => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <>
      <UserInfoModal
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
        employee={employee}
      />
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
          {/* <ListItemIcon>
                        <Icon icon={roundInfo} width={24} height={24} />
                    </ListItemIcon> */}
          <ListItemText
            primary="Info"
            primaryTypographyProps={{ variant: "body2" }}
            onClick={() => {
              setOpenInfoModal(true);
              setIsOpen(false);
            }}
          />
        </MenuItem>

        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Icon icon={editFill} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem> */}
      </Menu>
    </>
  );
};

export default UserMoreMenu;

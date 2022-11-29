import React, { FC } from "react";
import { Box, Typography, Modal } from "@mui/material";

import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
  pt: 2.5,
};

interface ModalProps {
  isOpen: boolean;
  heading: string;
  text: string;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, heading, text }) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", color: "black" }}
        >
          {heading}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "black" }}>
          {text}
        </Typography>
      </Box>
    </Modal>
  );
};
export default ModalComponent;

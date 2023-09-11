import React from 'react';
import { Dialog, DialogTitle, styled } from '@mui/material';
import { ReactComponent as CloseIcon } from '@/assets/dialog-box-icons/closeIcon.svg';

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgb(84 81 81 / 15%);
  }
`;

type DialogProps = {
  title: string;
  handleClose: () => void;
  children?: React.ReactNode;
};

const DialogBox: React.FC<DialogProps> = ({ title, children, handleClose }) => {
  return (
    <StyledDialog
      PaperProps={{
        style: {
          boxShadow: 'none',
          minWidth: '400px'
        }
      }}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle>
        <>{title}</>
        <CloseIcon data-testid='close-button' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose} />
      </DialogTitle>

      {children}
    </StyledDialog>
  );
};

export default DialogBox;

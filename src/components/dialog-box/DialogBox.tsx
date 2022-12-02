import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { GridRowId } from "@mui/x-data-grid";
import { ApolloError, DocumentNode, useMutation } from "@apollo/client";

import { apiRequestAtom, toastMessageAtom } from "../../states/apiRequestState";

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(220, 220, 220, 0.05);
  }
`;

type DialogProps = {
  deleteMutation: DocumentNode;
  refetchQuery: DocumentNode;
  entity: string;
  entityId: GridRowId;
  entityName: string;
  handleClose: () => void;
};

const DialogBox: React.FC<DialogProps> = ({
  deleteMutation,
  refetchQuery,
  entity,
  entityName,
  entityId,
  handleClose,
}) => {
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const setToastMessage = useSetRecoilState(toastMessageAtom);

  const [deleteItem] = useMutation(deleteMutation, {
    refetchQueries: [{ query: refetchQuery }],
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    onCompleted: () => {
      setToastMessage(`${entity} deleted successfully`);
      setApiSuccess(true);
    },
  });

  const onConfirmDelete = () => {
    deleteItem({
      variables: {
        id: entityId,
      },
    });
    handleClose();
  };

  return (
    <StyledDialog
      PaperProps={{
        style: {
          boxShadow: "none",
          minWidth: "400px",
          alignItems: "center",
        },
      }}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle>
        <>Delete {entity}</>
      </DialogTitle>
      <DialogContentText sx={{ width: "84%" }}>
        <>
          {" "}
          Are you sure you want to delete the {entity?.toLowerCase()}{" "}
          {entityName}?
        </>
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button
          variant="outlined"
          sx={{
            height: "30px",
          }}
          onClick={onConfirmDelete}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default DialogBox;

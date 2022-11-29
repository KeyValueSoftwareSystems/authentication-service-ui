import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  styled,
  Tooltip,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useRecoilState, useSetRecoilState } from "recoil";

import { TableProps } from "./types";
import TableToolBar from "../table-toolbar/TableToolBar";
import "./styles.css";
import { VERIFY_USER_PERMISSION } from "./services/queries";
import { apiRequestAtom, toastMessageAtom } from "../../states/apiRequestState";
import { viewTableAtom } from "../../states/tableStates";
import ModalComponent from "../modal";

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(220, 220, 220, 0.05);
  }
`;

const TableList: FC<TableProps> = ({
  rows,
  columns,
  text,
  actionFlex,
  cursorType,
  setItemList,
  onAdd,
  onEdit,
  buttonLabel,
  searchLabel,
  deleteMutation,
  refetchQuery,
  editPermission,
  deletePermission,
  viewPermission,
  isAddVerified,
  handleRowClick,
  entity,
}) => {
  const [isEditVerified, setEditVerified] = React.useState(true);
  const [isDeleteVerified, setDeleteVerified] = React.useState(true);
  const [isViewVerified, setViewVerified] = useRecoilState(viewTableAtom);
  const setApiSuccess = useSetRecoilState(apiRequestAtom);
  const setToastMessage = useSetRecoilState(toastMessageAtom);
  useQuery(VERIFY_USER_PERMISSION, {
    variables: {
      params: {
        permissions: [viewPermission],
        operation: "AND",
      },
    },
    onCompleted: (data) => {
      setViewVerified(data?.verifyUserPermission);
      console.log(data?.verifyUserPermission);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });
  useQuery(VERIFY_USER_PERMISSION, {
    variables: {
      params: {
        permissions: [editPermission],
        operation: "AND",
      },
    },
    onCompleted: (data) => {
      setEditVerified(data?.verifyUserPermission);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });
  useQuery(VERIFY_USER_PERMISSION, {
    variables: {
      params: {
        permissions: [deletePermission],
        operation: "AND",
      },
    },
    onCompleted: (data) => {
      setDeleteVerified(data?.verifyUserPermission);
    },
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
    fetchPolicy: "network-only",
  });
  const [deleteItem] = useMutation(deleteMutation, {
    refetchQueries: [{ query: refetchQuery }],
    onError: (error: ApolloError) => {
      setToastMessage(error.message);
      setApiSuccess(false);
    },
  });

  const [open, setOpen] = useState(false);
  const [entityId, setEntityId] = useState<GridRowId>("");
  const [entityName, setEntityName] = useState<string>("");

  const onConfirmDelete = () => {
    deleteItem({
      variables: {
        id: entityId,
      },
    });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openConfirmPopup = (id: GridRowId, name: string) => {
    setOpen(true);
    setEntityId(id);
    setEntityName(name);
  };

  const action_column: GridColumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "table-list-header",
      flex: actionFlex,
      cellClassName: "actions",
      headerAlign: "center",

      getActions: (params) => {
        return [
          <Tooltip title="Edit" arrow placement="top">
            <GridActionsCellItem
              icon={
                <EditOutlinedIcon
                  onClick={() => {
                    onEdit(params.id);
                  }}
                />
              }
              label="Edit"
              className={`edit  ${!isEditVerified && "disabled-styles"}`}
            />
          </Tooltip>,
          <Tooltip title="Delete" arrow placement="top">
            <GridActionsCellItem
              icon={<DeleteOutlinedIcon className="delete" />}
              label="Delete"
              className={`delete  ${!isDeleteVerified && "disabled-styles"}`}
              onClick={() => openConfirmPopup(params.id, params.row.name)}
            />
          </Tooltip>,
          <StyledDialog
            PaperProps={{
              style: {
                boxShadow: "none",
                minWidth: "400px",
                alignItems: "center",
              },
            }}
            open={open}
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
          </StyledDialog>,
        ];
      },
    },
  ];

  const final_columns = [...columns, ...action_column];

  return (
    <div className="table-component">
      {isViewVerified ? (
        <>
          <div className="table-toolbar" style={{ border: "none" }}>
            <TableToolBar
              text={text}
              buttonLabel={buttonLabel}
              searchLabel={searchLabel}
              setItemList={setItemList}
              searchQuery={refetchQuery}
              isAddVerified={isAddVerified}
              onAdd={onAdd}
            />
          </div>
          <div className="table-listing-items">
            <DataGrid
              rows={rows}
              columns={final_columns}
              style={{
                borderRadius: "0px 0px 5px 5px",
                cursor: cursorType,
              }}
              disableSelectionOnClick
              onRowClick={handleRowClick}
              disableColumnMenu
            />
          </div>
        </>
      ) : (
        <ModalComponent
          isOpen={!isViewVerified}
          heading={"Access Denied"}
          text={"Sorry, you are not allowed to view this page."}
        />
      )}
    </div>
  );
};
export default TableList;

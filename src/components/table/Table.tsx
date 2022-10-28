import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
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
import { useMutation } from "@apollo/client";

import { TableProps } from "./types";
import TableToolBar from "../table-toolbar/TableToolBar";
import "./styles.css";

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(220, 220, 220, 0.05);
  }
`;

const TableList: FC<TableProps> = ({
  rows,
  columns,
  text,
  onAdd,
  onEdit,
  buttonLabel,
  searchLabel,
  deleteMutation,
  refetchQuery,
  handleRowClick,
  entity,
}) => {
  const [deleteItem] = useMutation(deleteMutation, {
    refetchQueries: [{ query: refetchQuery }],
  });

  const [open, setOpen] = useState(false);
  const [entityId, setEntityId] = useState<GridRowId>("");

  const handleYesNo = (input: string) => {
    if (input === "yes")
      deleteItem({
        variables: {
          id: entityId,
        },
        onCompleted(data) {
          console.log(data);
        },
      });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id: GridRowId) => {
    setOpen(true);
    setEntityId(id);
  };

  const action_column: GridColumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "table-list-header",
      flex: 0.3,
      cellClassName: "actions",
      headerAlign: "center",

      getActions: ({ id }) => {
        return [
          <Tooltip title="Edit" arrow placement="top">
            <GridActionsCellItem
              icon={
                <EditOutlinedIcon
                  onClick={() => {
                    onEdit(id);
                  }}
                />
              }
              label="Edit"
              className="edit"
              onClick={() => onEdit(id)}
            />
          </Tooltip>,
          <Tooltip title="Delete" arrow placement="top">
            <>
              <GridActionsCellItem
                icon={<DeleteOutlinedIcon className="delete" />}
                label="Delete"
                className="delete"
                onClick={() => handleClickOpen(id)}
              />
              <StyledDialog
                PaperProps={{
                  style: {
                    boxShadow: "none",
                    width: "400px",
                    alignItems: "center",
                  },
                }}
                open={open}
                onClose={handleClose}
              >
                <DialogTitle>
                  <>Delete {entity}</>
                </DialogTitle>
                <DialogContentText>
                  <> Are you sure you want to delete the {entity}</>
                </DialogContentText>
                <DialogActions>
                  <Button
                    sx={{
                      backgroundColor: "#808080",
                      color: "white",
                      borderRadius:'5px',
                      height:'40px',
                      marginBottom:'20px',
                      marginRight:'5px',
                      marginTop:'10px'
                    }}
                    onClick={() => {
                      handleYesNo("no");
                    }}
                  >
                    No
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#039BE5",
                      color: "white",
                      borderRadius:'5px',
                      height:'40px',
                      marginBottom:'20px',
                      marginTop:'10px'
                    }}
                    onClick={() => handleYesNo("yes")}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </StyledDialog>
            </>
          </Tooltip>,
        ];
      },
    },
  ];

  const final_columns = [...columns, ...action_column];

  return (
    <div className="table-component">
      <div className="table-toolbar" style={{ border: "none" }}>
        <TableToolBar
          text={text}
          buttonLabel={buttonLabel}
          searchLabel={searchLabel}
          onAdd={onAdd}
        />
      </div>
      <div className="table-listing-items">
        <DataGrid
          rows={rows}
          columns={final_columns}
          style={{
            borderRadius: "0px 0px 5px 5px",
          }}
          disableSelectionOnClick
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
export default TableList;

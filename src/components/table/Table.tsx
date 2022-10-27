import { DataGrid, GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useMutation } from "@apollo/client";

import { TableProps } from "./types";
import TableToolBar from "../table-toolbar/TableToolBar";
import "./styles.css";

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
  entity
}) => {

  const [deleteItem] = useMutation(deleteMutation, {
    refetchQueries: [{ query: refetchQuery }],
  });

  const [open, setOpen] = useState(false);
  const [entityId,setEntityId]= useState<GridRowId>("");

  const handleYesNo= (input:string) => {

    if(input==="yes")
    deleteItem({
      variables: {
        id: entityId,
      },
    onCompleted(data){
      console.log(data)
    }
    });
    handleClose();
  };

  const handleClose=()=> {
    setOpen(false)
  }

  const handleClickOpen = (id:GridRowId) => {
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
              <Dialog
                BackdropProps={{ invisible: true }}
                PaperProps={{
                  style: {
                    // backgroundColor: "white",
                    boxShadow: "none",
                    marginLeft:'10px',
                    // position: "absolute",
                    // border:'1px',
                    // borderColor:'black',
                    width:'400px',
                    // top: "50%",
                    // left: "50%",
                    alignItems:'center',
                    // transform: "translate(-50%, -50%)",
                  },
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <>Select {entity}</>
                </DialogTitle>
                <DialogContentText id="alert-dialog-description">
                  <> Are you sure you want to delete the {entity}</>
                </DialogContentText>
                <DialogActions>
                  <Button onClick={() => {
                    console.log(id)
                    handleYesNo("no")}}>No</Button>
                  <Button onClick={() => handleYesNo("yes")} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          </Tooltip>
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

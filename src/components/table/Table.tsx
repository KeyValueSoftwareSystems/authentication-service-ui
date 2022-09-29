import {
  DataGrid, GridActionsCellItem, GridColumns,
} from "@mui/x-data-grid";
import "./styles.css";
import { FC, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { TableProps } from "./types";
import TableToolBar from "../table-tool-bar/TableToolBar";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
      flexWrap:"wrap !important",
      
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
      padding:"3px",
    },
    "& .MuiDataGrid-cell--withRenderer MuiDataGrid-cell MuiDataGrid-cell--textLeft":{
      maxHeight: "none !important",
      
    },

  }
})(DataGrid);

const TableList: FC<TableProps> = ({
  rows,
  columns,
  text,
  buttonlabel,
  searchlabel,
  deleteMutation,
  refetchQuery,
}) => {
  const [deleteItem, { data: data2 }] = useMutation(deleteMutation,{
    refetchQueries: [{ query: refetchQuery }]
  });
  
  //
  const columns2: GridColumns = [{
    field: "actions",
    type: "actions",
    headerName: "Actions",
    headerClassName: "user-list-header",
    flex: 0.5,
    cellClassName: "actions",
    headerAlign: "center",
    getActions: ({ id }) => {
      return [
        <Tooltip title="Edit" arrow>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />
        </Tooltip>
        ,
        <Tooltip title="Delete" arrow>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => {
              
              deleteItem({
                variables: {
                  id: id,
                },
              }
              )
            }}
          />
        </Tooltip>
        ,
      ];
    },
  },];

  const columns3=[...columns,...columns2]
 
  return (
    <div className="table-component">
      <div className="table-tool-bar">
       <TableToolBar text={text} buttonlabel={buttonlabel} searchlabel={searchlabel} />
      </div>
      <div
        className="table-listing-items"
        style={{ height: 650, width: "100%" }}
      >
        <StyledDataGrid rows={rows} columns={columns3} style={{ 
          textOverflow: "ellipsis", borderRadius: "0px 0px 5px 5px"        
        }} />
      </div>
    </div>
  );
};
export default TableList;

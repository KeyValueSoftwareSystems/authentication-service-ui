import {
  DataGrid, GridActionsCellItem, GridColumns,
} from "@mui/x-data-grid";
import { FC } from "react";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";

import { TableProps } from "./types";
import TableToolBar from "../table-tool-bar/TableToolBar";
import "./styles.css";

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
        <DataGrid rows={rows} columns={columns3} style={{ 
          textOverflow: "ellipsis", borderRadius: "0px 0px 5px 5px"        
        }} />
      </div>
    </div>
  );
};
export default TableList;

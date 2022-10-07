import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { FC } from "react";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";

import { TableProps } from "./types";
import TableToolBar from "../table-toolbar/TableToolBar";
import "./table.css";
import { useNavigate } from "react-router-dom";

const TableList: FC<TableProps> = ({
  rows,
  columns,
  text,
  onClick,
  buttonLabel,
  searchLabel,
  deleteMutation,
  refetchQuery,
}) => {
  const [deleteItem] = useMutation(deleteMutation, {
    refetchQueries: [{ query: refetchQuery }],
  });
  const navigate = useNavigate();

  const action_column: GridColumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "table-list-header",
      flex: 0.5,
      cellClassName: "actions",
      headerAlign: "center",
      getActions: ({ id }) => {
        return [
          <Tooltip title="Edit" arrow>
            <GridActionsCellItem
              icon={
                <EditIcon
                  onClick={() => {
                    navigate(`${onClick}/${id}`);
                  }}
                />
              }
              label="Edit"
              className="textPrimary"
              color="inherit"
            />
          </Tooltip>,
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
                });
              }}
            />
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
          onClick={onClick}
        />
      </div>
      <div className="table-listing-items">
        <DataGrid
          rows={rows}
          columns={final_columns}
          style={{
            borderRadius: "0px 0px 5px 5px",
          }}
        />
      </div>
    </div>
  );
};
export default TableList;

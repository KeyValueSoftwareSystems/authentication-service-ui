import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import "./styles.css";
import TableListing from "../../Components/Table";
import { Tooltip } from "@mui/material";
import { GET_ROLES } from "./services/queries";
import { DELETE_ROLE } from "./services/mutations";
import { RolesListAtom } from "../../states/roleStates";



const Roles: React.FC = () => {
  const [deleteRole, { data: data2 }] = useMutation(DELETE_ROLE,{
    refetchQueries: [{ query: GET_ROLES }]
  }); 
  const [roleList, setRoleList] = useRecoilState(RolesListAtom);
  const { data } = useQuery(GET_ROLES, {
    onCompleted: (data) => {
      setRoleList(data?.getRoles);
    },
  });
  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Role",
      width: 1485,
      headerClassName: "user-list-header",
      headerAlign: "left",
    },
    {
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
                
                deleteRole({
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
    },
  ];

  return (
    <>
      <TableListing
        rows={roleList}
        columns={columns}
        text="All Roles"
        buttonlabel="Add Role"
        searchlabel="Search Role"
      />
    </>
  );
};


export default Roles;

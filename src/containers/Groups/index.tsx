import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { groupListAtom} from "../../states/groupStates";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import "./styles.css";
import TableListing from "../../Components/Table";
import { Tooltip } from "@mui/material";
import { DELETE_GROUPS } from "./services/mutations";
import { GET_GROUPS, GET_GROUP_ROLES } from "./services/queries";



const Groups: React.FC = () => {

  const [deleteGroup, { data: data2 }] = useMutation(DELETE_GROUPS, {
    refetchQueries: [{ query: GET_GROUPS }]
  });


  const [groupList, setGroupList] = useRecoilState(groupListAtom);  

  const { data } = useQuery(GET_GROUPS, {
    onCompleted: (data) => {
      setGroupList(data?.getGroups);
    },
  });

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Groups",
      headerClassName: "user-list-header",
      headerAlign: "left",
      width:280,
    },
    {
      field: "roles",
      headerName: "Roles",
      headerClassName: "user-list-header",
      flex: 1,
      renderCell: (params) => <ShowRoleList {...params} />,
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "user-list-header",
      flex: 0.5,
      cellClassName: "actions",
      headerAlign: "center",
      width:100,
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

                deleteGroup({
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
        rows={groupList}
        columns={columns}
        text="All Groups"
        buttonlabel="Add Group"
        searchlabel="Search Group"
      />
    </>
  );
};
const ShowRoleList = (props: any) => {
  const { row } = props;
  const [roleList, setRoleList] = React.useState([]);

  const { data } = useQuery(GET_GROUP_ROLES, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      setRoleList(data?.getGroupRoles);
    },
  });

  return (
    <>
      
      {roleList?.map((role: any) => (
        <span className="rolesvalue" key={role.id}>
          {role?.name}
        </span>
      ))}
    </>
  );
};


export default Groups;

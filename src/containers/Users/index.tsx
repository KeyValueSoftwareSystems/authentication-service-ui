import React from "react";
import { useRecoilState } from "recoil";
import { tableListAtom, userListAtom } from "../../states/userStates";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";

import { GET_USERS, GET_USER_GROUPS } from "./services/queries";
import "./styles.css";
import TableListing from "../../components/Table";

const Users: React.FC = () => {
  const [userList, setUserList] = useRecoilState(userListAtom);
  // const [tableList, setTableList] = useRecoilState(tableListAtom);

  const { data } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUserList(data?.getUsers);
    },
  });

  const columns: GridColumns = [
    {
      field: "firstName",
      headerName: "User",
      width: 300,
      headerClassName: "user-list-header",
      headerAlign: "left",
    },
    {
      field: "groups",
      headerName: "Member Of",
      headerClassName: "user-list-header",
      flex: 1,
      renderCell: (params) => <ShowGroupList {...params} />,
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.5,
      cellClassName: "actions",
      headerAlign: "center",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <TableListing
        rows={userList}
        columns={columns}
        text="All Users"
        buttonlabel="Add User"
        searchlabel="Search User"
      />
    </>
  );
};

const ShowGroupList = (props: any) => {
  const { row } = props;
  const [groupList, setGroupList] = React.useState([]);

  const { data } = useQuery(GET_USER_GROUPS, {
    variables: {
      id: row.id,
    },
    onCompleted: (data) => {
      setGroupList(data?.getUserGroups);
    },
  });

  return (
    <>
      {groupList?.map((group: any) => (
        <span className="groups" key={group.id}>
          {" "}
          {group?.name}{" "}
        </span>
      ))}
    </>
  );
};

export default Users;

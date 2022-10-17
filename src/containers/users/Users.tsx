import React from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GridColumns } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

import { GET_USERS, GET_USER_GROUPS } from "./services/queries";
import "./styles.css";
import { DELETE_USER } from "./services/mutations";
import { userListAtom } from "../../states/userStates";
import TableList from "../../components/table/Table";
import TableChipElement from "../../components/table-chip-element";
import { stringAvatar } from "../../utils/table";

const Users: React.FC = () => {
  const [userList, setUserList] = useRecoilState(userListAtom);

  useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUserList(data?.getUsers);
    },
  });

  const columns: GridColumns = [
    {
      field: "firstName",
      headerName: "User",
      width: 320,
      headerClassName: "user-list-header",
      headerAlign: "center",
      renderCell: (params) => <GetFullName {...params} />,
    },
    {
      field: "groups",
      headerName: "Member Of",
      headerClassName: "user-list-header",
      flex: 0.5,
      renderCell: (params) => (
        <div className="group-list">
          <TableChipElement
            props={params}
            query={GET_USER_GROUPS}
            element="user"
          />
        </div>
      ),
      headerAlign: "center",
    },
  ];

  return (
    <>
      <TableList
        rows={userList}
        columns={columns}
        text="All Users"
        buttonLabel="Add User"
        searchLabel="Search User"
        deleteMutation={DELETE_USER}
        refetchQuery={GET_USERS}
      />
    </>
  );
};

const GetFullName = (props: any) => {
  const { row } = props;
  let fullName = row.firstName.concat(" ", row.lastName);
  
  return (
    <>
      <Avatar {...stringAvatar(fullName)} className="avatar" />
      <div>
        <div className="fullname">{fullName}</div>
        <div className="email">{row.email}</div>
      </div>
    </>
  );
};

export default Users;

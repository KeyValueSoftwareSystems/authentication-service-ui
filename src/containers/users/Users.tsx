import React from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GridColumns } from "@mui/x-data-grid";

import { GET_USERS, GET_USER_GROUPS } from "./services/queries";
import "./styles.css";
import { DELETE_USER } from "./services/mutations";
import { userListAtom } from "../../states/userStates";
import TableList from "../../components/table/Table";
import TableChipElement from "../../components/table-chip-element";

const Users: React.FC = () => {
  useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [userList, setUserList] = useRecoilState(userListAtom);

  useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUserList(data?.getUsers);
    },
  });
  const setGroupList = (data: any) => {
    setUserGroupList(data?.getUserGroups);
  };
  const [userGroupList, setUserGroupList] = React.useState([]);
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
      renderCell: (params) => (
        <TableChipElement
          props={params}
          query={GET_USER_GROUPS}
          itemList={userGroupList}
          setItemList={setGroupList}
        />
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

export default Users;

import React from "react";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { userListAtom } from "../../states/userStates";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../services/queries";
import AddEditUser from "./addEditUser";
// import UserFormOld from "./addEditUser";

const Users: React.FC = () => {

  // const [userList, setUserList] = useRecoilState(userListAtom);

  // const { data, loading, refetch } = useQuery(GET_USERS, {
  //   onCompleted: (data) => {
  //     setUserList(data?.getUsers);
  //   }
  // });

  return (
    <div>
      <AddEditUser />
      {/* <UserFormOld /> */}
    </div>
  );
};

export default Users;

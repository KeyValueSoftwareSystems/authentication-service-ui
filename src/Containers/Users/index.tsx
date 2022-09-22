import React from "react";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { userListAtom } from "../../states/userStates";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../services/queries";

const Users:  React.FC = () => {

  const [userList, setUserList] = useRecoilState(userListAtom);
  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, refetch } = useQuery(GET_USERS, {
    onCompleted: (data) => {
        setUserList(data?.getUsers);
    }
  });
  console.log(userList);
  return (
    <div>
      Users
      <Button variant="contained">Contained</Button>

            {userList.map((user: any, i) => (
        <div key={i}>{user.firstName}</div>
      ))}
         <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    </div>
  );
};

export default Users;

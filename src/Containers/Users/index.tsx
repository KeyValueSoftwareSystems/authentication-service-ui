
import React from "react";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { tableListAtom, userListAtom } from "../../states/userStates";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_USER_GROUPS } from "../../services/queries";
import TableListing from "../../Components/Table/tableListing";
import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import './index.css'

const handleEdit = () => {
  alert('Edit');
}

const columns: GridColDef[] = [
  {
    field: 'user', headerName: 'User', width: 200, headerClassName: 'user-list-header', renderCell: (params) => (
      <div className='user-options'>
        <Typography className='user-name'>{params.value.name}</Typography>
      </div>
    )
  },
  {
    field: 'groups', headerName: 'Member Of', headerClassName: 'user-list-header', width: 520,
    renderCell: (params) => (

      <div className="groups">
        {groupvalues[params.value.i].map((gv) =>
          <div className="groupsvalue">
            {gv}
          </div>
        )}
      </div>


    )
    // valueGetter: (params) => {
    //     return params.getValue(params.id, "attributes").groups;
    // }
  },

  {
    field: 'actions', headerName: 'Actions', width: 300, headerClassName: 'user-list-header', renderCell: (params) => (
      <div className='options'>
        <div className='option' onClick={handleEdit} >
          {params.value.option1}
        </div>
        <div className='option'>
          {params.value.option2}
        </div>
        <div className='option'>
          {params.value.option3}
        </div>
      </div>
    )
  },
];

const groupvalues = [
  ['aaa', 'bbb'],
  ['ccc', 'ddd', 'eee'],
  ['fff', 'ggg', 'hhh', 'iii'],
  ['ccc', 'ddd', 'eee'],
  ['aaa', 'bbb'],
  ['fff', 'ggg', 'hhh', 'iii'],
  ['aaa', 'bbb'],
  ['ccc', 'ddd', 'eee'],
  ['ccc', 'ddd', 'eee'],
  ['fff', 'ggg', 'hhh', 'iii', 'kkk']
];

let i: number;

const rows = [
  { id: 1, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 0 } },
  { id: 2, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 1 } },
  { id: 3, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 2 } },
  { id: 4, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 3 } },
  { id: 5, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 4 } },
  { id: 6, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 5 } },
  { id: 7, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 6 } },
  { id: 8, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 7 } },
  { id: 9, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 8 } },
  { id: 10, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 9 } },


];

const Users: React.FC = () => {

  const [userList, setUserList] = useRecoilState(userListAtom);

  const [tableList, setTableList] = useRecoilState(tableListAtom);

  // eslint - disable - next - line @typescript-eslint / no - unused - vars
  const { data:data1, loading, refetch } = useQuery(GET_USERS, {
    onCompleted: (data1) => {
      setUserList(data1?.getUsers);
    }
  });

  const { data:data2 } = useQuery(GET_USER_GROUPS, {
    onCompleted: (data2) => {data1.map(()=>{
     
      setTableList(data2?.getUserGroups)
    })
      
    }
  })
  console.log("Table List", tableList);
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
      <div>
        <TableListing rows={rows} columns={columns} text="All Users" buttonlabel="Add User" searchlabel="Search User" />
      </div>
    </div>
  );
};

export default Users;
